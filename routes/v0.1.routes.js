'use strict';

var express = require('express');
var router = express.Router();

//Define routes
router.get('/', function(req, res) {
    res.end('Home API page');
});

router.get('/members', function(req, res) {
    res.end('Some members...');
});

router.get('/games', function(req, res) {
    res.end('Some games');
});

//Exports router
module.exports = router;