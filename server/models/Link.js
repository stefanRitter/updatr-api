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
    updated: String,
    html: String
});

schema.methods.update = function (done) {
    if (this.updated === (new Date()).toDateString()) {
        return done(); // was already updated today
    }

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
                log += '<br>URL ERROR '+this.url+' '+err;
                return done(log);
            }
            if (response.statusCode !== 200) {
                console.error('URL STATUS ERROR', this.url, response.statusCode);
                log += '<br>URL STATUS ERROR '+this.url+' '+response.statusCode;
                return done(log);
            }

            let $ = cheerio.load(body);
            this.html = $('body').text().trim();
            this.updated = (new Date()).toDateString();

            this.save((err) => {
                if (err) {
                    console.error(err);
                    log += '<br>LINK SAVE ERROR '+this.url+' '+err;
                }
                done(log);
            });
        }
    );
}

Link = mongoose.model('Link', schema);
module.exports = Link;
