'use strict';

const User = require('mongoose').model('User');
const DemoUser = require('../models/DemoUser');
const Boom = require('boom');

var server = {};

function getLinks (request, reply) {
    if (!request.auth.isAuthenticated) { return reply(DemoUser.links); }

    User.findOne({_id: request.auth.credentials._id}, function (err, user) {
        if (err) { return reply(Boom.badImplementation(err)); }
        if (!user) { return reply(Boom.badImplementation('user does not exist')); }
        reply(user.links);
    });
}

function modifyLinks (request, reply) {
    if (!request.auth.isAuthenticated) { return reply(403).code(403); }

    User.findOne({_id: request.auth.credentials._id}, function (err, user) {
        if (err) { return reply(Boom.badImplementation(err)); }
        if (!user) { return reply(Boom.badImplementation('user does not exist')); }

        // diff links

        user.save(function () {
            reply(user.links);
        });
    });
}


module.exports = function (_server) {
    server = _server;

    [
        {
            method: 'POST',
            path: '/links',
            config: {
                handler: modifyLinks,
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
            path: '/links',
            config: {
                handler: getLinks,
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
