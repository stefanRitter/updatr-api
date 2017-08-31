'use strict';

module.exports = {
    development: {
        datastoreURI: 'mongodb://localhost/updatr',
        port: 8040,
        host: 'localhost',
        ssl: false
    },

    test: {
        datastoreURI: 'mongodb://localhost/updatr-test',
        port: 8040,
        ssl: false
    },

    production: {
        datastoreURI: process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
        port: process.env.PORT,
        ssl: true
    }
};
