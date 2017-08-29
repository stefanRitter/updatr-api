
const Batch = require('batch');
const similarity = require('similarity');
const sendMail = require('./sendMail.js');

const Link = require('mongoose').model('Link');


module.exports = function (user, userIsDone) {
    var batch = new Batch();
    batch.concurrency(4);

    var log = '<br><br>user: '+user.email;

    user.links.forEach(function (link, index) {
        batch.push(function (batchDone) {
            if (link.visited) {
                // 1. Get link from DB, if no link create it
                Link.findOne({url: link.url}, function (err, linkObj) {
                    if (err) {
                        console.error(err);
                        log += '<br>URL ERROR '+link.url+' '+err;
                        return batchDone();
                    }

                    linkObj = linkObj || new Link({url: link.url});

                    // 2. update link
                    linkObj.update(function (err) {
                        if (err) {
                            console.error(err);
                            log += '<br> '+err;
                            return batchDone();
                        }
                        // 3. check for sim
                        user.htmls[index] = user.htmls[index] || {};
                        let oldHtml = user.htmls[index].bodyText || '';
                        let newHtml = linkObj.html;
                        let sim = similarity(oldHtml, newHtml);

                        console.log(link.url, sim);
                        log += '<br>'+link.url+' '+sim;

                        if (sim < 0.95) {
                            user.links[index].visited = false;
                            user.htmls[index].bodyText = newHtml;
                        }
                        batchDone();
                    });
                });
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
