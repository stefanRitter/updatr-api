'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    links: [{
        createdAt:      Date,
        lastModified:   Date,
        updatedOn:      Date,
        url:            String,
        html:           String,
        visited:        Boolean,
        loading:        Boolean,
        stars:          Number
    }],
    deletedLinks: [{
        createdAt:      Date,
        lastModified:   Date,
        updatedOn:      Date,
        url:            String,
        html:           String,
        visited:        Boolean,
        loading:        Boolean,
        stars:          Number
    }]
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
