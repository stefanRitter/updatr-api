'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Inert = require('inert');
const Vision = require('vision');
const Handlebars = require('handlebars');

const server = new Hapi.Server();

module.exports = function (config) {

    server.connection({ port: config.port, host: config.host });

    // register static files plugin
    server.register(Inert, (err) => {
        if (err) { throw err; }
    });

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
    }, (err) => {
        if (err) { throw err; }
    });

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

    return server;
};
