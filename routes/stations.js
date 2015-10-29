var express = require('express');
var router = express.Router();
var DivvyService = require('../core/divvy_service');
var divvyService = new DivvyService();
var request = require('request');

/* GET stations listing. */
router.get('/', function(req, res, next) {
	var stations;
	stations = divvyService.getAllStations();
    res.render('stations', {
    	title: 'DivvyDowner - All Stations', 
    	stations: (typeof(stations) !== 'undefined' ? stations : []) 
    });
});


module.exports = router;


