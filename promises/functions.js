/**
 * Make a GET request
 */
function get(url) {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', 'data/' + url);
        // if response
        req.onload = function() {
            if(req.status == 200) {
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        };
        // network error
        req.onerror = function(){
            reject(Error('Network Error.'));
        };
        // send the request
        req.send();
    });
}

/**
 * Make a GET request (sync)
 */
function getSync(url) {
    var startTime = Date.now();
    var waitTime = 1000;

    var req = new XMLHttpRequest();
    req.open('GET', 'data/' + url, false);
    req.send();

    while(waitTime > Date.now() - startTime);

    if(req.status == 200) {
        return req.response;
    } else {
        throw Error(res.statusText || "Request failed");
    }
}

/**
 * Call the get method and parse the JSON response
 */
function getJSON(url) {
    return get(url).then(JSON.parse);
}

/**
 * Same as getJSON but sync
 */
function getJSONSync(url) {
    return JSON.parse(getSync(url));
}

/**
 * Append html to body
 */
function addHtmlToPage(html) {
    document.body.innerHTML += html;
}

/**
 * Apped text to body
 */
function addTextToPage(text) {
    document.body.innerHTML += '<p>' + text + '</p>';
}
