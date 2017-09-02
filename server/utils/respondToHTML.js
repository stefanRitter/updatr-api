'use strict';

const Negotiator = require('negotiator');

module.exports = function (request) {
    var mediaTypes = new Negotiator(request).mediaTypes();
    if (mediaTypes.indexOf('text/html') > -1) {
        return true;
    }
    return false;
};
