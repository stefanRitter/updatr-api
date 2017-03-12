'use strict';

const Path = require('path');
const appPath = Path.join(__dirname, '../static/app/index.html');
var server = {};


function home (request, reply) {
    if (!request.auth.isAuthenticated) { return reply.view('index'); }
    reply.file(appPath);
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
