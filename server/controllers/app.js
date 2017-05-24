'use strict';

const Path = require('path');
const appPath = Path.join(__dirname, '../static/app/index.html');
var server = {};


function home (request, reply) {
    // if (request.auth.isAuthenticated) { return reply.file(appPath); }
    if (request.auth.isAuthenticated) { return reply.view('closed'); }
    reply.view('index');
}

function getLinks (request, reply) {
    // if (!request.auth.isAuthenticated) { return reply(403); }

}

function addLink (request, reply) {

}

function modifyLink (request, reply) {

}

function removeLink (request, reply) {

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
    ]
    .forEach(function (route) { server.route(route); });
};
