'use strict';

const Path = require('path');
const appPath = Path.join(__dirname, '../static/app/index.html');
var server = {};


function home (request, reply) {
    // if (request.auth.isAuthenticated) { return reply.file(appPath); }
    if (request.auth.isAuthenticated) { return reply.view('closed'); }
    reply.view('index');
}


module.exports = function (_server) {
    server = _server;

    [
        {
            method: ['GET'],
            path: '/',
            config: {
                handler: home,
                auth: {
                    mode: 'try',
                    strategy: 'session'
                },
                plugins: {
                    'hapi-auth-cookie': {
                        redirectTo: false
                    }
                }
            }
        },
    ]
    .forEach(function (route) { server.route(route); });
};
