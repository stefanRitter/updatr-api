'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Inert = require('inert');
const Vision = require('vision');
const Handlebars = require('handlebars');
const AuthCookie = require('hapi-auth-cookie');
const Https = require('hapi-require-https');
const Cors = require('hapi-cors');
const Bell = require('bell');

const server = new Hapi.Server();

module.exports = function (config) {

    server.connection({ port: config.port, host: config.host });

    // SSL
    if (config.ssl) {
        server.register({
            register: Https,
            options: {}
        });
    }

    // register hapi-cors
    server.register({
        register: Cors,
        options: {
            origins: ['http://localhost:4200'],
            allowCredentials: 'true',
            exposeHeaders: ['content-type', 'content-length'],
            maxAge: 600,
            methods: ['POST, PUT, GET, OPTIONS, PATCH'],
            headers: ['Accept', 'Content-Type', 'Authorization']
        }
    }, (err) => { if (err) { throw err; }});

    // register static files plugin
    server.register(Inert, (err) => { if (err) { throw err; }});

    // register Good logging
    server.register({
        register: Good,
        options: {
            reporters: {
                console: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        response: '*',
                        log: '*'
                    }]
                }, {
                    module: 'good-console'
                }, 'stdout']
            }
        }
    }, (err) => { if (err) { throw err; }});

    // register templates engine
    server.register(Vision, (err) => {
        if (err) { throw err; }

        server.views({
            engines: {
                html: Handlebars
            },
            relativeTo: __dirname,
            path: '../templates'
        });
    });

    // register auth plugins
    server.register(AuthCookie, (err) => { if (err) { throw err; }});
    server.register(Bell, (err) => { if (err) { throw err; }});

    return server;
};
