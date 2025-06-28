const CACHE_NAME = 'weather-app-v1';
const urlsToCache = [
  '/weather.html',
  '/css/weather.css',
  '/css/all.min.css',
  '/js/weather.js',
  '/js/analytics.js',
  '/images/weather-favicon.png',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - DISABLED for development - always fetch fresh
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log('Fetch failed, trying cache:', error);
        return caches.match(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for weather data updates
self.addEventListener('sync', event => {
  if (event.tag === 'weather-update') {
    event.waitUntil(updateWeatherData());
  }
});

function updateWeatherData() {
  // This would update weather data in the background
  console.log('Background weather update requested');
  return Promise.resolve();
}

// Push notifications (for future weather alerts)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Weather update available',
    icon: '/images/weather-favicon.png',
    badge: '/images/weather-favicon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Weather',
        icon: '/images/weather-favicon.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/weather-favicon.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Weather App', options)
  );
});
