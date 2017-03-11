'use strict';

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    displayName: {
        type: String,
        required: true
    },
    games : [{ type: Schema.Types.ObjectId, ref: 'Game' }]
});

module.exports = mongoose.model('User', UserSchema);