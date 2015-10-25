var express = require('express');
var router = express.Router();
var DivvyConnectrix = require('../core/divvy_connectrix');
var divvyConnectrix = new DivvyConnectrix();
var request = require('request');

/* GET stations listing. */
router.get('/', function(req, res, next) {
	var stations;
	stations = divvyConnectrix.getAllStations();
    res.render('stations', {
    	title: 'DivvyDowner - All Stations', 
    	stations: (typeof(stations) !== 'undefined' ? stations : []) 
    });
});


module.exports = router;


