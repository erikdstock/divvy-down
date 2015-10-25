// This probably shouldn't be in the public folder if it is going to mostly be doing server work - but where to put it in an express app? 
// require divvy api api...?

var DivvyConnectrix = function () {
	var request = require('request'),
		Firebase = require('firebase'),
		stationsResource = "https://www.divvybikes.com/stations/json",
		firebaseURL = "https://divvy-downer.firebaseio.com/",
		ref = new Firebase(firebaseURL),

        getFirebaseStations = function () {
            console.log('getting all stations from firebase');
            return ref.get('stations');
        },
        getOfficialStations = function () {
            console.log('getting stations from divvy official');
            request(stationsResource, function (error, response, html) {
                if (!error) {
                    return JSON.parse(response.body);

                } else {
                    console.log("Error: " + error);
                }
            });

        },

        parseOfficialData = function (data) {
            var stations = {
                updatedAt: data.executionTime,
                list: {}
            },
            stationList = data.stationBeanList;
            for (var i = 0, length = stationList.length; i < length; i++ ) {
                var station = stationList[i];
                // can parse/extract specific properties of the stations here later
                stations.list[station.id] = station;
            }
        }

    return {
        // initialize: function () {
        //  // Firebase = require("firebase");
        //  this.ref = new Firebase(this.firebaseURL);
        //  this.loadStations();

        // },
        // ref: new Firebase(firebaseURL),

        getAllStations: function () {
            var stations = getFirebaseStations();

            //To do: unless updatedAt is within x...
            if (1 === 1) {
                var data = getOfficialStations;
                stations = parseOfficialData(data);
                ref.set({stations: stations});
                return stations;
            }
        },
		updateStations: function () {
			// var ref = this.ref;

			ref.set({fart: "fuck"});
			
		},
		clobberStations: function (data, error, xhr) {
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