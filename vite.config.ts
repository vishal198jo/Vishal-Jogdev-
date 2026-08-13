import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import Sitemap from 'vite-plugin-sitemap';
import { LATEST_LYRICS, FEATURED_SONGS } from './src/data/mockData';

export default defineConfig(async () => {
  // Fetch live lyrics from Firestore to automate sitemap updates during build
  let firestoreLyricIds: string[] = [];
  try {
    let pageToken = '';
    do {
      const url = `https://firestore.googleapis.com/v1/projects/vishal-jogdeo-website/databases/(default)/documents/lyrics?pageSize=1000${pageToken ? `&pageToken=${pageToken}` : ''}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.documents && Array.isArray(data.documents)) {
          const ids = data.documents.map((doc: any) => doc.name.split('/').pop());
          firestoreLyricIds.push(...ids);
        }
        pageToken = data.nextPageToken || '';
      } else {
        console.warn('[Sitemap] Firestore response not OK. Falling back to local mock data.');
        break;
      }
    } while (pageToken);
    
    console.log(`[Sitemap] Successfully fetched ${firestoreLyricIds.length} dynamic lyrics from Firestore.`);
  } catch (error) {
    console.error('[Sitemap] Failed to fetch Firestore lyrics. Error:', error);
  }

  // Combine Firestore IDs, mock lyrics IDs, and song IDs into a deduplicated set
  const allLyricIds = new Set<string>();
  
  firestoreLyricIds.forEach(id => {
    if (id) allLyricIds.add(id);
  });
  
  LATEST_LYRICS.forEach(lyric => {
    if (lyric.id) allLyricIds.add(lyric.id);
    if (lyric.songId) allLyricIds.add(lyric.songId);
  });
  
  FEATURED_SONGS.forEach(song => {
    if (song.id) allLyricIds.add(song.id);
    if (song.lyricsId) allLyricIds.add(song.lyricsId);
  });

  const dynamicRoutes = [
    '/about',
    '/songs',
    '/lyrics',
    '/gallery',
    '/shows',
    '/contact',
    '/terms',
    '/privacy',
    ...Array.from(allLyricIds).map(id => `/lyrics/${id}`)
  ];
  return {
    plugins: [
      react(),
      tailwindcss(),
      Sitemap({
        hostname: 'https://vishaljogdeo.com',
        dynamicRoutes,
        generateRobotsTxt: false
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
