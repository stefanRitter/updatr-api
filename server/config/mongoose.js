'use strict';

var mongoose = require('mongoose');

require('../models');

module.exports = function (config) {
    var options = {
        server: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000 }},
        replset: {socketOptions: {keepAlive: 300000, connectTimeoutMS : 30000 }}
    };

    mongoose.connect(config.datastoreURI, options);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'db connection error...'));
    db.once('open', function () {
        console.log('db connection opened');
    });
};
