'use strict';

const Path = require('path');
const staticPath = Path.join(__dirname, '../static');

module.exports = function (config, server) {

    // require('../controllers/auth.js')(server);
    // require('../controllers/feed.js')(server);

    server.route({
        method: 'GET',
        path: '/',
        handler: {
            file: staticPath+'/index.html'
        }
    });

    server.route({
        method: 'GET',
        path: '/assets/{param*}',
        handler: {
            directory: {
                path: staticPath+'/app/assets'
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: staticPath+'/app'
            }
        }
    });
};
