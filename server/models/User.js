'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const request = require('request');
const cheerio = require('cheerio');
const userAgent = require('../utils/useragent.js');
const updateLinks = require('../utils/update.js');
const saltRounds = 7;

var schema, User;

schema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        index: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 70,
        minlength: 6
    },
    role: String,
    links: [{
        url:     String,
        visited: Boolean,
        stars:   Number
    }],
    htmls: [{bodyText: String}]
});

schema.statics.login = function (email, passwordToMatch, cb) {
    if (!email || !passwordToMatch) { return cb('missing email or password'); }

    User.findOne({email: email}, function (err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb('user does not exist'); }

        bcrypt.compare(passwordToMatch, user.password, function (err, res) {
            if (res) {
                cb(null, user);
            } else {
                cb('wrong password');
            }
        });
    });
};

schema.methods.addRemoveLink = function (newLink) {
    let index = -1;
    let url = newLink.url;
    this.links.forEach(function (link, i) { if (link.url === url) index = i; });

    if (index > -1) {
        // this link will be removed
        this.links.splice(index, 1);
        this.htmls.splice(index, 1);
    } else {
        // this is a new link
        this.links.unshift(newLink);
        this.htmls.unshift({bodyText: ''});
    }
}

schema.methods.updateLink = function (newLink, done) {
    let index = -1;
    let url = newLink.url;
    this.links.forEach(function (link, i) { if (link.url === url) index = i; });

    if (index > -1) {
        let oldLink = this.links[index];
        this.links[index] = newLink;

        if (!oldLink.visited && newLink.visited) {
            this.visitLink(index, done);
        } else {
            done();
        }
    }
}

schema.methods.visitLink = function (index, done) {
    request(
        {
            method: 'GET',
            url: this.links[index].url,
            followAllRedirects: true,
            timeout: 4000,
            jar: true,
            headers: { 'User-Agent': userAgent }
        },
        (err, response, body) => {
            if (err) {
                console.error(err);
                return done();
            }
            if (response.statusCode !== 200) {
                console.error('URL STATUS ERROR', this.links[index].url, response.statusCode);
                return done();
            }
            let $ = cheerio.load(body);
            this.htmls[index] = this.htmls[index] || {};
            this.htmls[index].bodyText = $('body').text().trim();
            done();
        }
    );
}

schema.methods.updateLinks = function (done) {
    updateLinks(this, done);
};

schema.pre('save', function (next) {
    if (this.isNew) {
        bcrypt.hash(this.password, saltRounds, function (err, hash) {
            this.password = hash;
            next();
        }.bind(this));
    } else {
        next();
    }
});


User = mongoose.model('User', schema);
module.exports = User;
