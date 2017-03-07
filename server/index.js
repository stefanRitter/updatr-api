'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
    require('node-env-file')('.env');
}

const config = require('./config/config')[process.env.NODE_ENV];
const server = require('./config/hapi.js')(config);

// setup datastore
require('./config/mongoose.js')(config);

// setup routes
require('./config/routes.js')(config, server);

// don't start server when testing
if (!module.parent) {
    server.start((err) => {
        if (err) { throw err; }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
}

module.exports = server;
