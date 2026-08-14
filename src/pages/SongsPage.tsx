import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Play } from 'lucide-react';
import { FeaturedSongs } from '../components/FeaturedSongs';
import { Song } from '../types';
import { SEO } from '../components/SEO';
import { useFirestoreData } from '../hooks/useFirestoreData';
import { FEATURED_SONGS, SINGER_PROFILE } from '../data/mockData';

interface SongsPageProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlaySong: (song: Song) => void;
  onOpenLyrics?: (songId: string) => void;
}

export const SongsPage: React.FC<SongsPageProps> = ({
  currentSong,
  isPlaying,
  onPlaySong,
  onOpenLyrics
}) => {
  const { songId } = useParams<{ songId?: string }>();
  const [searchParams] = useSearchParams();
  const querySongId = searchParams.get('song') || songId;

  const { songs: firestoreSongs } = useFirestoreData();
  const songsList: Song[] = (firestoreSongs && firestoreSongs.length > 0)
    ? (firestoreSongs as Song[])
    : FEATURED_SONGS;

  // Check if a specific song is targeted via URL
  const selectedSong = querySongId
    ? songsList.find(s => s.id === querySongId || s.title.toLowerCase().replace(/\s+/g, '-') === querySongId.toLowerCase())
    : null;

  // Dynamic SEO metadata when a specific song page is loaded
  if (selectedSong) {
    const songTitle = selectedSong.title;
    const songDevanagari = selectedSong.titleDevanagari ? ` (${selectedSong.titleDevanagari})` : '';
    const singer = selectedSong.singerName || 'Vishal Jogdeo';
    
    const pageTitle = `${songTitle}${songDevanagari} - ${singer} | Official Devotional Audio Song`;
    const pageDesc = `Listen to the devotional song "${songTitle}"${songDevanagari} sung by ${singer}. Album: ${selectedSong.album || 'Devotional Bhakti'}, Category: ${selectedSong.category || 'Bhajan'}, Language: ${selectedSong.language || 'Marathi'}. High quality audio stream.`;
    const pageKeywords = `${songTitle}, ${selectedSong.titleDevanagari || ''}, ${singer}, ${selectedSong.album || ''}, ${selectedSong.category || ''}, Vishal Jogdeo Song MP3, Vishal Jogdeo Devotional Audio`;
    const coverImage = selectedSong.coverImage || SINGER_PROFILE.portraitImage;

    const singleSongSchema = {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "name": songTitle,
      "alternateName": selectedSong.titleDevanagari,
      "byArtist": {
        "@type": "MusicGroup",
        "name": singer,
        "url": "https://vishaljogdeo.com"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": selectedSong.album || "Vishal Jogdeo Bhakti Collection"
      },
      "duration": selectedSong.duration,
      "genre": selectedSong.category || "Bhajan",
      "inLanguage": selectedSong.language || "Marathi",
      "audio": {
        "@type": "AudioObject",
        "contentUrl": selectedSong.audioUrl,
        "name": songTitle,
        "description": pageDesc
      },
      "image": coverImage,
      "url": `https://vishaljogdeo.com/songs/${selectedSong.id}`
    };

    return (
      <>
        <SEO 
          title={pageTitle}
          description={pageDesc}
          keywords={pageKeywords}
          image={coverImage}
          url={`/songs/${selectedSong.id}`}
          type="music.song"
          schema={singleSongSchema}
        />
        <div className="pt-20 sm:pt-24 space-y-10 pb-16 bg-[#0b0b0e] text-stone-100 min-h-screen">
          {/* Targeted Song Banner */}
          <div className="bg-[#121218] border-b border-amber-500/20 py-10 sm:py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full">
                Featured Track
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white">
                {selectedSong.title}
              </h1>
              {selectedSong.titleDevanagari && (
                <p className="text-lg font-serif italic text-amber-300">
                  {selectedSong.titleDevanagari}
                </p>
              )}
              <p className="text-stone-300 text-sm max-w-xl mx-auto font-sans">
                Singer: <strong className="text-white">{singer}</strong> • Album: <strong className="text-white">{selectedSong.album || 'Devotional'}</strong>
              </p>
            </div>
          </div>

          <FeaturedSongs
            onPlaySong={onPlaySong}
            currentSongId={currentSong?.id || selectedSong.id}
            isPlaying={isPlaying}
            onSelectLyrics={(lyricsId) => onOpenLyrics?.(lyricsId)}
          />
        </div>
      </>
    );
  }

  // Full Catalog Playlist Schema for general /songs page
  const playlistSchema = {
    "@context": "https://schema.org",
    "@type": "MusicPlaylist",
    "name": "Vishal Jogdeo Official Devotional Songs & Audio Collection",
    "description": "Listen to official Marathi Abhangas, Mahanubhav Panth Bhajans, classical devotional songs, and sacred audio tracks sung by Vishal Jogdeo.",
    "numTracks": songsList.length,
    "byArtist": {
      "@type": "MusicGroup",
      "name": "Vishal Jogdeo",
      "url": "https://vishaljogdeo.com"
    },
    "track": songsList.map((song, idx) => ({
      "@type": "MusicRecording",
      "position": idx + 1,
      "name": song.title,
      "alternateName": song.titleDevanagari,
      "byArtist": {
        "@type": "MusicGroup",
        "name": song.singerName || "Vishal Jogdeo"
      },
      "inAlbum": {
        "@type": "MusicAlbum",
        "name": song.album || "Vishal Jogdeo Devotional Collection"
      },
      "duration": song.duration,
      "genre": song.category || "Bhajan",
      "image": song.coverImage || SINGER_PROFILE.portraitImage,
      "url": `https://vishaljogdeo.com/songs/${song.id}`
    }))
  };

  return (
    <>
      <SEO 
        title="Vishal Jogdeo Devotional Songs & Audio Collection | Official Music Player" 
        description="Listen to all popular Vishal Jogdeo songs, devotional MP3 tracks, Marathi Abhangas, Mahanubhav Panth Bhajans, and classical audio compositions performed by Vishal Jogdeo (Vishal Jogdev)." 
        keywords="Vishal Jogdeo Song, Vishal Jogdeo music, Vishal Jogdeo Songs, Vishal Jogdeo Devotional Music, Vishal Jogdeo Audio Tracks, Vishal Jogdeo Spotify, Vishal Jogdeo MP3, Vishal Jogdeo Bhajan, Vishal Jogdev, Abhanga MP3" 
        url="/songs"
        schema={playlistSchema}
      />
      <div className="pt-20 sm:pt-24 space-y-10 pb-16 bg-[#0b0b0e] text-stone-100 min-h-screen">
        {/* Page Header */}
        <div className="bg-[#121218] border-b border-amber-500/20 py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white">
              Devotional <span className="font-serif italic text-gold-gradient font-normal">Songs Catalog</span>
            </h1>
            <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed">
              Listen to complete devotional tracks performed by <strong>Vishal Jogdeo</strong> on Spotify and YouTube Music.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
              <a 
                href={SINGER_PROFILE.contact.socials.spotify} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg transition-all hover:scale-105"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.48-3.26c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.281 1.24zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-.1.2-1.2-.42-.18-.6.18-1.2.78-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.36z"/>
                </svg>
                <span>Spotify</span>
              </a>
              <a 
                href={SINGER_PROFILE.contact.socials.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg transition-all hover:scale-105"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>

        <FeaturedSongs
          onPlaySong={onPlaySong}
          currentSongId={currentSong?.id}
          isPlaying={isPlaying}
          onSelectLyrics={(lyricsId) => onOpenLyrics?.(lyricsId)}
        />
      </div>
    </>
  );
};

export default SongsPage;

