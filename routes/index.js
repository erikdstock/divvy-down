var express = require('express');
var router = express.Router();
var DivvyConnectrix = require('../public/javascripts/divvy_connectrix');
var divvyConnectrix = new DivvyConnectrix();
var request = require('request');


/* GET home page. */
router.get('/', function(req, res, next) {
	var stations;
	stations = divvyConnectrix.updateStations()
	// console.log(req);
	// console.log(next);
	// .get("https://www.divvybikes.com/stations/json").done(function(data){
	// 	console.log(data);
	// 	stations = data;
	// })
  res.render('index', { title: 'DivvyDowner', stations: (typeof(stations) !== 'undefined' ? stations : []) });
});

router.get('/local', function (req, res, next) {

});

module.exports = router;
