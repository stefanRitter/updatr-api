'use strict';

const User = require('mongoose').model('User');
const Boom = require('boom');
const demoLinks = require('../models/demoLinks.js');

var server = {};

function getLinks (request, reply) {
    if (!request.auth.isAuthenticated) { return reply(demoLinks); }

    User.findOne({_id: request.auth.credentials._id}, function (err, user) {
        if (err) { return reply(Boom.badImplementation(err)); }
        if (!user) { return reply(Boom.badImplementation('user does not exist')); }
        reply(user.links);
    });
}

function updateLink (request, reply) {
    if (!request.auth.isAuthenticated) { return reply(403).code(403); }

    User.findOne({_id: request.auth.credentials._id}, function (err, user) {
        if (err) { return reply(Boom.badImplementation(err)); }
        if (!user) { return reply(Boom.badImplementation('user does not exist')); }

        var modifiedLink = JSON.parse(request.payload);
        user.updateLink(modifiedLink);
        user.save(function () { reply(); });
    });
}

function addRemoveLink (request, reply) {
    if (!request.auth.isAuthenticated) { return reply(403).code(403); }

    User.findOne({_id: request.auth.credentials._id}, function (err, user) {
        if (err) { return reply(Boom.badImplementation(err)); }
        if (!user) { return reply(Boom.badImplementation('user does not exist')); }

        var modifiedLink = JSON.parse(request.payload);
        user.addRemoveLink(modifiedLink);
        user.save(function () { reply(); });
    });
}


module.exports = function (_server) {
    server = _server;

    [
        {
            method: 'PATCH',
            path: '/links',
            config: {
                handler: updateLink,
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
                handler: addRemoveLink,
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
