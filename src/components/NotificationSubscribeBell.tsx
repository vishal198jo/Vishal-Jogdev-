import React, { useState, useEffect } from 'react';
import { Bell, BellRing, BellOff, Sparkles, X, Music, Disc, Image as ImageIcon } from 'lucide-react';
import { requestPushPermissionAndSubscribe, isPushSubscribed, unsubscribePushNotifications, listenToForegroundPushMessages } from '../lib/fcm';

export function NotificationSubscribeBell() {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [foregroundNotification, setForegroundNotification] = useState<{
    title: string;
    body: string;
    url?: string;
    category?: string;
  } | null>(null);

  useEffect(() => {
    setSubscribed(isPushSubscribed());

    // Foreground listener for real-time push alerts when tab is open
    const unsubscribeFCM = listenToForegroundPushMessages((payload) => {
      const title = payload.notification?.title || payload.data?.title || 'Vishal Jogdeo Portal Alert';
      const body = payload.notification?.body || payload.data?.body || 'New content published!';
      const url = payload.data?.url || payload.notification?.click_action || '/';
      const category = payload.data?.category || 'general';

      setForegroundNotification({ title, body, url, category });

      // Auto-dismiss after 8 seconds
      setTimeout(() => {
        setForegroundNotification(null);
      }, 8000);
    });

    return () => {
      if (typeof unsubscribeFCM === 'function') unsubscribeFCM();
    };
  }, []);

  const handleToggleSubscription = async () => {
    setLoading(true);
    setToastMessage(null);

    if (subscribed) {
      const success = await unsubscribePushNotifications();
      if (success) {
        setSubscribed(false);
        setToastMessage('Push notifications turned off.');
      } else {
        setToastMessage('Failed to unsubscribe.');
      }
    } else {
      const res = await requestPushPermissionAndSubscribe();
      if (res.success) {
        setSubscribed(true);
        setToastMessage('🔔 Notifications subscribed! You will receive real-time updates for new Songs, Lyrics, and Photos.');
      } else {
        setToastMessage(`Unable to enable: ${res.error || 'Permission denied'}`);
      }
    }

    setLoading(false);
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <>
      {/* Bell Button */}
      <div className="relative inline-block">
        <button
          onClick={handleToggleSubscription}
          disabled={loading}
          title={subscribed ? 'Push Notifications Enabled (Click to manage)' : 'Subscribe to Push Notifications for New Songs & Lyrics'}
          className={`relative p-2.5 rounded-full transition-all border flex items-center justify-center gap-1.5 text-xs font-bold cursor-pointer ${
            subscribed
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20 shadow-md shadow-amber-950/30'
              : 'bg-stone-900 border-stone-800 text-stone-300 hover:text-amber-400 hover:border-amber-500/30 hover:bg-stone-800'
          }`}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          ) : subscribed ? (
            <>
              <BellRing className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline-block text-[11px] font-semibold text-amber-300">Subscribed</span>
            </>
          ) : (
            <>
              <Bell className="w-4 h-4 text-stone-300 group-hover:text-amber-400" />
              <span className="hidden md:inline-block text-[11px] font-semibold text-stone-300">Notify Me</span>
            </>
          )}
        </button>

        {/* Feedback Toast */}
        {toastMessage && (
          <div className="absolute right-0 top-12 z-50 w-72 p-3 bg-[#121218] border border-amber-500/40 rounded-2xl shadow-2xl text-xs text-stone-200 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Push Notification</span>
              </div>
              <button onClick={() => setToastMessage(null)} className="text-stone-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="mt-1 text-[11px] text-stone-300 leading-relaxed">{toastMessage}</p>
          </div>
        )}
      </div>

      {/* Floating Real-time Foreground Notification Banner */}
      {foregroundNotification && (
        <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 max-w-sm w-full bg-[#121218] border-2 border-amber-500/60 rounded-2xl p-4 shadow-2xl text-stone-100 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                {foregroundNotification.category === 'song' ? (
                  <Disc className="w-4 h-4" />
                ) : foregroundNotification.category === 'lyric' ? (
                  <Music className="w-4 h-4" />
                ) : (
                  <ImageIcon className="w-4 h-4" />
                )}
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">New Broadcast Alert</span>
                <h4 className="text-xs font-extrabold text-white">{foregroundNotification.title}</h4>
              </div>
            </div>
            <button
              onClick={() => setForegroundNotification(null)}
              className="text-stone-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="mt-2 text-xs text-stone-300 leading-relaxed">{foregroundNotification.body}</p>

          {foregroundNotification.url && (
            <div className="mt-3 flex justify-end">
              <a
                href={foregroundNotification.url}
                onClick={() => setForegroundNotification(null)}
                className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-bold rounded-full hover:opacity-95 shadow-md"
              >
                View Content →
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
}
