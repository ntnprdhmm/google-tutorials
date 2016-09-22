// check if service worker is supported by the browser
if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    navigator.serviceWorker.register('service-worker.js').then(function(reg) {
        console.log(':^)', reg);
        // TODO
    }).catch(function(err) {
        console.log(':^(', err);
    });
}
