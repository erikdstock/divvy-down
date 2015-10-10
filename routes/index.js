var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var stations;
	// console.log(req);
	// console.log(next);
	app.get("https://www.divvybikes.com/stations/json").done(function(data){
		console.log(data);
		stations = data;
	})
  res.render('index', { title: 'DivvyDowner', stations: (typeof(stations) !== 'undefined' ? stations : []) });
});

module.exports = router;
