'use strict';

const mongoose = require('mongoose');
const request = require('request');
const cheerio = require('cheerio');
const userAgent = require('../utils/useragent.js');

var schema, Link;

schema = mongoose.Schema({
    url: {
        type: String,
        trim: true,
        unique: true,
        index: true,
        required: true
    },
    updated: {
        type: Boolean,
        default: false
    },
    html: String
});

schema.methods.update = function (done) {
    if (this.updated) { return done(); }

    var log = '';

    request(
        {
            method: 'GET',
            url: this.url,
            followAllRedirects: true,
            timeout: 18000,
            jar: true,
            pool: false,
            headers: { 'User-Agent': userAgent }
        },
        (err, response, body) => {
            if (err) {
                console.error(err);
                log += '<br>URL ERROR '+link.url+' '+err;
                return done(log);
            }
            if (response.statusCode !== 200) {
                console.error('URL STATUS ERROR', link.url, response.statusCode);
                log += '<br>URL STATUS ERROR '+link.url+' '+response.statusCode;
                return done(log);
            }

            let $ = cheerio.load(body);
            this.html = $('body').text().trim();

            this.save(function () {
                done();
            });
        }
    );
}

Link = mongoose.model('Link', schema);
module.exports = Link;
