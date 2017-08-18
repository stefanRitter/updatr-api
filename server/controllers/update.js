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



// similarity algorithm

var arr = [];
var charCodeCache = [];

function distance (a, b) {
	var swap = a;

	// Swapping the strings if `a` is longer than `b` so we know which one is the
	// shortest & which one is the longest
	if (a.length > b.length) {
		a = b;
		b = swap;
	}

	var aLen = a.length;
	var bLen = b.length;

	if (aLen === 0) {
		return bLen;
	}

	if (bLen === 0) {
		return aLen;
	}

	// Performing suffix trimming:
	// We can linearly drop suffix common to both strings since they
	// don't increase distance at all
	// Note: `~-` is the bitwise way to perform a `- 1` operation
	while (aLen > 0 && (a.charCodeAt(~-aLen) === b.charCodeAt(~-bLen))) {
		aLen--;
		bLen--;
	}

	if (aLen === 0) {
		return bLen;
	}

	// Performing prefix trimming
	// We can linearly drop prefix common to both strings since they
	// don't increase distance at all
	var start = 0;

	while (start < aLen && (a.charCodeAt(start) === b.charCodeAt(start))) {
		start++;
	}

	aLen -= start;
	bLen -= start;

	if (aLen === 0) {
		return bLen;
	}

	var bCharCode;
	var ret;
	var tmp;
	var tmp2;
	var i = 0;
	var j = 0;

	while (i < aLen) {
		charCodeCache[start + i] = a.charCodeAt(start + i);
		arr[i] = ++i;
	}

	while (j < bLen) {
		bCharCode = b.charCodeAt(start + j);
		tmp = j++;
		ret = j;

		for (i = 0; i < aLen; i++) {
			tmp2 = bCharCode === charCodeCache[start + i] ? tmp : tmp + 1;
			tmp = arr[i];
			ret = arr[i] = tmp > ret ? tmp2 > ret ? ret + 1 : tmp2 : tmp2 > tmp ? tmp + 1 : tmp2;
		}
	}

	return ret;
};


export function similarity (a,b) {
    if (!a || !b || !a.length || !b.length) { return 0;	}
    if (a === b) return 1
    var d = distance(a.toLowerCase(),b.toLowerCase())
    var longest = Math.max(a.length, b.length)
    return (longest-d)/longest
}
