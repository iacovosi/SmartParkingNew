// Copyright 2015 Tero Karvinen http://TeroKarvinen.com
// geo.js is free software under the BSD license (same as leaflet.js)

// debug

function d(s) {
	console.log(s);
	$("#status").text(s);
}

// map

function mapInit() {
	d("mapInit()");
	map = new L.Map('map'); // global
	$("#map").css( {"height": "600px"});

	url = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	opt = {minZoom: 1, maxZoom: 20, attribution: "Leafletjs.com - OpenStreetMap.org - iacovos.com"}
	var layer = new L.TileLayer(url, opt);
	map.attributionControl.setPrefix("")

	map.addLayer(layer);
	map.setView(new L.LatLng(60.1733244,24.9410248), 9);
}

function mapPos(lat, lon) {
	// This function is not called in the example, 
	// but you can try calling it from JavaScript console (e.g. Firebug)
	// mapPos(40.3730345, -3.9193921);
	d("mapPos()");
	map.panTo(new L.LatLng(lat, lon));
}

// init

function onDocumentReady() {
	d("onDocumentReady() - DOM ready for jQuery");
	mapInit();
}

// main & globals

var map=null;
$(document).ready(onDocumentReady);


