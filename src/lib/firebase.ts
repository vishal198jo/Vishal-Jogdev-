import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  onSnapshot
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyBiNY1wzuTKwlDexyI2jvu4NBxCfv8mKqQ",
  authDomain: "vishal-jogdeo-website.firebaseapp.com",
  databaseURL: "https://vishal-jogdeo-website-default-rtdb.firebaseio.com",
  projectId: "vishal-jogdeo-website",
  storageBucket: "vishal-jogdeo-website.firebasestorage.app",
  messagingSenderId: "165866874625",
  appId: "1:165866874625:web:4bc13bd34384e332b79d00",
  measurementId: "G-DDBMSE9Q6P"
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path
  };
  console.error('Firestore Error Details:', JSON.stringify(errInfo));
  return errInfo;
}

// Interfaces matching Firestore schema
export interface FirestoreLyric {
  id: string;
  title: string;
  singerName: string;
  titleDevanagari?: string;
  album?: string;
  category?: string;
  language?: string;
  publishedDate?: string;
  coverImage?: string;
  raga?: string;
  taal?: string;
  meaningSummary?: string;
  devanagariText: string; // newline or string
  romanText?: string;
  metaTitle?: string;
  metaDescription?: string;
  views?: number;
  createdAt: string;
}

export interface FirestoreGalleryFolder {
  id: string;
  name: string;
  coverImage?: string;
  description?: string;
  count?: number;
  order?: number;
  createdAt?: string;
}

export interface FirestoreGalleryPhoto {
  id: string;
  folderId: string;
  folderName?: string;
  imageUrl: string;
  title?: string;
  category?: string;
  description?: string;
  createdAt?: string;
  type?: 'photo' | 'video';
  videoUrl?: string;
  videoSource?: 'youtube' | 'local' | 'hls';
  youtubeId?: string;
  views?: number;
}

export interface FirestoreShow {
  id: string;
  title: string;
  city: string;
  venue: string;
  state?: string;
  date: string; // YYYY-MM-DD
  time: string;
  bannerImage?: string;
  description?: string;
  ticketLink?: string;
  ticketPrice?: string;
  status?: string;
  isOrganizedByTrust?: boolean;
  showInNotification?: boolean;
  createdAt?: string;
}

export interface FirestoreHeroSlide {
  id: string;
  image: string;
  altText?: string;
  linkUrl?: string;
  buttonText?: string;
  buttonIcon?: string;
  order?: number;
  createdAt?: string;
}

export interface FirestoreNotification {
  id: string;
  text: string;
  link?: string;
  active?: boolean;
  createdAt?: string;
}

export interface FirestoreInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  city?: string;
  message?: string;
  eventType?: string;
  eventDate?: string;
  budgetRange?: string;
  notes?: string;
  createdAt: string;
  status: 'new' | 'read';
}

export interface FirestoreSong {
  id: string;
  title: string;
  singerName: string;
  titleDevanagari?: string;
  category?: string;
  language?: string;
  duration?: string;
  audioUrl: string;
  coverImage?: string;
  plays?: number;
  downloads?: number;
  lyricsId?: string;
  album?: string;
  raga?: string;
  composer?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Collections helper references
export const COLLECTIONS = {
  SONGS: 'songs',
  LYRICS: 'lyrics',
  GALLERY_FOLDERS: 'gallery_folders',
  GALLERY_PHOTOS: 'gallery_photos',
  SHOWS: 'shows',
  HERO_SLIDES: 'hero_slides',
  NOTIFICATIONS: 'notifications',
  INQUIRIES: 'inquiries'
};
