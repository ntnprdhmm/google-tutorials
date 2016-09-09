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
 * Call the get method, but parse the JSON response
 */
function getJSON(url) {
    return get(url).then(JSON.parse);
}
