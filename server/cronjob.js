'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
    require('node-env-file')('.env');
}

const config = require('./config/config')[process.env.NODE_ENV];
const server = require('./config/hapi.js')(config);

// setup datastore
require('./config/mongoose.js')(config);

const User = require('mongoose').model('User');
const Batch = require('batch');

User.find({}, function (err, users) {
    if (err) { throw err; }
    if (!users) { throw 'no users found!'; }

    var batch = new Batch();

    batch.concurrency(4);

    users.forEach(function (user) {
        batch.push(function (done) {
            user.updateLinks(done);
        });
    })

    batch.on('progress', function (email) {
        console.log('saved:', email);
    });

    batch.end(function() {
        console.log('cronjob done, num users:', users.length);
        process.exit(0);
    });
});
