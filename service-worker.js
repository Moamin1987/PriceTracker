// Service Worker for Professional Price Tracker
const CACHE_NAME = 'price-tracker-pro-v2.0.0';
const API_CACHE_NAME = 'price-tracker-api-v2.0.0';

// Files to cache on install
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './goldCalculator.js',
  './zakatCalculator.js',
  './manifest.json'
];

// API endpoints that can be cached
const API_ENDPOINTS = [
  './currencies',
  './metals',
  './crypto',
  './gold',
  './zakat'
];

// Install event - cache core files
self.addEventListener('install', event => {
  console.log('🔧 Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ Service Worker: Caching core files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ Service Worker: All core files cached');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('❌ Service Worker: Install failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('🔄 Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
            console.log('🗑️ Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('✅ Service Worker: Activated successfully');
      return self.clients.claim();
    })
  );
});

// Fetch event - handle all requests
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Handle API requests with special caching
  if (API_ENDPOINTS.some(endpoint => url.pathname.includes(endpoint))) {
    event.respondWith(handleApiRequest(event.request));
    return;
  }
  
  // Handle regular requests
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if found
        if (response) {
          console.log('📦 Service Worker: Serving from cache:', event.request.url);
          return response;
        }
        
        // Clone the request because it's a stream
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response because it's a stream
          const responseToCache = response.clone();
          
          // Cache the new response
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
              console.log('💾 Service Worker: Cached new response:', event.request.url);
            });
          
          return response;
        }).catch(error => {
          console.error('❌ Service Worker: Fetch failed:', error);
          
          // Return offline fallback for navigation requests
          if (event.request.destination === 'document') {
            return caches.match('./');
          }
          
          // Return a generic offline response for other requests
          return new Response('Offline content not available', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

// Handle API requests with special caching strategy
async function handleApiRequest(request) {
  try {
    // Try to get from cache first
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      // Return cached response but also fetch fresh data in background
      const freshResponse = fetchFreshApiData(request);
      return cachedResponse;
    }
    
    // If not in cache, fetch fresh data
    return await fetchFreshApiData(request);
    
  } catch (error) {
    console.error('❌ Service Worker: API request failed:', error);
    
    // Return cached fallback or error response
    return new Response(JSON.stringify({
      error: 'API request failed',
      message: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

// Fetch fresh API data with caching
async function fetchFreshApiData(request) {
  try {
    const response = await fetch(request);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    // Clone the response for caching
    const responseToCache = response.clone();
    
    // Cache API responses for 5 minutes
    caches.open(API_CACHE_NAME)
      .then(cache => {
        cache.put(request, responseToCache);
        console.log('💾 Service Worker: Cached API response:', request.url);
      });
    
    return response;
    
  } catch (error) {
    console.error('❌ Service Worker: Fresh API fetch failed:', error);
    throw error;
  }
}

// Background sync for data updates
self.addEventListener('sync', event => {
  console.log('🔄 Service Worker: Background sync triggered:', event.tag);
  
  if (event.tag === 'price-update') {
    event.waitUntil(
      updatePrices()
        .then(() => {
          console.log('✅ Service Worker: Prices updated successfully');
          // Notify all clients about the update
          notifyClients('price-updated');
        })
        .catch(error => {
          console.error('❌ Service Worker: Price update failed:', error);
        })
    );
  }
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Notify the main app to update data
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'BACKGROUND_SYNC',
            action: 'UPDATE_DATA'
          });
        });
      })
    );
  }
});

// Update prices in background
async function updatePrices() {
  try {
    // Simulate API calls to update prices
    console.log('🔄 Service Worker: Updating prices in background...');
    
    // In a real app, this would make actual API calls
    // For now, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('✅ Service Worker: Background price update completed');
    return true;
    
  } catch (error) {
    console.error('❌ Service Worker: Background price update failed:', error);
    throw error;
  }
}

// Push notifications
self.addEventListener('push', event => {
  console.log('📲 Service Worker: Push notification received');
  
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.message || 'تحديث جديد في الأسعار',
      icon: data.icon || '/icon-192.png',
      badge: data.badge || '/badge-72.png',
      vibrate: [100, 50, 100],
      data: {
        url: data.url || './',
        timestamp: Date.now()
      },
      actions: [
        {
          action: 'view',
          title: 'عرض التفاصيل',
          icon: '/images/view-icon.png'
        },
        {
          action: 'dismiss',
          title: 'إغلاق',
          icon: '/images/dismiss-icon.png'
        }
      ],
      tag: 'price-update',
      renotify: true,
      requireInteraction: false
    };
    
    event.waitUntil(
      self.registration.showNotification(
        data.title || 'متتبع الأسعار الاحترافي',
        options
      )
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('🔔 Service Worker: Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || './')
    );
  }
  
  // Handle other notification actions
  if (event.action === 'dismiss') {
    // Notification was dismissed, do nothing
  }
});

// Handle notification close
self.addEventListener('notificationclose', event => {
  console.log('🔕 Service Worker: Notification closed');
  
  // You can track notification close events here
  // For analytics or user behavior tracking
});

// Message handling from main app
self.addEventListener('message', event => {
  console.log('💬 Service Worker: Message received:', event.data);
  
  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'SKIP_WAITING':
        console.log('⏭️ Service Worker: Skipping waiting phase');
        self.skipWaiting();
        break;
        
      case 'CACHE_API':
        if (event.data.request) {
          console.log('💾 Service Worker: Manual API cache request');
          event.waitUntil(
            fetchFreshApiData(event.data.request)
          );
        }
        break;
        
      case 'GET_VERSION':
        event.ports[0].postMessage({
          type: 'VERSION',
          version: CACHE_NAME,
          timestamp: Date.now()
        });
        break;
        
      case 'CLEAR_CACHE':
        console.log('🗑️ Service Worker: Clearing all caches');
        event.waitUntil(
          caches.keys().then(cacheNames => {
            return Promise.all(
              cacheNames.map(cacheName => {
                return caches.delete(cacheName);
              })
            );
          }).then(() => {
            // Notify client that cache is cleared
            if (event.ports && event.ports[0]) {
              event.ports[0].postMessage({
                type: 'CACHE_CLEARED'
              });
            }
          })
        );
        break;
    }
  }
});

// Helper function to notify all clients
function notifyClients(type, data = {}) {
  return self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: type,
        data: data,
        timestamp: Date.now()
      });
    });
  });
}

// Error handling
self.addEventListener('error', event => {
  console.error('❌ Service Worker: Error:', event.error);
});

self.addEventListener('unhandledrejection', event) {
  console.error('❌ Service Worker: Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

// Console log for debugging
console.log('🚀 Service Worker: Loaded successfully');
