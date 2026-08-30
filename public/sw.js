/**
 * Service Worker for Vishal Jogdeo Official Music Portal
 * Enables offline capabilities, asset caching, and PWA installation.
 */

const CACHE_NAME = 'vishaljogdeo-cache-v1';
const RUNTIME_CACHE = 'vishaljogdeo-runtime-v1';
const MEDIA_CACHE = 'vishaljogdeo-media-v1';

// Essential App Shell resources to precache upon installation
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Poppins:ital,wght@0,500;0,600;0,700;0,800;1,600&display=swap'
];

// Install Event: Cache App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('Some precache items could not be loaded during install:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up outdated caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE, MEDIA_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            console.log('Clearing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Implement optimal caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and chrome-extension / internal requests
  if (request.method !== 'GET' || url.protocol.startsWith('chrome-extension')) {
    return;
  }

  // Firestore / Google APIs: Network only (avoid caching real-time DB calls)
  if (
    url.hostname.includes('firestore.googleapis.com') ||
    url.hostname.includes('identitytoolkit.googleapis.com') ||
    url.hostname.includes('securetoken.googleapis.com')
  ) {
    return;
  }

  // 1. Navigation / HTML requests: Network-First with Cache Fallback for offline support
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(async () => {
          // If offline, return cached page or app shell '/'
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          const fallbackShell = await caches.match('/');
          if (fallbackShell) return fallbackShell;
          return caches.match('/index.html');
        })
    );
    return;
  }

  // 2. Static Assets (JS, CSS, Web Fonts): Stale-While-Revalidate
  if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'font' ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('fonts.googleapis.com')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, responseToCache));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 3. Images & Media (Photos, Banners, Audio): Cache-First with Network fallback
  if (
    request.destination === 'image' ||
    url.hostname.includes('unsplash.com') ||
    url.hostname.includes('cnd.vishaljogdeo.com') ||
    url.hostname.includes('ibb.co') ||
    url.pathname.match(/\.(png|jpg|jpeg|svg|webp|gif|mp3|m4a|aac)$/i)
  ) {
    // Note: Don't cache partial audio content range requests directly in SW cache
    if (request.headers.get('range')) {
      return;
    }

    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(MEDIA_CACHE).then((cache) => cache.put(request, responseToCache));
            }
            return networkResponse;
          })
          .catch(() => {
            // Return empty response or fallback if completely unreachable
            return new Response('', { status: 408, statusText: 'Offline' });
          });
      })
    );
    return;
  }

  // 4. Default strategy for everything else: Network with Cache Fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, responseToCache));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        return new Response('Network error occurred (Offline)', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      })
  );
});

// Listen for messages from client (e.g., skipWaiting or clear cache)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
