'use strict';

const Path = require('path');
const appPath = Path.join(__dirname, '../static/app/index.html');
const demoLinks = require('../models/demoLinks.js');
const User = require('mongoose').model('User');

var server = {};


function home (request, reply) {
    if (request.auth.isAuthenticated) {
        User.findOne({_id: request.auth.credentials._id}, function (err, user) {
            if (err || !user) { return reply.view('index') }
            if (user.role === 'beta') { return reply.file(appPath); }
            reply.view('closed');
        });
    } else {
        reply.view('index');
    }
}

function getDemoLinks (request, reply) {
    return reply({links: demoLinks});
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
            method: 'GET',
            path: '/demolinks',
            handler: getDemoLinks
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
        }
    ]
    .forEach(function (route) { server.route(route); });
};
