'use strict';

//Init variables
const bodyParse     = require('body-parser');
const jasmine       = require('jasmine');
const app           = require('./app');

//Set port
const PORT = process.env.PORT || 8000;

//Load routes files
var v01     = require('./routes/v0.1.routes');
var utils   = require('./routes/utils.routes');

//App definitions
app.use('/v0.1', v01);
app.use('/utils', utils);

//Utils routes
app.get('/', function(req, res) {
    res.end('Welcome to SGaming!');
});

//Listen app
app.listen(PORT, function() {
    console.log('SGaming API listen on port ' + PORT);
});