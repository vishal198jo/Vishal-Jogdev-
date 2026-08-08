import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot,
  doc
} from 'firebase/firestore';
import { db, COLLECTIONS, FirestoreLyric, FirestoreGalleryFolder, FirestoreGalleryPhoto, FirestoreShow, FirestoreHeroSlide, FirestoreNotification } from '../lib/firebase';

export interface GlobalStats {
  visitedUsers: number;
  totalLyricsRead: number;
  totalPhotoViews: number;
}

export function useFirestoreData() {
  const [lyrics, setLyrics] = useState<FirestoreLyric[]>([]);
  const [galleryFolders, setGalleryFolders] = useState<FirestoreGalleryFolder[]>([]);
  const [galleryPhotos, setGalleryPhotos] = useState<FirestoreGalleryPhoto[]>([]);
  const [shows, setShows] = useState<FirestoreShow[]>([]);
  const [heroSlides, setHeroSlides] = useState<FirestoreHeroSlide[]>([]);
  const [notifications, setNotifications] = useState<FirestoreNotification[]>([]);
  const [globalStats, setGlobalStats] = useState<GlobalStats>({
    visitedUsers: 0,
    totalLyricsRead: 0,
    totalPhotoViews: 0
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unsubscribeLyrics: () => void;
    let unsubscribeFolders: () => void;
    let unsubscribePhotos: () => void;
    let unsubscribeShows: () => void;
    let unsubscribeSlides: () => void;
    let unsubscribeTicker: () => void;
    let unsubscribeStats: () => void;

    const loadedCollections = {
      lyrics: false,
      folders: false,
      photos: false,
      shows: false,
      slides: false,
      notifications: false,
      stats: false
    };

    function checkAllLoaded() {
      if (Object.values(loadedCollections).every(v => v === true)) {
        setLoading(false);
      }
    }

    async function initAndSubscribe() {
      try {
        // 1. Subscribe to Lyrics
        unsubscribeLyrics = onSnapshot(collection(db, COLLECTIONS.LYRICS), (snap) => {
          const list: FirestoreLyric[] = [];
          snap.forEach(docSnap => {
            list.push({ id: docSnap.id, ...docSnap.data() } as FirestoreLyric);
          });
          list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
          setLyrics(list);
          loadedCollections.lyrics = true;
          checkAllLoaded();
        }, (err) => {
          console.warn('Lyrics snapshot listener:', err);
          loadedCollections.lyrics = true;
          checkAllLoaded();
        });

        // 2. Subscribe to Gallery Folders & Photos
        unsubscribeFolders = onSnapshot(collection(db, COLLECTIONS.GALLERY_FOLDERS), (snap) => {
          const foldersList: FirestoreGalleryFolder[] = [];
          snap.forEach(docSnap => {
            foldersList.push({ id: docSnap.id, ...docSnap.data() } as FirestoreGalleryFolder);
          });
          setGalleryFolders(foldersList);
          loadedCollections.folders = true;
          checkAllLoaded();
        }, (err) => {
          console.warn('Folders snapshot listener:', err);
          loadedCollections.folders = true;
          checkAllLoaded();
        });

        unsubscribePhotos = onSnapshot(collection(db, COLLECTIONS.GALLERY_PHOTOS), (snap) => {
          const photosList: FirestoreGalleryPhoto[] = [];
          snap.forEach(docSnap => {
            photosList.push({ id: docSnap.id, ...docSnap.data() } as FirestoreGalleryPhoto);
          });
          setGalleryPhotos(photosList);
          loadedCollections.photos = true;
          checkAllLoaded();
        }, (err) => {
          console.warn('Photos snapshot listener:', err);
          loadedCollections.photos = true;
          checkAllLoaded();
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
          loadedCollections.shows = true;
          checkAllLoaded();
        }, (err) => {
          console.warn('Shows snapshot listener:', err);
          loadedCollections.shows = true;
          checkAllLoaded();
        });

        // 4. Subscribe to Hero Slides
        unsubscribeSlides = onSnapshot(collection(db, COLLECTIONS.HERO_SLIDES), (snap) => {
          const slidesList: FirestoreHeroSlide[] = [];
          snap.forEach(docSnap => {
            slidesList.push({ id: docSnap.id, ...docSnap.data() } as FirestoreHeroSlide);
          });
          setHeroSlides(slidesList);
          loadedCollections.slides = true;
          checkAllLoaded();
        }, (err) => {
          console.warn('Slides snapshot listener:', err);
          loadedCollections.slides = true;
          checkAllLoaded();
        });

        // 5. Subscribe to Notifications
        unsubscribeTicker = onSnapshot(collection(db, COLLECTIONS.NOTIFICATIONS), (snap) => {
          const list: FirestoreNotification[] = [];
          snap.forEach(docSnap => {
            list.push({ id: docSnap.id, ...docSnap.data() } as FirestoreNotification);
          });
          setNotifications(list);
          loadedCollections.notifications = true;
          checkAllLoaded();
        }, (err) => {
          console.warn('Notifications snapshot listener:', err);
          loadedCollections.notifications = true;
          checkAllLoaded();
        });

        // 6. Subscribe to Global Stats
        unsubscribeStats = onSnapshot(doc(db, 'stats', 'global'), (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            setGlobalStats({
              visitedUsers: typeof data.visitedUsers === 'number' ? data.visitedUsers : 0,
              totalLyricsRead: typeof data.totalLyricsRead === 'number' ? data.totalLyricsRead : 0,
              totalPhotoViews: typeof data.totalPhotoViews === 'number' ? data.totalPhotoViews : 0
            });
          }
          loadedCollections.stats = true;
          checkAllLoaded();
        }, (err) => {
          console.warn('Stats snapshot listener:', err);
          loadedCollections.stats = true;
          checkAllLoaded();
        });

      } catch (err) {
        console.error('Firestore subscription error:', err);
        setLoading(false);
      }
    }

    initAndSubscribe();

    return () => {
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
