'use strict';

const User = require('mongoose').model('User');
const ObjectId = require('mongoose').Types.ObjectId;
const Boom = require('boom');

var server = {};

function getLinks (request, reply) {
    if (!request.auth.isAuthenticated) { return reply(403).code(403); }

    User.findOne({_id: request.auth.credentials._id}, function (err, user) {
        if (err) { return reply(Boom.badImplementation(err)); }
        if (!user) { return reply(Boom.badImplementation('user does not exist')); }
        reply({uid: user._id, links: user.links});
    });
}

function updateLink (request, reply) {
    if (!request.auth.isAuthenticated) { return reply(403).code(403); }

    User.findOne({_id: request.auth.credentials._id}, function (err, user) {
        if (err) { return reply(Boom.badImplementation(err)); }
        if (!user) { return reply(Boom.badImplementation('user does not exist')); }

        var modifiedLink = JSON.parse(request.payload);
        user.updateLink(modifiedLink, function () {
            user.save(function () { reply(); });
        });
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

function getLinkCount (request, reply) {
    if (!ObjectId.isValid(request.query.uid)) {
        return reply(403).code(403);
    }

    User.aggregate([
        {$match: { _id: ObjectId(request.query.uid)}},
        {$group: {
            "_id": null,
            "count": {
                "$sum": {
                    "$size": {
                        "$filter": {
                            "input": "$links",
                            "as": "el",
                            "cond": {
                                "$eq": [ "$$el.visited", false ]
                            }
                        }
                    }
                }
            }
        }}
    ], function (err, group) {
        if (err) { return reply(Boom.badImplementation(err)); }
        let count = '';
        if (group[0].count > 10) {
            count = '10+';
        } else if (group[0].count > 0) {
            count = group[0].count;
        }
        return reply(count);
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
        },
        {
            method: 'GET',
            path: '/linkcount',
            config: {
                handler: getLinkCount
            }
        }
    ]
    .forEach(function (route) { server.route(route); });
};
