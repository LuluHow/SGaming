'use strict';

var express     = require('express');
var bodyParser  = require('body-parser');
var games       = express.Router();

games.use(bodyParser.urlencoded({ extended: true }));
games.use(bodyParser.json());

//Require model User
const Game = require('../models/Game');

//Define routes

/*START REGION: GET*/
games.get('/', function(req, res) {
    Game.find(function(err, games) {
        if(err) {
            res.send(err);
        }
        res.json(games);
    });
});

games.get('/:game_id', function(req, res) {
    Game.find(req.params.game_id, function(err, game) {
        if(err) {
            res.send(err);
        }
        res.json(game);
    });
});
/*END REGION: GET*/

/*START REGION: POST*/
games.post('/', function(req, res) {
    var newGame = new Game();

    Object.keys(req.body).forEach(function(item, index, array) {
        newGame[item] = req.body[item];
    });

    newGame.save(function(err, game) {
        if(err) {
            res.send(err);
        }
        res.json(game);
    });
})
/*END REGION: POST*/

/*START REGION: PUT*/
games.put('/:game_id', function(req, res) {
    Game.findById(req.params.game_id, function(err, game) {
        if(err) {
            res.send(err);
        }

        Object.keys(req.body).forEach(function(item, index, array) {
            game[item] = req.body[item];
        });

        game.save(function(err, game) {
            if(err) {
                res.send(err);
            }
            res.json(game);
        });
    });
})
/*END REGION: PUT*/

/*START REGION: DELETE*/
games.delete('/:game_id', function(req, res) {
    Game.remove({
        _id: req.params.game_id
    }, function(err, game) {
        if(err) {
            res.send(err);
        }
        res.json({ message: 'success', code: 200 });
    });
});
/*END REGION: DELETE*/

//Exports router
module.exports = games;