// Firebase Messaging Service Worker for Background Push Notifications
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Initialize Firebase App in Service Worker
const firebaseConfig = {
  apiKey: "AIzaSyABsK12W1Oa1rTQplOGdsuRs0W9J575cUM",
  authDomain: "gen-lang-client-0084346741.firebaseapp.com",
  projectId: "gen-lang-client-0084346741",
  storageBucket: "gen-lang-client-0084346741.firebasestorage.app",
  messagingSenderId: "843636506659",
  appId: "1:843636506659:web:963622143d56002df8b196"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background notification clicks
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message: ', payload);
  const notificationTitle = payload.notification?.title || payload.data?.title || 'Vishal Jogdeo Official Update';
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body || 'New content published on Vishal Jogdeo Portal!',
    icon: payload.notification?.icon || payload.data?.icon || '/icon.png',
    badge: '/icon.png',
    data: {
      url: payload.data?.url || payload.notification?.click_action || '/'
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
