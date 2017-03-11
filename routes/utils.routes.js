'use strict';

//Utilitary routes

var express = require('express');
var app     = require(__dirname + '/../app');
var v01     = require(__dirname + '/v0.1.routes');
var pug     = require('pug');
var utils  = express.Router();

app.set('view engine', 'pug');

utils.get('/', function(req, res) {
    res.end('Monitoring and debug');
});

utils.get('/routes', function(req, res) {
    res.render('utils/routes', {
        title: "Available routes",
        routes: listRoutes({
            prefix: 'app', 
            path: app
         },
         {
             prefix: "v0.1",
             path: v01
         },
         {
             prefix: 'utils',
             path: utils
         })
    });
});

//Utils functions
function listRoutes() {
    var routes = [];

    var p = arguments[0].prefix;
    arguments[0].path._router.stack.forEach(function(r) {
        if (r.route && r.route.path) {
            routes.push({ method: r.route.stack[0].method.toUpperCase(), path: p + r.route.path });
        }
    });
    for (var i = 1; i < arguments.length; i++) {
        if(arguments[i].path.stack instanceof Array) {
            var prefix = arguments[i].prefix;
            arguments[i].path.stack.forEach(function(a) {
                var route = a.route;
                if(route) {
                    route.stack.forEach(function(r) {
                        var method = r.method.toUpperCase();
                        routes.push({ method: method, path: prefix + route.path });
                    })
                }
            });
        }
    }

    return routes;
}

module.exports = utils;