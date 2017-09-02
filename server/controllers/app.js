'use strict';

const Path = require('path');
const appPath = Path.join(__dirname, '../static/app/index.html');
const demoLinks = require('../models/demoLinks.js');
const User = require('mongoose').model('User');
const requestingHTML = require('../utils/respondToHTML.js');

var server = {};


function home (request, reply) {
    if (request.auth.isAuthenticated) {
        User.findOne({_id: request.auth.credentials._id}, function (err, user) {
            if (err || !user) { return reply.redirect('/logout'); }
            reply.file(appPath);
        });
    } else {
        reply.view('index');
    }
}

function demo (request, reply) {
    if (requestingHTML(request)) {
        reply.file(appPath);
    } else {
        reply({links: demoLinks});
    }
}


module.exports = function (_server) {
    server = _server;

    [
        {
            method: 'GET',
            path: '/demo',
            handler: demo
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
