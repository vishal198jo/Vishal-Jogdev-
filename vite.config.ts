import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import Sitemap from 'vite-plugin-sitemap';

export default defineConfig(() => {
  const dynamicRoutes = [
    '/about',
    '/songs',
    '/lyrics',
    '/gallery',
    '/shows',
    '/contact',
    '/privacy',
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
      dedupe: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'react-router',
        'react-router-dom',
        'react-helmet-async',
        'firebase',
        'firebase/app',
        'firebase/firestore',
        'firebase/auth',
        '@firebase/app',
        '@firebase/component',
        '@firebase/firestore',
        '@firebase/auth'
      ],
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-router-dom',
        'react-helmet-async',
        'firebase/app',
        'firebase/firestore',
        'firebase/auth'
      ],
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
