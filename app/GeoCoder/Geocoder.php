<?php

namespace App\GeoCoder;

use App\Currency\CurrencyRetriever;
use App\Places;
use App\PlacesCosts;
use DateInterval;
use DateTime;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;

class Geocoder
{
    public $API_KEY_LOCATIONIQ = "";
    public $BingMapsKey = "--nO-";
    public $googlemapsKeyOLD = "";
    public $googlemapsKey = "";
    public $googlemapsKeyForDirectionAPI = "";
    public $googlemapsKeyForDistanceMatrixAPI = "";
    public $googlemapsKeyForPlacesAPI = "";//"";
    public $openrouteservice = "";
    public $ParkWhiz = "";


    //https://tech.yandex.com/maps/mapsapi/
    //https://locationiq.com/#account
    //https://locationiq.com/docs#maps
    //https://msdn.microsoft.com/en-us/library/ff701717.aspx
    //https://msdn.microsoft.com/en-us/library/ff701705.aspx
    //https://www.bing.com/api/maps/sdkrelease/mapcontrol/isdk#CreateMap1
    //https://msdn.microsoft.com/en-us/library/mt750408.aspx
    //https://developers.google.com/maps/documentation/geocoding/start

    //\DB::raw("GeomFromText('POINT(10 100)')");// -- TO GENERATE TO GEOGRAPHY A POINT
    //http://api.geonames.org/search?q=agios%20nikolaos&username=iacovosi --SEARCH GOOGLE PLACES
    //http://api.geonames.org/search?q=agios%20nikolaos%20greece&username=iacovosi

    //PARKWIZ QUERY
    // https://api.parkwhiz.com/v4/quotes/?q=coordinates:41.8857256,-87.6369590&start_time=2017-12-23T00:00&end_time=2017-12-24T00:00&api_key=62d882d8cfe5680004fa849286b6ce20

    public function getAutocompleteListForOpenRouteService($address)
    {
        $cordinates = Array();
        $json = Array();
        //open route service
        //https://openrouteservice.org/dev/#/home
        //https://openrouteservice.org/documentation/#/reference/geocode/geocodesearch/structured-forward-geocoding-service?console=1
        //https://maps.openrouteservice.org/directions?n1=35.169827&n2=33.370199&n3=15&a=35.074977,33.109874,null,null&b=0&c=0&k1=en-US&k2=km
        $client = new Client(); //GuzzleHttp\Client
        $response = $client->get('https://api.openrouteservice.org/geocode/search',
            [
                'query' => ['text' => $address, 'api_key' => $this->openrouteservice]
            ]);
        $result = $response->getBody();
        $code = $response->getStatusCode();
        $json = json_decode($result, true);
        $json = $json['features'];
        //d($json);
        //die();
        //$json=$json['resourceSets'][0]['resources'];
        if (count($json) > 0 && ($code == 200)) {
            foreach ($json as $item) {
                $valuemidle = $item['geometry']['coordinates'];
                $addressname = $item['properties']['label'];
                $cordinates[] = ['lat' => $valuemidle[1], 'long' => $valuemidle[0], 'source' => 'Open Route Service', 'Name' => $addressname];
            }
        }
        return $cordinates;
    }

    public function getAutocompleteListForOpenRouteServicewithNominatimandGeonames($address)
    {
        $cordinates = Array();
        $json = Array();

        $client = new Client(); //GuzzleHttp\Client
        //
        $response = $client->get('https://nominatim.openstreetmap.org/search',
            [
                'query' => ['q' => $address, 'format' => 'json', 'polygon' => '1', 'addressdetails' => '1']
            ]);
        $result = $response->getBody();
        $code = $response->getStatusCode();
        $json = json_decode($result, true);

        if (count($json) > 0 && ($code == 200)) {
            // d($json[0]);
            foreach ($json as $value) {
                $cordinates[$value['lat'] . "_" . $value['lon']] = ['lat' => $value['lat'], 'long' => $value['lon'], 'source' => 'openstreetmap', 'Name' => $value['display_name']];
            }
        }


        //open route service
        //https://openrouteservice.org/dev/#/home
        //https://openrouteservice.org/documentation/#/reference/geocode/geocodesearch/structured-forward-geocoding-service?console=1
        //https://maps.openrouteservice.org/directions?n1=35.169827&n2=33.370199&n3=15&a=35.074977,33.109874,null,null&b=0&c=0&k1=en-US&k2=km
        $client = new Client(); //GuzzleHttp\Client
        $response = $client->get('https://api.openrouteservice.org/geocode/search',
            [
                'query' => ['text' => $address, 'api_key' => $this->openrouteservice]
            ]);
        $result = $response->getBody();
        $code = $response->getStatusCode();
        $json = json_decode($result, true);
        $json = $json['features'];
        //d($json);
        //die();
        //$json=$json['resourceSets'][0]['resources'];
        if (count($json) > 0 && ($code == 200)) {
            foreach ($json as $item) {
                $valuemidle = $item['geometry']['coordinates'];
                $addressname = $item['properties']['label'];
                if (!isset($cordinates[$valuemidle[1] . "_" . $valuemidle[0]]) || empty($cordinates[$valuemidle[1] . "_" . $valuemidle[0]]))
                    $cordinates[$valuemidle[1] . "_" . $valuemidle[0]] = ['lat' => $valuemidle[1], 'long' => $valuemidle[0], 'source' => 'Open Route Service', 'Name' => $addressname];
            }
        }


        $client = new Client(); //GuzzleHttp\Client
        $response = $client->get('http://api.geonames.org/searchJSON',
            [
                'query' => ['q' => $address, 'username' => 'iacovosi']
            ]);
        $result = $response->getBody();
        $code = $response->getStatusCode();
        $json = json_decode($result, true);
        $json = $json['geonames'];
        if (count($json) > 0 && ($code == 200)) {
            foreach ($json as $value) {
                if (!isset($cordinates[$value['lat'] . "_" . $value['lng']]) || empty($cordinates[$value['lat'] . "_" . $value['lng']]))
                    $cordinates[$value['lat'] . "_" . $value['lng']] = ['lat' => $value['lat'], 'long' => $value['lng'], 'source' => 'geonames', 'Name' => $value['name'] . " (" . $value['fclName'] . " - FROM PLACES)"];
            }
        }


        //select unique cantitates
        foreach ($cordinates as $key => $value) {
            foreach ($cordinates as $keyInternal => $valueInternal) {
                if ($key != $keyInternal) {
                    $distance = $this->vincentyGreatCircleDistance($value['lat'], $value['long'], $valueInternal['lat'], $valueInternal['long']);
                    if ((isset($cordinates[$keyInternal]) && isset($cordinates[$key])) && (($distance == 0) || ($value['Name'] == $valueInternal['Name']))) {
                        unset($cordinates[$keyInternal]);
                    }
                }
            }
        }

        //d($cordinates);
        return $cordinates;
    }


    public function getAutocompleteListForOpenRouteServiceWithCoordinates($lat, $long)
    {
        //return value
        $address = Array();
        $json = Array();
        //open route service
        //https://openrouteservice.org/dev/#/home
        //https://openrouteservice.org/documentation/#/reference/geocode/geocodesearch/structured-forward-geocoding-service?console=1
        //https://maps.openrouteservice.org/directions?n1=35.169827&n2=33.370199&n3=15&a=35.074977,33.109874,null,null&b=0&c=0&k1=en-US&k2=km
        //
        $client = new Client(); //GuzzleHttp\Client
        $response = $client->get('https://api.openrouteservice.org/geocode/reverse',
            [
                'query' => ['point.lat' => $lat, 'point.lon' => $long, 'api_key' => $this->openrouteservice]
            ]);
        $result = $response->getBody();
        $code = $response->getStatusCode();
        $json = json_decode($result, true);
        $json = $json['features'];
        //$json = $json['results'];
        //d($json);
        //die();
        //$json=$json['resourceSets'][0]['resources'];
        if ((count($json) > 0) && ($code == 200)) {
            //d($json[0]);
            foreach ($json as $item) {
                $valuemidle = $item['geometry']['coordinates'];
                $addressname = $item['properties']['label'];
                $address[] = ['lat' => $lat, 'long' => $long, 'source' => 'Open Route Service', 'Name' => $addressname];
            }
        }
        d($address);
        return $address;

    }

    public function getWayPointsListForOpenRouteService($arrayofPoints)
    {
        $route = Array();
        if (isset($arrayofPoints) && is_array($arrayofPoints) && count($arrayofPoints) == 4) {
            //use google maps api
            //https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=YOUR_API_KEY
            //https://developers.google.com/maps/documentation/directions/start?csw=1
            $Originlat = $arrayofPoints['Originlat'];
            $Originlong = $arrayofPoints['Originlong'];
            $Destinationlat = $arrayofPoints['Destinationlat'];
            $Destinationong = $arrayofPoints['Destinationong'];
            //https://api.openrouteservice.org/directions?api_key=your-api-key&coordinates=8.34234%2C48.23424%7C8.34423%2C48.26424&profile=driving-car
            $client = new Client(); //GuzzleHttp\Client
            $response = $client->get('https://api.openrouteservice.org/directions',
                [
                    'query' => ['coordinates' => $Originlong . ',' . $Originlat . '|' . $Destinationong . ',' . $Destinationlat, 'profile' => 'driving-car', 'api_key' => $this->openrouteservice]
                ]);

            $result = $response->getBody();
            $code = $response->getStatusCode();
            $json = json_decode($result, true);
            if (isset($json['routes'][0]) && isset($json['routes'][0]['segments'][0]) && count($json['routes'][0]['segments']) > 0 && ($code == 200)) {

                $distance = $json['routes'][0]['summary']['distance'];
                $duration = $json['routes'][0]['summary']['duration'];
                $steps = Array();
                $json = $json['routes'][0]['segments'][0];
                //d($json);
                //d($json);
                //die();
                foreach ($json['steps'] as $item) {
                    $row = Array();
                    $row['distance'] = $item['distance'];
                    $row['duration'] = $item['duration'];
                    $row['instruction'] = $item['instruction'];
                    $steps[] = $row;
                }
                $route['distance'] = $distance;
                $route['duration'] = $duration;
                $route['steps'] = $steps;
            }
        }
        return $route;
    }


    public function getLatLogFromAddressMoreAccurate($address)
    {

        //return value
        $cordinates = Array();
        try {
            $json = Array();

            //google map service call
            //https://developers.google.com/maps/documentation/geocoding/intro
            //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
            $client = new Client(); //GuzzleHttp\Client
            $response = $client->get('https://maps.googleapis.com/maps/api/geocode/json',
                [
                    'query' => ['address' => $address, 'key' => $this->googlemapsKey]
                ]);
            $result = $response->getBody();
            $code = $response->getStatusCode();
            $json = json_decode($result, true);
            $json = $json['results'];
            //$json=$json['resourceSets'][0]['resources'];
            if (count($json) > 0 && ($code == 200)) {
                foreach ($json as $item) {
                    $valuemidle = $item['geometry']['location'];
                    $addressname = $item['formatted_address'];
                    $cordinates[] = ['lat' => $valuemidle['lat'], 'long' => $valuemidle['lng'], 'source' => 'Google Map', 'Name' => $addressname];
                }
            } else {

                //open route service
                //https://openrouteservice.org/dev/#/home
                //https://openrouteservice.org/documentation/#/reference/geocode/geocodesearch/structured-forward-geocoding-service?console=1
                //https://maps.openrouteservice.org/directions?n1=35.169827&n2=33.370199&n3=15&a=35.074977,33.109874,null,null&b=0&c=0&k1=en-US&k2=km
                $client = new Client(); //GuzzleHttp\Client
                $response = $client->get('https://api.openrouteservice.org/geocode/search',
                    [
                        'query' => ['text' => $address, 'api_key' => $this->openrouteservice]
                    ]);
                $result = $response->getBody();
                $code = $response->getStatusCode();
                $json = json_decode($result, true);
                $json = $json['features'];
                //d($json);
                //die();
                //$json=$json['resourceSets'][0]['resources'];
                if (count($json) > 0 && ($code == 200)) {
                    foreach ($json as $item) {
                        $valuemidle = $item['geometry']['coordinates'];
                        $addressname = $item['properties']['label'];
                        $cordinates[] = ['lat' => $valuemidle[1], 'long' => $valuemidle[0], 'source' => 'Open Route Service', 'Name' => $addressname];
                    }
                } else {
                    //https://locationiq.com/docs-html/index.html#usage
                    //https://my.locationiq.com/dashboard#account
                    //location iq
                    try {
                        $client = new Client(); //GuzzleHttp\Client
                        $response = $client->get('https://eu1.locationiq.org/v1/search.php',
                            [
                                'query' => ['q' => $address, 'format' => 'json', 'key' => $this->API_KEY_LOCATIONIQ, 'polygon_geojson' => 1]
                            ]);

                        $result = $response->getBody();
                        $code = $response->getStatusCode();
                        $json = json_decode($result, true);
                    } catch (Exception $e) {
                        $json = json_decode($result, true);
                    }
                    //d($json);
                    if (count($json) > 0 && ($code == 200) && !(isset($json['error']) && !empty($json['error']))) {
                        //d($json[0]);
                        //$cordinates=['lat'=>$json[0]['lat'],'long'=>$json[0]['lon']];
                        foreach ($json as $value) {
                            $cordinates[] = ['lat' => $value['lat'], 'long' => $value['lon'], 'source' => 'locationiq', 'Name' => $value['display_name']];
                        }
                    } else {

                        //bing maps
                        //https://msdn.microsoft.com/en-us/library/ff701711.aspx
                        //https://msdn.microsoft.com/en-us/library/ff701713.aspx
                        //http://dev.virtualearth.net/REST/v1/Locations?query=locationQuery&includeNeighborhood=includeNeighborhood&include=includeValue&maxResults=maxResults&key=BingMapsKey
                        $client = new Client(); //GuzzleHttp\Client
                        $response = $client->get('http://dev.virtualearth.net/REST/v1/Locations',
                            [
                                'query' => ['query' => $address, 'format' => 'json', 'key' => $this->BingMapsKey]
                            ]);
                        $result = $response->getBody();
                        $code = $response->getStatusCode();
                        $json = json_decode($result, true);
                        //d($json);
                        $json = $json['resourceSets'][0]['resources'];
                        if (count($json) > 0 && ($code == 200)) {
                            foreach ($json as $item) {
                                $valuemidle = $item['point']['coordinates'];
                                $addressname = $item['name'];
                                $cordinates[] = ['lat' => $valuemidle[0], 'long' => $valuemidle[1], 'source' => 'Bing Map', 'Name' => $addressname];
                            }
                        } else {

                            //https://tech.yandex.com/maps/geocoder/?from=mapsapi
                            //if not found use yantex
                            $client = new Client(); //GuzzleHttp\Client
                            $response = $client->get('https://geocode-maps.yandex.ru/1.x/',
                                [
                                    'query' => ['geocode' => $address, 'format' => 'json', 'lang' => 'en-US']
                                ]);
                            $result = $response->getBody();
                            $code = $response->getStatusCode();
                            $json = json_decode($result, true);
                            //d($json);
                            $json = $json['response']['GeoObjectCollection']['featureMember'];
                            if (count($json) > 0 && ($code == 200) && is_array($json) && count($json) > 0) {
                                foreach ($json as $item) {
                                    $valuemidle = $item['GeoObject']['Point']['pos'];
                                    $addressname = !isset($item['GeoObject']['description']) ? '' : $item['GeoObject']['description'] . ' / ' . $item['GeoObject']['name'];
                                    $value = explode(' ', $valuemidle);
                                    $cordinates[] = ['lat' => $value[1], 'long' => $value[0], 'source' => 'yandex.ru', 'Name' => $addressname];
                                }
                            }
                        }

                    }
                }
            }

        } catch (Exception $e) {
            return $cordinates;
        }
        return $cordinates;
    }


    public function getLatLogFromAddress($address)
    {
        //return value
        $cordinates = Array();
        $json = Array();
        //at the begining use open street map
        $client = new Client(); //GuzzleHttp\Client
        //
        $response = $client->get('https://nominatim.openstreetmap.org/search',
            [
                'query' => ['q' => $address, 'format' => 'json', 'polygon' => '1', 'addressdetails' => '1']
            ]);
        $result = $response->getBody();
        $code = $response->getStatusCode();
        $json = json_decode($result, true);
        //echo $code.PHP_EOL;
        /*
        $result = $client->get('https://nominatim.openstreetmap.org/search',
        [
            'query' => ['q'=>$address ,'format'=>'xml','polygon'=>'1','addressdetails'=>'1']
        ]);
        $xml = $result->getBody();
        $code = $result->getStatusCode();
        $json = $this->extendedxml_toarray($xml);
        echo $code.PHP_EOL;
        d($json->place[0]);  
        */
        //d($json); 
        if (count($json) > 0 && ($code == 200)) {
            //d($json[0]);  
            foreach ($json as $value) {
                $cordinates[] = ['lat' => $value['lat'], 'long' => $value['lon'], 'source' => 'openstreetmap', 'Name' => $value['display_name']];
            }
        } else {
            //check if you found a place match using another openmap service
            //we use the geonames service at http://www.geonames.org/export/ws-overview.html
            //http://www.geonames.org/export/ws-overview.html
            $client = new Client(); //GuzzleHttp\Client
            $response = $client->get('http://api.geonames.org/searchJSON',
                [
                    'query' => ['q' => $address, 'username' => 'iacovosi']
                ]);
            $result = $response->getBody();
            $code = $response->getStatusCode();
            $json = json_decode($result, true);
            $json = $json['geonames'];
            if (count($json) > 0 && ($code == 200)) {
                foreach ($json as $value) {
                    $cordinates[] = ['lat' => $value['lat'], 'long' => $value['lng'], 'source' => 'geonames', 'Name' => $value['name'] . " (" . $value['fclName'] . ")"];
                }
            } else {
                //google map service call
                //https://developers.google.com/maps/documentation/geocoding/intro
                //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
                $client = new Client(); //GuzzleHttp\Client
                $response = $client->get('https://maps.googleapis.com/maps/api/geocode/json',
                    [
                        'query' => ['address' => $address, 'key' => $this->googlemapsKey]
                    ]);
                $result = $response->getBody();
                $code = $response->getStatusCode();
                $json = json_decode($result, true);
                $json = $json['results'];
                //d($json);
                //die();
                //$json=$json['resourceSets'][0]['resources'];
                if (count($json) > 0 && ($code == 200)) {
                    foreach ($json as $item) {
                        $valuemidle = $item['geometry']['location'];
                        $addressname = $item['formatted_address'];
                        $cordinates[] = ['lat' => $valuemidle['lat'], 'long' => $valuemidle['lng'], 'source' => 'Google Map', 'Name' => $addressname];
                    }
                } else {

                    //open route service
                    //https://openrouteservice.org/dev/#/home
                    //https://openrouteservice.org/documentation/#/reference/geocode/geocodesearch/structured-forward-geocoding-service?console=1
                    //https://maps.openrouteservice.org/directions?n1=35.169827&n2=33.370199&n3=15&a=35.074977,33.109874,null,null&b=0&c=0&k1=en-US&k2=km
                    $client = new Client(); //GuzzleHttp\Client
                    $response = $client->get('https://api.openrouteservice.org/geocode/search',
                        [
                            'query' => ['text' => $address, 'api_key' => $this->openrouteservice]
                        ]);
                    $result = $response->getBody();
                    $code = $response->getStatusCode();
                    $json = json_decode($result, true);
                    $json = $json['features'];
                    //d($json);
                    //die();
                    //$json=$json['resourceSets'][0]['resources'];
                    if (count($json) > 0 && ($code == 200)) {
                        foreach ($json as $item) {
                            $valuemidle = $item['geometry']['coordinates'];
                            $addressname = $item['properties']['label'];
                            $cordinates[] = ['lat' => $valuemidle[1], 'long' => $valuemidle[0], 'source' => 'Open Route Service', 'Name' => $addressname];
                        }
                    } else {
                        //https://locationiq.com/docs-html/index.html#usage
                        //https://my.locationiq.com/dashboard#account
                        //location iq
                        try {
                            $client = new Client(); //GuzzleHttp\Client
                            $response = $client->get('https://eu1.locationiq.org/v1/search.php',
                                [
                                    'query' => ['q' => $address, 'format' => 'json', 'key' => $this->API_KEY_LOCATIONIQ, 'polygon_geojson' => 1]
                                ]);

                            $result = $response->getBody();
                            $code = $response->getStatusCode();
                            $json = json_decode($result, true);
                        } catch (Exception $e) {
                            $json = json_decode($result, true);
                        }
                        //d($json);
                        if (count($json) > 0 && ($code == 200) && !(isset($json['error']) && !empty($json['error']))) {
                            //d($json[0]);
                            //$cordinates=['lat'=>$json[0]['lat'],'long'=>$json[0]['lon']];
                            foreach ($json as $value) {
                                $cordinates[] = ['lat' => $value['lat'], 'long' => $value['lon'], 'source' => 'locationiq', 'Name' => $value['display_name']];
                            }
                        } else {

                            //bing maps
                            //https://msdn.microsoft.com/en-us/library/ff701711.aspx
                            //https://msdn.microsoft.com/en-us/library/ff701713.aspx
                            //http://dev.virtualearth.net/REST/v1/Locations?query=locationQuery&includeNeighborhood=includeNeighborhood&include=includeValue&maxResults=maxResults&key=BingMapsKey
                            $client = new Client(); //GuzzleHttp\Client
                            $response = $client->get('http://dev.virtualearth.net/REST/v1/Locations',
                                [
                                    'query' => ['query' => $address, 'format' => 'json', 'key' => $this->BingMapsKey]
                                ]);
                            $result = $response->getBody();
                            $code = $response->getStatusCode();
                            $json = json_decode($result, true);
                            //d($json);
                            $json = $json['resourceSets'][0]['resources'];
                            if (count($json) > 0 && ($code == 200)) {
                                foreach ($json as $item) {
                                    $valuemidle = $item['point']['coordinates'];
                                    $addressname = $item['name'];
                                    $cordinates[] = ['lat' => $valuemidle[0], 'long' => $valuemidle[1], 'source' => 'Bing Map', 'Name' => $addressname];
                                }
                            } else {

                                //https://tech.yandex.com/maps/geocoder/?from=mapsapi
                                //if not found use yantex
                                $client = new Client(); //GuzzleHttp\Client
                                $response = $client->get('https://geocode-maps.yandex.ru/1.x/',
                                    [
                                        'query' => ['geocode' => $address, 'format' => 'json', 'lang' => 'en-US']
                                    ]);
                                $result = $response->getBody();
                                $code = $response->getStatusCode();
                                $json = json_decode($result, true);
                                //d($json);
                                $json = $json['response']['GeoObjectCollection']['featureMember'];
                                if (count($json) > 0 && ($code == 200) && is_array($json) && count($json) > 0) {
                                    foreach ($json as $item) {
                                        $valuemidle = $item['GeoObject']['Point']['pos'];
                                        $addressname = !isset($item['GeoObject']['description']) ? '' : $item['GeoObject']['description'] . ' / ' . $item['GeoObject']['name'];
                                        $value = explode(' ', $valuemidle);
                                        $cordinates[] = ['lat' => $value[1], 'long' => $value[0], 'source' => 'yandex.ru', 'Name' => $addressname];
                                    }
                                }
                            }

                        }
                    }
                }
            }
        }
        d($cordinates);
        return $cordinates;
    }

    public function getFromLatLogAddress($lat, $long)
    {
        //return value
        $address = Array();
        $json = Array();
        //at the begining use open street map
        $client = new Client(); //GuzzleHttp\Client
        //
        $response = $client->get('https://nominatim.openstreetmap.org/reverse',
            [
                'query' => ['lat' => $lat, 'lon' => $long, 'format' => 'jsonv2', 'polygon_geojson' => '1', 'addressdetails' => '1']
            ]);
        $result = $response->getBody();
        $code = $response->getStatusCode();
        $json = json_decode($result, true);
        //echo $code.PHP_EOL;
        /*
        $result = $client->get('https://nominatim.openstreetmap.org/search',
        [
            'query' => ['q'=>$address ,'format'=>'xml','polygon'=>'1','addressdetails'=>'1']
        ]);
        $xml = $result->getBody();
        $code = $result->getStatusCode();
        $json = $this->extendedxml_toarray($xml);
        echo $code.PHP_EOL;
        d($json->place[0]);  
        */
        //d($json);
        if ((count($json) > 0) && ($code == 200) && !empty($json['name'])) {
            //d($json[0]);
            $address[] = ['lat' => $lat, 'long' => $long, 'source' => 'openstreetmap', 'Name' => $json['display_name']];

        } else {


            //google map service call
            //https://developers.google.com/maps/documentation/geocoding/intro
            //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
            $client = new Client(); //GuzzleHttp\Client
            $response = $client->get('https://maps.googleapis.com/maps/api/geocode/json',
                [
                    'query' => ['latlng' => $lat . "," . $long, 'key' => $this->googlemapsKey]
                ]);
            $result = $response->getBody();
            $code = $response->getStatusCode();
            $json = json_decode($result, true);
            $json = $json['results'];
            //d($json);
            //die();
            //$json=$json['resourceSets'][0]['resources'];
            if ((count($json) > 0) && ($code == 200)) {
                foreach ($json as $item) {
                    $valuemidle = $item['geometry']['location'];
                    $addressname = $item['formatted_address'];
                    $address[] = ['lat' => $lat, 'long' => $long, 'source' => 'Google Map', 'Name' => $addressname];
                }
            } else {

                //open route service
                //https://openrouteservice.org/dev/#/home
                //https://openrouteservice.org/documentation/#/reference/geocode/geocodesearch/structured-forward-geocoding-service?console=1
                //https://maps.openrouteservice.org/directions?n1=35.169827&n2=33.370199&n3=15&a=35.074977,33.109874,null,null&b=0&c=0&k1=en-US&k2=km
                //
                $client = new Client(); //GuzzleHttp\Client
                $response = $client->get('https://api.openrouteservice.org/geocode/reverse',
                    [
                        'query' => ['point.lat' => $lat, 'point.lon' => $long, 'api_key' => $this->openrouteservice]
                    ]);
                $result = $response->getBody();
                $code = $response->getStatusCode();
                $json = json_decode($result, true);
                $json = $json['features'];
                //$json = $json['results'];
                //d($json);
                //die();
                //$json=$json['resourceSets'][0]['resources'];
                if ((count($json) > 0) && ($code == 200)) {
                    //d($json[0]);
                    foreach ($json as $item) {
                        $valuemidle = $item['geometry']['coordinates'];
                        $addressname = $item['properties']['label'];
                        $address[] = ['lat' => $lat, 'long' => $long, 'source' => 'Open Route Service', 'Name' => $addressname];
                    }

                } else {


                    //https://locationiq.com/docs-html/index.html#usage
                    //https://my.locationiq.com/dashboard#account
                    //location iq
                    try {
                        $client = new Client(); //GuzzleHttp\Client
                        $response = $client->get('https://eu1.locationiq.org/v1/reverse.php',
                            [
                                'query' => ['lat' => $lat, 'lon' => $long, 'format' => 'json', 'key' => $this->API_KEY_LOCATIONIQ,]
                            ]);

                        $result = $response->getBody();
                        $code = $response->getStatusCode();
                        $json = json_decode($result, true);
                    } catch (Exception $e) {
                        $json = json_decode($result, true);
                    }
                    //d($json);
                    if ((count($json) > 0) && ($code == 200) && !(isset($json['error']) && !empty($json['error']))) {
                        $address[] = ['lat' => $lat, 'long' => $long, 'source' => 'locationiq', 'Name' => $json['display_name']];
                    } else {

                        //bing maps
                        //https://msdn.microsoft.com/en-us/library/ff701711.aspx
                        //https://msdn.microsoft.com/en-us/library/ff701713.aspx
                        //http://dev.virtualearth.net/REST/v1/Locations?query=locationQuery&includeNeighborhood=includeNeighborhood&include=includeValue&maxResults=maxResults&key=BingMapsKey
                        $client = new Client(); //GuzzleHttp\Client
                        $response = $client->get('http://dev.virtualearth.net/REST/v1/Locations/' . $lat . ',' . $long,
                            [
                                'query' => ['o' => 'json', 'key' => $this->BingMapsKey]
                            ]);
                        $result = $response->getBody();
                        $code = $response->getStatusCode();
                        $json = json_decode($result, true);
                        $json = $json['resourceSets'][0]['resources'];
                        //d($json);
                        if ((count($json) > 0) && ($code == 200) && (count($json) > 0)) {
                            foreach ($json as $item) {
                                $valuemidle = $item['point']['coordinates'];
                                $addressname = $item['name'];
                                $address[] = ['lat' => $valuemidle[0], 'long' => $valuemidle[1], 'source' => 'Bing Map', 'Name' => $addressname];
                            }
                        } else {


                            //https://tech.yandex.com/maps/geocoder/?from=mapsapi
                            //if not found use yantex
                            $client = new Client(); //GuzzleHttp\Client
                            $response = $client->get('https://geocode-maps.yandex.ru/1.x/',
                                [
                                    'query' => ['geocode' => $long . ',' . $lat, 'format' => 'json', 'lang' => 'en-US']
                                ]);
                            $result = $response->getBody();
                            $code = $response->getStatusCode();
                            $json = json_decode($result, true);
                            $json = $json['response']['GeoObjectCollection']['featureMember'];
                            //d($json);
                            //die();
                            if (count($json) > 0 && ($code == 200) && is_array($json) && count($json) > 0) {
                                foreach ($json as $item) {
                                    $valuemidle = $item['GeoObject']['Point']['pos'];
                                    $addressname = !isset($item['GeoObject']['description']) ? '' : $item['GeoObject']['description'] . ' / ' . $item['GeoObject']['name'];
                                    $value = explode(' ', $valuemidle);
                                    $address[] = ['lat' => $lat, 'long' => $long, 'source' => 'yandex.ru', 'Name' => $addressname];
                                }
                            }
                        }
                    }
                }
            }
        }
        //d($address);
        return $address;
    }

    public function getrouteofPointsbaseonLatLong($arrayofPoints)
    {
        $route = Array();
        if (isset($arrayofPoints) && is_array($arrayofPoints) && count($arrayofPoints) == 4) {
            //use google maps api
            //https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=YOUR_API_KEY
            //https://developers.google.com/maps/documentation/directions/start?csw=1
            $Originlat = $arrayofPoints['Originlat'];
            $Originlong = $arrayofPoints['Originlong'];
            $Destinationlat = $arrayofPoints['Destinationlat'];
            $Destinationong = $arrayofPoints['Destinationong'];


            $client = new Client(); //GuzzleHttp\Client
            $response = $client->get('https://maps.googleapis.com/maps/api/directions/json',
                [
                    'query' => ['origin' => $Originlat . ',' . $Originlong, 'destination' => $Destinationlat . ',' . $Destinationong, 'key' => $this->googlemapsKeyForDirectionAPI,]
                ]);

            $result = $response->getBody();
            $code = $response->getStatusCode();
            $json = json_decode($result, true);
            if (isset($json['routes'][0]) && isset($json['routes'][0]['legs'][0]) && count($json['routes'][0]['legs']) > 0 && ($code == 200)) {
                $json = $json['routes'][0]['legs'][0];
                $distance = $json['distance']['value'];
                $duration = $json['duration']['value'];
                $steps = Array();
                //d($json);
                foreach ($json['steps'] as $item) {
                    $row = Array();
                    $row['distance'] = $item['distance']['value'];
                    $row['duration'] = $item['duration']['value'];
                    $row['start_location'] = $item['start_location'];
                    $row['end_location'] = $item['end_location'];
                    $steps[] = $row;
                }
                $route['distance'] = $distance;
                $route['duration'] = $duration;
                $route['steps'] = $steps;
            } else {

                //bind route calculation
                //http://dev.virtualearth.net/REST/v1/Routes? wayPoint.1=wayPoint1&viaWaypoint.2=viaWaypoint2&waypoint.3=wayPoint3&wayPoint.n=wayPointn&heading=heading&optimize=optimize&avoid=avoidOptions&distanceBeforeFirstTurn=distanceBeforeFirstTurn&routeAttributes=routeAttributes&maxSolutions=maxSolutions&tolerances=tolerance1,tolerance2,tolerancen&distanceUnit=distanceUnit&mfa=mfa&key=BingMapsKey
                //https://msdn.microsoft.com/en-us/library/ff701717.aspx
                $client = new Client(); //GuzzleHttp\Client
                $response = $client->get('http://dev.virtualearth.net/REST/V1/Routes/Driving',
                    [
                        'query' => ['wp.0' => $Originlat . ',' . $Originlong, 'wp.1' => $Destinationlat . ',' . $Destinationong, 'key' => $this->BingMapsKey,]
                    ]);
                $result = $response->getBody();
                $code = $response->getStatusCode();
                $json = json_decode($result, true);
                if (isset($json['resourceSets'][0]) && isset($json['resourceSets'][0]['resources'][0]) && count($json['resourceSets'][0]['resources']) > 0 && ($code == 200)) {
                    $json = $json['resourceSets'][0]['resources'][0];
                    $distance = $json['travelDistance'];
                    $duration = $json['travelDuration'];
                    $steps = Array();
                    //d($json);
                    //die();
                    $itemstart_location = $json['routeLegs'][0]['actualStart']['coordinates'];
                    $json = $json['routeLegs'][0]['itineraryItems'];
                    foreach ($json as $item) {
                        $row = Array();
                        $row['distance'] = $item['travelDistance'];
                        $row['duration'] = $item['travelDuration'];
                        $row['start_location']['lat'] = $itemstart_location[0];
                        $row['start_location']['lon'] = $itemstart_location[1];
                        $row['end_location']['lat'] = $item['maneuverPoint']['coordinates'][0];
                        $row['end_location']['lon'] = $item['maneuverPoint']['coordinates'][1];
                        $steps[] = $row;
                        $itemstart_location = $item['maneuverPoint']['coordinates'];
                    }
                    $route['distance'] = $distance;
                    $route['duration'] = $duration;
                    $route['steps'] = $steps;
                }


            }

        }

        d($route);
        return $route;
    }

    public function getrouteofPointsbaseonAddresses($arrayofAddresses)
    {
        $route = Array();
        if (isset($arrayofAddresses) && is_array($arrayofAddresses) && count($arrayofAddresses) == 2) {
            //use google maps api
            //https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=YOUR_API_KEY
            //https://developers.google.com/maps/documentation/directions/start?csw=1
            $client = new Client(); //GuzzleHttp\Client
            $addressA = $arrayofAddresses['addressA'];
            $addressB = $arrayofAddresses['addressB'];

            $response = $client->get('https://maps.googleapis.com/maps/api/directions/json',
                [
                    'query' => ['origin' => $addressA, 'destination' => $addressB, 'key' => $this->googlemapsKeyForDirectionAPI,]
                ]);

            $result = $response->getBody();
            $code = $response->getStatusCode();
            $json = json_decode($result, true);
            //d($json);
            if (isset($json['routes'][0]) && isset($json['routes'][0]['legs'][0]) && count($json['routes'][0]['legs']) > 0 && ($code == 200)) {
                $json = $json['routes'][0]['legs'][0];
                $distance = $json['distance']['value'];
                $duration = $json['duration']['value'];
                $steps = Array();
                //d($json);
                foreach ($json['steps'] as $item) {
                    $row = Array();
                    $row['distance'] = $item['distance']['value'];
                    $row['duration'] = $item['duration']['value'];
                    $row['start_location'] = $item['start_location'];
                    $row['end_location'] = $item['end_location'];
                    $steps[] = $row;
                }
                $route['distance'] = $distance;
                $route['duration'] = $duration;
                $route['steps'] = $steps;
            } else {
                //bind route calculation
                //http://dev.virtualearth.net/REST/v1/Routes? wayPoint.1=wayPoint1&viaWaypoint.2=viaWaypoint2&waypoint.3=wayPoint3&wayPoint.n=wayPointn&heading=heading&optimize=optimize&avoid=avoidOptions&distanceBeforeFirstTurn=distanceBeforeFirstTurn&routeAttributes=routeAttributes&maxSolutions=maxSolutions&tolerances=tolerance1,tolerance2,tolerancen&distanceUnit=distanceUnit&mfa=mfa&key=BingMapsKey
                //https://msdn.microsoft.com/en-us/library/ff701717.aspx
                $client = new Client(); //GuzzleHttp\Client
                $response = $client->get('http://dev.virtualearth.net/REST/V1/Routes/Driving',
                    [
                        'query' => ['wp.0' => $addressA, 'wp.1' => $addressB, 'key' => $this->BingMapsKey,]
                    ]);
                $result = $response->getBody();
                $code = $response->getStatusCode();
                $json = json_decode($result, true);
                if (isset($json['resourceSets'][0]) && isset($json['resourceSets'][0]['resources'][0]) && count($json['resourceSets'][0]['resources']) > 0 && ($code == 200)) {
                    $json = $json['resourceSets'][0]['resources'][0];
                    //d($json);
                    //die();
                    $distance = $json['travelDistance'];
                    $duration = $json['travelDuration'];
                    $steps = Array();
                    $itemstart_location = $json['routeLegs'][0]['actualStart']['coordinates'];
                    $json = $json['routeLegs'][0]['itineraryItems'];
                    foreach ($json as $item) {
                        $row = Array();
                        $row['distance'] = $item['travelDistance'];
                        $row['duration'] = $item['travelDuration'];
                        $row['start_location']['lat'] = $itemstart_location[0];
                        $row['start_location']['lon'] = $itemstart_location[1];
                        $row['end_location']['lat'] = $item['maneuverPoint']['coordinates'][0];
                        $row['end_location']['lon'] = $item['maneuverPoint']['coordinates'][1];
                        $steps[] = $row;
                        $itemstart_location = $item['maneuverPoint']['coordinates'];
                    }
                    $route['distance'] = $distance;
                    $route['duration'] = $duration;
                    $route['steps'] = $steps;
                }


            }

        }
        d($route);
        return $route;

    }

    //Distance Matrix calculation
    public function getDistanceMatrix($arrayofCoordinatesOrigins, $arrayofCoordinatesDestinations)
    {
        $matrix = Array();
        $json = Array();
        //calculate all matrix openb route service
        //https://api.openrouteservice.org/matrix?api_key=your-api-key&profile=driving-car&locations=9.970093%2C48.477473%7C9.207916%2C49.153868%7C37.573242%2C55.801281%7C115.663757%2C38.106467
        $locations = "";
        $originIndex = "";
        $destinationIndex = "";
        $counter = 0;
        $locationOrigins = "";
        $locationOriginsBing = "";
        foreach ($arrayofCoordinatesOrigins as $coordinate) {
            $locations .= $coordinate['long'] . ',' . $coordinate['lat'] . '|';
            $locationOrigins .= $coordinate['lat'] . ',' . $coordinate['long'] . '|';
            $locationOriginsBing .= $coordinate['lat'] . ',' . $coordinate['long'] . ';';
            $originIndex .= $counter . ",";
            $counter++;
        }
        $originIndex = rtrim($originIndex, ",");
        $locationOrigins = rtrim($locationOrigins, "|");
        $locationOriginsBing = rtrim($locationOriginsBing, ";");
        $locationDestination = "";
        $locationDestinationBing = "";
        foreach ($arrayofCoordinatesDestinations as $coordinate) {
            $locations .= $coordinate['long'] . ',' . $coordinate['lat'] . '|';
            $locationDestination .= $coordinate['lat'] . ',' . $coordinate['long'] . '|';
            $locationDestinationBing .= $coordinate['lat'] . ',' . $coordinate['long'] . ';';
            $destinationIndex .= $counter . ",";
            $counter++;
        }
        $destinationIndex = rtrim($destinationIndex, ",");
        $locations = rtrim($locations, "|");
        $locationDestination = rtrim($locationDestination, "|");
        $locationDestinationBing = rtrim($locationDestinationBing, ";");
        //d($originIndex." | ".$destinationIndex. " = ".$locations);
        //https://openrouteservice.org/dev/#/home
        //https://openrouteservice.org/documentation/#/reference/matrix/matrix/matrix-service-(get)
        //https://openrouteservice.org/dev/#/home
        //https://groups.google.com/forum/#!topic/openrouteservice/QSB0Z4ndcB0
        //https://openrouteservice.org/documentation/#/authentication/UserSecurity
        $client = new Client(); //GuzzleHttp\Client
        $response = $client->get('https://api.openrouteservice.org/matrix',
            [
                'query' => ['locations' => $locations, 'profile' => 'driving-car', 'api_key' => $this->openrouteservice, 'metrics' => 'distance|duration', 'sources' => $originIndex,
                    'destinations' => $destinationIndex]
            ]);
        //d ($response);
        //echo 'https://api.openrouteservice.org/matrix?'.'locations='.$locations.'&'. 'profile='.'driving-car'.'&'. 'api_key='.$this->openrouteservice.'&'. 'metrics='.'distance|duration'.'&'. 'sources='.$originIndex.'&'.
        //    'destinations='.$destinationIndex;
        $result = $response->getBody();
        $code = $response->getStatusCode();
        $json = json_decode($result, true);
        //d($json);
        //$json=$json['durations'];
        if (isset($json) && is_array($json) && isset($json['durations']) && isset($json['distances']) && ($code == 200)) {
            $matrix['durations'] = $json['durations'];
            $matrix['distances'] = $json['distances'];
        } else {
            //https://developers.google.com/maps/documentation/distance-matrix/usage-and-billing?hl=en_US
            //https://console.cloud.google.com/google/maps-apis/apis/distance-matrix-backend.googleapis.com/quotas?project=smartparking-211418&duration=PT1H
            //https://developers.google.com/maps/documentation/distance-matrix/intro

            $client = new Client(); //GuzzleHttp\Client
            $response = $client->get('https://maps.googleapis.com/maps/api/distancematrix/json',
                [
                    'query' => ['origins' => $locationOrigins, 'destinations' => $locationDestination, 'key' => $this->googlemapsKeyForDistanceMatrixAPI]
                ]);

            $result = $response->getBody();
            $code = $response->getStatusCode();
            $json = json_decode($result, true);
            if (isset($json) && is_array($json) && isset($json['rows']) && ($code == 200)) {
                $duration = Array();
                $destinations = Array();
                $json = $json['rows'];
                foreach ($json as $rows) {
                    $rowdu = Array();
                    $rowde = Array();
                    foreach ($rows['elements'] as $columns) {
                        $rowdu[] = $columns['duration']['value'];
                        $rowde[] = $columns['distance']['value'];
                    }
                    $duration[] = $rowdu;
                    $destinations[] = $rowde;
                }
                $matrix['durations'] = $duration;
                $matrix['distances'] = $destinations;
            } else {

                //https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=47.6044,-122.3345;47.6731,-122.1185;47.6149,-122.1936&destinations=45.5347,-122.6231;47.4747,-122.2057&travelMode=driving&key=BingMapsKey
                //https://msdn.microsoft.com/en-us/library/mt827295.aspx
                //https://msdn.microsoft.com/en-us/library/mt827298.aspx
                //https://5and3.co.uk/articles/calculating-road-distances-using-googles-matrix-api-php-2016/
                //https://developer.here.com/documentation/routing/topics/resource-calculate-matrix.html
                //https://msdn.microsoft.com/en-us/library/mt827298.aspx
                $client = new Client(); //GuzzleHttp\Client
                $response = $client->get('https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix',
                    [
                        'query' => ['origins' => $locationOriginsBing, 'destinations' => $locationDestinationBing, 'travelMode' => 'driving', 'key' => $this->BingMapsKey]
                    ]);

                $result = $response->getBody();
                $code = $response->getStatusCode();
                $json = json_decode($result, true);
                if (isset($json) && is_array($json) && isset($json['resourceSets'][0]['resources'][0]['results']) && ($code == 200)) {
                    $json = $json['resourceSets'][0]['resources'][0]['results'];
                    //d($json);
                    foreach ($json as $rows) {
                        $matrix['durations'][$rows['originIndex']][$rows['destinationIndex']] = $rows['travelDuration'];
                        $matrix['distances'][$rows['originIndex']][$rows['destinationIndex']] = $rows['travelDistance'];
                    }
                }
            }
        }
        //d($matrix);
        return $matrix;
    }


    public function getDistanceMatrixGoogleMapsAddresses($arrayofCoordinatesOrigins, $arrayofCoordinatesDestinations)
    {
        $matrix = Array();
        $json = Array();
        //https://developers.google.com/maps/documentation/distance-matrix/usage-and-billing?hl=en_US
        //https://console.cloud.google.com/google/maps-apis/apis/distance-matrix-backend.googleapis.com/quotas?project=smartparking-211418&duration=PT1H
        //https://developers.google.com/maps/documentation/distance-matrix/intro

        $locationOrigins = "";
        foreach ($arrayofCoordinatesOrigins as $address) {
            $locationOrigins .= $address . '|';
        }
        $locationOrigins = rtrim($locationOrigins, "|");
        $locationDestination = "";
        foreach ($arrayofCoordinatesDestinations as $address) {
            $locationDestination .= $address . '|';
        }
        $locationDestination = rtrim($locationDestination, "|");


        $client = new Client(); //GuzzleHttp\Client
        $response = $client->get('https://maps.googleapis.com/maps/api/distancematrix/json',
            [
                'query' => ['origins' => $locationOrigins, 'destinations' => $locationDestination, 'key' => $this->googlemapsKeyForDistanceMatrixAPI]
            ]);

        $result = $response->getBody();
        $code = $response->getStatusCode();
        $json = json_decode($result, true);
        if (isset($json) && is_array($json) && isset($json['rows']) && ($code == 200)) {
            $duration = Array();
            $destinations = Array();
            $json = $json['rows'];
            foreach ($json as $rows) {
                $rowdu = Array();
                $rowde = Array();
                foreach ($rows['elements'] as $columns) {
                    $rowdu[] = $columns['duration']['value'];
                    $rowde[] = $columns['distance']['value'];
                }
                $duration[] = $rowdu;
                $destinations[] = $rowde;
            }
            $matrix['durations'] = $duration;
            $matrix['distances'] = $destinations;
        }
        //d($matrix);
        return $matrix;
    }


    public function getParkingsAroundALatLong($lat, $long, $radius = 1, $user_id = 1010, $admin = 0)
    {
        $this->getParkingsAroundALatLongFromOpenDataApi($lat, $long, $radius, $user_id);
        $parkingsfromdb = $this->getParkingsAroundALatLongfromDB($lat, $long, $radius, $user_id, $admin);
        if (isset($parkingsfromdb) && is_array($parkingsfromdb) && count($parkingsfromdb) > 0) {
            //clever algorithm to check if data are longer distance than 100m from our point ..
            //then reget from api more parkings (in order to be sure to find all parkings around)
            $checkminimum = $this->getMin($parkingsfromdb, 'Distance');
            if ($checkminimum < 0.100) {
                return $parkingsfromdb;
            } else {
                $this->getParkingsAroundALatLongAPI($lat, $long, $radius, $user_id);
                return $this->getParkingsAroundALatLongfromDB($lat, $long, $radius, $user_id, $admin);
            }
        } else {
            return $this->getParkingsAroundALatLongAPI($lat, $long, $radius, $user_id);
        }
        //$parkingsfromDataApi=$this->getParkingsAroundALatLongFromOpenDataApi($lat, $long, $radius, $id);
    }


    /*
      get parkings near the interested point using database
      */
    public function getParkingsAroundALatLongfromDB($lat, $long, $radius = 1, $user_id = 1010, $admin = 0)
    {
        //return value
        $parkings = Array();
        $json = Array();
        //save who is inserted new places
        if (empty($id)) {
            $id = \Auth::user()->id;
        }

        //if admin isset and not empty so the data is for admin return other array
        if (isset($admin) && !empty($admin)) {
            //at the begining use our data to check for near parkings
            $parking = DB::select('call getParkingsAroundAPointBaseOnRangeAdminWithUserId(?,?,?,?)', array($lat, $long, $radius, $user_id));
        } else {
            //at the begining use our data to check for near parkings
            $parking = DB::select('call getParkingsAroundAPointBaseOnRangeWithUserId(?,?,?,?)', array($lat, $long, $radius, $user_id));
        }
        if (count($parking) > 0) {
            foreach ($parking as $park) {
                $row = Array();
                $row['name'] = $park->name;
                $row['lat'] = $park->lat;
                $row['long'] = $park->long;
                $row['disabledcount'] = $park->disabledcount;
                $row['cost'] = $park->cost;
                $row['reportedcount'] = $park->reportedcount;
                $row['capacity'] = $park->capacity;
                $row['validity'] = $park->validity;
                $row['disabledcount'] = $park->disabledcount;
                $row['maximumduration'] = $park->maximumduration;
                $row['Distance'] = $park->Distance;
                $row['comments'] = $park->comments;
                $row['parkingtype_id'] = $park->parkingtype_id;
                $row['id'] = $park->id;
                $row['url'] = $this->parkingUrlBaseonType($row);
                $row['occupied'] = $park->occupied;
                $row['time'] = $park->time;
                $row['avaliable'] = $park->avaliable;
                $row['IsBookMarkForUser'] = $park->IsBookMarkForUser;
                $row['provider_id'] = $park->provider_id;
                $row['placesCosts'] = Places::find($park->id)->placesCosts;
                $parkings[] = $row;
            }
        }
        return $parkings;
    }


    /*
         get parkings near the interested point using database as owner
         */
    public function getParkingsAroundALatLongOwner($lat, $long, $radius = 1, $user_id = 1010)
    {
        //return value
        $parkings = Array();
        $json = Array();
        //save who is inserted new places
        if (empty($id)) {
            $id = \Auth::user()->id;
        }

        //at the begining use our data to check for near parkings
        $parking = DB::select('call getParkingsAroundAPointBaseOnRangeOwner(?,?,?,?)', array($lat, $long, $radius, $user_id));

        if (count($parking) > 0) {
            foreach ($parking as $park) {
                $row = Array();
                $row['name'] = $park->name;
                $row['lat'] = $park->lat;
                $row['long'] = $park->long;
                $row['disabledcount'] = $park->disabledcount;
                $row['cost'] = $park->cost;
                $row['reportedcount'] = $park->reportedcount;
                $row['capacity'] = $park->capacity;
                $row['validity'] = $park->validity;
                $row['disabledcount'] = $park->disabledcount;
                $row['maximumduration'] = $park->maximumduration;
                $row['Distance'] = $park->Distance;
                $row['comments'] = $park->comments;
                $row['parkingtype_id'] = $park->parkingtype_id;
                $row['id'] = $park->id;
                $row['url'] = $this->parkingUrlBaseonType($row);
                $row['occupied'] = $park->occupied;
                $row['time'] = $park->time;
                $row['avaliable'] = $park->avaliable;
                $row['IsBookMarkForUser'] = $park->IsBookMarkForUser;
                $row['provider_id'] = $park->provider_id;
                $row['placesCosts'] = Places::find($park->id)->placesCosts;
                $parkings[] = $row;
            }
        }
        return $parkings;
    }



    /*
    get parkings near the interested point using opn data api
    */
    //for parking places only parkwiz supports such functionality.
    public function getParkingsAroundALatLongFromOpenDataApi($lat, $long, $radius = 1, $id = null)
    {
        //return value
        $parkings = Array();
        $json = Array();
        //save who is inserted new places
        if (empty($id)) {
            $id = \Auth::user()->id;
        }


        //save who is inserted new places
        // $id = \Auth::user()->id;


        //use parkwiz to find around , if we have parking
        //http://developer.parkwhiz.com/getting_started/#affiliates

        $client = new Client(); //GuzzleHttp\Client
        //
        $start_time = (date("Y-m-d\TH:i"));
        $date = new DateTime();
        $date->add(new DateInterval('P1D'));
        $end_time = $date->format("Y-m-d\TH:i");
        $response = $client->get('https://api.parkwhiz.com/v4/quotes/',
            [
                'query' => ['q' => 'coordinates:' . $lat . "," . $long, 'start_time' => $start_time, 'end_time' => $end_time, 'api_key' => $this->ParkWhiz]
            ]);
        $result = $response->getBody();
        $code = $response->getStatusCode();
        $json = json_decode($result, true);
        //echo $code.PHP_EOL;
        //d($json);
        //die();
        if (count($json) > 0 && ($code == 200)) {
            //d($json[0]);
            //die();
            foreach ($json as $value) {
                //d($value);
                $park = new Places();

                //currency calculator in Euro
                $currencyValue = CurrencyRetriever::getCurrency('USD');
                $purchase_options = $value['purchase_options'];
                /*
                 * for now save only one value of costs but in future we save for all times
                 *
                 */
                $park->parkingtype_id = 8;
                //d($purchase_options);
                //d($value);
                //die();
                $avaliable = 0;
                $pricesandduration = Array();
                if (isset($purchase_options) && count($purchase_options) > 0) {
                    foreach ($purchase_options as $keyInternal => $valueInternal) {
                        $cost = $currencyValue * $purchase_options[$keyInternal]['price']['USD'];
                        $start = new DateTime($valueInternal['start_time']);
                        $end = new DateTime($valueInternal['end_time']);
                        //$interval = $end->diff($start)->format('%I');
                        $interval = $end->getTimestamp() - $start->getTimestamp();
                        $avaliable = $avaliable || (strtolower($valueInternal['space_availability']['status']) == strtolower('available'));
                        $row = Array();
                        $row['cost'] = $cost;
                        $row['interval'] = $interval;
                        $row['avaliable'] = (strtolower($valueInternal['space_availability']['status']) == strtolower('available'));
                        $pricesandduration[$interval] = $row;
                    }
                    if (isset($pricesandduration['60']) && !empty($pricesandduration['60']['avaliable'])) {
                        $park->cost = $pricesandduration['60'];
                    } else {
                        foreach ($pricesandduration as $keyInternal => $valueInternal) {
                            if (!empty($valueInternal['avaliable']) && ($valueInternal['interval'] >= 60)) {
                                $park->cost = (3600 * $valueInternal['cost']) / $valueInternal['interval'];
                                break;
                            }
                        }
                        //$row=array_shift(array_values($pricesandduration));
                    }
                    if (empty($park->cost)) {
                        $park->parkingtype_id = 7;
                    }
                } else {
                    $park->cost = -1;
                }
                $park->name = empty($value['name']) ? $value['_embedded']['pw:location']['name'] . '/UNNAMED' : $value['name'];
                $park->disabledcount = 0;
                $park->empty = 0;
                $park->avaliable = $avaliable;
                $park->user_id = $id;
                $park->provider_id = 1003;
                $park->reportedcount = 100;
                $park->validity = 10;
                $park->capacity = 100;
                $park->time = new DateTime();
                $park->maximumduration = 24 * 60; //in minutes
                $park->source_id = 2;
                $park->opendata = 1;
                //coordinates of parking
                $coordinates = $value['_embedded']['pw:location']['entrances'][0]['coordinates'];
                $park->lat = $coordinates[0];
                $park->long = $coordinates[1];
                $park->loc = \DB::raw("GeomFromText('POINT(" . $park->lat . " " . $park->long . ")')");//new Point($park->lat,$park->long);//\DB::raw("GeomFromText('POINT(10 100)')");//
                $Distance = $value['distance']['straight_line']['meters'];
                $exists = DB::select('SELECT checkIfParkingExists(' . $park->lat . ',' . $park->long . ') as checkifexists');
                //die();
                if (empty($exists[0]->checkifexists)) {
                    $park->save();

                    foreach ($pricesandduration as $keyInternal => $valueInternal) {
                        $pc = new PlacesCosts();
                        $pc->cost = $valueInternal['cost'];
                        $pc->time = $valueInternal['interval'];
                        $park->placesCosts()->save($pc);
                    }
                } else {
                    $park->id = $exists[0]->checkifexists;
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
                        $pc->time = $valueInternal['interval'];
                        $existingparking->placesCosts()->save($pc);
                    }
                }

                $row = Array();
                $row['name'] = $park->name;
                $row['lat'] = $park->lat;
                $row['long'] = $park->long;
                $row['disabledcount'] = $park->disabledcount;
                $row['cost'] = $park->cost;
                $row['reportedcount'] = $park->reportedcount;
                $row['capacity'] = $park->capacity;
                $row['validity'] = $park->validity;
                $row['disabledcount'] = $park->disabledcount;
                $row['maximumduration'] = $park->maximumduration;
                $row['Distance'] = $Distance;
                $row['parkingtype_id'] = $park->parkingtype_id;
                $row['id'] = $park->id;
                $row['url'] = $this->parkingUrlBaseonType($row);
                $row['occupied'] = $park->occupied;
                $row['time'] = $park->time;
                $row['avaliable'] = $park->avaliable;
                $row['IsBookMarkForUser'] = 0;
                $row['provider_id'] = $park->provider_id;
                $row['placesCosts'] = Places::find($park->id)->placesCosts;
                $parkings[] = $row;

                //die();

                //$cordinates[] = ['lat' => $value['lat'], 'long' => $value['lon'], 'source' => 'openstreetmap', 'Name' => $value['display_name']];
            }
        }
        return $parkings;
    }



    /*
    get parkings near the interested point using places api
    */
    //for parking places only google api/yandex supports such functionality.
    public function getParkingsAroundALatLongAPI($lat, $long, $radius = 1, $id = null)
    {
        //return value
        $parkings = Array();
        $json = Array();
        //save who is inserted new places
        if (empty($id)) {
            $id = \Auth::user()->id;
        }

        //save who is inserted new places
        //if (empty($id)) {
        //    $id = \Auth::user()->id;
        //}


        //use http://overpass-api.de/api/interpreter
        //THIS IS OPENSTREET POINTS API FOR POINTS AT OPENSTREETMAP !

        $client = new Client(); //GuzzleHttp\Client
        $radiusmeters = $radius * 1000;
        $queryString = "[out:json];(node[\"amenity\"=\"parking\"](around:$radiusmeters,$lat,$long);way[\"amenity\"=\"parking\"](around:$radiusmeters,$lat,$long);relation[\"amenity\"=\"parking\"](around:$radiusmeters,$lat,$long););out center;";

        $response = $client->get('http://overpass-api.de/api/interpreter',
            [
                'query' => ['data' => $queryString]
            ]);
        $result = $response->getBody();
        $code = $response->getStatusCode();
        $json = json_decode($result, true);
        //d($queryString);
        $json = $json['elements'];
        if (count($json) > 0 && ($code == 200)) {
            //d($json);
            //die();
            foreach ($json as $value) {
                // d($value);
                $park = new Places();

                if (isset($value['tags']['fee']) && !empty($value['tags']['fee']) && (strtolower($value['tags']['fee']) == 'yes')) {
                    $park->cost = -1;
                    $park->parkingtype_id = 8;
                } else {
                    $park->cost = 0;
                    $park->parkingtype_id = 7;
                }
                $park->name = empty($value['tags']['name']) ? 'UNNAMED' : $value['tags']['name'];
                $park->disabledcount = 0;
                $park->empty = 0;
                $park->avaliable = 1;
                $park->user_id = $id;
                $park->provider_id = 1003;
                $park->reportedcount = empty($value['tags']['capacity']) ? 100 : $value['tags']['capacity'];
                $park->validity = 3;
                $park->capacity = empty($value['tags']['capacity']) ? 100 : $value['tags']['capacity'];
                $park->time = new DateTime();
                $park->maximumduration = 24 * 60; //in minutes
                $park->source_id = 5;
                //coordinates of parking
                if ($value['type'] == 'node') {
                    $park->lat = $value['lat'];
                    $park->long = $value['lon'];
                } else {
                    $park->lat = $value['center']['lat'];
                    $park->long = $value['center']['lon'];
                }
                $park->loc = \DB::raw("GeomFromText('POINT(" . $park->lat . " " . $park->long . ")')");//new Point($park->lat,$park->long);//\DB::raw("GeomFromText('POINT(10 100)')");//
                $Distance = $this->vincentyGreatCircleDistance($lat, $long, $park->lat, $park->long);
                $comments = '';
                foreach ($value['tags'] as $key => $value) {
                    $comments = "$key => $value " . ',';
                }
                $park->comments = $comments;
                $exists = DB::select('SELECT checkIfParkingExists(' . $park->lat . ',' . $park->long . ') as checkifexists');
                if (empty($exists[0]->checkifexists)) {
                    $park->save();
                } else {
                    $park->id = $exists[0]->checkifexists;
                }

                $row = Array();
                $row['name'] = $park->name;
                $row['lat'] = $park->lat;
                $row['long'] = $park->long;
                $row['disabledcount'] = $park->disabledcount;
                $row['cost'] = $park->cost;
                $row['reportedcount'] = $park->reportedcount;
                $row['capacity'] = $park->capacity;
                $row['validity'] = $park->validity;
                $row['disabledcount'] = $park->disabledcount;
                $row['maximumduration'] = $park->maximumduration;
                $row['Distance'] = $Distance;
                $row['comments'] = $comments;
                $row['parkingtype_id'] = $park->parkingtype_id;
                $row['id'] = $park->id;
                $row['url'] = $this->parkingUrlBaseonType($row);
                $row['occupied'] = $park->occupied;
                $row['time'] = $park->time;
                $row['avaliable'] = $park->avaliable;
                $row['IsBookMarkForUser'] = 0;
                $row['provider_id'] = $park->provider_id;
                $row['placesCosts'] = Places::find($park->id)->placesCosts;
                $parkings[] = $row;

                //die();
            }

        } else {

            //use google places with query to parking
            //https://developers.google.com/places/web-service/intro
            //https://developers.google.com/places/web-service/search
            //https://developers.google.com/places/web-service/search
            //https://developers.google.com/places/web-service/supported_types

            $client = new Client(); //GuzzleHttp\Client
            //
            $response = $client->get('https://maps.googleapis.com/maps/api/place/nearbysearch/json',
                [
                    'query' => ['location' => $lat . "," . $long, 'radius' => $radius * 1000, 'type' => 'parking', 'key' => $this->googlemapsKeyForPlacesAPI]
                ]);
            $result = $response->getBody();
            $code = $response->getStatusCode();
            $json = json_decode($result, true);
            // d($json);
            if (count($json) > 0 && ($code == 200) && (isset($json['status']) && ($json['status'] != 'OVER_QUERY_LIMIT' && $json['status'] != 'ZERO_RESULTS'))) {
                $resultParkings = Array();
                $resultParkings = $json['results'];
                $pagetoken = (isset($json['next_page_token']) && !empty($json['next_page_token'])) ? $json['next_page_token'] : '';
                while (!empty($pagetoken)) {
                    sleep(2); //in order to use the issued token
                    $client = new Client(); //GuzzleHttp\Client
                    //
                    $response = $client->get('https://maps.googleapis.com/maps/api/place/nearbysearch/json',
                        [
                            'query' => ['pagetoken' => $pagetoken, 'key' => $this->googlemapsKeyForPlacesAPI]
                        ]);
                    $result = $response->getBody();
                    $code = $response->getStatusCode();
                    $json = json_decode($result, true);
                    if (isset($json['next_page_token']) && !empty($json['next_page_token']))
                        $pagetoken = $json['next_page_token'];
                    else
                        $pagetoken = "";
                    //d($json);
                    if (count($json) > 0 && ($code == 200) && (isset($json['status']) && ($json['status'] != 'OVER_QUERY_LIMIT' && $json['status'] != 'ZERO_RESULTS'))) {
                        $resultParkings = array_merge($resultParkings, $json['results']);
                    }
                }
                foreach ($resultParkings as $value) {
                    //d($value);
                    $park = new Places();
                    $park->cost = -1;
                    $park->name = empty($value['name'] . ' ' . $value['vicinity']) ? 'UNNAMED' : $value['name'] . ' ' . $value['vicinity'];
                    $park->disabledcount = 0;
                    $park->empty = 0;
                    $park->avaliable = 1;
                    $park->user_id = $id;
                    $park->provider_id = 1003;
                    $park->parkingtype_id = 8;
                    $park->reportedcount = 100;
                    if (isset($value['rating']))
                        $park->validity = intval(ceil($value['rating']));
                    else
                        $park->validity = 3;
                    $park->capacity = 100;
                    $park->time = new DateTime();
                    $park->maximumduration = 24 * 60; //in minutes
                    $park->source_id = 3;
                    //coordinates of parking
                    $coordinates = $value['geometry']['location'];
                    $park->lat = $coordinates['lat'];
                    $park->long = $coordinates['lng'];
                    $park->loc = \DB::raw("GeomFromText('POINT(" . $park->lat . " " . $park->long . ")')");//new Point($park->lat,$park->long);//\DB::raw("GeomFromText('POINT(10 100)')");//
                    $Distance = $this->vincentyGreatCircleDistance($lat, $long, $park->lat, $park->long);
                    $exists = DB::select('SELECT checkIfParkingExists(' . $park->lat . ',' . $park->long . ') as checkifexists');
                    if (empty($exists[0]->checkifexists)) {
                        $park->save();
                    } else {
                        $park->id = $exists[0]->checkifexists;
                    }
                    $row = Array();
                    $row['name'] = $park->name;
                    $row['lat'] = $park->lat;
                    $row['long'] = $park->long;
                    $row['disabledcount'] = $park->disabledcount;
                    $row['cost'] = $park->cost;
                    $row['reportedcount'] = $park->reportedcount;
                    $row['capacity'] = $park->capacity;
                    $row['validity'] = $park->validity;
                    $row['disabledcount'] = $park->disabledcount;
                    $row['maximumduration'] = $park->maximumduration;
                    $row['Distance'] = $Distance;
                    $row['parkingtype_id'] = $park->parkingtype_id;
                    $row['id'] = $park->id;
                    $row['url'] = $this->parkingUrlBaseonType($row);
                    $row['occupied'] = $park->occupied;
                    $row['time'] = $park->time;
                    $row['avaliable'] = $park->avaliable;
                    $row['IsBookMarkForUser'] = 0;
                    $row['provider_id'] = $park->provider_id;
                    $row['placesCosts'] = Places::find($park->id)->placesCosts;
                    $parkings[] = $row;

                }
            }
        }
        //d($parkings);
        return $parkings;
    }


    public static function parkingUrlBaseonType($parking)
    {
        if ($parking["parkingtype_id"] == 1) {
            if ($parking["disabledcount"] > 0) {
                $url = asset('images/disabledpark.png');
            } else if ($parking["validity"] < 5) {
                $url = asset('images/HomeIconValidity.png');
            } else if (empty($parking["empty"])) {
                $url = asset('images/HomeIcon.png');
            } else if ($parking["occupied"] < $parking["reportedcount"]) {
                $url = asset('images/HomeIcon.png');
            } else {
                $url = asset('images/HomeIconFull.png');
            }
        } else if ($parking["parkingtype_id"] == 2) {
            if ($parking["disabledcount"] > 0) {
                $url = asset('images/disabledpark.png');
            } else if ($parking["validity"] < 5) {
                $url = asset('images/WorkIconValidity.png');
            } else if (empty($parking["empty"])) {
                $url = asset('images/WorkIcon.png');
            } else if ($parking["occupied"] < $parking["reportedcount"]) {
                $url = asset('images/WorkIcon.png');
            } else {
                $url = asset('images/WorkIconFull.png');
            }
        } else if ($parking["parkingtype_id"] == 3) {
            if ($parking["disabledcount"] > 0) {
                $url = asset('images/disabledpark.png');
            } else if ($parking["validity"] < 5) {
                $url = asset('images/ShopIconValidity.png');
            } else if (empty($parking["empty"])) {
                $url = asset('images/ShopIcon.png');
            } else if ($parking["occupied"] < $parking["reportedcount"]) {
                $url = asset('images/ShopIcon.png');
            } else {
                $url = asset('images/ShopIconFull.png');
            }
        } else if ($parking["parkingtype_id"] == 4) {
            if ($parking["disabledcount"] > 0) {
                $url = asset('images/disabledpark.png');
            } else if ($parking["validity"] < 5) {
                $url = asset('images/FoodIconValidity.png');
            } else if (empty($parking["empty"])) {
                $url = asset('images/FoodIcon.png');
            } else if ($parking["occupied"] < $parking["reportedcount"]) {
                $url = asset('images/FoodIcon.png');
            } else {
                $url = asset('images/FoodIconFull.png');
            }
        } else if ($parking["parkingtype_id"] == 5) {
            if ($parking["disabledcount"] > 0) {
                $url = asset('images/disabledpark.png');
            } else if ($parking["validity"] < 5) {
                $url = asset('images/DringIconValidity.png');
            } else if (empty($parking["empty"])) {
                $url = asset('images/DringIcon.png');
            } else if ($parking["occupied"] < $parking["reportedcount"]) {
                $url = asset('images/DringIcon.png');
            } else {
                $url = asset('images/DringIconFull.png');
            }
        } else if ($parking["parkingtype_id"] == 6) {
            if ($parking["disabledcount"] > 0) {
                $url = asset('images/disabledpark.png');
            } else if ($parking["validity"] < 5) {
                $url = asset('images/OtherIconValidity.png');
            } else if (empty($parking["empty"])) {
                $url = asset('images/OtherIcon.png');
            } else if ($parking["occupied"] < $parking["reportedcount"]) {
                $url = asset('images/OtherIcon.png');
            } else {
                $url = asset('images/OtherIconFull.png');
            }
        } else if ($parking["parkingtype_id"] == 7) {
            if ($parking["disabledcount"] > 0) {
                $url = asset('images/disabledpark.png');
            } else if ($parking["validity"] < 5) {
                $url = asset('images/parkingLotValidity.png');
            } else if (empty($parking["empty"])) {
                $url = asset('images/parkingLot.png');
            } else if ($parking["occupied"] < $parking["reportedcount"]) {
                $url = asset('images/parkingLot.png');
            } else {
                $url = asset('images/parkingLotFull.png');
            }
        } else if ($parking["parkingtype_id"] == 8) {
            if ($parking["disabledcount"] > 0) {
                $url = asset('images/disabledpark.png');
            } else if ($parking["cost"] == 0) {
                $url = asset('images/parkingplace.png');
            } else if ($parking["validity"] < 5) {
                $url = asset('images/parkingplacelowValidity.png');
            } else if (empty($parking["empty"])) {
                $url = asset('images/parkingplace.png');
            } else if ($parking["occupied"] < $parking["reportedcount"]) {
                $url = asset('images/parkingplace.png');
            } else {
                $url = asset('images/parkingplaceFull.png');
            }
        } else {
            $url = asset('images/parkingplace.png');
        }
        return $url;
    }


    /*
     * helper functions for json /xml processing
     */
    function xml2array($fname)
    {
        $sxi = new SimpleXmlIterator($fname, null, true);
        return sxiToArray($sxi);
    }

    function sxiToArray($sxi)
    {
        $a = array();
        for ($sxi->rewind(); $sxi->valid(); $sxi->next()) {
            if (!array_key_exists($sxi->key(), $a)) {
                $a[$sxi->key()] = array();
            }
            if ($sxi->hasChildren()) {
                $a[$sxi->key()][] = sxiToArray($sxi->current());
            } else {
                $a[$sxi->key()][] = strval($sxi->current());
            }
        }
        return $a;
    }

    function extendedxml_toarray($data)
    {
        $dom = new \DOMDocument;
        $dom->loadXML($data);
        return simplexml_import_dom($dom);
    }

    function json_toarray($data)
    {
        return json_decode($data, true);
    }


    /**
     * Calculates the great-circle distance between two points, with
     * the Haversine formula.
     * @param float $latitudeFrom Latitude of start point in [deg decimal]
     * @param float $longitudeFrom Longitude of start point in [deg decimal]
     * @param float $latitudeTo Latitude of target point in [deg decimal]
     * @param float $longitudeTo Longitude of target point in [deg decimal]
     * @param float $earthRadius Mean earth radius in [m]
     * @return float Distance between points in [m] (same as earthRadius)
     */
    public
    function haversineGreatCircleDistance(
        $latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo, $earthRadius = 6371000)
    {
        // convert from degrees to radians
        $latFrom = deg2rad($latitudeFrom);
        $lonFrom = deg2rad($longitudeFrom);
        $latTo = deg2rad($latitudeTo);
        $lonTo = deg2rad($longitudeTo);

        $latDelta = $latTo - $latFrom;
        $lonDelta = $lonTo - $lonFrom;

        $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
                cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));
        return $angle * $earthRadius;
    }

    /**
     * Calculates the great-circle distance between two points, with
     * the Vincenty formula.
     * the Haversine formula has weaknesses with antipodal points because of rounding errors
     * (though it is stable for small distances). To get around them, you could use the Vincenty formula instead.
     * @param float $latitudeFrom Latitude of start point in [deg decimal]
     * @param float $longitudeFrom Longitude of start point in [deg decimal]
     * @param float $latitudeTo Latitude of target point in [deg decimal]
     * @param float $longitudeTo Longitude of target point in [deg decimal]
     * @param float $earthRadius Mean earth radius in [m]
     * @return float Distance between points in [m] (same as earthRadius)
     */
    public
    function vincentyGreatCircleDistance(
        $latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo, $earthRadius = 6371000)
    {
        // convert from degrees to radians
        $latFrom = deg2rad($latitudeFrom);
        $lonFrom = deg2rad($longitudeFrom);
        $latTo = deg2rad($latitudeTo);
        $lonTo = deg2rad($longitudeTo);

        $lonDelta = $lonTo - $lonFrom;
        $a = pow(cos($latTo) * sin($lonDelta), 2) +
            pow(cos($latFrom) * sin($latTo) - sin($latFrom) * cos($latTo) * cos($lonDelta), 2);
        $b = sin($latFrom) * sin($latTo) + cos($latFrom) * cos($latTo) * cos($lonDelta);

        $angle = atan2(sqrt($a), $b);
        return $angle * $earthRadius;
    }



    /*
     * reports part
     */

    /*
         get request Location statistics
         */
    public function getReportDataForRequestsLocation()
    {
        //return value
        $requestLocation = Array();

        //at the begining use our data to check for near requestLocation
        $requestlocation = DB::select('call reportRequestsLocation()');

        if (count($requestlocation) > 0) {
            foreach ($requestlocation as $loc) {
                $row = Array();
                $row['lat'] = $loc->userlat;
                $row['long'] = $loc->userlong;
                // $row['count'] = $loc->countRequests;
                $row['perc'] = $loc->perc;
                $requestLocation[] = $row;
            }
        }
        return $requestLocation;
    }


    /*
             get request Destination statistics
             */
    public function getReportDataForRequestsDestination()
    {
        //return value
        $requestsDestination = Array();

        //at the begining use our data to check for near requestsDestination
        $requestsdestination = DB::select('call reportRequestsDestination()');

        if (count($requestsdestination) > 0) {
            foreach ($requestsdestination as $loc) {
                $row = Array();
                $row['lat'] = $loc->destlat;
                $row['long'] = $loc->destlong;
                // $row['count'] = $loc->count;
                $row['perc'] = $loc->perc;
                $requestsDestination[] = $row;
            }
        }
        return $requestsDestination;
    }


    /*
             get request Places statistics
             */
    public function getReportDataForPlaces()
    {
        //return value
        $requestsPlaces = Array();

        //at the begining use our data to check for near requestsPlaces
        $requestsplaces = DB::select('call reportPlaces()');

        if (count($requestsplaces) > 0) {
            foreach ($requestsplaces as $loc) {
                $row = Array();
                $row['lat'] = $loc->lat;
                $row['long'] = $loc->long;
                $row['name'] = $loc->name;
                $row['count'] = $loc->count;
                $requestsPlaces[] = $row;
            }
        }
        return $requestsPlaces;
    }


    /*
         get request Rank statistics
         */
    public function getReportDataForRank()
    {
        //return value
        $requestsRank = Array();

        //at the begining use our data to check for near requestsRank
        $requestsrank = DB::select('call reportRankStatistics()');

        if (count($requestsrank) > 0) {
            foreach ($requestsrank as $loc) {
                $row = Array();
                $row['name'] = $loc->name;
                $row['allplacesCount'] = $loc->allplacesCount;
                $row['averageRank'] = $loc->averageRank;
                $row['minrank'] = $loc->minrank;
                $row['maxrank'] = $loc->maxrank;
                $requestsRank[] = $row;
            }
        }
        return $requestsRank;
    }


    /*
         get request Sources statistics
         */
    public function getReportDataForSources()
    {
        //return value
        $requestsSources = Array();

        //at the begining use our data to check for near requestsSources
        $requestssources = DB::select('call reportSources()');

        if (count($requestssources) > 0) {
            foreach ($requestssources as $loc) {
                $row = Array();
                $row['name'] = $loc->name;
                $row['countInserted'] = $loc->countInserted;
                $requestsSources[] = $row;
            }
        }
        return $requestsSources;
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