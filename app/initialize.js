$(document).ready(function () {
	console.log('ready');

	// var divvyBase = new Firebase('https://divvy-flake.firebaseio.com/')
	// if db is older than one minute, regenerate it
	DivvyDownerApp.initialize();
});

function findNearby() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showStations);
  } else {
  	debugger;
    $('ul#station-list').prepend("<li>Geolocation is not supported by this browser.</li>");
  }
};

function showStations (position) {
	getStations(position);
	// debugger;
}

function getStations (position) {
	console.log('getting stations')
	$.ajax({
		type: "get",
		dataType: 'jsonp',
		url: "http://www.divvybikes.com/stations/json/"
	}).done(function(a,b,c) {
		debugger;
	})

}