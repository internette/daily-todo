// You have to supply a name for your cache, this will
// allow us to remove an old one to avoid hitting disk
// space limits and displaying old resources
var cache_name = 'daily-todo-1.0';

// Assesto catche
var assets_to_cache = [
  '/fonts/Inconsolata-Regular.ttf',
  '/fonts/Inconsolata-Regular.eot',
  '/fonts/Inconsolata-Bold.ttf',
  '/fonts/Inconsolata-Bold.eot',
  '/css/styles.css',
  '/js/accessibility-triggers.js',
  '/js/register-sw.js'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cache_name)
      .then(function (cache) {
        return cache.addAll(assets_to_cache);
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        var fetch_request = event.request.clone();
        return fetch(fetch_request).then(
          function (response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            var response_to_cache = response.clone();
            caches.open(cache_name)
              .then(function (cache) {
                cache.put(event.request, response_to_cache)
              });
            return response;
          }
        );
      })
  )
});

self.addEventListener('activate', function (event) {
  var cache_white_list = ['daily-todo-1.0'];
  event.waitUntil(
    caches.keys().then(function (cache_names) {
      return Promise.all(
        cache_names.map(function (param_cache_name) {
          if (cache_white_list.indexOf(param_cache_name) === -1) {
            return caches.delete(param_cache_name);
          }
        })
      );
    })
  );
});
