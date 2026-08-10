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
  return (
    <>
      <SEO 
        title="Vishal Jogdeo Lyrics Library | Full Song Lyrics in Devanagari & English" 
        description="Read complete Vishal Jogdeo lyrics in Marathi Devanagari script and English transliteration. Full lyrics for Mahanubhav Bhajans, Sant Sahitya Abhangas, and devotional songs." 
        keywords="Vishal Jogdeo lyrics, Vishal Jogdeo Song Lyrics, Marathi Bhajan Lyrics, Devanagari Lyrics, Mahanubhav Panth Bhajan Lyrics, Aai Majhi Mayecha Sagar Lyrics, Vishal Jogdeo, Vishal Jogdev" 
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
