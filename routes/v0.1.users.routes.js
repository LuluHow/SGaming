'use strict';

var express     = require('express');
var bodyParser  = require('body-parser');
var users       = express.Router();

users.use(bodyParser.urlencoded({ extended: true }));
users.use(bodyParser.json());

//Require model User
const User = require('../models/User');

//Define routes

/*START REGION: GET*/
users.get('/', function(req, res) {
    User.find(function(err, users) {
        if(err) {
            res.send(err);
        }
        res.json(users);
    });
});

users.get('/:user_id', function(req, res) {
    User.find(req.params.user_id, function(err, user) {
        if(err) {
            res.send(err);
        }
        res.json(user);
    });
});
/*END REGION: GET*/

/*START REGION: POST*/
users.post('/', function(req, res) {
    var newUser = new User();

    Object.keys(req.body).forEach(function(item, index, array) {
        newUser[item] = req.body[item];
    });

    newUser.save(function(err, user) {
        if(err) {
            res.send(err);
        }
        res.json(user);
    });
})
/*END REGION: POST*/

/*START REGION: PUT*/
users.put('/:user_id', function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if(err) {
            res.send(err);
        }

        Object.keys(req.body).forEach(function(item, index, array) {
            user[item] = req.body[item];
        });

        user.save(function(err, user) {
            if(err) {
                res.send(err);
            }
            res.json(user);
        });
    });
})
/*END REGION: PUT*/

/*START REGION: DELETE*/
users.delete('/:user_id', function(req, res) {
    User.remove({
        _id: req.params.user_id
    }, function(err, user) {
        if(err) {
            res.send(err);
        }
        res.json({ message: 'success', code: 200 });
    });
});
/*END REGION: DELETE*/

//Exports router
module.exports = users;