
const Batch = require('batch');
const cheerio = require('cheerio');
const request = require('request');
const similarity = require('similarity');
const userAgent = require('./useragent.js');
const sendMail = require('./sendMail.js');


module.exports = function (user, userIsDone) {
    var batch = new Batch();
    batch.concurrency(4);

    var log = '<br><br>user: '+user.email;

    user.links.forEach(function (link, index) {
        batch.push(function (batchDone) {
            if (link.visited) {
                request(
                    {
                        method: 'GET',
                        url: link.url,
                        followAllRedirects: true,
                        timeout: 6000,
                        jar: true,
                        headers: { 'User-Agent': userAgent }
                    },
                    (err, response, body) => {
                        if (err) {
                            console.error(err);
                            log += '<br>URL ERROR '+link.url+' '+err;
                            return batchDone();
                        }
                        if (response.statusCode !== 200) {
                            console.error('URL STATUS ERROR', link.url, response.statusCode);
                            log += '<br>URL STATUS ERROR '+link.url+' '+response.statusCode;
                            return batchDone();
                        }

                        let $ = cheerio.load(body);
                        let newHtml = $('body').text().trim();
                        user.htmls[index] = user.htmls[index] || {};
                        let oldHtml = user.htmls[index].bodyText || '';
                        let sim = similarity(oldHtml, newHtml);

                        console.log(link.url, sim);
                        log += '<br>'+link.url+' '+sim;

                        if (sim < 0.95) {
                            user.links[index].visited = false;
                            user.htmls[index].bodyText = newHtml;
                        }
                        batchDone();
                    }
                );
            } else {
                batchDone();
            }
        });
    });

    batch.on('progress', function () {});
    batch.end(function() {
        user.save(function (err) {
            if (err) {
                console.log('USER SAVE ERROR', user.email);
                log += '<br><br>USER SAVE ERROR '+user.email;
            }
            sendMail(log, userIsDone);
        });
    });
};
