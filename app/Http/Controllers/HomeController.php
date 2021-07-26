<?php

namespace App\Http\Controllers;

use DB;

class HomeController extends Controller
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
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        //    $geo = new Geocoder();
        //     d(json_encode($geo->getReportDataForRequestsDestination()));
        //d(json_encode($geo->getReportDataForRequestsLocation()));
        /*
                $A=$geo->getLatLogFromAddress('agiou georgiou kakopetria');
                $B=$geo->getLatLogFromAddress('Agiou Nikolaou 47 kakopetria, Nicosia');

                $C=$geo->getLatLogFromAddress('Agiou Nikolaou 47 Strovolos, Nicosia');
                $C=$geo->getLatLogFromAddress('Agiou Nikolaou greece'); */
        /*
        //$doulewukw=$geo->getFromLatLogAddress($A[0]['lat'],$A[0]['long']);
        //$power=['Originlat'=>$A[0]['lat'],'Originlong'=>$A[0]['long'],'Destinationlat'=>$B[0]['lat'],'Destinationong'=>$B[0]['long']];
        //$geo->getrouteofPointsbaseonLatLong($power);
        $power=[$A[0],$B[0]];
        $power2=[$A[0],$C[0]];
        $geo->getDistanceMatrix($power,$power2);
        $geo->getParkingsAroundALatLong($A[0]['lat'],$A[0]['long'],1);

        $geo->getParkingsAroundALatLong('41.8857256','-87.6369590',1);
        */
        //$geo->getParkingsAroundALatLong('35.167893','33.359409',1);
       //$geo->getParkingsAroundALatLong('40.17248','60.594641',1);
        //$B=$geo->getAutocompleteListForOpenRouteServicewithNominatimandGeonames('Agiou Nikolaou 47 kakopetria, Nicosia');
        //$geo->getParkingsAroundALatLong( 34.991061,32.905483,1);
        //print_r($gamw);
        return view('home');
    }
}
