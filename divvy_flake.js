$(document).ready(function () {
	console.log('ready');

	// var divvyBase = new Firebase('https://divvy-flake.firebaseio.com/')
	// if db is older than one minute, regenerate it
	getLocation();

});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showStations);
  } else {
  	debugger;
    $('ul#station-list').prepend("<li>Geolocation is not supported by this browser.</li>");
  }
};

function showStations (position) {
	getStations(position);
	debugger;
}

function getStations (position) {
	$.ajax({
		method: "get",
		url: "http://www.divvybikes.com/stations/json/"
	})

}