var express = require('express');
var router = express.Router();
// var DivvyConnectrix = require('../core/divvy_connectrix');
// var divvyConnectrix = new DivvyConnectrix();
var request = require('request');


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'DivvyDowner'
	});
});

router.get('/local', function (req, res, next) {

});

module.exports = router;
