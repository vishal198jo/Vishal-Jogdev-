import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot,
  doc
} from 'firebase/firestore';
import { db, COLLECTIONS, FirestoreSong, FirestoreLyric, FirestoreGalleryFolder, FirestoreGalleryPhoto, FirestoreShow, FirestoreHeroSlide, FirestoreNotification } from '../lib/firebase';

export interface GlobalStats {
  visitedUsers: number;
  totalLyricsRead: number;
  totalPhotoViews: number;
}

const CACHE_KEYS = {
  SONGS: 'vj_cache_songs_v2',
  LYRICS: 'vj_cache_lyrics_v2',
  FOLDERS: 'vj_cache_folders_v2',
  PHOTOS: 'vj_cache_photos_v2',
  SHOWS: 'vj_cache_shows_v2',
  SLIDES: 'vj_cache_slides_v2',
  NOTIFICATIONS: 'vj_cache_notifications_v2',
  STATS: 'vj_cache_stats_v2',
};

function readCache<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(defaultValue) ? Array.isArray(parsed) : parsed) {
        return parsed;
      }
    }
  } catch (e) {
    // ignore errors
  }
  return defaultValue;
}

function writeCache(key: string, data: any) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    // ignore
  }
}

export function useFirestoreData() {
  const [songs, setSongs] = useState<FirestoreSong[]>(() => readCache(CACHE_KEYS.SONGS, []));
  const [lyrics, setLyrics] = useState<FirestoreLyric[]>(() => readCache(CACHE_KEYS.LYRICS, []));
  const [galleryFolders, setGalleryFolders] = useState<FirestoreGalleryFolder[]>(() => readCache(CACHE_KEYS.FOLDERS, []));
  const [galleryPhotos, setGalleryPhotos] = useState<FirestoreGalleryPhoto[]>(() => readCache(CACHE_KEYS.PHOTOS, []));
  const [shows, setShows] = useState<FirestoreShow[]>(() => readCache(CACHE_KEYS.SHOWS, []));
  const [heroSlides, setHeroSlides] = useState<FirestoreHeroSlide[]>(() => readCache(CACHE_KEYS.SLIDES, []));
  const [notifications, setNotifications] = useState<FirestoreNotification[]>(() => readCache(CACHE_KEYS.NOTIFICATIONS, []));
  const [globalStats, setGlobalStats] = useState<GlobalStats>(() => readCache(CACHE_KEYS.STATS, {
    visitedUsers: 0,
    totalLyricsRead: 0,
    totalPhotoViews: 0
  }));

  // If local cache exists, do not block UI with loading spinner (instant load)
  const hasLocalCache = songs.length > 0 || heroSlides.length > 0 || lyrics.length > 0 || shows.length > 0;
  const [loading, setLoading] = useState<boolean>(!hasLocalCache);

  useEffect(() => {
    let unsubscribeSongs: () => void;
    let unsubscribeLyrics: () => void;
    let unsubscribeFolders: () => void;
    let unsubscribePhotos: () => void;
    let unsubscribeShows: () => void;
    let unsubscribeSlides: () => void;
    let unsubscribeTicker: () => void;
    let unsubscribeStats: () => void;

    // Fast fallback timer: never block the user for more than 800ms
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    async function initAndSubscribe() {
      try {
        // 0. Subscribe to Songs
        unsubscribeSongs = onSnapshot(collection(db, COLLECTIONS.SONGS), (snap) => {
          const songsList: FirestoreSong[] = [];
          snap.forEach(docSnap => {
            songsList.push({ id: docSnap.id, ...docSnap.data() } as FirestoreSong);
          });
          songsList.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
          setSongs(songsList);
          writeCache(CACHE_KEYS.SONGS, songsList);
          setLoading(false);
        }, (err) => {
          console.warn('Songs snapshot listener:', err);
        });

        // 1. Subscribe to Lyrics
        unsubscribeLyrics = onSnapshot(collection(db, COLLECTIONS.LYRICS), (snap) => {
          const list: FirestoreLyric[] = [];
          snap.forEach(docSnap => {
            list.push({ id: docSnap.id, ...docSnap.data() } as FirestoreLyric);
          });
          list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
          setLyrics(list);
          writeCache(CACHE_KEYS.LYRICS, list);
          setLoading(false);
        }, (err) => {
          console.warn('Lyrics snapshot listener:', err);
          setLoading(false);
        });

        // 2. Subscribe to Gallery Folders & Photos
        unsubscribeFolders = onSnapshot(collection(db, COLLECTIONS.GALLERY_FOLDERS), (snap) => {
          const foldersList: FirestoreGalleryFolder[] = [];
          snap.forEach(docSnap => {
            foldersList.push({ id: docSnap.id, ...docSnap.data() } as FirestoreGalleryFolder);
          });
          foldersList.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
          setGalleryFolders(foldersList);
          writeCache(CACHE_KEYS.FOLDERS, foldersList);
        }, (err) => {
          console.warn('Folders snapshot listener:', err);
        });

        unsubscribePhotos = onSnapshot(collection(db, COLLECTIONS.GALLERY_PHOTOS), (snap) => {
          const photosList: FirestoreGalleryPhoto[] = [];
          snap.forEach(docSnap => {
            photosList.push({ id: docSnap.id, ...docSnap.data() } as FirestoreGalleryPhoto);
          });
          photosList.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
          setGalleryPhotos(photosList);
          writeCache(CACHE_KEYS.PHOTOS, photosList);
        }, (err) => {
          console.warn('Photos snapshot listener:', err);
        });

        // 3. Subscribe to Shows
        unsubscribeShows = onSnapshot(collection(db, COLLECTIONS.SHOWS), (snap) => {
          const showsList: FirestoreShow[] = [];
          snap.forEach(docSnap => {
            showsList.push({ id: docSnap.id, ...docSnap.data() } as FirestoreShow);
          });
          showsList.sort((a, b) => {
            const timeA = a.date ? new Date(a.date).getTime() : 0;
            const timeB = b.date ? new Date(b.date).getTime() : 0;
            const validA = isNaN(timeA) ? 0 : timeA;
            const validB = isNaN(timeB) ? 0 : timeB;
            return validA - validB;
          });
          setShows(showsList);
          writeCache(CACHE_KEYS.SHOWS, showsList);
          setLoading(false);
        }, (err) => {
          console.warn('Shows snapshot listener:', err);
        });

        // 4. Subscribe to Hero Slides
        unsubscribeSlides = onSnapshot(collection(db, COLLECTIONS.HERO_SLIDES), (snap) => {
          const slidesList: FirestoreHeroSlide[] = [];
          snap.forEach(docSnap => {
            slidesList.push({ id: docSnap.id, ...docSnap.data() } as FirestoreHeroSlide);
          });
          setHeroSlides(slidesList);
          writeCache(CACHE_KEYS.SLIDES, slidesList);
          setLoading(false);
        }, (err) => {
          console.warn('Slides snapshot listener:', err);
        });

        // 5. Subscribe to Notifications
        unsubscribeTicker = onSnapshot(collection(db, COLLECTIONS.NOTIFICATIONS), (snap) => {
          const list: FirestoreNotification[] = [];
          snap.forEach(docSnap => {
            list.push({ id: docSnap.id, ...docSnap.data() } as FirestoreNotification);
          });
          setNotifications(list);
          writeCache(CACHE_KEYS.NOTIFICATIONS, list);
        }, (err) => {
          console.warn('Notifications snapshot listener:', err);
        });

        // 6. Subscribe to Global Stats
        unsubscribeStats = onSnapshot(doc(db, 'stats', 'global'), (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            const statsObj = {
              visitedUsers: typeof data.visitedUsers === 'number' ? data.visitedUsers : 0,
              totalLyricsRead: typeof data.totalLyricsRead === 'number' ? data.totalLyricsRead : 0,
              totalPhotoViews: typeof data.totalPhotoViews === 'number' ? data.totalPhotoViews : 0
            };
            setGlobalStats(statsObj);
            writeCache(CACHE_KEYS.STATS, statsObj);
          }
        }, (err) => {
          console.warn('Stats snapshot listener:', err);
        });

      } catch (err) {
        console.error('Firestore subscription error:', err);
        setLoading(false);
      }
    }

    initAndSubscribe();

    return () => {
      clearTimeout(timer);
      if (unsubscribeSongs) unsubscribeSongs();
      if (unsubscribeLyrics) unsubscribeLyrics();
      if (unsubscribeFolders) unsubscribeFolders();
      if (unsubscribePhotos) unsubscribePhotos();
      if (unsubscribeShows) unsubscribeShows();
      if (unsubscribeSlides) unsubscribeSlides();
      if (unsubscribeTicker) unsubscribeTicker();
      if (unsubscribeStats) unsubscribeStats();
    };
  }, []);

  return {
    songs,
    lyrics,
    galleryFolders,
    galleryPhotos,
    shows,
    heroSlides,
    notifications,
    globalStats,
    loading
  };
}
