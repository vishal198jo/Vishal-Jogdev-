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
  FirestoreHomeGalleryItem,
  FirestoreNotification,
  handleFirestoreError,
  OperationType
} from '../lib/firebase';
import { getPersistentCache, setPersistentCache, preloadImages } from '../lib/cacheManager';

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
  homeGalleryItems: FirestoreHomeGalleryItem[];
  notifications: FirestoreNotification[];
  globalStats: GlobalStats;
  loading: boolean;
}

const CACHE_KEYS = {
  SONGS: 'vj_cache_songs_v4',
  LYRICS: 'vj_cache_lyrics_v4',
  FOLDERS: 'vj_cache_folders_v4',
  PHOTOS: 'vj_cache_photos_v4',
  SHOWS: 'vj_cache_shows_v4',
  SLIDES: 'vj_cache_slides_v4',
  HOME_GALLERY: 'vj_cache_home_gallery_v4',
  NOTIFICATIONS: 'vj_cache_notifications_v4',
  STATS: 'vj_cache_stats_v4',
};

// ---------------------------------------------------------------------------
// Singleton Master Store: Instant Cache-First + Stale-While-Revalidate Engine
// ---------------------------------------------------------------------------
const initialSongs = getPersistentCache<FirestoreSong[]>(CACHE_KEYS.SONGS, []);
const initialLyrics = getPersistentCache<FirestoreLyric[]>(CACHE_KEYS.LYRICS, []);
const initialFolders = getPersistentCache<FirestoreGalleryFolder[]>(CACHE_KEYS.FOLDERS, []);
const initialPhotos = getPersistentCache<FirestoreGalleryPhoto[]>(CACHE_KEYS.PHOTOS, []);
const initialShows = getPersistentCache<FirestoreShow[]>(CACHE_KEYS.SHOWS, []);
const initialSlides = getPersistentCache<FirestoreHeroSlide[]>(CACHE_KEYS.SLIDES, []);
const initialHomeGallery = getPersistentCache<FirestoreHomeGalleryItem[]>(CACHE_KEYS.HOME_GALLERY, []);
const initialNotifications = getPersistentCache<FirestoreNotification[]>(CACHE_KEYS.NOTIFICATIONS, []);
const initialStats = getPersistentCache<GlobalStats>(CACHE_KEYS.STATS, {
  visitedUsers: 0,
  totalLyricsRead: 0,
  totalPhotoViews: 0
});

// Preload initial cached images immediately into memory
if (typeof window !== 'undefined') {
  const initialImagesToPreload: string[] = [
    ...initialSlides.map(s => s.image).filter(Boolean),
    ...initialHomeGallery.map(g => g.imageUrl).filter(Boolean),
    ...initialSongs.slice(0, 8).map(s => s.coverImage || '').filter(Boolean),
    ...initialPhotos.slice(0, 10).map(p => p.imageUrl).filter(Boolean)
  ];
  if (initialImagesToPreload.length > 0) {
    preloadImages(initialImagesToPreload);
  }
}

const hasInitialData = initialSongs.length > 0 || initialSlides.length > 0 || initialHomeGallery.length > 0 || initialLyrics.length > 0 || initialShows.length > 0;

let storeState: FirestoreDataState = {
  songs: initialSongs,
  lyrics: initialLyrics,
  galleryFolders: initialFolders,
  galleryPhotos: initialPhotos,
  shows: initialShows,
  heroSlides: initialSlides,
  homeGalleryItems: initialHomeGallery,
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
      setPersistentCache(CACHE_KEYS.SONGS, songsList);
      
      // Auto preload song cover images in background
      preloadImages(songsList.slice(0, 12).map(s => s.coverImage || '').filter(Boolean));
      
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
      setPersistentCache(CACHE_KEYS.LYRICS, list);
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
      setPersistentCache(CACHE_KEYS.FOLDERS, foldersList);
      
      // Preload folder cover images
      preloadImages(foldersList.map(f => f.coverImage || '').filter(Boolean));
      
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
      setPersistentCache(CACHE_KEYS.PHOTOS, photosList);
      
      // Preload first batch of gallery thumbnails for instant viewing
      preloadImages(photosList.slice(0, 16).map(p => p.imageUrl).filter(Boolean));
      
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
      setPersistentCache(CACHE_KEYS.SHOWS, showsList);
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
      setPersistentCache(CACHE_KEYS.SLIDES, slidesList);
      
      // High priority preload for hero slide backgrounds
      preloadImages(slidesList.map(s => s.image).filter(Boolean));
      
      notifySubscribers();
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, COLLECTIONS.HERO_SLIDES);
    });

    // 6b. Subscribe to Home Gallery (Vishal's Gallery on Homepage)
    try {
      onSnapshot(collection(db, COLLECTIONS.HOME_GALLERY), (snap) => {
        const homeList: FirestoreHomeGalleryItem[] = [];
        snap.forEach(docSnap => {
          homeList.push({ id: docSnap.id, ...docSnap.data() } as FirestoreHomeGalleryItem);
        });
        homeList.sort((a, b) => {
          const orderA = typeof a.order === 'number' ? a.order : 99999;
          const orderB = typeof b.order === 'number' ? b.order : 99999;
          if (orderA !== orderB) return orderA - orderB;
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        });
        storeState.homeGalleryItems = homeList;
        setPersistentCache(CACHE_KEYS.HOME_GALLERY, homeList);
        
        preloadImages(homeList.map(item => item.imageUrl).filter(Boolean));
        
        notifySubscribers();
      }, (err) => {
        // Fallback silently if remote firestore collection rules not yet propagated
        console.warn('Home gallery collection note:', err.message);
      });
    } catch (e) {
      console.warn('Could not subscribe to home_gallery:', e);
    }

    // 7. Subscribe to Notifications
    onSnapshot(collection(db, COLLECTIONS.NOTIFICATIONS), (snap) => {
      const list: FirestoreNotification[] = [];
      snap.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() } as FirestoreNotification);
      });
      storeState.notifications = list;
      setPersistentCache(CACHE_KEYS.NOTIFICATIONS, list);
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
        setPersistentCache(CACHE_KEYS.STATS, statsObj);
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
