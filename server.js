'use strict';

//Init variables
const jasmine       = require('jasmine');
const app           = require('./app');
const mongoose      = require('mongoose');

//Connect DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/sgaming');

//Set port
const PORT = process.env.PORT || 8000;

//Load routes files
var router = require('./routes/v0.1.routes');

//App definitions
app.set('view engine', 'jade');
app.use('/v0.1', router);

app.get('/', function(req, res) {
    res.end('Welcome to SGaming!');
});

//Listen app
app.listen(PORT, function() {
    console.log('SGaming API listen on port ' + PORT);
});