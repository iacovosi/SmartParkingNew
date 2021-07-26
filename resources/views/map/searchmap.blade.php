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
                PARKING SEARCH
            </div>
            <div class="card-body">
                <h4 class="card-title"> Parking Data</h4>
                <p class="card-text">
                <form>
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <div class="input-group">
                                <label for="addrStart"
                                       class="col-form-label text-md-left">{{ __('Location Start') }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <div class="input-group">
                                <input type="text" name="addrStart" value="" id="addrStart" class="col-md-8"
                                       placeholder="Source Address"/>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <div class="input-group">
                                <label for="addrEnd"
                                       class="col-form-label text-md-left">{{ __('Location End') }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <div class="input-group">
                                <input type="text" name="addrEnd" value="" id="addrEnd" class="col-md-8"
                                       placeholder="Destination Address"/>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">SELECT BY PRIORITY</span>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <div class="input-group">
                                <select class="form-control chosen" multiple style="width: 100%;"
                                        id="chosenSelectOrder">
                                    @foreach($parameters as $parameter)
                                        <option value="{{$parameter->id}}">{{$parameter->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <br/>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-md-2">
                        </div>
                        <div class="col-md-4">
                            <button type="button" id="s1-get-order" class="btn btn-primary" style="width: 50%">
                                CALCULATE
                            </button>
                        </div>
                        <div class="col-md-4">
                            <button type="button" id="parkingInfo" class="btn btn-primary" style="width: 50%">
                                DETAILS
                            </button>

                        </div>
                        <div class="col-md-2">
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <br/>
                        </div>
                    </div>
                </form>
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

        <div id="dialog-message" title="RESULTS">
            <p>
                <span class="ui-icon ui-icon-circle-check" style="float:left; margin:0 7px 50px 0;"></span>
                THE RESULTS OF PARKINGS.
            </p>
            <p>
            <div id="tableModal">
            </div>
            </p>
        </div>

        <div id="dialog-message-add-parking" title="ADD PARKING (CROUD SOURCING)">
            <p>
                <span class="ui-icon ui-icon-circle-check" style="float:left; margin:0 7px 50px 0;"></span>
                ADD PARKING.
            </p>
            <p>
                <!-- HEADER, FOOTER, CENTERED -->
                <div class="card text-center">
                    <div class="card-header">
                        PUT PARKING DATA
                    </div>
                    <div class="card-body">
                        <h4 class="card-title"> New Parking Data</h4>
            <p class="card-text">
            <form name="myParkingSave" id="myParkingSave">
                <div class="form-group">
                    <label for="parkingName">Parking Name</label>
                    <input type="text" class="form-control" id="parkingName" placeholder="UNKNOWN" name="name"
                           value="UNKNOWN">
                </div>
                <div class="form-group">
                    <label for="parkingDisabledParkingsCount">How many Parkings for Disabled exist?</label>
                    <input type="number" class="form-control" id="parkingDisabledParkingsCount" placeholder="0"
                           name="disabledcount" VALUE="0" pattern="\d+">
                </div>
                <div class="form-group">
                    <label for="parkingParkingsCount">How many Parkings exist?</label>
                    <input type="number" class="form-control" id="parkingParkingsCount" placeholder="0"
                           name="reportedcount" VALUE="0" pattern="\d+" min="1">
                </div>
                <div class="form-group">
                    <label for="parkingOccupiedParkingsCount">How many Occupied Parkings exist?</label>
                    <input type="number" class="form-control" id="parkingOccupiedParkingsCount" placeholder="0"
                           name="occupied" VALUE="0" pattern="\d+">
                </div>
                <div class="form-group">
                    <label for="parkingOccupiedParkingsMaximumDuration">Maximum duration to stay at Parking?</label>
                    <input type="number" class="form-control" id="parkingOccupiedParkingsMaximumDuration"
                           placeholder="3600 (minutes - 1 day)"
                           name="maximumduration" VALUE="3600" pattern="\d+" min="1">
                </div>
                <div class="form-group">
                    <label for="datetimeYouPark">Date Time you Park:</label>
                    <input id="datetimeYouPark" class="flatpickr" data-enabletime=true name="time"> </input>
                </div>

                <input type="hidden" name="avaliable" value="1"/>

                <div class="form-group">
                    <label for="ParkingType">Parking Type</label>
                    <select class="form-control" id="ParkingType" name="parkingtype_id">
                        @foreach($parkingtypes as $parkingtype)
                            <option value="{{ $parkingtype->id }}">{{ $parkingtype->name }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="form-group">
                    <table id="CostsTable" class=" table order-list">
                        <thead>
                        <tr>
                            <td>Cost</td>
                            <td>Time(in minutes)</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <input type="number" name="cost[0]" id="cost[0]" class="form-control" value="0"
                                       pattern="\d+"/>
                            </td>
                            <td>
                                <input type="number" name="time[0]" id="time[0]" class="form-control" value="60"
                                       pattern="\d+" min="1"/>
                            </td>
                            <td><a class="deleteRow"></a>

                            </td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="5" style="text-align: left;">
                                <input type="button" class="btn btn-lg btn-block " id="addrow" value="Add Row"/>
                            </td>
                        </tr>
                        <tr>
                        </tr>
                        </tfoot>
                    </table>
                </div>

                <div class="form-group">
                    <label for="comments">Comments</label>
                    <textarea class="form-control" id="comments" rows="3" name="comments"></textarea>
                </div>
            </form>

            </p>
            <div class="form-group">
                <button type="button" id="SAVEparkingInfo" class="btn btn-primary" style="width: 50%">
                    SAVE
                </button>
            </div>
        </div>
        <div class="card-footer text-muted">
            END OF FORM
        </div>
    </div>
    </p>
    </div>




    <div id="dialog-message-add-bookmark-parking" title="ADD PARKING AS BOOKMARK">
        <p>
            <span class="ui-icon ui-icon-circle-check" style="float:left; margin:0 7px 50px 0;"></span>
            ADD BOOKMARK.
        </p>
        <p>
            <!-- HEADER, FOOTER, CENTERED -->
            <div class="card text-center">
                <div class="card-header">
                    PUT BOOKMARK PARKING DATA
                </div>
                <div class="card-body">
                    <h4 class="card-title"> BOOKMARK Data</h4>
        <p class="card-text">
        <form name="BookMarkSave" id="BookMarkSave">
            <div class="form-group">
                <label for="bookmarkName">BookMark Name</label>
                <input type="text" class="form-control" id="bookmarkName" placeholder="MY BOOKMARK PARKING" name="name"
                       value="BOOKMARK">
            </div>
            <div class="form-group">
                <label for="bookmarkDescription">Description</label>
                <input type="text" class="form-control" id="bookmarkDescription" placeholder="PUT DESCRIPTION"
                       name="description"
                >
            </div>
            <input type="hidden" name="temporary" value="1"/>
            <input type="hidden" name="places_id" value="1" id="places_id"/>
        </form>

        </p>
        <div class="form-group">
            <button type="button" id="SAVEbookmarknfo" class="btn btn-primary" style="width: 50%">
                SAVE
            </button>
        </div>
    </div>
    <div class="card-footer text-muted">
        END OF FORM
    </div>
    </div>
    </p>
    </div>





@endsection

@section('scripts')
    <script>
        //   var possition;
        //   var possitionData;
        var map;
        var feature;
        var featureStart;
        var featureSEnd;
        var UserPossition;
        var DestinationPossition;
        // setup a marker group
        var markers;
        var addMyParkingbutton;
        var checkWayToAsk = 0;
        var dialog;
        var dialog_form;
        var sortedParkings;
        var controlLayerParkings;
        var parkingsControl;
        var HomeParkings;
        var WorkParkings;
        var ShopParkings;
        var FoodParkings;
        var DringParkings;
        var OtherParkings;
        var LotParkings;
        var PlaceParkings;
        var counter = 1;
        var crouwdSourcsingParkingPossition;
        var lowConfitence;
        var disabledIncludeParkings;
        var dialog_bookmark;
        $(document).ready(function () {

            var wWidth = $(window).width();
            var dWidth = wWidth * 0.8;
            var wHeight = $(window).height();
            var dHeight = wHeight * 0.8;

            //AJAX SETUP FOR AUTOCOMPLETE
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            //GET ADDRESS OF USER
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                alert("Geolocation is not supported by this browser.");
            }

            function showPosition(position) {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                loc1 = new L.LatLng(lat, long);
                UserPossition = {"lat": lat, "long": long};
                map.setView(loc1, 14);
                getAddressNamefromCoordinates(UserPossition, '#addrStart');
                chooseLocationAdd(UserPossition, "START");
            }

            //END OF SHOWING INFO FOR PLACE OF USER

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
            }


            // Chosenify every multiple select DOM elements with class 'chosen'
            // $('select[multiple].chosen').chosen();
            $("#chosenSelectOrder").chosen();

            $('#s1-get-order').click(function () {
                // Functional
                // var selection = ChosenOrder.getSelectionOrder(MY_SELECT);
                // Object-oriented
                var selection = ChosenOrder.getSelectionOrder($("#chosenSelectOrder"));
                if (selection && selection.length == 3 && UserPossition && DestinationPossition) {
                    loadParkingsSorted(UserPossition, DestinationPossition, selection);
                }
                else {
                    alert("Choose 3 by priority + User possition / User Destination!");
                }

            });
            //END OF  SETTINGS FOR CHOSENIFY


            //SET ALL VALUES OF TEXTBOXEX TO EMPTY
            //IF RELOAD PAGE!
            $('#addrStart').val("");
            $('#addrEnd').val("");


            /*
            AUTOCOMPLETE FOR ADDRESSES
             */
            //end
            $("#addrEnd").autocomplete({
                source: function (request, response) {
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "{{ route('api.getAddressAutocomplete') }}",
                        data: {
                            address: request.term,
                            _token: '{{csrf_token()}}',
                            waytoask: checkWayToAsk
                        },
                        success: function (data) {
                            if (data.status == "success") {
                                console.log(data);
                            } else {
                                console.log("Error:" + data);
                            }
                            response($.map(data.content, function (item) {
                                return {
                                    label: item.label,
                                    value: item.label,
                                    id: item.id,
                                    lat: item.lat,
                                    long: item.long
                                };
                            }));
                            //possitionData = data.alladata;
                        }
                        ,
                        error: function (jqXHR, textStatus, errorThrown) {
                            //alert();
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    });
                },
                minLength: 2,
                delay: 1000, // mum of miliseconds to wait before making request.
                // optional (if other layers overlap autocomplete list)
                open: function (event, ui) {
                    $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
                    $(".ui-autocomplete").css("z-index", 1000);
                },
                select: function (event, ui) {
                    console.log("Selected End: " + ui.item.value + " aka " + ui.item.id);
                    //possition = possitionData[ui.item.id];
                    //console.log("possition information " + possition);
                    chooseLocationAdd(ui.item, "END");
                    DestinationPossition = ui.item;
                    loadParkingsUnsorted(ui.item);
                },
                close: function () {
                    $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
                },
                search: function (e, u) {
                    $(this).addClass('loader');
                },
                response: function (e, u) {
                    $(this).removeClass('loader');
                },
                change: function (event, ui) {
                    // console.log(this.value);
                    //gamw=addr_searchStart();
                    if (ui.item == null) {
                        checkWayToAsk = 1;
                        $(this).autocomplete("search", $('#addrEnd').val());
                    } else {
                        checkWayToAsk = 0;
                    }
                    //this.response(gamw);
                    //$(this).autocomplete("search", $('#addrStart').val());
                }
            }).autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>")
                    .append("<div>" + item.label + "</div>")
                    .appendTo(ul);
            };


            //start
            $("#addrStart").autocomplete({
                source: function (request, response) {
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "{{ route('api.getAddressAutocomplete') }}",
                        data: {
                            address: request.term,
                            _token: '{{csrf_token()}}',
                            waytoask: checkWayToAsk
                        },
                        success: function (data) {
                            if (data.status == "success") {
                                console.log(data);
                            } else {
                                console.log("Error:" + data);
                            }
                            response($.map(data.content, function (item) {
                                return {
                                    label: item.label,
                                    value: item.label,
                                    id: item.id,
                                    lat: item.lat,
                                    long: item.long
                                };
                            }));
                            //possitionData = data.alladata;
                        }
                        ,
                        error: function (jqXHR, textStatus, errorThrown) {
                            //alert();
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    });
                },
                minLength: 2,
                delay: 1000, // mum of miliseconds to wait before making request.
                // optional (if other layers overlap autocomplete list)
                open: function (event, ui) {
                    $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
                    $(".ui-autocomplete").css("z-index", 1000);
                },
                select: function (event, ui) {
                    console.log("Selected Start: " + ui.item.value + " aka " + ui.item.id);
                    //possition = possitionData[ui.item.id];
                    //console.log("possition information " + possition);
                    chooseLocationAdd(ui.item, "START");
                    UserPossition = ui.item;
                },
                close: function () {
                    $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
                },
                search: function (e, u) {
                    $(this).addClass('loader');
                },
                response: function (e, u) {
                    $(this).removeClass('loader');
                },
                change: function (event, ui) {
                    // console.log(this.value);
                    //gamw=addr_searchStart();
                    if (ui.item == null) {
                        checkWayToAsk = 1;
                        $(this).autocomplete("search", $('#addrStart').val());
                    } else {
                        checkWayToAsk = 0;
                    }
                    //this.response(gamw);
                    //$(this).autocomplete("search", $('#addrStart').val());
                }
            }).autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>")
                    .append("<div>" + item.label + "</div>")
                    .appendTo(ul);
            };


            function chooseLocationAdd(possition, type) {
                var myIcon;
                if (feature) {
                    map.removeLayer(feature);
                }
                loc1 = new L.LatLng(possition.lat, possition.long);
                if (type == "START") {
                    if (featureStart) {
                        map.removeLayer(featureStart);
                    }
                    myIcon = L.icon({
                        iconUrl: '{{ asset('images/startIcon.png') }}',
                        iconSize: [30, 30],
                        iconAnchor: [15, 30],
                        popupAnchor: [0, -25],
                        //shadowUrl: 'my-icon-shadow.png',
                        //shadowSize: [68, 95],
                        //shadowAnchor: [22, 94]
                    });
                    featureStart = L.marker(loc1, {icon: myIcon}, {opacity: 0.5}, {draggable: true}).addTo(map);
                    featureStart.dragging.enable();
                    featureStart.on('dragend', function (event) {
                        var markerStart = event.target;
                        var positionStart = markerStart.getLatLng();
                        markerStart.setLatLng(new L.LatLng(positionStart.lat, positionStart.lng), {draggable: true});
                        markerStart.dragging.enable();
                        map.panTo(new L.LatLng(positionStart.lat, positionStart.lng));
                        UserPossition = {"lat": positionStart.lat, "long": positionStart.lng};
                        getAddressNamefromCoordinates(UserPossition, '#addrStart');
                    });
                }
                else if (type == "END") {
                    if (featureSEnd) {
                        map.removeLayer(featureSEnd);
                    }
                    myIcon = L.icon({
                        iconUrl: '{{ asset('images/marker-icon.png') }}',
                        iconSize: [30, 30],
                        iconAnchor: [15, 30],
                        popupAnchor: [0, -25],
                        //iconSize: [38, 95],
                        //iconAnchor: [37, 94],
                        //popupAnchor: [-3, -76],
                        //shadowUrl: 'my-icon-shadow.png',
                        //shadowSize: [68, 95],
                        //shadowAnchor: [22, 94]
                    });
                    featureSEnd = L.marker(loc1, {icon: myIcon}, {opacity: 0.5}, {draggable: true}).addTo(map);
                    featureSEnd.dragging.enable();
                    featureSEnd.on('dragend', function (event) {
                        var markerEnd = event.target;
                        var positionEnd = markerEnd.getLatLng();
                        markerEnd.setLatLng(new L.LatLng(positionEnd.lat, positionEnd.lng), {draggable: true});
                        markerEnd.dragging.enable();
                        map.panTo(new L.LatLng(positionEnd.lat, positionEnd.lng));
                        DestinationPossition = {"lat": positionEnd.lat, "long": positionEnd.lng};
                        getAddressNamefromCoordinates(DestinationPossition, '#addrEnd');
                        loadParkingsUnsorted(DestinationPossition);
                    });

                    //user can add its own parking place that went and it is ok! CROWD SOURCING
                    if (!addMyParkingbutton) {
                        addMyParkingbutton = L.easyButton('<i class="fas fa-plus-square">P</i>', function () {
                            addMarkerMyParking();
                        });
                        addMyParkingbutton.addTo(map);
                    }

                }


                //L.circle(loc1, 25, {color: 'green', fill: false}).addTo(map);
                //map.fitBounds(bounds);
                //map.setZoom(18);
                map.setView(loc1, 14);
            }


            function loadParkingsUnsorted(possition) {
                //alert(possition.lat + " " + possition.long);

                loc = new L.LatLng(possition.lat, possition.long);
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "{{ route('api.getParkings') }}",
                    data: {
                        lat: possition.lat,
                        long: possition.long,
                        user_id: "{{empty(\Auth::user())?1003:\Auth::user()->id}}",
                        url: possition.url,
                        _token: '{{csrf_token()}}'
                    },
                    success: function (data) {
                        if (data.status == "success") {
                            console.log(data);
                        } else {
                            console.log("Error:" + data);
                        }
                        addPakringsUnsorted(data.content);

                    }
                    ,
                    error: function (jqXHR, textStatus, errorThrown) {
                        //alert();
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
            }


            function addPakringsUnsorted(parkings) {
                //markers.clearLayers();
                if (markers) {
                    map.removeLayer(markers);
                }
                markers = new L.FeatureGroup();
                $.each(parkings, function (index, value) {
                    var myIcon;
                    loc1 = new L.LatLng(value.lat, value.long);
                    myIcon = L.icon({
                        iconUrl: value.url,// parkingUrlBaseonType(value),
                        iconSize: [20, 20],
                        iconAnchor: [10, 20],
                        popupAnchor: [0, -15],
                        //shadowUrl: 'my-icon-shadow.png',
                        //shadowSize: [68, 95],
                        //shadowAnchor: [22, 94]
                    });
                    feature = L.marker(loc1, {icon: myIcon}, {opacity: 0.5});//.addTo(map);
                    markers.addLayer(feature);
                });
                map.addLayer(markers);
            }


            function loadParkingsSorted(Userpossition, DestinationPossition, selection) {
                // alert(Userpossition.lat + " " + Userpossition.long + "|" + DestinationPossition.lat + " " + DestinationPossition.long);
                //loc = new L.LatLng(possition.lat, possition.long);

                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "{{ route('api.getWeightedParkings') }}",
                    data: {
                        Userlat: Userpossition.lat,
                        Userlong: Userpossition.long,
                        Destinationlat: DestinationPossition.lat,
                        Destinationlog: DestinationPossition.long,
                        selection: selection,
                        user_id: "{{empty(\Auth::user())?1003:\Auth::user()->id}}",
                        _token: '{{csrf_token()}}'
                    },
                    success: function (data) {
                        if (data.status == "success") {
                            console.log(data);
                        } else {
                            console.log("Error:" + data);
                        }
                        sortedParkings = data.content;
                        htmlDiv = generateTableCode(sortedParkings);
                        $('#tableModal').html(htmlDiv).show;
                        addPakringsSorted(data.content);

                    }
                    ,
                    error: function (jqXHR, textStatus, errorThrown) {
                        //alert();
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
            }

            function reserveParking(value) {
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "{{ route('map.reserverParkingPlace') }}",
                    data: {
                        id: value.id,
                        user_id: "{{empty(\Auth::user())?1003:\Auth::user()->id}}",
                        _token: '{{csrf_token()}}'
                    },
                    success: function (data) {
                        if (data.status == "success") {
                            console.log(data);
                            if (data.content == 1) {
                                alert("Parking Reserved!");
                            }
                            else {
                                alert("Parking is full! We can not reserve!")
                            }
                        } else {
                            console.log("Error:" + data);
                            alert("Error! So Parking is not Reserved!");
                        }

                    }
                    ,
                    error: function (jqXHR, textStatus, errorThrown) {
                        //alert();
                        console.log(textStatus);
                        console.log(errorThrown);
                        alert("Error! So Parking is not Reserved!");
                    }
                });
            }

            //update parking if not good info
            function updateParking(value) {
                //alert(value.id);
                $("#myParkingSave")[0].reset();
                deleteAllrowsExceptfirst();
                $("#parkingName").val(value.name);
                $("#parkingDisabledParkingsCount").val(value.disabledcount);
                $("#parkingParkingsCount").val(value.capacity);
                $("#parkingOccupiedParkingsCount").val(value.occupied);
                $("#parkingOccupiedParkingsMaximumDuration").val(value.maximumduration);
                $("#datetimeYouPark").val(value.time);
                $("#ParkingType").val(value.parkingtype_id);
                $("#comments").val(value.comments);
                if (value.placesCosts.length == 0) {
                    $("#cost[0]").val(value.cost);
                }
                else {
                    for (i = 0; i < value.placesCosts.length; i++) {
                        if (i != 0) {
                            addextraRowAtTableofCostsTimes();
                        }
                        var variableCost = '"#cost[' + i + ']"';
                        $([variableCost]).val(value.placesCosts[i].cost);
                        document.getElementById("cost[" + i + "]").value = value.placesCosts[i].cost;
                        var variableTime = '"#time[' + i + ']"';
                        $([variableTime]).val(value.placesCosts[i].time);
                        document.getElementById("time[" + i + "]").value = value.placesCosts[i].time;

                    }
                }
                crouwdSourcsingParkingPossition = {"lat": value.lat, "long": value.long};
                /*
                $("#parkingDisabledParkingsCount").val(value.disabledcount);
                $("#parkingName").val(value.name);
                $("#parkingDisabledParkingsCount").val(value.disabledcount);
                $("#parkingName").val(value.name);
                $("#parkingDisabledParkingsCount").val(value.disabledcount);
                */
                dialog_form.dialog("open");
            }

            function bookMarkParking(value) {
                //alert(value.id);
                $("#BookMarkSave")[0].reset();
                $("#bookmarkName").val(value.name);
                $("#places_id").val(value.id);
                dialog_bookmark.dialog("open");
            }

            function addPakringsSorted(parkings) {
                if (parkings.length > 0) {
                    // markers.clearLayers();
                    if (markers) {
                        map.removeLayer(markers);
                    }
                    markers = new L.FeatureGroup();

                    if (HomeParkings) {
                        map.removeLayer(HomeParkings);
                    }
                    HomeParkings = new L.FeatureGroup();

                    if (WorkParkings) {
                        map.removeLayer(WorkParkings);
                    }
                    WorkParkings = new L.FeatureGroup();

                    if (ShopParkings) {
                        map.removeLayer(ShopParkings);
                    }
                    ShopParkings = new L.FeatureGroup();

                    if (FoodParkings) {
                        map.removeLayer(FoodParkings);
                    }
                    FoodParkings = new L.FeatureGroup();

                    if (DringParkings) {
                        map.removeLayer(DringParkings);
                    }
                    DringParkings = new L.FeatureGroup();

                    if (OtherParkings) {
                        map.removeLayer(OtherParkings);
                    }
                    OtherParkings = new L.FeatureGroup();

                    if (LotParkings) {
                        map.removeLayer(LotParkings);
                    }
                    LotParkings = new L.FeatureGroup();

                    if (PlaceParkings) {
                        map.removeLayer(PlaceParkings);
                    }
                    PlaceParkings = new L.FeatureGroup();


                    if (controlLayerParkings) {
                        map.removeControl(controlLayerParkings);
                    }
                    var countAllParkings = 0;
                    var HomeParkingsCount = 0;
                    var WorkParkingsCount = 0;
                    var ShopParkingsCount = 0;
                    var FoodParkingsCount = 0;
                    var DringParkingsCount = 0;
                    var OtherParkingsCount = 0;
                    var LotParkingsCount = 0;
                    var PlaceParkingsCount = 0;
                    var HomeParkingsImgURL;
                    var WorkParkingsImgURL;
                    var ShopParkingsImgURL;
                    var FoodParkingsImgURL;
                    var DringParkingsImgURL;
                    var OtherParkingsImgURL;
                    var LotParkingsImgURL;
                    var PlaceParkingsImgURL;
                    $.each(parkings, function (index, value) {
                        var myIcon;
                        var container = $('<div />');
                        loc1 = new L.LatLng(value.lat, value.long);
                        myIcon = L.icon({
                            iconUrl: value.url,// parkingUrlBaseonType(value),
                            iconSize: [20, 20],
                            iconAnchor: [10, 20],
                            popupAnchor: [0, -15],
                            //shadowUrl: 'my-icon-shadow.png',
                            //shadowSize: [68, 95],
                            //shadowAnchor: [22, 94]
                        });
                        cost = (value.cost == -1) ? "Not Known" : value.cost;
                        popup = "Capacity:" + value.capacity + "<br/>Parkings for Disabled count:" + value.disabledcount + "<br/>Comments:" +
                            value.comments + "<br/>Fuzzy Value Total:" + value.FuzzyValueTotal + "<br/> Cost:" + cost + "<br/>Validity:" + value.validity +
                            "   <button class=\"btn btn-primary\" type=\"button\" id=\"reserveParking" + value.id + "\">RESERVE</button>";
                        container.on('click', '#reserveParking' + value.id, function () {
                            //alert("test "+value.id);
                            reserveParking(value);

                        });
                        if (value.validity <= 5) {
                            popup = popup + "<br/><br/> <button class=\"btn btn-primary\" type=\"button\" id=\"updateparking" + value.id + "\">UPDATE</button>";//+ "  <button id=\"updateparking\">Update Parking Info</button>  ";
                            // Delegate all event handling for the container itself and its contents to the container
                            container.on('click', '#updateparking' + value.id, function () {
                                //alert("test "+value.id);
                                updateParking(value);

                            });
                        }

                        popup = popup + " &nbsp; &nbsp;<button class=\"btn btn-primary\" type=\"button\" id=\"favoriteparking" + value.id + "\">BOOKMARK</button>";
                        // Delegate all event handling for the container itself and its contents to the container
                        container.on('click', '#favoriteparking' + value.id, function () {
                            //alert("test "+value.id);
                            bookMarkParking(value);

                        });


                        // Insert whatever you want into the container, using whichever approach you prefer
                        container.html(popup);
                        // container.append($('<span class="bold">').text(" :)"))

                        feature = L.marker(loc1, {icon: myIcon}, {opacity: 0.5}).bindPopup(container[0]);
                        /* if (value.validity <= 5) {
                             document.getElementById("updateparking"  ).addEventListener("click", updateParking(value), false);
                         }
                         //.addTo(map);
                         */
                        markers.addLayer(feature);
                        //markers.addLayer(feature);
                        countAllParkings++;
                        switch (value.parkingtype_id) {
                            case 1:
                                HomeParkings.addLayer(feature);
                                HomeParkingsCount++;
                                HomeParkingsImgURL = "{{ asset('images/HomeIcon.png') }}";
                                break;
                            case 2:
                                WorkParkings.addLayer(feature);
                                WorkParkingsCount++;
                                WorkParkingsImgURL = "{{ asset('images/WorkIcon.png') }}";
                                break;
                            case 3:
                                ShopParkings.addLayer(feature);
                                ShopParkingsCount++;
                                ShopParkingsImgURL = "{{ asset('images/ShopIcon.png') }}";
                                break;
                            case 4:
                                FoodParkings.addLayer(feature);
                                FoodParkingsCount++;
                                FoodParkingsImgURL = "{{ asset('images/FoodIcon.png') }}";
                                break;
                            case 5:
                                DringParkings.addLayer(feature);
                                DringParkingsCount++;
                                DringParkingsImgURL = "{{ asset('images/DringIcon.png') }}";
                                break;
                            case 6:
                                OtherParkings.addLayer(feature);
                                OtherParkingsCount++;
                                OtherParkingsImgURL = "{{ asset('images/OtherIcon.png') }}";
                                break;
                            case 7:
                                LotParkings.addLayer(feature);
                                LotParkingsCount++;
                                LotParkingsImgURL = "{{ asset('images/parkingLot.png') }}";
                                break;
                            case 8:
                                PlaceParkings.addLayer(feature);
                                PlaceParkingsCount++;
                                PlaceParkingsImgURL = "{{ asset('images/parkingplace.png') }}";
                                break;
                        }
                    });
                    map.addLayer(markers);

                    //for all parkings
                    allparkings = '<img src="{{ asset('images/parkingplace.png') }}" style="width:15px;height:15px;"/><i>ALL PARKINGS (' + countAllParkings + ')</i>';
                    parkingsControl = {
                        [allparkings]: markers
                    };


                    if (HomeParkingsCount > 0) {
                        homeparkings = '<img src="' + HomeParkingsImgURL + '" style="width:15px;height:15px;"/><i>HOME PARKINGS (' + HomeParkingsCount + ')</i>';
                        parkingsControl[homeparkings] = HomeParkings;
                    }

                    if (WorkParkingsCount > 0) {
                        workparkings = '<img src="' + WorkParkingsImgURL + '" style="width:15px;height:15px;"/><i>WORK PARKINGS (' + WorkParkingsCount + ')</i>';
                        parkingsControl[workparkings] = WorkParkings;
                    }

                    if (ShopParkingsCount > 0) {
                        shopparkings = '<img src="' + ShopParkingsImgURL + '" style="width:15px;height:15px;"/><i>SHOP PARKINGS (' + ShopParkingsCount + ')</i>';
                        parkingsControl[shopparkings] = ShopParkings;
                    }

                    if (FoodParkingsCount > 0) {
                        foodparkings = '<img src="' + FoodParkingsImgURL + '" style="width:15px;height:15px;"/><i>FOOD PARKINGS (' + FoodParkingsCount + ')</i>';
                        parkingsControl[foodparkings] = FoodParkings;
                    }

                    if (DringParkingsCount > 0) {
                        dringparkings = '<img src="' + DringParkingsImgURL + '" style="width:15px;height:15px;"/><i>DRING PARKINGS (' + DringParkingsCount + ')</i>';
                        parkingsControl[dringparkings] = DringParkings;
                    }

                    if (OtherParkingsCount > 0) {
                        otherparkings = '<img src="' + OtherParkingsImgURL + '" style="width:15px;height:15px;"/><i>OTHER PARKINGS (' + OtherParkingsCount + ')</i>';
                        parkingsControl[otherparkings] = OtherParkings;
                    }

                    if (LotParkingsCount > 0) {
                        lotparkings = '<img src="' + LotParkingsImgURL + '" style="width:15px;height:15px;"/><i>LOT PARKINGS (' + LotParkingsCount + ')</i>';
                        parkingsControl[lotparkings] = LotParkings;
                    }
                    if (PlaceParkingsCount > 0) {
                        placeparkings = '<img src="' + PlaceParkingsImgURL + '" style="width:15px;height:15px;"/><i>PLACE PARKINGS (' + PlaceParkingsCount + ')</i>';
                        parkingsControl[placeparkings] = PlaceParkings;
                    }

                    controlLayerParkings = L.control.layers(null, parkingsControl, {
                        position: 'topright',
                        collapsed: false
                    }).addTo(map);

                    if (!addMyParkingbutton) {
                        addMyParkingbutton = L.easyButton('<i class="fas fa-plus-square">P</i>', function () {
                            addMarkerMyParking();
                        });
                        addMyParkingbutton.addTo(map);
                    }

                }
            }


            function addMarkerMyParking() {

                //myparkings = new L.FeatureGroup();
                var myIcon;
                loc1 = map.getCenter();
                myIcon = L.icon({
                    iconUrl: "{{ asset('images/parkingplace.png') }}",// parkingUrlBaseonType(value),
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -15],
                });
                feature = L.marker(loc1, {icon: myIcon}, {opacity: 0.5}, {draggable: true}).addTo(map);
                feature.dragging.enable();
                feature.on('dragend', function (event) {
                    var marker = event.target;
                    var position = marker.getLatLng();
                    marker.setLatLng(new L.LatLng(position.lat, position.lng), {draggable: true});
                    marker.dragging.enable();
                    map.panTo(new L.LatLng(position.lat, position.lng));
                    crouwdSourcsingParkingPossition = {"lat": position.lat, "long": position.lng};
                    var CheckIfFinalDestination = confirm("You have finish defining the destination of Parking?");
                    if (CheckIfFinalDestination == true) {
                        marker.dragging.disable();
                        counter = 1;
                        $("#myParkingSave")[0].reset();
                        dialog_form.dialog("open");
                    }
                });
                //.addTo(map);
                /*
                if (!myparkings) {
                    //map.removeLayer(myparkings);
                    myparkings = new L.FeatureGroup();
                    myparkings.addLayer(feature);
                    map.addLayer(myparkings);
                }
                else {
                    myparkings.addLayer(feature);
                }
                */

            }

            function getAddressNamefromCoordinates(location, whereToShowAddress) {
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "{{ route('api.getAddressfromCoordinates') }}",
                    data: {
                        lat: location.lat,
                        long: location.long,
                        user_id: "{{empty(\Auth::user())?1003:\Auth::user()->id}}",
                        _token: '{{csrf_token()}}'
                    },
                    success: function (data) {
                        if (data.status == "success") {
                            console.log(data);
                        } else {
                            console.log("Error:" + data);
                        }
                        //addPakringsSorted();
                        $(whereToShowAddress).val(data.content.Name);

                    }
                    ,
                    error: function (jqXHR, textStatus, errorThrown) {
                        //alert();
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
            }


            dialog = $("#dialog-message").dialog({
                autoOpen: false,
                modal: true,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                hide: {
                    effect: "explode",
                    duration: 1000
                },
                height: dHeight,//300,
                width: dWidth,//400,
                buttons: {
                    Ok: function () {
                        $(this).dialog("close");
                    }
                }
            });

            dialog_form = $("#dialog-message-add-parking").dialog({
                autoOpen: false,
                modal: true,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                hide: {
                    effect: "explode",
                    duration: 1000
                },
                height: dHeight,//300,
                width: dWidth,//400,
                buttons: {
                    Ok: function () {
                        $(this).dialog("close");
                    }
                }
            });


            dialog_bookmark = $("#dialog-message-add-bookmark-parking").dialog({
                autoOpen: false,
                modal: true,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                hide: {
                    effect: "explode",
                    duration: 1000
                },
                height: dHeight,//300,
                width: dWidth,//400,
                //  height: "80%" ,//300,
                //  width: "60%" ,//400,
                buttons: {
                    Ok: function () {
                        $(this).dialog("close");
                    }
                }
            });


            $("#parkingInfo").button().on("click", function () {
                if (sortedParkings) {
                    dialog.dialog("open");
                }
                else {
                    alert("You did not choose calculate to find optimum parkings location!");
                }
            });


            function generateTableCode(data) {
                var html = '<table class="table table-striped">';
                html += '<tr>';
                var flag = 0;
                $.each(data[0], function (index, value) {
                    html += '<th>' + index + '</th>';
                });
                html += '</tr>';
                $.each(data, function (index, value) {
                    html += '<tr>';
                    $.each(value, function (index2, value2) {
                        html += '<td>' + value2 + '</td>';
                    });
                    html += '<tr>';
                });
                html += '</table>';
                return html;
            }


            $("#addrow").on("click", function () {
                addextraRowAtTableofCostsTimes();
            });

            function addextraRowAtTableofCostsTimes() {
                var newRow = $("<tr>");
                var cols = "";

                cols += '<td><input type="number" class="form-control" id="cost[' + counter + ']" name="cost[' + counter + ']" pattern="\\d+" required/></td>';
                cols += '<td><input type="number" class="form-control" id="time[' + counter + ']" name="time[' + counter + ']" pattern="\\d+"  min="1" required/></td>';

                cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Delete"></td>';
                newRow.append(cols);
                $("table.order-list").append(newRow);
                counter++;
            }

            $("table.order-list").on("click", ".ibtnDel", function (event) {
                $(this).closest("tr").remove();
                counter -= 1;
            });

            function deleteAllrowsExceptfirst() {
                while (counter >= 2) {
                    //var variableCost='"#cost[' + counter + ']"';
                    //$([variableCost]).closest("tr").remove();
                    //document.getElementById("cost[" + counter + "]").closest("tr").remove();
                    //counter -= 1;
                    document.getElementById("CostsTable").deleteRow(counter);
                    counter -= 1;
                }
                //counter++;
            }

            $("#SAVEparkingInfo").button().on("click", function () {
                if ($("#myParkingSave").valid()) {
                    var formData = JSON.stringify($("#myParkingSave").serializeArray());
                    //alert(formData);
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "{{ route('map.storeParking') }}",
                        data: {
                            data: formData,
                            count: counter,
                            lat: crouwdSourcsingParkingPossition.lat,
                            long: crouwdSourcsingParkingPossition.long,
                            user_id: "{{empty(\Auth::user())?1003:\Auth::user()->id}}",
                            _token: '{{csrf_token()}}',
                        },
                        success: function (data) {
                            if (data.status == "success") {
                                console.log(data);
                            } else {
                                console.log("Error:" + data);
                            }
                            //possitionData = data.alladata;
                            dialog_form.dialog("close");
                        }
                        ,
                        error: function (jqXHR, textStatus, errorThrown) {
                            //alert();
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    });
                }
                else {
                    $("#myParkingSave").validate();
                }
            });

            $("#SAVEbookmarknfo").button().on("click", function () {
                if ($("#BookMarkSave").valid()) {
                    var formData = JSON.stringify($("#BookMarkSave").serializeArray());
                    //alert(formData);
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "{{ route('map.storeBookMark') }}",
                        data: {
                            data: formData,
                            user_id: "{{empty(\Auth::user())?1003:\Auth::user()->id}}",
                            _token: '{{csrf_token()}}',
                        },
                        success: function (data) {
                            if (data.status == "success") {
                                console.log(data);
                            } else {
                                console.log("Error:" + data);
                            }
                            //possitionData = data.alladata;
                            dialog_bookmark.dialog("close");
                        }
                        ,
                        error: function (jqXHR, textStatus, errorThrown) {
                            //alert();
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    });
                }
                else {
                    $("#myParkingSave").validate();
                }
            });


            // for selecting time date
            flatpickr('#datetimeYouPark', {
                enableTime: true,
                dateFormat: "Y-m-d H:i",
            });


            /*
            function calculateRow(row) {
                var price = +row.find('input[name^="price"]').val();

            }

            function calculateGrandTotal() {
                var grandTotal = 0;
                $("table.order-list").find('input[name^="price"]').each(function () {
                    grandTotal += +$(this).val();
                });
                $("#grandtotal").text(grandTotal.toFixed(2));
            }

*/

        });
    </script>

@endsection

@section('scripts')

@endsection