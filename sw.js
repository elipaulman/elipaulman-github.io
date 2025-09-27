const CACHE_NAME = 'eli-portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/eli-resume-style.css',
  '/js/data-loader.js',
  '/data/personal.json',
  '/data/skills.json',
  '/data/experience.json',
  '/data/projects.json',
  '/data/education.json',
  '/data/faq.json'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Portfolio cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          return response;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response as it can only be consumed once
            const responseToCache = response.clone();

            // Add to cache for future use
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch((error) => {
            console.log('Fetch failed, trying cache:', error);
            return caches.match(event.request);
          });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for data updates
self.addEventListener('sync', (event) => {
  if (event.tag === 'portfolio-data-update') {
    event.waitUntil(updatePortfolioData());
  }
});

function updatePortfolioData() {
  console.log('Background portfolio data update requested');
  // This could trigger data refresh when online
  return Promise.resolve();
}
