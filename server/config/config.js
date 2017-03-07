'use strict';

module.exports = {
  development: {
    datastoreURI: 'mongodb://localhost/updatr',
    port: 8040,
    host: 'localhost'
  },

  test: {
    datastoreURI: 'mongodb://localhost/updatr-test',
    port: 8040
  },

  production: {
    datastoreURI: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
    port: process.env.PORT
  }
};
