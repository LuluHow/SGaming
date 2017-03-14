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

//Utilitary routes in dev mode
if(process.env.NODE_ENV === "development") {
    var utils = require('./utils/list_routes.js');

    router.get('/utils/routes', function(req, res) {
        var availableRoutes = [];

        availableRoutes.push(utils('/users', users.stack));
        availableRoutes.push(utils('/games', games.stack));
        res.render('utils/views/routes', { title: "Available routes", routes: availableRoutes });
    });
}


//Define routes
router.get('/', function(req, res) {
    res.end('Home API page');
});

//Exports router
module.exports = router;