var express = require('express');
var router = express.Router();
var DivvyApi = require('../public/javascripts/divvy_api');
var request = require('request');


/* GET home page. */
router.get('/', function(req, res, next) {
	var stations;
	stations = DivvyApi.updateStations()
	// console.log(req);
	// console.log(next);
	// .get("https://www.divvybikes.com/stations/json").done(function(data){
	// 	console.log(data);
	// 	stations = data;
	// })
  res.render('index', { title: 'DivvyDowner', stations: (typeof(stations) !== 'undefined' ? stations : []) });
});

module.exports = router;
