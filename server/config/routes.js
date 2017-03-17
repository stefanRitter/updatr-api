'use strict';

const Path = require('path');
const staticPath = Path.join(__dirname, '../static');
const templatesPath = Path.join(__dirname, '../templates');

module.exports = function (config, server) {

    require('../controllers/auth.js')(server);
    require('../controllers/app.js')(server);

    server.route({
        method: 'GET',
        path: '/terms',
        handler: {
            view: 'terms'
        }
    });

    server.route({
        method: 'GET',
        path: '/privacy',
        handler: {
            view: 'privacy'
        }
    });

    server.route({
        method: 'GET',
        path: '/static/{param*}',
        handler: {
            directory: {
                path: staticPath
            }
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
