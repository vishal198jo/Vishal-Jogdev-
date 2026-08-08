import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import Sitemap from 'vite-plugin-sitemap';
import { LATEST_LYRICS } from './src/data/mockData';

export default defineConfig(async () => {
  // Fetch live lyrics from Firestore to automate sitemap updates during build
  let firestoreLyricIds: string[] = [];
  try {
    const res = await fetch(
      'https://firestore.googleapis.com/v1/projects/vishal-jogdeo-website/databases/(default)/documents/lyrics?pageSize=1000'
    );
    if (res.ok) {
      const data = await res.json();
      if (data.documents && Array.isArray(data.documents)) {
        firestoreLyricIds = data.documents.map((doc: any) => {
          const parts = doc.name.split('/');
          return parts[parts.length - 1];
        });
        console.log(`[Sitemap] Successfully fetched ${firestoreLyricIds.length} dynamic lyrics from Firestore.`);
      }
    } else {
      console.warn('[Sitemap] Firestore response not OK. Falling back to local mock data.');
    }
  } catch (error) {
    console.error('[Sitemap] Failed to fetch Firestore lyrics. Error:', error);
  }

  // Use Firestore IDs if available, else fallback to mock list
  const finalLyricIds = firestoreLyricIds.length > 0 
    ? firestoreLyricIds 
    : LATEST_LYRICS.map(lyric => lyric.id);

  const dynamicRoutes = [
    '/about',
    '/songs',
    '/lyrics',
    '/gallery',
    '/shows',
    '/contact',
    '/terms',
    '/privacy',
    ...finalLyricIds.map(id => `/lyrics/${id}`)
  ];
  return {
    plugins: [
      react(),
      tailwindcss(),
      Sitemap({
        hostname: 'https://vishaljogdeo.com',
        dynamicRoutes
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
