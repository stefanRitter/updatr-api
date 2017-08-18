'use strict';

const Path = require('path');
const appPath = Path.join(__dirname, '../static/app/index.html');
var server = {};


function home (request, reply) {
    // if (request.auth.isAuthenticated) { return reply.file(appPath); }
    if (request.auth.isAuthenticated) { return reply.view('closed'); }
    reply.view('index');
}

function updateLinks (request, reply) {
    if (!request.auth.isAuthenticated) { return reply(403).code(403); }
    setTimeout(function () { reply(); }, 2000);
}


module.exports = function (_server) {
    server = _server;

    [
        {
            method: 'GET',
            path: '/demo',
            handler: {
                file: appPath
            }
        },
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
        {
            method: 'GET',
            path: '/update',
            config: {
                handler: updateLinks,
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
        }
    ]
    .forEach(function (route) { server.route(route); });
};
