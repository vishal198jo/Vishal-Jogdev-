import React from 'react';
import { LatestLyrics } from '../components/LatestLyrics';
import { SEO } from '../components/SEO';

interface LyricsPageProps {
  onPlaySong?: (songId: string) => void;
  selectedLyricId?: string | null;
}

export const LyricsPage: React.FC<LyricsPageProps> = ({
  onPlaySong,
  selectedLyricId
}) => {
  const lyricsCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://vishaljogdeo.com/lyrics#collection",
    "name": "Vishal Jogdeo Devotional Lyrics Library",
    "url": "https://vishaljogdeo.com/lyrics",
    "description": "Comprehensive library of authentic Marathi devotional song lyrics, Sant Sahitya abhangas, and Mahanubhav Panth bhajans sung by Vishal Jogdeo.",
    "about": {
      "@type": "Person",
      "name": "Vishal Jogdeo",
      "sameAs": "https://vishaljogdeo.com"
    }
  };

  return (
    <>
      <SEO 
        title="Vishal Jogdeo Devotional Lyrics Library | Abhanga & Bhajan Song Words" 
        description="Explore authentic Marathi devotional lyrics and Devanagari text for all popular songs, Mahanubhav Panth bhajans, and Sant Sahitya abhangas by Vishal Jogdeo." 
        keywords="Vishal Jogdeo lyrics, Vishal Jogdeo Song Lyrics, Marathi Bhajan Lyrics, Devanagari Abhanga Lyrics, Mahanubhav Bhajan Lyrics, Vishal Jogdeo, विशाल जोगदेव लिरिक्स, अभंग शब्द" 
        url="/lyrics"
        schema={lyricsCollectionSchema}
      />
      <div className="pt-20 pb-12 bg-[#0b0b0e] text-stone-100 min-h-screen">
      <LatestLyrics
        selectedLyricIdFromParent={selectedLyricId}
        onPlaySong={onPlaySong}
        hideHeader={false}
      />
    </div>
  </>
  );
};
