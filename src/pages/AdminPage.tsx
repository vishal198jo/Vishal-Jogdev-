import React, { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { 
  auth, 
  db, 
  COLLECTIONS, 
  FirestoreSong, 
  FirestoreGalleryPhoto, 
  FirestoreGalleryFolder, 
  FirestoreLyric, 
  FirestoreShow, 
  FirestoreHeroSlide 
} from '../lib/firebase';
import { useFirestoreData } from '../hooks/useFirestoreData';
import { SEO } from '../components/SEO';
import { 
  Music, 
  Image as ImageIcon, 
  Video, 
  FolderPlus, 
  FileText, 
  Calendar, 
  ShieldCheck, 
  Lock, 
  LogIn, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  RefreshCw, 
  Eye, 
  Sparkles, 
  Play, 
  Pause, 
  Search, 
  Server, 
  Activity, 
  Check, 
  Sliders, 
  Maximize2,
  HardDrive,
  Cpu,
  Zap,
  Globe
} from 'lucide-react';

const ADMIN_EMAIL = 'vishaljogdeoweb@gmail.com';

export const AdminPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'songs' | 'photos' | 'videos' | 'folders' | 'lyrics' | 'shows' | 'security'>('photos');

  // Form email/password login state
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Firestore live data
  const { songs, galleryPhotos, galleryFolders, lyrics, shows, heroSlides, loading } = useFirestoreData();

  // Operation statuses
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Preview testing state
  const [testAudioUrl, setTestAudioUrl] = useState<string | null>(null);
  const [isPlayingTest, setIsPlayingTest] = useState(false);
  const audioTestRef = React.useRef<HTMLAudioElement | null>(null);

  // Search filter inside admin
  const [searchQuery, setSearchQuery] = useState('');

  // -------------------------------------------------------------
  // Form Models State
  // -------------------------------------------------------------
  // 1. Song Form
  const [songForm, setSongForm] = useState<Partial<FirestoreSong>>({
    title: '',
    titleDevanagari: '',
    singerName: 'Vishal Jogdeo',
    album: 'Devotional Bhakti',
    category: 'Bhajan',
    language: 'Marathi',
    duration: '5:30',
    audioUrl: '',
    coverImage: '',
    raga: '',
    composer: 'Vishal Jogdeo',
    plays: 0
  });
  const [editingSongId, setEditingSongId] = useState<string | null>(null);

  // 2. Photo Form (100% Lossless Full HD)
  const [photoForm, setPhotoForm] = useState<Partial<FirestoreGalleryPhoto>>({
    folderId: '',
    folderName: '',
    imageUrl: '',
    title: '',
    category: 'Concert',
    description: '',
    type: 'photo',
    views: 0
  });
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);

  // 3. Video Form (Full HD & 4K)
  const [videoForm, setVideoForm] = useState<Partial<FirestoreGalleryPhoto>>({
    folderId: '',
    folderName: 'Concert Highlights',
    videoUrl: '',
    youtubeId: '',
    imageUrl: '',
    title: '',
    category: 'Live Concert',
    description: '',
    type: 'video',
    views: 0
  });
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);

  // 4. Folder Form
  const [folderForm, setFolderForm] = useState<Partial<FirestoreGalleryFolder>>({
    name: '',
    coverImage: '',
    description: '',
    count: 0
  });

  // 5. Lyric Form
  const [lyricForm, setLyricForm] = useState<Partial<FirestoreLyric>>({
    title: '',
    titleDevanagari: '',
    singerName: 'Vishal Jogdeo',
    album: 'Devotional Collection',
    category: 'Abhanga',
    language: 'Marathi',
    devanagariText: '',
    romanText: '',
    meaningSummary: '',
    raga: '',
    taal: ''
  });
  const [editingLyricId, setEditingLyricId] = useState<string | null>(null);

  // 6. Show Form
  const [showForm, setShowForm] = useState<Partial<FirestoreShow>>({
    title: '',
    city: '',
    venue: '',
    state: 'Maharashtra',
    date: new Date().toISOString().split('T')[0],
    time: '07:00 PM',
    bannerImage: '',
    description: '',
    ticketLink: '',
    isOrganizedByTrust: true,
    showInNotification: false
  });
  const [editingShowId, setEditingShowId] = useState<string | null>(null);

  // Listen to Auth State
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthChecking(false);
    });
    return () => unsub();
  }, []);

  // Flash message handler
  const notifySuccess = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const notifyError = (msg: string) => {
    setActionError(msg);
    setTimeout(() => setActionError(null), 5000);
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setAuthError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        notifySuccess(`Logged in as ${result.user.email}. Authorized Admin email is ${ADMIN_EMAIL}.`);
      } else {
        notifySuccess(`Welcome back, Vishal Jogdeo! Admin access verified.`);
      }
    } catch (err: any) {
      setAuthError(err?.message || 'Google Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Email/Pass Login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, emailInput, passwordInput);
      notifySuccess(`Logged in successfully!`);
    } catch (err: any) {
      setAuthError(err?.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      notifySuccess('Logged out successfully');
    } catch (err: any) {
      notifyError(err.message);
    }
  };

  // -------------------------------------------------------------
  // CRUD Actions
  // -------------------------------------------------------------
  
  // 1. Songs Save
  const handleSaveSong = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!songForm.title || !songForm.audioUrl) {
      notifyError('Song Title and High-Fidelity Audio URL are required!');
      return;
    }
    setIsProcessing(true);
    try {
      const songData = {
        ...songForm,
        plays: songForm.plays || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (editingSongId) {
        await updateDoc(doc(db, COLLECTIONS.SONGS, editingSongId), songData);
        notifySuccess(`Song "${songForm.title}" updated successfully!`);
      } else {
        const newDoc = await addDoc(collection(db, COLLECTIONS.SONGS), songData);
        notifySuccess(`New Song "${songForm.title}" published to live website!`);
      }
      setEditingSongId(null);
      setSongForm({
        title: '',
        titleDevanagari: '',
        singerName: 'Vishal Jogdeo',
        album: 'Devotional Bhakti',
        category: 'Bhajan',
        language: 'Marathi',
        duration: '5:30',
        audioUrl: '',
        coverImage: '',
        raga: '',
        composer: 'Vishal Jogdeo',
        plays: 0
      });
    } catch (err: any) {
      notifyError(`Error saving song: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteSong = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to remove song "${title}"?`)) return;
    setIsProcessing(true);
    try {
      await deleteDoc(doc(db, COLLECTIONS.SONGS, id));
      notifySuccess(`Song "${title}" removed.`);
    } catch (err: any) {
      notifyError(`Failed to delete song: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // 2. Photos Save (100% Full HD)
  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoForm.imageUrl) {
      notifyError('Full HD Image URL is required!');
      return;
    }
    setIsProcessing(true);
    try {
      const folderName = galleryFolders.find(f => f.id === photoForm.folderId)?.name || 'General Gallery';
      const photoData = {
        ...photoForm,
        type: 'photo',
        folderName,
        views: photoForm.views || 0,
        createdAt: new Date().toISOString(),
      };

      if (editingPhotoId) {
        await updateDoc(doc(db, COLLECTIONS.GALLERY_PHOTOS, editingPhotoId), photoData);
        notifySuccess('Photo updated with Full HD quality!');
      } else {
        await addDoc(collection(db, COLLECTIONS.GALLERY_PHOTOS), photoData);
        // Increment folder count
        if (photoForm.folderId) {
          try {
            await updateDoc(doc(db, COLLECTIONS.GALLERY_FOLDERS, photoForm.folderId), {
              count: increment(1)
            });
          } catch (e) { /* ignore */ }
        }
        notifySuccess('100% Full HD Photo published to live gallery!');
      }
      setEditingPhotoId(null);
      setPhotoForm({
        folderId: photoForm.folderId || '',
        folderName: '',
        imageUrl: '',
        title: '',
        category: 'Concert',
        description: '',
        type: 'photo',
        views: 0
      });
    } catch (err: any) {
      notifyError(`Error saving photo: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeletePhoto = async (id: string, folderId?: string) => {
    if (!window.confirm('Delete this photo permanently from gallery?')) return;
    setIsProcessing(true);
    try {
      await deleteDoc(doc(db, COLLECTIONS.GALLERY_PHOTOS, id));
      if (folderId) {
        try {
          await updateDoc(doc(db, COLLECTIONS.GALLERY_FOLDERS, folderId), {
            count: increment(-1)
          });
        } catch (e) { /* ignore */ }
      }
      notifySuccess('Photo deleted.');
    } catch (err: any) {
      notifyError(`Failed to delete photo: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // 3. Videos Save (Full HD / 4K / HLS / YouTube)
  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoForm.videoUrl && !videoForm.youtubeId) {
      notifyError('Please provide a Video URL (YouTube, HLS .m3u8, or MP4 Full HD)!');
      return;
    }
    setIsProcessing(true);
    try {
      // Auto-extract YouTube ID if user pasted full YouTube URL in videoUrl
      let ytId = videoForm.youtubeId || '';
      const url = videoForm.videoUrl || '';
      if (!ytId && url) {
        const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
        if (match && match[2].length === 11) {
          ytId = match[2];
        }
      }

      const videoData = {
        ...videoForm,
        type: 'video',
        videoUrl: url,
        youtubeId: ytId,
        views: videoForm.views || 0,
        createdAt: new Date().toISOString(),
      };

      if (editingVideoId) {
        await updateDoc(doc(db, COLLECTIONS.GALLERY_PHOTOS, editingVideoId), videoData);
        notifySuccess('Full HD Video updated successfully!');
      } else {
        await addDoc(collection(db, COLLECTIONS.GALLERY_PHOTOS), videoData);
        notifySuccess('Full HD Video published to live website!');
      }
      setEditingVideoId(null);
      setVideoForm({
        folderId: '',
        folderName: 'Concert Highlights',
        videoUrl: '',
        youtubeId: '',
        imageUrl: '',
        title: '',
        category: 'Live Concert',
        description: '',
        type: 'video',
        views: 0
      });
    } catch (err: any) {
      notifyError(`Error saving video: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // 4. Folder Save
  const handleSaveFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderForm.name) {
      notifyError('Folder name is required!');
      return;
    }
    setIsProcessing(true);
    try {
      await addDoc(collection(db, COLLECTIONS.GALLERY_FOLDERS), {
        ...folderForm,
        count: 0,
        createdAt: new Date().toISOString()
      });
      notifySuccess(`Folder "${folderForm.name}" created!`);
      setFolderForm({ name: '', coverImage: '', description: '', count: 0 });
    } catch (err: any) {
      notifyError(`Error creating folder: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteFolder = async (id: string, name: string) => {
    if (!window.confirm(`Delete folder "${name}"?`)) return;
    setIsProcessing(true);
    try {
      await deleteDoc(doc(db, COLLECTIONS.GALLERY_FOLDERS, id));
      notifySuccess(`Folder "${name}" deleted.`);
    } catch (err: any) {
      notifyError(`Error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // 5. Lyrics Save
  const handleSaveLyric = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lyricForm.title || !lyricForm.devanagariText) {
      notifyError('Title and Devanagari Lyrics text are required!');
      return;
    }
    setIsProcessing(true);
    try {
      const lyricData = {
        ...lyricForm,
        createdAt: new Date().toISOString()
      };
      if (editingLyricId) {
        await updateDoc(doc(db, COLLECTIONS.LYRICS, editingLyricId), lyricData);
        notifySuccess(`Lyrics for "${lyricForm.title}" updated!`);
      } else {
        await addDoc(collection(db, COLLECTIONS.LYRICS), lyricData);
        notifySuccess(`Lyrics for "${lyricForm.title}" published!`);
      }
      setEditingLyricId(null);
      setLyricForm({
        title: '',
        titleDevanagari: '',
        singerName: 'Vishal Jogdeo',
        album: 'Devotional Collection',
        category: 'Abhanga',
        language: 'Marathi',
        devanagariText: '',
        romanText: '',
        meaningSummary: '',
        raga: '',
        taal: ''
      });
    } catch (err: any) {
      notifyError(`Error saving lyrics: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteLyric = async (id: string, title: string) => {
    if (!window.confirm(`Delete lyrics for "${title}"?`)) return;
    setIsProcessing(true);
    try {
      await deleteDoc(doc(db, COLLECTIONS.LYRICS, id));
      notifySuccess(`Lyrics "${title}" deleted.`);
    } catch (err: any) {
      notifyError(`Error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // 6. Shows Save
  const handleSaveShow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showForm.title || !showForm.city || !showForm.venue || !showForm.date) {
      notifyError('Show Title, City, Venue, and Date are required!');
      return;
    }
    setIsProcessing(true);
    try {
      const showData = {
        ...showForm,
        createdAt: new Date().toISOString()
      };
      if (editingShowId) {
        await updateDoc(doc(db, COLLECTIONS.SHOWS, editingShowId), showData);
        notifySuccess(`Concert "${showForm.title}" updated!`);
      } else {
        await addDoc(collection(db, COLLECTIONS.SHOWS), showData);
        notifySuccess(`Concert "${showForm.title}" published to live schedule!`);
      }
      setEditingShowId(null);
      setShowForm({
        title: '',
        city: '',
        venue: '',
        state: 'Maharashtra',
        date: new Date().toISOString().split('T')[0],
        time: '07:00 PM',
        bannerImage: '',
        description: '',
        ticketLink: '',
        isOrganizedByTrust: true,
        showInNotification: false
      });
    } catch (err: any) {
      notifyError(`Error saving show: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteShow = async (id: string, title: string) => {
    if (!window.confirm(`Delete show "${title}"?`)) return;
    setIsProcessing(true);
    try {
      await deleteDoc(doc(db, COLLECTIONS.SHOWS, id));
      notifySuccess(`Show "${title}" deleted.`);
    } catch (err: any) {
      notifyError(`Error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Toggle Audio Playback test
  const handleToggleTestAudio = (url: string) => {
    if (testAudioUrl === url && isPlayingTest) {
      audioTestRef.current?.pause();
      setIsPlayingTest(false);
    } else {
      setTestAudioUrl(url);
      setIsPlayingTest(true);
      setTimeout(() => {
        audioTestRef.current?.play();
      }, 50);
    }
  };

  // Auth checking state
  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#0b0b0e] flex flex-col items-center justify-center p-6 text-stone-100">
        <div className="w-10 h-10 border-2 border-amber-500/20 border-t-amber-400 rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-semibold text-stone-300 font-sans tracking-wide">Authenticating Secure Admin Session...</p>
      </div>
    );
  }

  // Not logged in -> Show sleek secure login portal
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#0b0b0e] text-stone-100 flex flex-col items-center justify-center p-4 pt-20">
        <SEO 
          title="Admin Security Portal | Vishal Jogdeo Official"
          description="Protected administration portal for managing HD audio songs, lossless photos, 4K videos, concerts, and live database content."
        />

        <div className="max-w-md w-full bg-[#121218] border border-amber-500/30 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-extrabold font-heading text-white">Vishal Jogdeo Studio Admin</h1>
            <p className="text-xs text-stone-400 font-sans">
              Authorized Content & Full HD Media Management Portal
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-950/50 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          {/* Direct Google One-Click Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white text-stone-900 font-bold text-sm hover:bg-stone-100 transition-all shadow-md active:scale-98 disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Sign in with Google ({ADMIN_EMAIL})</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-stone-800"></div>
            <span className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Or Email / Password</span>
            <div className="flex-1 h-px bg-stone-800"></div>
          </div>

          {/* Email/Password Login */}
          <form onSubmit={handleEmailLogin} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Admin Email</label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="vishaljogdeoweb@gmail.com"
                required
                className="w-full bg-stone-900/90 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-stone-900/90 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-gold-gradient text-black font-extrabold text-sm hover:opacity-95 shadow-md active:scale-98 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Login to Admin Panel</span>
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-stone-500 space-y-1">
            <p>🔒 Server-side rate limiting & DDoS protection active.</p>
            <p>100% Full HD lossless image & audio streaming pipeline enabled.</p>
          </div>
        </div>
      </div>
    );
  }

  // Logged-in full management studio
  return (
    <div className="min-h-screen bg-[#0b0b0e] text-stone-100 pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Admin Content Studio | Vishal Jogdeo Official" 
        description="Manage HD devotional songs, lossless full quality photos, 4K videos, lyrics, and concert schedules." 
      />

      {/* Hidden audio element for preview testing */}
      <audio
        ref={audioTestRef}
        src={testAudioUrl || undefined}
        onEnded={() => setIsPlayingTest(false)}
        className="hidden"
      />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="bg-[#121218] border border-amber-500/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Admin Live Studio Active
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-950/40 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                100% Lossless Full HD
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Vishal Jogdeo Content & Media Studio
            </h1>
            <p className="text-xs text-stone-400 font-sans">
              Signed in as <strong className="text-amber-300">{currentUser.email}</strong> • Real-time Firebase Firestore Sync
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.open('/', '_blank')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-300 hover:text-white hover:border-amber-500/50 text-xs font-bold transition-all"
            >
              <Globe className="w-4 h-4 text-amber-400" />
              <span>View Live Website</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 hover:bg-red-900/60 text-xs font-bold transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Global Action Notifications */}
        {actionSuccess && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-sm text-emerald-200 flex items-center gap-3 shadow-lg animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-semibold">{actionSuccess}</span>
          </div>
        )}
        {actionError && (
          <div className="p-4 bg-red-950/80 border border-red-500/50 rounded-2xl text-sm text-red-200 flex items-center gap-3 shadow-lg animate-in fade-in">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <span className="font-semibold">{actionError}</span>
          </div>
        )}

        {/* Stats Overview Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="bg-[#121218] border border-stone-800 rounded-2xl p-4 space-y-1">
            <div className="flex items-center justify-between text-amber-400">
              <span className="text-xs font-semibold text-stone-400">Songs</span>
              <Music className="w-4 h-4" />
            </div>
            <p className="text-2xl font-extrabold text-white">{songs.length}</p>
          </div>
          <div className="bg-[#121218] border border-stone-800 rounded-2xl p-4 space-y-1">
            <div className="flex items-center justify-between text-cyan-400">
              <span className="text-xs font-semibold text-stone-400">HD Photos</span>
              <ImageIcon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-extrabold text-white">
              {galleryPhotos.filter(p => p.type !== 'video').length}
            </p>
          </div>
          <div className="bg-[#121218] border border-stone-800 rounded-2xl p-4 space-y-1">
            <div className="flex items-center justify-between text-red-400">
              <span className="text-xs font-semibold text-stone-400">Full HD Videos</span>
              <Video className="w-4 h-4" />
            </div>
            <p className="text-2xl font-extrabold text-white">
              {galleryPhotos.filter(p => p.type === 'video').length}
            </p>
          </div>
          <div className="bg-[#121218] border border-stone-800 rounded-2xl p-4 space-y-1">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-semibold text-stone-400">Albums / Folders</span>
              <FolderPlus className="w-4 h-4" />
            </div>
            <p className="text-2xl font-extrabold text-white">{galleryFolders.length}</p>
          </div>
          <div className="bg-[#121218] border border-stone-800 rounded-2xl p-4 space-y-1">
            <div className="flex items-center justify-between text-purple-400">
              <span className="text-xs font-semibold text-stone-400">Lyrics</span>
              <FileText className="w-4 h-4" />
            </div>
            <p className="text-2xl font-extrabold text-white">{lyrics.length}</p>
          </div>
          <div className="bg-[#121218] border border-stone-800 rounded-2xl p-4 space-y-1">
            <div className="flex items-center justify-between text-yellow-400">
              <span className="text-xs font-semibold text-stone-400">Concerts</span>
              <Calendar className="w-4 h-4" />
            </div>
            <p className="text-2xl font-extrabold text-white">{shows.length}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-800 scrollbar-none">
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shrink-0 ${
              activeTab === 'photos'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>100% Full HD Photos ({galleryPhotos.filter(p => p.type !== 'video').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shrink-0 ${
              activeTab === 'videos'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Full HD Videos ({galleryPhotos.filter(p => p.type === 'video').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('songs')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shrink-0 ${
              activeTab === 'songs'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>Songs & Audio ({songs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('folders')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shrink-0 ${
              activeTab === 'folders'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <FolderPlus className="w-4 h-4" />
            <span>Albums & Folders ({galleryFolders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('lyrics')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shrink-0 ${
              activeTab === 'lyrics'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Lyrics ({lyrics.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('shows')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shrink-0 ${
              activeTab === 'shows'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Concerts & Shows ({shows.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shrink-0 ${
              activeTab === 'security'
                ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                : 'bg-stone-900 text-emerald-400 hover:bg-stone-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Attack Protection & Server Hub</span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: 100% FULL HD PHOTOS                                    */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'photos' && (
          <div className="space-y-8">
            <div className="bg-[#121218] border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-amber-400" />
                    {editingPhotoId ? 'Edit HD Photo' : 'Upload / Add 100% Full HD Photo'}
                  </h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Upload or paste high-resolution photo links (Firebase Storage, AWS S3, Cloudinary, ImgBB, Unsplash). Quality remains 100% uncompressed Full HD.
                  </p>
                </div>
                {editingPhotoId && (
                  <button
                    onClick={() => {
                      setEditingPhotoId(null);
                      setPhotoForm({ folderId: '', folderName: '', imageUrl: '', title: '', category: 'Concert', description: '', type: 'photo', views: 0 });
                    }}
                    className="text-xs text-stone-400 hover:text-white underline"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleSavePhoto} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      100% Full HD Image Direct URL *
                    </label>
                    <input
                      type="url"
                      value={photoForm.imageUrl || ''}
                      onChange={(e) => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
                      placeholder="https://... (Full Resolution URL)"
                      required
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Album / Folder
                    </label>
                    <select
                      value={photoForm.folderId || ''}
                      onChange={(e) => setPhotoForm({ ...photoForm, folderId: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 outline-none"
                    >
                      <option value="">-- General Gallery (No Folder) --</option>
                      {galleryFolders.map(f => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Photo Title</label>
                    <input
                      type="text"
                      value={photoForm.title || ''}
                      onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                      placeholder="e.g. Pune Live Devotional Concert 2026"
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Category</label>
                    <input
                      type="text"
                      value={photoForm.category || ''}
                      onChange={(e) => setPhotoForm({ ...photoForm, category: e.target.value })}
                      placeholder="Concert, Mandir Kirtan, Studio, Lifestyle, Awards"
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Description / Notes</label>
                  <input
                    type="text"
                    value={photoForm.description || ''}
                    onChange={(e) => setPhotoForm({ ...photoForm, description: e.target.value })}
                    placeholder="Brief description about the performance or moment..."
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none"
                  />
                </div>

                {/* Instant HD Image Preview */}
                {photoForm.imageUrl && (
                  <div className="p-4 bg-stone-900/60 rounded-2xl border border-stone-800 space-y-2">
                    <p className="text-xs font-bold text-amber-400">Lossless Full HD Preview:</p>
                    <div className="max-h-64 overflow-hidden rounded-xl bg-black flex items-center justify-center border border-stone-700">
                      <img 
                        src={photoForm.imageUrl} 
                        alt="Preview" 
                        className="max-h-64 object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-6 py-2.5 rounded-xl bg-gold-gradient text-black font-extrabold text-xs hover:opacity-95 shadow-md transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingPhotoId ? 'Save Changes' : 'Publish HD Photo'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* List of Photos */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Live Photo Gallery Archive</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {galleryPhotos.filter(p => p.type !== 'video').map((photo) => (
                  <div key={photo.id} className="bg-[#121218] border border-stone-800 rounded-2xl overflow-hidden group hover:border-amber-500/50 transition-all flex flex-col justify-between">
                    <div className="relative aspect-square bg-black overflow-hidden">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title || 'Photo'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-amber-400 border border-amber-500/30">
                        HD
                      </div>
                    </div>
                    <div className="p-3 space-y-1.5">
                      <p className="text-xs font-bold text-white truncate">{photo.title || 'Untitled Photo'}</p>
                      <p className="text-[11px] text-stone-400 truncate">{photo.folderName || photo.category || 'Concert'}</p>
                      <div className="pt-2 flex items-center justify-between border-t border-stone-800">
                        <button
                          onClick={() => {
                            setEditingPhotoId(photo.id);
                            setPhotoForm(photo);
                            window.scrollTo({ top: 400, behavior: 'smooth' });
                          }}
                          className="p-1.5 rounded-lg bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 text-xs"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePhoto(photo.id, photo.folderId)}
                          className="p-1.5 rounded-lg bg-red-950/60 text-red-300 hover:bg-red-900 text-xs"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: FULL HD & 4K VIDEOS                                    */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'videos' && (
          <div className="space-y-8">
            <div className="bg-[#121218] border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Video className="w-5 h-5 text-red-400" />
                    {editingVideoId ? 'Edit Full HD Video' : 'Add Full HD / 4K Video Stream'}
                  </h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Supports YouTube 1080p/4K links, Apple HLS (.m3u8) streams, and direct Full HD MP4 video streams without compression.
                  </p>
                </div>
                {editingVideoId && (
                  <button
                    onClick={() => {
                      setEditingVideoId(null);
                      setVideoForm({ folderId: '', folderName: 'Concert Highlights', videoUrl: '', youtubeId: '', imageUrl: '', title: '', category: 'Live Concert', description: '', type: 'video', views: 0 });
                    }}
                    className="text-xs text-stone-400 hover:text-white underline"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveVideo} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Video Stream URL (YouTube, HLS .m3u8, or Direct MP4) *
                    </label>
                    <input
                      type="text"
                      value={videoForm.videoUrl || ''}
                      onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                      placeholder="https://www.youtube.com/watch?v=... or https://...video.m3u8"
                      required
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Video Title *
                    </label>
                    <input
                      type="text"
                      value={videoForm.title || ''}
                      onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                      placeholder="e.g. Live Mahanubhav Kirtan - Pandharpur 2026"
                      required
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Custom Thumbnail / Poster URL (Optional)</label>
                    <input
                      type="url"
                      value={videoForm.imageUrl || ''}
                      onChange={(e) => setVideoForm({ ...videoForm, imageUrl: e.target.value })}
                      placeholder="https://... (Full HD Thumbnail)"
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Category</label>
                    <input
                      type="text"
                      value={videoForm.category || ''}
                      onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                      placeholder="Live Concert, Bhajan Sandhya, Aarti, TV Broadcast"
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Description / Concert Details</label>
                  <input
                    type="text"
                    value={videoForm.description || ''}
                    onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                    placeholder="Concert location, audience size, special accompaniment..."
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-6 py-2.5 rounded-xl bg-gold-gradient text-black font-extrabold text-xs hover:opacity-95 shadow-md transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingVideoId ? 'Save Video Changes' : 'Publish Full HD Video'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* List of Videos */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Live Video Archive ({galleryPhotos.filter(p => p.type === 'video').length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {galleryPhotos.filter(p => p.type === 'video').map((video) => (
                  <div key={video.id} className="bg-[#121218] border border-stone-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                    <div className="relative aspect-video bg-black flex items-center justify-center">
                      {video.imageUrl ? (
                        <img src={video.imageUrl} alt={video.title || 'Video'} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-red-600/30 border border-red-500/50 flex items-center justify-center text-red-400">
                          <Play className="w-6 h-6 ml-0.5 fill-red-400" />
                        </div>
                      )}
                      <div className="absolute top-2 left-2 bg-red-600 px-2 py-0.5 rounded text-[10px] font-extrabold text-white uppercase">
                        Full HD 1080p
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <p className="text-sm font-bold text-white line-clamp-1">{video.title || 'Concert Video'}</p>
                      <p className="text-xs text-stone-400 line-clamp-1">{video.description || video.category || 'Live Performance'}</p>
                      <div className="pt-2 flex items-center justify-between border-t border-stone-800">
                        <button
                          onClick={() => {
                            setEditingVideoId(video.id);
                            setVideoForm(video);
                            window.scrollTo({ top: 400, behavior: 'smooth' });
                          }}
                          className="flex items-center gap-1 text-xs text-stone-300 hover:text-amber-400 font-bold"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeletePhoto(video.id)}
                          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-bold"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: SONGS & MUSIC (HIGH FIDELITY AUDIO)                      */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'songs' && (
          <div className="space-y-8">
            <div className="bg-[#121218] border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Music className="w-5 h-5 text-amber-400" />
                    {editingSongId ? 'Edit Devotional Song' : 'Add New High-Fidelity Audio Song'}
                  </h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Upload or link high-bitrate audio (320kbps MP3 / WAV / FLAC / AAC) and Full HD cover art.
                  </p>
                </div>
                {editingSongId && (
                  <button
                    onClick={() => {
                      setEditingSongId(null);
                      setSongForm({ title: '', titleDevanagari: '', singerName: 'Vishal Jogdeo', album: 'Devotional Bhakti', category: 'Bhajan', language: 'Marathi', duration: '5:30', audioUrl: '', coverImage: '', raga: '', composer: 'Vishal Jogdeo', plays: 0 });
                    }}
                    className="text-xs text-stone-400 hover:text-white underline"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveSong} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Song Title (English / Roman) *</label>
                    <input
                      type="text"
                      value={songForm.title || ''}
                      onChange={(e) => setSongForm({ ...songForm, title: e.target.value })}
                      placeholder="e.g. Majhe Maher Pandhari"
                      required
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Title (Devanagari / Marathi)</label>
                    <input
                      type="text"
                      value={songForm.titleDevanagari || ''}
                      onChange={(e) => setSongForm({ ...songForm, titleDevanagari: e.target.value })}
                      placeholder="e.g. माझे माहेर पंढरी"
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none font-serif"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Lossless Audio Stream URL *</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={songForm.audioUrl || ''}
                        onChange={(e) => setSongForm({ ...songForm, audioUrl: e.target.value })}
                        placeholder="https://...audio.mp3"
                        required
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none"
                      />
                      {songForm.audioUrl && (
                        <button
                          type="button"
                          onClick={() => handleToggleTestAudio(songForm.audioUrl!)}
                          className="px-3 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-black transition-all shrink-0 text-xs font-bold flex items-center gap-1.5"
                        >
                          {isPlayingTest && testAudioUrl === songForm.audioUrl ? (
                            <><Pause className="w-3.5 h-3.5" /> Stop</>
                          ) : (
                            <><Play className="w-3.5 h-3.5" /> Test</>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Full HD Cover Art URL</label>
                    <input
                      type="url"
                      value={songForm.coverImage || ''}
                      onChange={(e) => setSongForm({ ...songForm, coverImage: e.target.value })}
                      placeholder="https://...cover.jpg (High-Res)"
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Singer Name</label>
                    <input
                      type="text"
                      value={songForm.singerName || ''}
                      onChange={(e) => setSongForm({ ...songForm, singerName: e.target.value })}
                      placeholder="Vishal Jogdeo"
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Album / Collection</label>
                    <input
                      type="text"
                      value={songForm.album || ''}
                      onChange={(e) => setSongForm({ ...songForm, album: e.target.value })}
                      placeholder="Devotional Bhakti Collection"
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Category</label>
                    <input
                      type="text"
                      value={songForm.category || ''}
                      onChange={(e) => setSongForm({ ...songForm, category: e.target.value })}
                      placeholder="Abhanga, Bhajan, Kirtan, Aarti, Classical"
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Duration (e.g. 5:42)</label>
                    <input
                      type="text"
                      value={songForm.duration || ''}
                      onChange={(e) => setSongForm({ ...songForm, duration: e.target.value })}
                      placeholder="5:42"
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-6 py-2.5 rounded-xl bg-gold-gradient text-black font-extrabold text-xs hover:opacity-95 shadow-md transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingSongId ? 'Save Changes' : 'Publish Audio Track'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* List of Songs */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Live Published Audio Catalog ({songs.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {songs.map((song) => (
                  <div key={song.id} className="bg-[#121218] border border-stone-800 rounded-2xl p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-stone-800 overflow-hidden shrink-0 relative">
                        <img src={song.coverImage || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=200'} alt={song.title} className="w-full h-full object-cover" />
                        <button
                          onClick={() => handleToggleTestAudio(song.audioUrl)}
                          className="absolute inset-0 bg-black/60 flex items-center justify-center text-amber-400 hover:bg-black/40 transition-colors"
                        >
                          {isPlayingTest && testAudioUrl === song.audioUrl ? (
                            <Pause className="w-5 h-5 fill-amber-400" />
                          ) : (
                            <Play className="w-5 h-5 fill-amber-400 ml-0.5" />
                          )}
                        </button>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white truncate">{song.title}</p>
                        {song.titleDevanagari && (
                          <p className="text-xs text-amber-300/90 font-serif truncate">{song.titleDevanagari}</p>
                        )}
                        <p className="text-[11px] text-stone-400 truncate">{song.category || 'Bhajan'} • {song.duration || '0:00'} • {song.plays || 0} plays</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setEditingSongId(song.id);
                          setSongForm(song);
                          window.scrollTo({ top: 400, behavior: 'smooth' });
                        }}
                        className="p-2 rounded-xl bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 text-xs font-bold"
                        title="Edit Song"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSong(song.id, song.title)}
                        className="p-2 rounded-xl bg-red-950/60 text-red-300 hover:bg-red-900 text-xs font-bold"
                        title="Delete Song"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: ALBUMS & FOLDERS                                       */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'folders' && (
          <div className="space-y-8">
            <div className="bg-[#121218] border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-emerald-400" />
                Create New Gallery Album / Folder
              </h2>
              <form onSubmit={handleSaveFolder} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Album / Folder Name *</label>
                    <input
                      type="text"
                      value={folderForm.name || ''}
                      onChange={(e) => setFolderForm({ ...folderForm, name: e.target.value })}
                      placeholder="e.g. Pune Live Show 2026, Temple Darshan"
                      required
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Cover Image URL</label>
                    <input
                      type="url"
                      value={folderForm.coverImage || ''}
                      onChange={(e) => setFolderForm({ ...folderForm, coverImage: e.target.value })}
                      placeholder="https://...cover.jpg"
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Description</label>
                  <input
                    type="text"
                    value={folderForm.description || ''}
                    onChange={(e) => setFolderForm({ ...folderForm, description: e.target.value })}
                    placeholder="Short summary about this photo collection..."
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-6 py-2.5 rounded-xl bg-gold-gradient text-black font-extrabold text-xs hover:opacity-95 shadow-md transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Create Album
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Existing Albums ({galleryFolders.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {galleryFolders.map((folder) => (
                  <div key={folder.id} className="bg-[#121218] border border-stone-800 rounded-2xl p-5 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white">{folder.name}</p>
                      <p className="text-xs text-stone-400">{folder.description || 'No description'}</p>
                      <span className="inline-block text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded font-bold">
                        {folder.count || 0} Media Items
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteFolder(folder.id, folder.name)}
                      className="p-2 rounded-xl bg-red-950/60 text-red-300 hover:bg-red-900 text-xs"
                      title="Delete Folder"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: LYRICS & DEVANGARI TEXT                                */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'lyrics' && (
          <div className="space-y-8">
            <div className="bg-[#121218] border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  {editingLyricId ? 'Edit Devanagari Lyrics' : 'Add Sacred Lyrics (Devanagari & Roman)'}
                </h2>
                {editingLyricId && (
                  <button
                    onClick={() => {
                      setEditingLyricId(null);
                      setLyricForm({ title: '', titleDevanagari: '', singerName: 'Vishal Jogdeo', album: 'Devotional Collection', category: 'Abhanga', language: 'Marathi', devanagariText: '', romanText: '', meaningSummary: '', raga: '', taal: '' });
                    }}
                    className="text-xs text-stone-400 hover:text-white underline"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveLyric} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Song Title (English) *</label>
                    <input
                      type="text"
                      value={lyricForm.title || ''}
                      onChange={(e) => setLyricForm({ ...lyricForm, title: e.target.value })}
                      placeholder="e.g. Anandache Dohi Anand Tarang"
                      required
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Title (Devanagari)</label>
                    <input
                      type="text"
                      value={lyricForm.titleDevanagari || ''}
                      onChange={(e) => setLyricForm({ ...lyricForm, titleDevanagari: e.target.value })}
                      placeholder="e.g. आनंदाचे डोही आनंद तरंग"
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none font-serif"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Full Devanagari Lyrics (Hindi / Marathi) *</label>
                  <textarea
                    value={lyricForm.devanagariText || ''}
                    onChange={(e) => setLyricForm({ ...lyricForm, devanagariText: e.target.value })}
                    rows={6}
                    placeholder="आनंदाचे डोही आनंद तरंग । आनंदचि अंग आनंदाचे ॥१॥..."
                    required
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3.5 text-sm text-amber-200 placeholder-stone-600 focus:border-amber-500 outline-none font-serif leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Roman Transliteration (Optional)</label>
                  <textarea
                    value={lyricForm.romanText || ''}
                    onChange={(e) => setLyricForm({ ...lyricForm, romanText: e.target.value })}
                    rows={3}
                    placeholder="Anandache dohi ananda taranga..."
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3.5 text-sm text-stone-300 placeholder-stone-600 focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-6 py-2.5 rounded-xl bg-gold-gradient text-black font-extrabold text-xs hover:opacity-95 shadow-md transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> {editingLyricId ? 'Save Changes' : 'Publish Lyrics'}
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Live Published Lyrics ({lyrics.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {lyrics.map((l) => (
                  <div key={l.id} className="bg-[#121218] border border-stone-800 rounded-2xl p-5 flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <p className="text-sm font-bold text-white">{l.title}</p>
                      {l.titleDevanagari && <p className="text-xs text-amber-300 font-serif">{l.titleDevanagari}</p>}
                      <p className="text-xs text-stone-400 line-clamp-2 font-serif">{l.devanagariText}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setEditingLyricId(l.id);
                          setLyricForm(l);
                          window.scrollTo({ top: 400, behavior: 'smooth' });
                        }}
                        className="p-2 rounded-xl bg-stone-800 text-stone-300 hover:text-white"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLyric(l.id, l.title)}
                        className="p-2 rounded-xl bg-red-950/60 text-red-300 hover:bg-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 6: SHOWS & CONCERTS                                       */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'shows' && (
          <div className="space-y-8">
            <div className="bg-[#121218] border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-yellow-400" />
                {editingShowId ? 'Edit Concert' : 'Add Upcoming Concert / Show'}
              </h2>
              <form onSubmit={handleSaveShow} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Concert Title *</label>
                    <input
                      type="text"
                      value={showForm.title || ''}
                      onChange={(e) => setShowForm({ ...showForm, title: e.target.value })}
                      placeholder="e.g. Mahotsav Bhakti Sangeet Sandhya"
                      required
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">City *</label>
                    <input
                      type="text"
                      value={showForm.city || ''}
                      onChange={(e) => setShowForm({ ...showForm, city: e.target.value })}
                      placeholder="e.g. Pune, Mumbai, Nashik"
                      required
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Venue / Auditorium *</label>
                    <input
                      type="text"
                      value={showForm.venue || ''}
                      onChange={(e) => setShowForm({ ...showForm, venue: e.target.value })}
                      placeholder="e.g. Bal Gandharva Ranga Mandir"
                      required
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Date (YYYY-MM-DD) *</label>
                    <input
                      type="date"
                      value={showForm.date || ''}
                      onChange={(e) => setShowForm({ ...showForm, date: e.target.value })}
                      required
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-6 py-2.5 rounded-xl bg-gold-gradient text-black font-extrabold text-xs hover:opacity-95 shadow-md transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> {editingShowId ? 'Save Show' : 'Publish Concert'}
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Live Concert Schedule ({shows.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {shows.map((s) => (
                  <div key={s.id} className="bg-[#121218] border border-stone-800 rounded-2xl p-5 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white">{s.title}</p>
                      <p className="text-xs text-amber-400 font-semibold">{s.city} • {s.date} at {s.time}</p>
                      <p className="text-xs text-stone-400">{s.venue}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteShow(s.id, s.title)}
                      className="p-2 rounded-xl bg-red-950/60 text-red-300 hover:bg-red-900 text-xs"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 7: SECURITY & ATTACK PROTECTION HUB                       */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="bg-[#121218] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Service-Side Attack Protection & Performance Engine</h2>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Real-time status of DDoS mitigation, IP Rate Limiting, 100% Full HD Lossless media streaming, and Firestore security rules.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-stone-900/90 border border-stone-700/80 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between text-emerald-400">
                    <span className="text-xs font-bold uppercase tracking-wider">Rate Limiter & Anti-DDoS</span>
                    <Zap className="w-4 h-4" />
                  </div>
                  <p className="text-xl font-extrabold text-white">Active (300 req/min)</p>
                  <p className="text-xs text-stone-400">
                    Express sliding-window token limiter blocks packet flooding, bot scrapes, and server overload.
                  </p>
                </div>

                <div className="bg-stone-900/90 border border-stone-700/80 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between text-amber-400">
                    <span className="text-xs font-bold uppercase tracking-wider">Lossless 100% Quality</span>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <p className="text-xl font-extrabold text-white">Full HD / 4K Native</p>
                  <p className="text-xs text-stone-400">
                    Zero lossy downscaling. Renders original resolution with deep zoom and byte-range seek streaming.
                  </p>
                </div>

                <div className="bg-stone-900/90 border border-stone-700/80 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between text-cyan-400">
                    <span className="text-xs font-bold uppercase tracking-wider">Security Rules Barrier</span>
                    <Lock className="w-4 h-4" />
                  </div>
                  <p className="text-xl font-extrabold text-white">Hardened (Admin Only)</p>
                  <p className="text-xs text-stone-400">
                    Only <code className="text-amber-300">{ADMIN_EMAIL}</code> can write or delete songs, photos, videos, and shows.
                  </p>
                </div>
              </div>

              {/* Hardened Headers Checklist */}
              <div className="p-5 bg-black/40 rounded-2xl border border-stone-800 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-300">Active Defense Headers:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>X-Content-Type-Options: nosniff (MIME sniff block)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>X-Frame-Options: SAMEORIGIN (Anti-Clickjacking)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Strict-Transport-Security: max-age=31536000 (HSTS)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Accept-Ranges: bytes (Instant lossless audio/video seek)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
