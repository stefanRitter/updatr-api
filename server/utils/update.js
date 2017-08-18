var headers = new Headers({ 'Content-Type': 'application/json' });
var options = new RequestOptions({ headers: headers });
var http = this.http;
var handleError = this.handleError;

var that = this;
var handleResponse = this.handleResponse;

var batch = new Batch();

visitedLinks.forEach(function(link:UpdatrLink) {
    batch.push(function(done) {
        http.get(link.url, options).subscribe(
            response => handleResponse.call(that, response, link, done),
            error => handleError.call(that, error, done)
        );
    });
});

batch.onProgress(function (count, link) {
    that.STORE.setProgressCount(count);
    that.applicationRef.tick();
});

batch.onEnd(function() { that.STORE.setUpdating(false); });
batch.start();

private handleResponse(response, newLink, done) {
    if (response.status === 200) {
        newLink.loading = false;
        let newHtml = response._body.split('<body')[1];
        let sim = similarity(newLink.html, newHtml)
        console.log('match:', newLink.url, sim);
        if (sim < 0.9) {
            newLink.html = newHtml;
            newLink.updatedOn = (new Date()).toString();
            newLink.visited = false;
        }
        this.updateLink(newLink);
    } else {
        this.handleError(response, null);
    }
    if (done) {done(newLink);}
}
