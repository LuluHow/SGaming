'use strict';

//Init variables
const jasmine       = require('jasmine');
const app           = require('./app');
const mongoose      = require('mongoose');

//Connect DB
mongoose.connect('mongodb://127.0.0.1:27017/sgaming');

//Set port
const PORT = process.env.PORT || 8000;

//Load routes files
var router = require('./routes/v0.1.routes');

//App definitions
app.use('/v0.1', router);

app.get('/', function(req, res) {
    res.end('Welcome to SGaming!');
});

app.get('/getGamesByUserId/:user_id', function(req, res) {
    console.log(req.params.user_id);
    res.end('OK');
});

//Listen app
app.listen(PORT, function() {
    console.log('SGaming API listen on port ' + PORT);
});