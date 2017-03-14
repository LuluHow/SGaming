'use strict';

var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Load routes files
var users = require('./v0.1.users.routes');
var games = require('./v0.1.games.routes');

router.use('/users', users);
router.use('/games', games);

//Define routes
router.get('/', function(req, res) {
    res.end('Home API page');
});

//Exports router
module.exports = router;