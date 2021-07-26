<?php

namespace App\Http\Controllers;

use App\Activity;
use App\Bookmarks;
use App\GeoCoder\Geocoder;
use App\Parameters;
use App\ParkingType;
use App\Places;
use App\PlacesCosts;
use Auth;
use DateTime;
use Excel;
use File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Session;

class MapController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return view('map.searchmap')->with('parameters', Parameters::all()->sortBy('id'))
            ->with('parkingtypes', ParkingType::all()->sortBy('id'));;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexAdmin()
    {
        //
        $providers = DB::table('users')
            ->where('roles_id', '=', 1)
            ->orWhere('roles_id', '=', 4)
            ->get();
        //dd($providers);
        return view('map.adminmap')->with('parameters', Parameters::all()->sortBy('id'))
            ->with('parkingtypes', ParkingType::all()->sortBy('id'))->with('providers', $providers);

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexProvider()
    {
        //
        return view('map.providermap')->with('parameters', Parameters::all()->sortBy('id'))
            ->with('parkingtypes', ParkingType::all()->sortBy('id'));;

    }


    public function importexceladmin()
    {
        return view('admin.import.adminexcel');
    }

    public function importexcel(Request $request)
    {
        //validate the xls file
        $this->validate($request, array(
            'file' => 'required'
        ));
        $result = 1;
        if ($request->hasFile('file')) {
            $extension = File::extension($request->file->getClientOriginalName());
            if ($extension == "xlsx" || $extension == "xls" || $extension == "csv") {

                $path = $request->file->getRealPath();
                $data = Excel::load($path, function ($reader) {
                })->get();
                if (!empty($data) && $data->count()) {
                    foreach ($data as $key => $value) {
                        $insert[$key] = [
                            'name' => $value->name,
                            'lat' => $value->lat,
                            'long' => $value->long,
                            'loc' => \DB::raw("GeomFromText('POINT(" . $value->lat . " " . $value->long . ")')"),
                            'disabledcount' => $value->disabledcount,
                            'occupied' => $value->occupied,
                            'emptyspaces' => $value->emptyspaces,
                            'empty' => 0,
                            'avaliable' => 1,
                            'user_id' => Auth::user()->id,
                            'cost' => $value->cost,
                            'parkingtype_id' => $value->parkingtype_id,
                            'reportedcount' => $value->reportedcount,
                            'validity' => 10,
                            'capacity' => $value->capacity,
                            'maximumduration' => $value->maximumduration,
                            'time' => new DateTime(),
                            'source_id' => 7,
                            'comments' => empty($value->comments) ? 'NO' : $value->comments,
                            'opendata' => 0, 'provider_id' => Auth::user()->id];
                        $exists = DB::select('SELECT checkIfParkingExists(' . $insert[$key]['lat'] . ',' . $insert[$key]['long'] . ') as checkifexists');
                        if (empty($exists[0]->checkifexists)) {
                            $insertData = DB::table('places')->insert($insert[$key]);
                        } else {
                            $insertData = DB::table('places')->where('id', $exists[0]->checkifexists)->update($insert[$key]);
                        }
                        if ($insertData) {
                            $result = $result && 1;
                        } else {
                            $result = $result && 0;
                        }
                    }
                    if ($result) {
                        Session::flash('success', 'Your Data has successfully imported');
                    } else {
                        Session::flash('error', 'Error inserting the data..');
                        return back()->withErrors('Error inserting the data..');
                    }
                }
            }
            return back();
        } else {
            Session::flash('error', 'File ' . ' file.!! Please upload a valid xls/csv file..!!');
            return back()->withErrors('File ' . ' file.!! Please upload a valid xls/csv file..!!');;
        }
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }


    public function storeBookmark(Request $request)
    {
        if (!empty($request)) {
            $datatouSave = Array();
            $data = json_decode($request->data);
            foreach ($data as $key => $value) {
                $datatouSave[$value->name] = $value->value;
            }
            if (!isset($datatouSave['time']) || empty($datatouSave['time'])) {
                $datatouSave['time'] = new DateTime();
            }
            if (!isset($datatouSave['temporary']) || empty($datatouSave['temporary'])) {
                $datatouSave['temporary'] = 0;
            }
            $datatouSave['user_id'] = $request->user_id;

            $bookmark = new Bookmarks();
            foreach ($datatouSave as $key => $value) {
                $bookmark->$key = $value;
            }

            $bookmark->save();
            return response('{"content":' . json_encode($datatouSave) . ',"status":"success"}', 200);
        } else {
            return response('{"content":' . ',"status":"success"}', 200);
        }
    }

    public function removeBookmark(Request $request)
    {
        if (!empty($request)) {
            $id = $request->id;
            $bookmark = Bookmarks::find($id);
            $bookmark->delete();
            return response('{"content":1' . ',"status":"success"}', 200);
        } else {
            return response('{"content":0' . ',"status":"success"}', 200);
        }
    }

    public function getbookmarks(Request $request)
    {
        /*
         *  request root parameters
         * $request->route('parameter1');
            $request->route('parameter2');
            $request->route()->parameters(); // to get all the parameters as key => value
         */
        $bookmarkstoReturn = Array();
        $user_id = $request->route('user_id');
        $bookmarks = DB::select('call getBookMarksofUser(?)', array($user_id));
        if (count($bookmarks) > 0) {
            foreach ($bookmarks as $bookmark) {
                $row = Array();
                $row['id'] = $bookmark->id;
                $row['temporary'] = $bookmark->temporary;
                $row['description'] = $bookmark->description;
                $row['name'] = $bookmark->name;
                $row['places_name'] = $bookmark->places_name;
                $row['lat'] = $bookmark->lat;
                $row['long'] = $bookmark->long;
                $row['places_id'] = $bookmark->places_id;
                $row['time'] = $bookmark->time;
                $row['cost'] = $bookmark->cost;
                $row['capacity'] = $bookmark->capacity;
                $row['comments'] = $bookmark->comments;
                $row['disabledcount'] = $bookmark->disabledcount;
                $row['avaliable'] = $bookmark->avaliable;
                $row['parkingtype_id'] = $bookmark->parkingtype_id;
                $row['validity'] = $bookmark->validity;
                $row['url'] = Geocoder::parkingUrlBaseonType($bookmark->parkingtype_id);
                $bookmarkstoReturn[] = $row;
            }
        }
        return view('map.bookmarks')->with('bookmarks', $bookmarkstoReturn)->with('bookmarksjson', htmlspecialchars_decode(json_encode($bookmarkstoReturn)));;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public
    function store(Request $request)
    {
        if (!empty($request)) {
            $datatouSave = Array();
            $datatouSave['cost'] = 0;
            $data = json_decode($request->data);
            foreach ($data as $key => $value) {
                $datatouSave[$value->name] = $value->value;
            }
            //print_r($datatouSave);
            for ($i = 0; $i < $request->count; $i++) {
                $row = Array();
                $row['cost'] = $datatouSave['cost[' . $i . ']'];
                $row['time'] = $datatouSave['time[' . $i . ']'];
                if ($row['time'] == 60) {
                    $datatouSave['cost'] = $row['time'];
                }
                unset($datatouSave['cost[' . $i . ']']);
                unset($datatouSave['time[' . $i . ']']);
                $datatouSave['costsofplace'][] = $row;
            }
            if (!isset($datatouSave['time']) || empty($datatouSave['time'])) {
                $datatouSave['time'] = new DateTime();
            }
            $datatouSave['lat'] = $request->lat;
            $datatouSave['long'] = $request->long;
            $datatouSave['loc'] = \DB::raw("GeomFromText('POINT(" . $request->lat . " " . $request->long . ")')");
            $datatouSave['user_id'] = $request->user_id;
            if (!isset($datatouSave['provider_id']) || empty($datatouSave['provider_id'])) {
                $datatouSave['provider_id'] = $request->user_id;
            }
            if (!(isset($datatouSave['reportedcount']) && !empty($datatouSave['reportedcount']))) {
                $datatouSave['reportedcount'] = 100;
            }
            if (isset($datatouSave['occupied']) && !empty($datatouSave['occupied'])) {
                $datatouSave['emptyspaces'] = $datatouSave['reportedcount'] - $datatouSave['occupied'];
            }
            $datatouSave['empty'] = 0;
            if (!isset($datatouSave['avaliable']) || empty($datatouSave['avaliable'])) {
                $datatouSave['avaliable'] = 0;
            } else {
                $datatouSave['avaliable'] = 1;
            }
            if (!isset($datatouSave['validity']) || empty($datatouSave['validity'])) {
                $datatouSave['validity'] = 5;
            }
            $datatouSave['capacity'] = $datatouSave['reportedcount'];
            $datatouSave['source_id'] = 6;
            $datatouSave['opendata'] = 0;
            // $datatouSave['name']= $data->name;;
            //$datatouSave['cost']=$data->cost;;
            //print_r($datatouSave);
            $pricesandduration = Array();
            foreach ($datatouSave['costsofplace'] as $value) {
                $pricesandduration[$value['time']] = $value;
            }
            $park = new Places();
            foreach ($datatouSave as $key => $value) {
                if ($key != 'costsofplace') {
                    $park->$key = $value;
                }
            }
            $exists = DB::select('SELECT checkIfParkingExists(' . $park->lat . ',' . $park->long . ') as checkifexists');
            if (empty($exists[0]->checkifexists)) {
                $park->save();
                foreach ($pricesandduration as $key => $valueInternal) {
                    $pc = new PlacesCosts();
                    $pc->cost = $valueInternal['cost'];
                    $pc->time = $valueInternal['time'];
                    $park->placesCosts()->save($pc);
                }
                //save activity
                $activity = new Activity();
                $activity->places_id = $park->id;
                $activity->parked = 1;
                $activity->user_id = $park->user_id;
                $activity->time = $park->time;
                $activity->save();
            } else {
                $existingparking = Places::find($exists[0]->checkifexists);
                $existingparking->name = $park->name;
                $existingparking->disabledcount = $park->disabledcount;
                $existingparking->empty = $park->empty;
                $existingparking->avaliable = $park->avaliable;
                $existingparking->user_id = $park->user_id;
                $existingparking->reportedcount = $park->reportedcount;
                $existingparking->validity = $park->validity;
                $existingparking->capacity = $park->capacity;
                $existingparking->time = $park->time;
                $existingparking->maximumduration = $park->maximumduration;
                $existingparking->source_id = $park->source_id;
                $existingparking->opendata = $park->opendata;
                $existingparking->lat = $park->lat;
                $existingparking->long = $park->long;
                $existingparking->loc = $park->loc;
                $existingparking->provider_id = $park->provider_id;
                $existingparking->save();
                $theplacesCosts = $existingparking->placesCosts;
                // d($theplacesCosts);
                foreach ($theplacesCosts as $keyInternal => $valueInternal) {
                    // d($valueInternal->cost);
                    if (isset($pricesandduration[$valueInternal->time])) {
                        $valueInternal->cost = $pricesandduration[$valueInternal->time]['cost'];
                        $valueInternal->save();
                        unset($pricesandduration[$valueInternal->time]);
                    } else {
                        $valueInternal->delete();
                        unset($theplacesCosts[$keyInternal]);
                    }
                }
                foreach ($pricesandduration as $keyInternal => $valueInternal) {
                    $pc = new PlacesCosts();
                    $pc->cost = $valueInternal['cost'];
                    $pc->time = $valueInternal['time'];
                    $existingparking->placesCosts()->save($pc);
                }
                //save activity
                $activity = new Activity();
                $activity->places_id = $exists[0]->checkifexists;
                $activity->parked = 1;
                $activity->user_id = $park->user_id;
                $activity->time = $park->time;
                $activity->save();
            }

            return response('{"content":' . json_encode($datatouSave) . ',"status":"success"}', 200);
        } else {
            return response('{"content":' . $request->lat . " " . $request->long . ',"status":"success"}', 200);
        }
    }

    /*
     * reserve a parking location
     */

    public
    function reserve(Request $request)
    {
        $isitok = 0;
        if (isset($request->id) && !empty($request->id)) {
            $existingparking = Places::find($request->id);
            $totalcount = $existingparking->capacity;
            $existingoccupied = $existingparking->occupied;
            $emptyspaces = $existingparking->emptyspaces;
            $existingoccupied++;
            if ($existingoccupied > $totalcount) {
                return response('{"content":' . json_encode($isitok) . ',"status":"success"}', 200);
            } else {
                $isitok = 1;
                $existingparking->occupied = $existingoccupied;
                $existingparking->emptyspaces = $totalcount - $existingoccupied;
                if ($existingoccupied == $totalcount) {
                    $existingparking->empty = 1;
                }
                $existingparking->save();
                $activity = new Activity();
                $activity->places_id = $existingparking->id;
                $activity->parked = 1;
                $activity->user_id = $request->user_id;
                $activity->time = new DateTime();
                $activity->save();
                return response('{"content":' . json_encode($isitok) . ',"status":"success"}', 200);
            }

        } else {
            return response('{"content":' . json_encode($isitok) . ',"status":"success"}', 200);
        }
    }

    public
    function releaseReserve(Request $request)
    {
        $isitok = 0;
        if (isset($request->id) && !empty($request->id)) {
            $existingparking = Places::find($request->id);
            $totalcount = $existingparking->capacity;
            $existingoccupied = $existingparking->occupied;
            $emptyspaces = $existingparking->emptyspaces;
            $existingoccupied--;
            if ($existingoccupied < 0) {
                return response('{"content":' . json_encode($isitok) . ',"status":"success"}', 200);
            } else {
                $isitok = 1;
                $existingparking->occupied = $existingoccupied;
                $existingparking->emptyspaces = $totalcount - $existingoccupied;
                if ($existingoccupied == $totalcount) {
                    $existingparking->empty = 1;
                }
                $existingparking->save();
                return response('{"content":' . json_encode($isitok) . ',"status":"success"}', 200);
            }

        } else {
            return response('{"content":' . json_encode($isitok) . ',"status":"success"}', 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public
    function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public
    function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public
    function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public
    function destroy($id)
    {
        //
    }

    //reports
    //generate report by type
    public function getreports(Request $request)
    {

        $geo = new Geocoder();
        $reporttype = $request->route('reporttype');
        switch ($reporttype) {
            case '1':
                $data = json_encode($geo->getReportDataForRequestsDestination());
                return view('admin.reports.report')->with('data', $data);
                break;
            case '2':
                $data = json_encode($geo->getReportDataForRequestsLocation());
                return view('admin.reports.report')->with('data', $data);
                break;
            case '3':
                $places = $geo->getReportDataForPlaces();
                if (is_array($places) && count($places) > 0) {
                    $data = $places;
                    $keys = array_keys($places[0]);
                    $columns_keys = Array();
                    foreach ($keys as $key) {
                        $columns_keys[] = $key;
                    }
                    $columns = $columns_keys;
                    return view('admin.reports.datatable')->with('data', $data)->with('columns', $columns);
                } else {
                    return view('admin.reports.datatable');
                }
                break;
            case '4':
                $rprt = $geo->getReportDataForRank();
                if (is_array($rprt) && count($rprt) > 0) {
                    $data = $rprt;
                    $keys = array_keys($rprt[0]);
                    $columns_keys = Array();
                    foreach ($keys as $key) {
                        $columns_keys[] = $key;
                    }
                    $columns = $columns_keys;
                    return view('admin.reports.datatable')->with('data', $data)->with('columns', $columns);
                } else {
                    return view('admin.reports.datatable');
                }
                break;
            case '5':
                $rprt = $geo->getReportDataForSources();
                if (is_array($rprt) && count($rprt) > 0) {
                    $data = $rprt;
                    $keys = array_keys($rprt[0]);
                    $columns_keys = Array();
                    foreach ($keys as $key) {
                        $columns_keys[] = $key;
                    }
                    $columns = $columns_keys;
                    return view('admin.reports.datatable')->with('data', $data)->with('columns', $columns);
                } else {
                    return view('admin.reports.datatable');
                }
                break;
            default:
                $data = json_encode($geo->getReportDataForRequestsDestination());
                return view('admin.reports.report')->with('data', $data);
                break;
        }

    }

}
