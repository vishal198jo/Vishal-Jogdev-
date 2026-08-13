import { initializeApp, getApps, getApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';
import { doc, setDoc, deleteDoc, getDocs, collection, serverTimestamp } from 'firebase/firestore';
import { db, firebaseConfig } from './firebase';

// Dedicated app instance for Messaging
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let messaging: Messaging | null = null;

// Safe lazy messaging getter for web environments that support SW & Notification
export const getFCMMessaging = (): Messaging | null => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'Notification' in window) {
    if (!messaging) {
      try {
        messaging = getMessaging(app);
      } catch (e) {
        console.warn('FCM Messaging initialization error:', e);
      }
    }
  }
  return messaging;
};

const FCM_TOKEN_KEY = 'vj_fcm_user_token';
const DEFAULT_VAPID_KEY = localStorage.getItem('vj_custom_vapid_key') || undefined;

// Register Service Worker & Request FCM Push Token
export async function requestPushPermissionAndSubscribe(): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return { success: false, error: 'Push notifications are not supported in this browser.' };
    }

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      return { success: false, error: 'Notification permission was denied by user.' };
    }

    // Register service worker if not already registered
    let swRegistration: ServiceWorkerRegistration | undefined;
    if ('serviceWorker' in navigator) {
      swRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    }

    const msg = getFCMMessaging();
    if (!msg) {
      return { success: false, error: 'Messaging is not supported on this device.' };
    }

    // Request FCM Token
    const vapidKey = localStorage.getItem('vj_custom_vapid_key') || DEFAULT_VAPID_KEY;
    const token = await getToken(msg, {
      serviceWorkerRegistration: swRegistration,
      vapidKey: vapidKey || undefined
    });

    if (!token) {
      return { success: false, error: 'Failed to retrieve FCM Token.' };
    }

    // Save Token to Local Storage & Firestore DB
    localStorage.setItem(FCM_TOKEN_KEY, token);

    const sanitizeTokenId = token.substring(0, 64).replace(/[^a-zA-Z0-9_-]/g, '_');
    await setDoc(doc(db, 'fcm_tokens', sanitizeTokenId), {
      token: token,
      platform: 'web',
      userAgent: navigator.userAgent,
      updatedAt: new Date().toISOString(),
      active: true
    }, { merge: true });

    return { success: true, token };
  } catch (err: any) {
    console.error('[FCM] Push Subscribe Error:', err);
    return { success: false, error: err?.message || 'Error subscribing to notifications.' };
  }
}

// Check if user is currently subscribed
export function isPushSubscribed(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(localStorage.getItem(FCM_TOKEN_KEY) && Notification.permission === 'granted');
}

// Unsubscribe Push Notifications
export async function unsubscribePushNotifications(): Promise<boolean> {
  try {
    const token = localStorage.getItem(FCM_TOKEN_KEY);
    if (token) {
      const sanitizeTokenId = token.substring(0, 64).replace(/[^a-zA-Z0-9_-]/g, '_');
      await deleteDoc(doc(db, 'fcm_tokens', sanitizeTokenId));
      localStorage.removeItem(FCM_TOKEN_KEY);
    }
    return true;
  } catch (err) {
    console.error('Error unsubscribing:', err);
    return false;
  }
}

// Listen for Foreground Messages (when tab is active)
export function listenToForegroundPushMessages(onNotificationReceived: (payload: any) => void) {
  const msg = getFCMMessaging();
  if (!msg) return () => {};

  return onMessage(msg, (payload) => {
    console.log('[FCM Foreground Message Received]:', payload);
    onNotificationReceived(payload);
  });
}

// Broadcast Realtime Push Notification to all subscribed users
export async function broadcastPushNotification(data: {
  title: string;
  body: string;
  url?: string;
  category?: 'song' | 'lyric' | 'photo' | 'general';
  imageUrl?: string;
}): Promise<{ totalSubscribers: number; successCount: number; errors: string[] }> {
  try {
    // 1. Fetch all active FCM tokens from Firestore
    const tokensSnapshot = await getDocs(collection(db, 'fcm_tokens'));
    const tokenList: string[] = [];
    tokensSnapshot.forEach((docSnap) => {
      const val = docSnap.data();
      if (val.token && val.active !== false) {
        tokenList.push(val.token);
      }
    });

    console.log(`[FCM Broadcast] Found ${tokenList.length} active subscriber tokens.`);

    // 2. Call backend Push API or broadcast via server endpoint
    const response = await fetch('/api/send-push-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: data.title,
        body: data.body,
        url: data.url || '/',
        category: data.category || 'general',
        imageUrl: data.imageUrl || '',
        tokens: tokenList
      })
    });

    if (response.ok) {
      const result = await response.json();
      return {
        totalSubscribers: tokenList.length,
        successCount: result.successCount || tokenList.length,
        errors: []
      };
    } else {
      const errText = await response.text();
      return {
        totalSubscribers: tokenList.length,
        successCount: tokenList.length,
        errors: [`Broadcast trigger returned status ${response.status}: ${errText}`]
      };
    }
  } catch (err: any) {
    console.error('[FCM Broadcast Error]:', err);
    return {
      totalSubscribers: 0,
      successCount: 0,
      errors: [err?.message || 'Failed to dispatch push notification.']
    };
  }
}
