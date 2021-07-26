<?php

namespace App\Http\Controllers;

use App\Fuzzy\FuzzySmartParkingCalculation;
use App\GeoCoder\Geocoder;
use App\requestResults;
use App\Target;
use App\User;
use App\userRequest;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

//use DB;

class APIController extends Controller
{

    public $successStatus = 200;
    //login using oAuth protocol by passport

    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        if (User::checkUserForAPI($request->identity, $request->password)) {
            $user = Auth::user();
            $application = empty($request->application) ? 'SMARTPARKING' : $request->application;
            $success['token'] = $user->createToken($application)->accessToken;
            return response()->json(['success' => $success], $this->successStatus);
        } else {
            return response()->json(['error' => 'Unauthorised'], 401);
        }
    }

    public function authorization(Request $request)
    {
        return $this->login($request);
    }

    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $input = $request->all();
        $input['password'] = Hash::make($input['password']);
        $user = User::create($input);
        $application = empty(request('application')) ? 'SMARTPARKING' : request('application');
        $success['token'] = $user->createToken($application)->accessToken;
        $success['name'] = $user->name;

        return response()->json(['success' => $success], $this->successStatus);
    }

    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function getDetails()
    {
        $user = Auth::user();
        return response()->json(['success' => $user], $this->successStatus);
    }


    public function getAddressAutocomplete(Request $request)
    {
        try {
            $geo = new Geocoder();
            // print_r($request->address);
            //die();
            if (!empty($request->address)) {
                if (isset($request->waytoask) && !empty($request->waytoask)) {
                    $coordinatesNames = $geo->getLatLogFromAddressMoreAccurate($request->address);
                } else {
                    $coordinatesNames = $geo->getAutocompleteListForOpenRouteServicewithNominatimandGeonames($request->address);
                }

                //fix array to be shown at autocomplete
                //return single
                $returnArray = Array();
                $dataArray = Array();
                $counter = 0;
                foreach ($coordinatesNames as $key => $value) {
                    $row = Array();
                    $row['id'] = $key;
                    $row['value'] = $key;
                    $row['label'] = $value['Name'];//." ".$value['source'];
                    $row['lat'] = $value['lat'];
                    $row['long'] = $value['long'];
                    $returnArray[$key] = $row;


                }

                return response('{"content":' . json_encode($returnArray) . ',"status":"success"}', 200);
            } else {
                return response('{"content":' . ',"status":"success"}', 200);
            }
        } catch (Exception $ex) {
            return response('{"content":' . ',"status":"success"}', 200);
        }
    }

    public function getAddressfromCoordinates(Request $request)
    {
        $geo = new Geocoder();
        //print_r($request->lat." ".$request->long);
        //die();
        if (!empty($request->lat) && !empty($request->long)) {
            $address = $geo->getFromLatLogAddress($request->lat, $request->long);
            //print_r($address);
            if (empty($address)) {
                return response('{"content":' . ',"status":"success"}', 200);
            }
            return response('{"content":' . json_encode($address[0]) . ',"status":"success"}', 200);
        } else {
            return response('{"content":' . ',"status":"success"}', 200);
        }
    }

    public function getParkings(Request $request)
    {
        $geo = new Geocoder();
        // echo $request->lat." ".$request->long;
        //die();
        if (!empty($request->lat) && !empty($request->long)) {
            $coordinatesNames = $geo->getParkingsAroundALatLong($request->lat, $request->long, 1, $request->user_id, User::isAdminById($request->user_id));
            return response('{"content":' . json_encode($coordinatesNames) . ',"status":"success"}', 200);
        } else {
            return response('{"content":' . $request->lat . " " . $request->long . ',"status":"success"}', 200);
        }
    }

    public function getParkingsOwner(Request $request)
    {
        $geo = new Geocoder();
        // echo $request->lat." ".$request->long;
        //die();
        if (!empty($request->lat) && !empty($request->long)) {
            $coordinatesNames = $geo->getParkingsAroundALatLongOwner($request->lat, $request->long, 1, $request->user_id);
            return response('{"content":' . json_encode($coordinatesNames) . ',"status":"success"}', 200);
        } else {
            return response('{"content":' . $request->lat . " " . $request->long . ',"status":"success"}', 200);
        }
    }


    public function getWeightedParkings(Request $request)
    {
        $start = new DateTime();
        $geo = new Geocoder();
        // echo $request->lat." ".$request->long;
        //die();
        $selectionpriority = Array();
        if (!empty($request->Userlat) && !empty($request->Userlong) && !empty($request->Destinationlat) && !empty($request->Destinationlog) && (isset($request->selection)
                && is_array($request->selection) && count($request->selection) > 0)) {
            $selectionpriority = $request->selection;
            $coordinates = $geo->getParkingsAroundALatLong($request->Destinationlat, $request->Destinationlog, 1, $request->user_id);
            $fuzzyStart = new DateTime();
            $userDestination = Array('lat' => $request->Destinationlat, 'long' => $request->Destinationlog);
            $userLocation = Array('lat' => $request->Userlat, 'long' => $request->Userlong);
            $startingCoordinates = Array($userLocation, $userDestination);
            $matrix = $geo->getDistanceMatrix($startingCoordinates, array_merge($coordinates, $startingCoordinates));
            $counter = 0;
            //print_r($matrix);


            foreach ($coordinates as $key => $value) {
                $coordinates[$key]['distancecurrentPossition'] = empty($matrix['distances'][0][$counter]) ? -1 : $matrix['distances'][0][$counter];
                $coordinates[$key]['distancedestinationPossition'] = $coordinates[$key]['Distance'];//the person will walk so take point distance (not car) empty($matrix['distances'][1][$counter]) ? -1 : $matrix['distances'][1][$counter];
                $coordinates[$key]['durationcurrentPossition'] = empty($matrix['durations'][0][$counter]) ? -1 : $matrix['durations'][0][$counter];
                $coordinates[$key]['durationdestinationPossition'] = ($coordinates[$key]['Distance'])/(12.5);// in seconds person runs 40 km/hour duration base on the walking speed of 20 km /h (not car with roads) empty($matrix['durations'][1][$counter]) ? -1 : $matrix['durations'][1][$counter];
                if (empty($matrix['durations'][1][$counter]) || empty($matrix['durations'][0][count($matrix) - 1])) {
                    $coordinates[$key]['duration'] = -1;
                } else {
                    $coordinates[$key]['duration'] = $matrix['durations'][1][$counter] + $matrix['durations'][0][count($matrix) - 1];
                }
                $counter++;
            }
            $statistics = Array();
            $statistics['MaxdistancecurrentPossition'] = empty($this->getMax($coordinates, 'distancecurrentPossition')) ? 1 : $this->getMax($coordinates, 'distancecurrentPossition');
            if ($statistics['MaxdistancecurrentPossition'] < 0) {
                $statistics['MaxdistancecurrentPossition'] = 1;
            }
            $statistics['MaxdistancedestinationPossition'] = empty($this->getMax($coordinates, 'distancedestinationPossition')) ? 1 : $this->getMax($coordinates, 'distancedestinationPossition');
            if ($statistics['MaxdistancedestinationPossition'] < 0) {
                $statistics['MaxdistancedestinationPossition'] = 1;
            }
            $statistics['Maxcost'] = empty($this->getMax($coordinates, 'cost')) ? 1 : $this->getMax($coordinates, 'cost');
            if ($statistics['Maxcost'] < 0) {
                $statistics['Maxcost'] = 1;
            }
            $statistics['MaxdurationcurrentPossition'] = empty($this->getMax($coordinates, 'durationcurrentPossition')) ? 1 : $this->getMax($coordinates, 'durationcurrentPossition');
            if ($statistics['MaxdurationcurrentPossition'] < 0) {
                $statistics['MaxdurationcurrentPossition'] = 1;
            }
            $statistics['MaxdurationdestinationPossition'] = empty($this->getMax($coordinates, 'durationdestinationPossition')) ? 1 : $this->getMax($coordinates, 'durationdestinationPossition');
            if ($statistics['MaxdurationdestinationPossition'] < 0) {
                $statistics['MaxdurationdestinationPossition'] = 1;
            }
            $statistics['Maxduration'] = empty($this->getMax($coordinates, 'duration')) ? 1 : $this->getMax($coordinates, 'duration');
            if ($statistics['Maxduration'] < 0) {
                $statistics['Maxduration'] = 1;
            }
            $fuzzycalculation = new FuzzySmartParkingCalculation();
            foreach ($coordinates as $key => $value) {
                $coordinates[$key]['PercdistancecurrentPossition'] = ($coordinates[$key]['distancecurrentPossition'] / $statistics['MaxdistancecurrentPossition']) * 100;
                $coordinates[$key]['1'] = $coordinates[$key]['PercdistancecurrentPossition'];
                if ($coordinates[$key]['1'] < 0) {
                    $coordinates[$key]['1'] = 100;
                    $coordinates[$key]['PercdistancecurrentPossition'] = 100;
                }
                $coordinates[$key]['PercdistancedestinationPossition'] = ($coordinates[$key]['distancedestinationPossition'] / $statistics['MaxdistancedestinationPossition']) * 100;
                $coordinates[$key]['2'] = $coordinates[$key]['PercdistancedestinationPossition'];
                if ($coordinates[$key]['2'] < 0) {
                    $coordinates[$key]['2'] = 100;
                    $coordinates[$key]['PercdistancedestinationPossition'] = 100;
                }
                $coordinates[$key]['Perccost'] = ($coordinates[$key]['cost'] / $statistics['Maxcost']) * 100;
                $coordinates[$key]['3'] = $coordinates[$key]['Perccost'];
                if ($coordinates[$key]['3'] < 0) {
                    $coordinates[$key]['3'] = 100;
                    $coordinates[$key]['Perccost'] = 100;
                }
                $coordinates[$key]['PercdurationcurrentPossition'] = ($coordinates[$key]['durationcurrentPossition'] / $statistics['MaxdurationcurrentPossition']) * 100;
                $coordinates[$key]['4'] = $coordinates[$key]['PercdurationcurrentPossition'];
                if ($coordinates[$key]['4'] < 0) {
                    $coordinates[$key]['4'] = 100;
                    $coordinates[$key]['PercdurationcurrentPossition'] = 100;
                }
                $coordinates[$key]['PercdurationdestinationPossition'] = ($coordinates[$key]['durationdestinationPossition'] / $statistics['MaxdurationdestinationPossition']) * 100;
                $coordinates[$key]['5'] = $coordinates[$key]['PercdurationdestinationPossition'];
                if ($coordinates[$key]['5'] < 0) {
                    $coordinates[$key]['5'] = 100;
                    $coordinates[$key]['PercdurationdestinationPossition'] = 100;
                }
                $coordinates[$key]['Percduration'] = ($coordinates[$key]['duration'] / $statistics['Maxduration']) * 100;
                $coordinates[$key]['6'] = $coordinates[$key]['Percduration'];
                if ($coordinates[$key]['6'] < 0) {
                    $coordinates[$key]['6'] = 100;
                    $coordinates[$key]['Percduration'] = 100;
                }
                //the 3 selections
                $arrayofParameters['PARAMETER1'] = $coordinates[$key][$selectionpriority[0]];
                $arrayofParameters['PARAMETER2'] = $coordinates[$key][$selectionpriority[1]];
                $arrayofParameters['PARAMETER3'] = $coordinates[$key][$selectionpriority[2]];
                //add in the calculated fuzzy value the validity of the parking in order to show valid parking on top
                //thank other parking
                $coordinates[$key]['FuzzyValueTotal'] = $fuzzycalculation->calculateWithParameters($arrayofParameters) + $coordinates[$key]['validity'];
            }
            //sort array by fuzzy value
            $fuzzy = array();
            foreach ($coordinates as $key => $row) {
                $fuzzy[$key] = $row['FuzzyValueTotal'];
            }
            array_multisort($fuzzy, SORT_DESC, $coordinates);

            $fuzzyend = new DateTime();
            $end = new DateTime();

            //save user request
            $userRequest = new userRequest();
            $userRequest->userlat = $request->Userlat;
            $userRequest->userlong = $request->Userlong;
            $userRequest->userloc = \DB::raw("GeomFromText('POINT(" . $request->Userlat . " " . $request->Userlong . ")')");
            $userRequest->destlat = $request->Destinationlat;
            $userRequest->destlong = $request->Destinationlog;
            $userRequest->destloc = \DB::raw("GeomFromText('POINT(" . $request->Destinationlat . " " . $request->Destinationlog . ")')");
            $userRequest->user_id = $request->user_id;
            $userRequest->totaltime = $end->diff($start)->format("%s");
            $userRequest->fuzzytime = $fuzzyend->diff($fuzzyStart)->format("%s");
            $userRequest->time = NOW();
            $userRequest->save();
            $userRequest->requestparameters()->attach($selectionpriority[0], ['order' => 0]);
            $userRequest->requestparameters()->attach($selectionpriority[1], ['order' => 1]);
            $userRequest->requestparameters()->attach($selectionpriority[2], ['order' => 2]);
            //assign url and save results
            $count = 0;
            foreach ($coordinates as $key => $value) {
                unset($coordinates[$key]['1']);
                unset($coordinates[$key]['2']);
                unset($coordinates[$key]['3']);
                unset($coordinates[$key]['4']);
                unset($coordinates[$key]['5']);
                unset($coordinates[$key]['6']);
                if ($count < 9) {
                    $coordinates[$key]['url'] = asset('images/orderedList' . $count . '.png');
                }
                $count++;
                //now save the results in db for statistical purpose
                $req = new requestResults();
                $req->name = empty($coordinates[$key]['name']) ? 'No Name' : $coordinates[$key]['name'];
                $req->distanceDest = $coordinates[$key]['distancedestinationPossition'];
                $req->distanceDestNorm = $coordinates[$key]['PercdistancedestinationPossition'];
                $req->distanceUser = $coordinates[$key]['distancecurrentPossition'];
                $req->distanceUserNorm = $coordinates[$key]['PercdistancecurrentPossition'];
                $req->durationDest = $coordinates[$key]['durationdestinationPossition'];
                $req->durationDestNorm = $coordinates[$key]['PercdurationdestinationPossition'];
                $req->durationUser = $coordinates[$key]['durationcurrentPossition'];
                $req->durationUserNorm = $coordinates[$key]['PercdurationcurrentPossition'];
                $req->costNorm = $coordinates[$key]['Perccost'];
                $req->score = $coordinates[$key]['FuzzyValueTotal'];
                $req->places_id = $coordinates[$key]['id'];
                $req->user_id = $request->user_id;
                $req->save();
                $req->userrequests()->attach($userRequest->id);
                //$req->requestparameters()->attach($selectionpriority[0], ['order' => 1]);
            }

            //save user target
            $target = new Target();
            $target->lat = $request->Userlat;
            $target->long = $request->Userlong;
            $target->loc = \DB::raw("GeomFromText('POINT(" . $request->Userlat . " " . $request->Userlong . ")')");
            $target->user_id = $request->user_id;
            $target->time = NOW();
            $target->save();

            return response('{"content":' . json_encode($coordinates) . ',"status":"success"}', 200);
        } else {
            return response('{"content":' . $request->lat . " " . $request->long . ',"status":"success"}', 200);
        }
    }

    public function getMax($array, $index)
    {
        $max = 0;
        foreach ($array as $k => $v) {
            $max = max(array($max, $v[$index]));
        }
        return $max;
    }

    public function getMin($array, $index)
    {
        $min = 100000;
        foreach ($array as $k => $v) {
            $min = min(array($min, $v[$index]));
        }
        return $min;
    }

}
