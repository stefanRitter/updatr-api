'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const updateLinks = require('../utils/update.js');
const saltRounds = 7;

const Link = require('mongoose').model('Link');


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
        maxlength: 70,
        minlength: 6
    },
    givenName: String,
    familyName: String,
    authStrategy: {
        type: String,
        default: 'password'
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
    if (!email) { return cb('missing email or password'); }

    User.findOne({email: email}, function (err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb('User does not exist, please sign up.'); }
        if (!passwordToMatch) { return cb('missing email or password'); }

        if (user.authStrategy !== 'password') {
            return cb('Please use '+user.authStrategy+' to log in.');
        }

        bcrypt.compare(passwordToMatch, user.password, function (err, res) {
            if (res) {
                cb(null, user);
            } else {
                cb('Sorry, wrong password.');
            }
        });
    });
};

schema.methods.addRemoveLink = function (newLink, done) {
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
    var query = {url: this.links[index].url};

    Link.findOne(query, (err, newLink) => {
        if (err) { console.error(err); return done(); }

        newLink = newLink || new Link(query);
        newLink.update((err) => {
            if (err) {
                console.error(err); return done();
            }
            this.htmls[index] = this.htmls[index] || {};
            this.htmls[index].bodyText = newLink.html;
            done();
        });
    });
}

schema.methods.updateLinks = function (done) {
    updateLinks(this, done);
};

schema.pre('save', function (next) {
    if (this.isNew && this.authStrategy === 'password') {
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
