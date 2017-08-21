
const Batch = require('batch');
const cheerio = require('cheerio');
const request = require('request');
const similarity = require('similarity');
const userAgent = require('./useragent.js');


module.exports = function (user, userIsDone) {
    var batch = new Batch();
    batch.concurrency(4);

    user.links.forEach(function (link, index) {
        batch.push(function (batchDone) {
            console.log(user.htmls);

            if (link.visited) {
                request(
                    {
                        method: 'GET',
                        url: link.url,
                        followAllRedirects: true,
                        timeout: 4000,
                        jar: true,
                        headers: { 'User-Agent': userAgent }
                    },
                    (err, response, body) => {
                        if (err) {
                            console.error(err);
                            return batchDone();
                        }
                        if (response.statusCode !== 200) {
                            console.error('URL STATUS ERROR', link.url, response.statusCode);
                            return batchDone();
                        }

                        let $ = cheerio.load(body);
                        let newHtml = $('body').text().trim();
                        let oldHtml = user.htmls[index].bodyText || '';
                        let sim = similarity(oldHtml, newHtml);

                        if (sim < 0.9) {
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
            userIsDone();
        });
    });
};
