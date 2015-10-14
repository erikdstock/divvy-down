// This probably shouldn't be in the public folder if it is going to mostly be doing server work - but where to put it in an express app? 
// require divvy api api...?

var DivvyConnectrix = function () {
	var request = require('request');
	var Firebase = require('firebase');
	var stationsResource = "https://www.divvybikes.com/stations/json",
		firebaseURL = "https://divvy-downer.firebaseio.com/";
		// firebase = new Firebase(firebaseURL);

	return {
		// initialize: function () {
		// 	// Firebase = require("firebase");
		// 	this.ref = new Firebase(this.firebaseURL);
		// 	this.loadStations();

		// },
		ref: new Firebase(firebaseURL),

		updateStations: function () {
			var ref = this.ref;
			console.log('getting stations:');
			console.log(this.ref);
			ref.set({fart: "fuck"});
			request(stationsResource, function (error, response, html) {
				if (!error) {
					var stations = JSON.parse(response.body);
					console.log(this);

					ref.set({stations: stations});
					// if firebase transaction is successfull...
					return response;
				} else {
					console.log("Error: " + error)
				};
			});
		},
		clobberStations: function (data, error, xhr) {
			debugger;
			this.ref.set({
				updatedAt: null, // (the time)
				stations: data
				}, 
				this.logError);
		},

		loadStations: function () {
			var currentStations, ref = this.ref;
			console.log('loading stations...');
			// currentStations = ref.get('stations');
			// TODO: if current stations most recent update is more than 3-5 min old, update stations
			this.updateStations(this.clobberStations);
			// debugger;

		},
		logError: function (error) {console.log(error);},
	}; 
};

console.log('loaded dd app');

module.exports = DivvyConnectrix;