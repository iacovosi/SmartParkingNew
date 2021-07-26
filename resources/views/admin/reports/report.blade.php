@extends('layouts.map')

@section('styles')
    <style>
        /* highlight results */
        .ui-autocomplete span.hl_results {
            background-color: #ffff66;
        }

        /* loading - the AJAX indicator */
        .ui-autocomplete-loading {
            background: white url('{{ asset('images/ui-anim_basic_16x16.gif') }}') right center no-repeat;
        }

        /* scroll results */
        .ui-autocomplete {
            max-height: 250px;
            overflow-y: auto;
            /* prevent horizontal scrollbar */
            overflow-x: hidden;
            /* add padding for vertical scrollbar */
            padding-right: 5px;
        }

        .ui-autocomplete li {
            font-size: 16px;
        }

        .ui-dialog {
            z-index: 1000 !important;
        }

        /* IE 6 doesn't support max-height
        * we use height instead, but this forces the menu to always be this tall
        */
        * html .ui-autocomplete {
            height: 250px;
        }

        /*VALIDITY CHECKS*/

        input[type=text],
        input[type=email],
        input[type=number],
        textarea,
        fieldset {
            /* required to properly style form
               elements on WebKit based browsers */
            -webkit-appearance: none;

            width: 100%;
            border: 1px solid #333;
            margin: 0;

            font-family: inherit;
            font-size: 90%;

            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        input:invalid {
            box-shadow: 0 0 5px 1px red;
        }

        input:focus:invalid {
            outline: none;
        }


    </style>
@stop

@section('content')

    @include('includes.errors')

    <div class="container">
        <!-- HEADER, FOOTER, CENTERED -->
        <div class="card">
            <div class="card-header">
                REPORTS PAGE
            </div>
            <div class="card-body">
                <h4 class="card-title"> Parking Data</h4>
                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <div id="map"></div>
                    </div>
                </div>
            </div>
            <div class="card-footer text-muted">
                END OF FORM
            </div>
        </div>

        <div class="card-footer text-muted">
            END OF FORM
        </div>
    </div>



@endsection

@section('scripts')
    <script>

        $(document).ready(function () {

            //WINDOWS ONLOAD LOAD MAP ALSO
            window.onload = load_map;

            //LOAD MAP
            function load_map() {
                /*
                map = new L.Map('map', {zoomControl: true});

                var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    osmAttribution = 'Map data &copy; 2012 <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
                    osm = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});

                map.setView(new L.LatLng(51.538594, -0.198075), 12).addLayer(osm);
                */
                //map = new L.Map('map'); // global
                map = new L.Map('map', {zoomControl: true});
                $("#map").css({"height": "600px"});

                url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
                opt = {minZoom: 1, maxZoom: 18, attribution: "Leafletjs.com - OpenStreetMap.org - RISE.org.cy"};
                var layer = new L.TileLayer(url, opt);
                map.addLayer(layer);
                map.setView(new L.LatLng(34.8717199, 33.6049646), 9);
                var scale = L.control.scale(); // Creating scale control
                scale.addTo(map); // Adding scale control to the map
                var addressPoints =<?php echo $data ?>;
                var points = [];
                for (var i = 0; i < addressPoints.length; i++) {
                    points.push([addressPoints[i].lat,
                        addressPoints[i].long,
                        addressPoints[i].perc]);
                }


                var heat = L.heatLayer(points, {
                    radius: 20,
                    blur: 15,
                    maxZoom: 9,
                }).addTo(map);

            }
        });


    </script>

@endsection

@section('scripts')

@endsection