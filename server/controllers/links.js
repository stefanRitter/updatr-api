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

function addLink (request, reply) {
    if (!request.auth.isAuthenticated) { return reply(403); }

    User.findOne({_id: request.auth.credentials._id}, function (err, user) {
        if (err) { return reply(Boom.badImplementation(err)); }
        if (!user) { return reply(Boom.badImplementation('user does not exist')); }
        reply(400);
    });
}

function modifyLink (request, reply) {
    if (!request.auth.isAuthenticated) { return reply(403); }

    User.findOne({_id: request.auth.credentials._id}, function (err, user) {
        if (err) { return reply(Boom.badImplementation(err)); }
        if (!user) { return reply(Boom.badImplementation('user does not exist')); }
        reply(400);
    });
}

function removeLink (request, reply) {
    if (!request.auth.isAuthenticated) { return reply(403); }

    User.findOne({_id: request.auth.credentials._id}, function (err, user) {
        if (err) { return reply(Boom.badImplementation(err)); }
        if (!user) { return reply(Boom.badImplementation('user does not exist')); }
        reply(400);
    });
}


module.exports = function (_server) {
    server = _server;

    [
        {
            method: 'DELETE',
            path: '/links',
            config: {
                handler: removeLink,
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
            method: 'PUT',
            path: '/links',
            config: {
                handler: addLink,
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
            method: 'POST',
            path: '/links',
            config: {
                handler: modifyLink,
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
