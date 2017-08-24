'use strict';

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
    require('node-env-file')('.env');
}

var sendgrid = require("sendgrid")(process.env.SENDGRID_APIKEY);

module.exports = function (text, done) {
    var request = sendgrid.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: {
            personalizations: [
                {
                    to: [
                        {
                            email: 'stefan@stefanritter.com'
                        }
                    ],
                    subject: 'SERVER LOGS from '+env
                }
            ],
            from: {
                email: 'admin@getupdatr.com'
            },
            content: [
                {
                    type: 'text/html',
                    value: text
                }
            ]
        }
    });
    sendgrid.API(request, function (error, response) {
      if (error) {
        console.log(error);
      }
      console.log('SENDGRID:', response.statusCode);
      done();
    });
};
