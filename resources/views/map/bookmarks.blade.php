@extends('layouts.map')

@section('styles')
    <style>

    </style>
@stop

@section('content')

    @include('includes.errors')

    <div class="container">
        <!-- HEADER, FOOTER, CENTERED -->
        <div class="card">
            <div class="card-header">
                BOOKMARKS
            </div>
            <div class="card-body">
                <h4 class="card-title"> BookMarked Parking Data</h4>
                <p class="card-text">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Capacity</td>
                        <td>Place Name</td>
                        <td>cost</td>
                        <td>validity</td>
                        <td>Action</td>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($bookmarks as $bookmark)
                        <tr>
                            <td class="bookmark_id">{{$bookmark['id']}}</td>
                            <td>{{$bookmark['name']}}</td>
                            <td>{{$bookmark['description']}}</td>
                            <td>{{$bookmark['capacity']}}</td>
                            <td>{{$bookmark['places_name']}}</td>
                            <td>{{$bookmark['cost']}}</td>
                            <td>{{$bookmark['validity']}}</td>
                            <td>
                                <button class="removeBookMark" type="button" id="removeBookMark{{$bookmark['id']}}">
                                    REMOVE
                                </button>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>

                </p>
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


        @endsection

        @section('scripts')
            <script>
                var map;
                var feature;
                var markers;
                var addParkingbutton;
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
                var lowConfitence;
                var highConfitence;
                var disabledIncludeParkings;
                var enabledIncludeParkings;
                var removed_ids = [];
                $(document).ready(function () {

                    //END OF SHOWING INFO FOR PLACE OF USER

                    //WINDOWS ONLOAD LOAD MAP ALSO
                    window.onload = load_map;

                    //LOAD MAP
                    function load_map() {

                        map = new L.Map('map', {zoomControl: true});
                        $("#map").css({"height": "600px"});

                        url = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
                        opt = {minZoom: 1, maxZoom: 18, attribution: "Leafletjs.com - OpenStreetMap.org - RISE.org.cy"};
                        var layer = new L.TileLayer(url, opt);
                        map.addLayer(layer);
                        map.setView(new L.LatLng(34.8717199, 33.6049646), 9);
                        var scale = L.control.scale(); // Creating scale control
                        scale.addTo(map); // Adding scale control to the map
                        addPakrings(removed_ids);
                    }


                    function addPakrings(removed_ids) {
                        parkings = <?php echo $bookmarksjson; ?>;
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

                            if (lowConfitence) {
                                map.removeLayer(lowConfitence);
                            }
                            lowConfitence = new L.FeatureGroup();
                            if (highConfitence) {
                                map.removeLayer(highConfitence);
                            }
                            highConfitence = new L.FeatureGroup();
                            if (disabledIncludeParkings) {
                                map.removeLayer(disabledIncludeParkings);
                            }
                            disabledIncludeParkings = new L.FeatureGroup();
                            if (enabledIncludeParkings) {
                                map.removeLayer(enabledIncludeParkings);
                            }
                            enabledIncludeParkings = new L.FeatureGroup();


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

                            var countlowConfitence = 0;
                            var counthighConfitence = 0;
                            var countdisabledIncludeParkings = 0;
                            var countenabledIncludeParkings = 0;

                            var HomeParkingsImgURL;
                            var WorkParkingsImgURL;
                            var ShopParkingsImgURL;
                            var FoodParkingsImgURL;
                            var DringParkingsImgURL;
                            var OtherParkingsImgURL;
                            var LotParkingsImgURL;
                            var PlaceParkingsImgURL;

                            var lowConfitenceImgURL;
                            var highConfitenceImgURL;
                            var disabledIncludeParkingsImgURL;
                            var enabledIncludeParkingsImgURL;

                            $.each(parkings, function (index, value) {
                                if (!removed_ids.includes(parseInt(value.id))) {
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
                                        value.comments + "<br/> Cost:" + cost + "<br/>Validity:" + value.validity +
                                        "   <button class=\"btn btn-primary\" type=\"button\" id=\"reserveParking" + value.places_id + "\">RESERVE</button>";
                                    container.on('click', '#reserveParking' + value.places_id, function () {
                                        //alert("test "+value.id);
                                        reserveParking(value);

                                    });


                                    // Insert whatever you want into the container, using whichever approach you prefer
                                    container.html(popup);

                                    feature = L.marker(loc1, {icon: myIcon}, {opacity: 0.5}).bindPopup(container[0]);

                                    markers.addLayer(feature);
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

                                    if (value.validity < 5) {
                                        lowConfitence.addLayer(feature);
                                        countlowConfitence++;
                                        lowConfitenceImgURL = "{{ asset('images/parkingplace.png') }}";
                                    }
                                    else {
                                        highConfitence.addLayer(feature);
                                        counthighConfitence++;
                                        highConfitenceImgURL = "{{ asset('images/parkingplace.png') }}";
                                    }

                                    if (value.avaliable == 0) {
                                        disabledIncludeParkings.addLayer(feature);
                                        countdisabledIncludeParkings++;
                                        disabledIncludeParkingsImgURL = "{{ asset('images/parkingplace.png') }}";
                                    }

                                    else {
                                        enabledIncludeParkings.addLayer(feature);
                                        countenabledIncludeParkings++;
                                        enabledIncludeParkingsImgURL = "{{ asset('images/parkingplace.png') }}";
                                    }
                                }
                            });
                            map.addLayer(markers);

                            //for all parkings
                            allparkings = '<img src="{{ asset('images/parkingplace.png') }}" style="width:15px;height:15px;"/><i class="text-left">ALL PARKINGS (' + countAllParkings + ')</i>';
                            parkingsControl = {
                                [allparkings]: markers
                            };


                            if (HomeParkingsCount > 0) {
                                homeparkings = '<img src="' + HomeParkingsImgURL + '" style="width:15px;height:15px;"/><i class="text-left">HOME(' + HomeParkingsCount + ')</i>';
                                parkingsControl[homeparkings] = HomeParkings;
                            }

                            if (WorkParkingsCount > 0) {
                                workparkings = '<img src="' + WorkParkingsImgURL + '" style="width:15px;height:15px;"/><i class="text-left">WORK(' + WorkParkingsCount + ')</i>';
                                parkingsControl[workparkings] = WorkParkings;
                            }

                            if (ShopParkingsCount > 0) {
                                shopparkings = '<img src="' + ShopParkingsImgURL + '" style="width:15px;height:15px;"/><i class="text-left">SHOP(' + ShopParkingsCount + ')</i>';
                                parkingsControl[shopparkings] = ShopParkings;
                            }

                            if (FoodParkingsCount > 0) {
                                foodparkings = '<img src="' + FoodParkingsImgURL + '" style="width:15px;height:15px;"/><i class="text-left">FOOD(' + FoodParkingsCount + ')</i>';
                                parkingsControl[foodparkings] = FoodParkings;
                            }

                            if (DringParkingsCount > 0) {
                                dringparkings = '<img src="' + DringParkingsImgURL + '" style="width:15px;height:15px;"/><i class="text-left">DRING(' + DringParkingsCount + ')</i>';
                                parkingsControl[dringparkings] = DringParkings;
                            }

                            if (OtherParkingsCount > 0) {
                                otherparkings = '<img src="' + OtherParkingsImgURL + '" style="width:15px;height:15px;"/><i class="text-left">OTHER(' + OtherParkingsCount + ')</i>';
                                parkingsControl[otherparkings] = OtherParkings;
                            }

                            if (LotParkingsCount > 0) {
                                lotparkings = '<img src="' + LotParkingsImgURL + '" style="width:15px;height:15px;"/><i class="text-left">LOT(' + LotParkingsCount + ')</i>';
                                parkingsControl[lotparkings] = LotParkings;
                            }
                            if (PlaceParkingsCount > 0) {
                                placeparkings = '<img src="' + PlaceParkingsImgURL + '" style="width:15px;height:15px;"/><i class="text-left">PLACE(' + PlaceParkingsCount + ')</i>';
                                parkingsControl[placeparkings] = PlaceParkings;
                            }


                            if (countlowConfitence > 0) {
                                PlacelowConfitence = '<img src="' + lowConfitenceImgURL + '" style="width:15px;height:15px;"/><i class="text-left">LOW CONFITENSE(' + countlowConfitence + ')</i>';
                                parkingsControl[PlacelowConfitence] = lowConfitence;
                            }


                            if (counthighConfitence > 0) {

                                PlacehighConfitence = '<img src="' + highConfitenceImgURL + '" style="width:15px;height:15px;"/><i class="text-left">HIGH CONFITENSE(' + counthighConfitence + ')</i>';
                                parkingsControl[PlacehighConfitence] = highConfitence;
                            }

                            if (countdisabledIncludeParkings > 0) {
                                PlacedisabledIncludeParkings = '<img src="' + disabledIncludeParkingsImgURL + '" style="width:15px;height:15px;"/><i class="text-left">DISABLED PARKING(' + countdisabledIncludeParkings + ')</i>';
                                parkingsControl[PlacedisabledIncludeParkings] = disabledIncludeParkings;
                            }

                            if (countenabledIncludeParkings > 0) {
                                PlaceenabledIncludeParkings = '<img src="' + enabledIncludeParkingsImgURL + '" style="width:15px;height:15px;"/><i class="text-left">ENABLED PARKING(' + countenabledIncludeParkings + ')</i>';
                                parkingsControl[PlaceenabledIncludeParkings] = enabledIncludeParkings;
                            }


                            controlLayerParkings = L.control.layers(null, parkingsControl, {
                                position: 'topright',
                                collapsed: false
                            }).addTo(map);

                            if (!addParkingbutton) {
                                addParkingbutton = L.easyButton('<i class="fas fa-plus-square">P</i>', function () {
                                    addMarkerParking();
                                });
                                addParkingbutton.addTo(map);
                            }

                        }
                    }


                    $(".removeBookMark").button().on("click", function () {
                        var $row = $(this).closest("tr");    // Find the row
                        var $id = $row.find(".bookmark_id").text(); // Find the text
                        removeBookMarkForParking($id, $row);
                    });


                    function removeBookMarkForParking(bookmark_id, row) {
                        $.ajax({
                            type: "POST",
                            dataType: "json",
                            url: "{{ route('map.removeBookmark') }}",
                            data: {
                                id: bookmark_id,
                                user_id: "{{empty(\Auth::user())?1003:\Auth::user()->id}}",
                                _token: '{{csrf_token()}}'
                            },
                            success: function (data) {
                                if (data.status == "success") {
                                    console.log(data);
                                    alert("Parking BookMark Removed!");
                                    removed_ids.push(parseInt(bookmark_id));
                                    row.remove();
                                    addPakrings(removed_ids);
                                } else {
                                    console.log("Error:" + data);
                                    alert("Error!So Parking BookMark not Removed!");
                                }
                            }
                            ,
                            error: function (jqXHR, textStatus, errorThrown) {
                                //alert();
                                console.log(textStatus);
                                console.log(errorThrown);
                                alert("Error!So Parking BookMark not Removed!");
                            }
                        });
                    }


                    function reserveParking(value) {
                        $.ajax({
                            type: "POST",
                            dataType: "json",
                            url: "{{ route('map.reserverParkingPlace') }}",
                            data: {
                                id: value.places_id,
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

                });
            </script>

@endsection

@section('scripts')

@endsection