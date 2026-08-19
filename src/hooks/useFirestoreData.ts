import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot,
  doc
} from 'firebase/firestore';
import { 
  db, 
  COLLECTIONS, 
  FirestoreSong, 
  FirestoreLyric, 
  FirestoreGalleryFolder, 
  FirestoreGalleryPhoto, 
  FirestoreShow, 
  FirestoreHeroSlide, 
  FirestoreNotification,
  handleFirestoreError,
  OperationType
} from '../lib/firebase';

export interface GlobalStats {
  visitedUsers: number;
  totalLyricsRead: number;
  totalPhotoViews: number;
}

export interface FirestoreDataState {
  songs: FirestoreSong[];
  lyrics: FirestoreLyric[];
  galleryFolders: FirestoreGalleryFolder[];
  galleryPhotos: FirestoreGalleryPhoto[];
  shows: FirestoreShow[];
  heroSlides: FirestoreHeroSlide[];
  notifications: FirestoreNotification[];
  globalStats: GlobalStats;
  loading: boolean;
}

const CACHE_KEYS = {
  SONGS: 'vj_cache_songs_v3',
  LYRICS: 'vj_cache_lyrics_v3',
  FOLDERS: 'vj_cache_folders_v3',
  PHOTOS: 'vj_cache_photos_v3',
  SHOWS: 'vj_cache_shows_v3',
  SLIDES: 'vj_cache_slides_v3',
  NOTIFICATIONS: 'vj_cache_notifications_v3',
  STATS: 'vj_cache_stats_v3',
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
    // Ignore cache parsing errors safely
  }
  return defaultValue;
}

function writeCache(key: string, data: any) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    // Ignore cache write errors safely
  }
}

// ---------------------------------------------------------------------------
// Singleton Master Store: Ensures exactly 1 listener per collection app-wide
// ---------------------------------------------------------------------------
const initialSongs = readCache<FirestoreSong[]>(CACHE_KEYS.SONGS, []);
const initialLyrics = readCache<FirestoreLyric[]>(CACHE_KEYS.LYRICS, []);
const initialFolders = readCache<FirestoreGalleryFolder[]>(CACHE_KEYS.FOLDERS, []);
const initialPhotos = readCache<FirestoreGalleryPhoto[]>(CACHE_KEYS.PHOTOS, []);
const initialShows = readCache<FirestoreShow[]>(CACHE_KEYS.SHOWS, []);
const initialSlides = readCache<FirestoreHeroSlide[]>(CACHE_KEYS.SLIDES, []);
const initialNotifications = readCache<FirestoreNotification[]>(CACHE_KEYS.NOTIFICATIONS, []);
const initialStats = readCache<GlobalStats>(CACHE_KEYS.STATS, {
  visitedUsers: 0,
  totalLyricsRead: 0,
  totalPhotoViews: 0
});

const hasInitialData = initialSongs.length > 0 || initialSlides.length > 0 || initialLyrics.length > 0 || initialShows.length > 0;

let storeState: FirestoreDataState = {
  songs: initialSongs,
  lyrics: initialLyrics,
  galleryFolders: initialFolders,
  galleryPhotos: initialPhotos,
  shows: initialShows,
  heroSlides: initialSlides,
  notifications: initialNotifications,
  globalStats: initialStats,
  loading: !hasInitialData
};

const listeners = new Set<() => void>();

function notifySubscribers() {
  listeners.forEach(fn => fn());
}

let isInitialized = false;

function initSharedListeners() {
  if (isInitialized) return;
  isInitialized = true;

  try {
    // 1. Subscribe to Songs
    onSnapshot(collection(db, COLLECTIONS.SONGS), (snap) => {
      const songsList: FirestoreSong[] = [];
      snap.forEach(docSnap => {
        songsList.push({ id: docSnap.id, ...docSnap.data() } as FirestoreSong);
      });
      songsList.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      storeState.songs = songsList;
      storeState.loading = false;
      writeCache(CACHE_KEYS.SONGS, songsList);
      notifySubscribers();
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, COLLECTIONS.SONGS);
    });

    // 2. Subscribe to Lyrics
    onSnapshot(collection(db, COLLECTIONS.LYRICS), (snap) => {
      const list: FirestoreLyric[] = [];
      snap.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() } as FirestoreLyric);
      });
      list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      storeState.lyrics = list;
      storeState.loading = false;
      writeCache(CACHE_KEYS.LYRICS, list);
      notifySubscribers();
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, COLLECTIONS.LYRICS);
    });

    // 3. Subscribe to Gallery Folders
    onSnapshot(collection(db, COLLECTIONS.GALLERY_FOLDERS), (snap) => {
      const foldersList: FirestoreGalleryFolder[] = [];
      snap.forEach(docSnap => {
        foldersList.push({ id: docSnap.id, ...docSnap.data() } as FirestoreGalleryFolder);
      });
      foldersList.sort((a, b) => {
        const orderA = typeof a.order === 'number' ? a.order : 99999;
        const orderB = typeof b.order === 'number' ? b.order : 99999;
        if (orderA !== orderB) return orderA - orderB;
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      });
      storeState.galleryFolders = foldersList;
      writeCache(CACHE_KEYS.FOLDERS, foldersList);
      notifySubscribers();
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, COLLECTIONS.GALLERY_FOLDERS);
    });

    // 4. Subscribe to Gallery Photos
    onSnapshot(collection(db, COLLECTIONS.GALLERY_PHOTOS), (snap) => {
      const photosList: FirestoreGalleryPhoto[] = [];
      snap.forEach(docSnap => {
        photosList.push({ id: docSnap.id, ...docSnap.data() } as FirestoreGalleryPhoto);
      });
      photosList.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      storeState.galleryPhotos = photosList;
      writeCache(CACHE_KEYS.PHOTOS, photosList);
      notifySubscribers();
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, COLLECTIONS.GALLERY_PHOTOS);
    });

    // 5. Subscribe to Shows
    onSnapshot(collection(db, COLLECTIONS.SHOWS), (snap) => {
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
      storeState.shows = showsList;
      storeState.loading = false;
      writeCache(CACHE_KEYS.SHOWS, showsList);
      notifySubscribers();
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, COLLECTIONS.SHOWS);
    });

    // 6. Subscribe to Hero Slides
    onSnapshot(collection(db, COLLECTIONS.HERO_SLIDES), (snap) => {
      const slidesList: FirestoreHeroSlide[] = [];
      snap.forEach(docSnap => {
        slidesList.push({ id: docSnap.id, ...docSnap.data() } as FirestoreHeroSlide);
      });
      storeState.heroSlides = slidesList;
      storeState.loading = false;
      writeCache(CACHE_KEYS.SLIDES, slidesList);
      notifySubscribers();
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, COLLECTIONS.HERO_SLIDES);
    });

    // 7. Subscribe to Notifications
    onSnapshot(collection(db, COLLECTIONS.NOTIFICATIONS), (snap) => {
      const list: FirestoreNotification[] = [];
      snap.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() } as FirestoreNotification);
      });
      storeState.notifications = list;
      writeCache(CACHE_KEYS.NOTIFICATIONS, list);
      notifySubscribers();
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, COLLECTIONS.NOTIFICATIONS);
    });

    // 8. Subscribe to Global Stats
    onSnapshot(doc(db, 'stats', 'global'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const statsObj: GlobalStats = {
          visitedUsers: typeof data.visitedUsers === 'number' ? data.visitedUsers : 0,
          totalLyricsRead: typeof data.totalLyricsRead === 'number' ? data.totalLyricsRead : 0,
          totalPhotoViews: typeof data.totalPhotoViews === 'number' ? data.totalPhotoViews : 0
        };
        storeState.globalStats = statsObj;
        writeCache(CACHE_KEYS.STATS, statsObj);
        notifySubscribers();
      }
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'stats/global');
    });

  } catch (err) {
    console.warn('Firestore initial connection notice:', err);
    storeState.loading = false;
    notifySubscribers();
  }
}

export function useFirestoreData() {
  const [, setTick] = useState(0);

  useEffect(() => {
    // Initialize shared singleton once
    initSharedListeners();

    const handleUpdate = () => {
      setTick(t => t + 1);
    };

    listeners.add(handleUpdate);

    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  return storeState;
}
