'use strict';

const User = require('mongoose').model('User');
const Boom = require('boom');
var server = {};

function login (request, reply) {
    if (request.auth.isAuthenticated) { return reply.redirect('/'); }
    if (request.method === 'get') { return reply.view('login'); }

    User.login(request.payload.email, request.payload.password, function (err, user) {
        if (err) {
            return reply.view('login', {
                message: err,
                userDoesNotExist: err === 'user does not exist'
            });
        }

        request.auth.session.set({_id: user._id});
        reply.redirect('/');
    });
}


function join (request, reply) {
    if (request.auth.isAuthenticated) { return reply.redirect('/'); }
    if (request.method === 'get')     { return reply.view('join'); }

    var newUser = new User();
    newUser.email = request.payload.email;
    newUser.password = request.payload.password;
    newUser.save(function (err, user) {
        if (err) { return reply(Boom.badRequest(err)); }

        request.auth.session.set({_id: user._id});
        reply.redirect('/');
    });
}


function logout (request, reply) {
    request.auth.session.clear();
    return reply.redirect('/');
}


module.exports = function (_server) {
    server = _server;

    server.auth.strategy('session', 'cookie', {
        password:   'password-should-be-32-characters',
        cookie:     'updatrsid',
        redirectTo: false,
        isSecure:   false,
        ttl:        30 * 24 * 60 * 60 * 1000 // 30 days
    });

    [
        {
            method: ['GET', 'POST'],
            path: '/login',
            config: {
                handler: login,
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
            method: ['GET', 'POST'],
            path: '/join',
            config: {
                handler: join,
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
            path: '/logout',
            config: {
                handler: logout,
                auth: {
                    mode: 'try',
                    strategy: 'session'
                },
                plugins: {
                    'hapi-auth-cookie': {
                        redirectTo: '/'
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/passwordreset',
            handler: {
                view: 'forgot'
            }
        }
    ]
    .forEach(function (route) { server.route(route); });
};
