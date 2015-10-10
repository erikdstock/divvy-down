var DivvyDownerApp = {
	stationsResource: "https://www.divvybikes.com/stations/json",
	firebaseURL: "https://divvy-downer.firebaseio.com/",
	initialize: function () {
		// Firebase = require("firebase");
		this.ref = new Firebase(this.firebaseURL);
		this.loadStations();

	},

	updateStations: function (callback) {
		console.log('getting stations');
		$.ajax({
			type: "post",
			dataType: 'jsonp',
			url: this.stationsResource
		})
		.done(callback)
		.error(function(error,b,c){console.log(error, b, c)});
	},
	clobberStations: function (data) {
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
		debugger;

	},
	logError: function (error) {console.log(error);}, 
};

console.log('loaded dd app');