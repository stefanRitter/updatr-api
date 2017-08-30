'use strict';

const domain = process.env.NODE_ENV === 'development' ? 'http://localhost:8040/' : 'https://www.getupdatr.com/';
const User = require('mongoose').model('User');
const Boom = require('boom');


var server = {};


function login (request, reply) {
    if (request.auth.isAuthenticated) { return reply.redirect('/'); }
    if (request.method === 'get') { return reply.view('login'); }

    var email = request.payload.email.toLowerCase().trim();

    User.login(email, request.payload.password, function (err, user) {
        if (err) {
            return reply.view('login', {
                message: err,
                userDoesNotExist: err === 'user does not exist',
                email: email
            });
        }

        request.cookieAuth.set({_id: user._id});
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
        if (err) {
            var userDoesExist = false;

            if (!!err.errors && !!err.errors.password) {
                err.errors.password.message = err.errors.password.message.replace(/`password`.* is/, '`password` is');
            }
            var errorStr = err.toString().replace('ValidationError: Path ', '');
            errorStr = errorStr.replace('Path ', '');
            errorStr = errorStr.replace('.', '');

            if (err.name === 'MongoError') {
                if (err.code === 11000) {
                    errorStr = 'User already exists';
                    userDoesExist = true;
                } else {
                    errorStr = 'Internal server error, plz again';
                }
            }

            return reply.view('join', {
                message: errorStr,
                userDoesExist: userDoesExist,
                email: request.payload.email
            });
        }

        request.cookieAuth.set({_id: user._id});
        reply.redirect('/');
    });
}


function logout (request, reply) {
    request.cookieAuth.clear();
    reply.view('logout');
}


function googleAuth (request, reply) {
    if (!request.auth.isAuthenticated) {
        return reply(Boom.unauthorized('Authentication failed: ' + request.auth.error.message));
    }

    const profile = request.auth.credentials.profile;
    // id: '100434046832879616986',
    // displayName: 'Stefan Ritter',
    // name: { given_name: 'Stefan', family_name: 'Ritter' },
    // email: 'imageproof@gmail.com'

    User.findOne({email: profile.email}, function (err, user) {
        if (err) {
            return reply(Boom.unauthorized('Authentication failed: ' + err));
        }

        user = user || new User({email: profile.email});
        user.givenName = profile.name.given_name;
        user.familyName = profile.name.family_name;
        user.authStrategy = 'Google';

        user.save(function (err, user) {
            if (err) {
                return reply(Boom.unauthorized('Authentication failed: ' + err));
            }
            request.cookieAuth.set({_id: user._id});
            reply.redirect('/auth');
        });
    });
}


module.exports = function (_server) {
    server = _server;

    server.auth.strategy('session', 'cookie', {
        password:   'password-should-be-32-characters',
        cookie:     'updatrsid',
        redirectTo: false,
        isSecure:   false, // process.env.NODE_ENV === 'development' ? false : true,
        ttl:        30 * 24 * 60 * 60 * 1000 // 30 days
    });

    server.auth.strategy('google', 'bell', {
        provider: 'google',
        password: 'cookie_encryption_password_secure',
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        isSecure: false // process.env.NODE_ENV === 'development' ? false : true
    });

    [
        {
            method: ['GET', 'POST'],
            path: '/auth/google',
            config: {
                auth: 'google',
                handler: googleAuth
            }
        },
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
            path: '/auth',
            handler: {
                view: 'loggingin'
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
