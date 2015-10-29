// This probably shouldn't be in the public folder if it is going to mostly be doing server work - but where to put it in an express app? 
// require divvy api api...?

var DivvyService = function () {
    var request = require('request'),
        Firebase = require('firebase'),
        stationsResource = "https://www.divvybikes.com/stations/json",
        firebaseURL = "https://divvy-downer.firebaseio.com/",
        ref = new Firebase(firebaseURL),

        logError = function (error) {console.log(error);},

        getFirebaseStations = function () {
            console.log('getting all stations from firebase');
            var stations;
            // this can't be right
            stations = ref.once('value', function (data) {
                return data;
            });
            if (!stations) {console.log('firebase stations failed');}
            return stations || false;
        },

        handleDivvyRequest =  function (error, response, body) {
            console.log('handling divvy request');
                if (!error && response.statusCode == 200 ) {
                    console.log('type of body:');
                    console.log(typeof body);
                    return body;
                } else {
                    console.log(response.statusCode);
                    logError(error);
                }
            },

        getOfficialStations = function () {
            console.log('getting stations from divvy official');
            request(stationsResource, handleDivvyRequest);
            console.log('made the request');
        },

        parseOfficialData = function (data) {
            console.log('parsing data of type ' + (typeof data));
            var stations,
                jsonData,
                stationList;
            jsonData = JSON.parse(data);
            stationList = jsonData.stationBeanList;

            stations = {
                updatedAt: jsonData.executionTime,
                list: {}
            };

            for (var i = 0, length = stationList.length; i < length; i++ ) {
                var station = stationList[i];
                // can parse/extract specific properties of the stations here later
                stations.list[station.id] = station;
            }
        },

        theModule = {

        getAllStations: function () {
            var stations = getFirebaseStations();
            console.log('stations: ' + stations);

            //To do: unless updatedAt is within x...
            if (!stations) {
                var data = getOfficialStations();
                console.log('*');
                console.log(data);
                console.log('*');

                stations = parseOfficialData(data);
                ref.set({stations: stations});
                return stations;
            }
        }

		// updateStations: function () {
		// 	ref.set({fart: "fuck"});
			
		// },

		// clobberStations: function (data, error, xhr) {
		// 	this.ref.set({
		// 		updatedAt: null, // (the time)
		// 		stations: data
		// 		}, 
		// 		this.logError);
		// },

		// loadStations: function () {
		// 	var currentStations, ref = this.ref;
		// 	console.log('loading stations...');
		// 	// currentStations = ref.get('stations');
		// 	// TODO: if current stations most recent update is more than 3-5 min old, update stations
		// 	this.updateStations(this.clobberStations);
		// 	// debugger;
        // 
		// },
	};
    return theModule; 
};

module.exports = DivvyService;