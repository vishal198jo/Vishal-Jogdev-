import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function generateLiveSitemapXml(): Promise<string> {
  const domain = 'https://vishaljogdeo.com';
  const today = new Date().toISOString().split('T')[0];

  const baseRoutes = [
    { url: `${domain}/`, freq: 'daily', prio: '1.0' },
    { url: `${domain}/lyrics`, freq: 'daily', prio: '0.9' },
    { url: `${domain}/songs`, freq: 'daily', prio: '0.9' },
    { url: `${domain}/shows`, freq: 'daily', prio: '0.9' },
    { url: `${domain}/gallery`, freq: 'weekly', prio: '0.8' },
    { url: `${domain}/about`, freq: 'monthly', prio: '0.8' },
    { url: `${domain}/contact`, freq: 'monthly', prio: '0.8' },
    { url: `${domain}/privacy`, freq: 'monthly', prio: '0.3' },
    { url: `${domain}/terms`, freq: 'monthly', prio: '0.3' },
  ];

  const allIds = new Set<string>();

  // Add static fallback IDs
  const mockLyricIds = ['lyric-1', 'lyric-2', 'lyric-3', 'lyric-4', 'song-1', 'song-2', 'song-3', 'song-4', 'song-5', 'song-6', 'song-7', 'song-8', 'song-9', 'song-10'];
  mockLyricIds.forEach(id => allIds.add(id));

  // Fetch live Firestore documents dynamically
  try {
    let pageToken = '';
    do {
      const firestoreUrl = `https://firestore.googleapis.com/v1/projects/vishal-jogdeo-website/databases/(default)/documents/lyrics?pageSize=1000${pageToken ? `&pageToken=${pageToken}` : ''}`;
      const res = await fetch(firestoreUrl);
      if (res.ok) {
        const data = (await res.json()) as { documents?: Array<{ name: string }>; nextPageToken?: string };
        if (data.documents && Array.isArray(data.documents)) {
          data.documents.forEach((doc) => {
            const id = doc.name.split('/').pop();
            if (id) allIds.add(id);
          });
        }
        pageToken = data.nextPageToken || '';
      } else {
        break;
      }
    } while (pageToken);
  } catch (err) {
    console.error('[Sitemap] Error fetching live Firestore lyrics:', err);
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  baseRoutes.forEach((r) => {
    xml += '  <url>\n';
    xml += `    <loc>${r.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${r.freq}</changefreq>\n`;
    xml += `    <priority>${r.prio}</priority>\n`;
    xml += '  </url>\n';
  });

  allIds.forEach((id) => {
    xml += '  <url>\n';
    xml += `    <loc>${domain}/lyrics/${id}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>\n';
  return xml;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security headers middleware
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // Real-time dynamic Sitemap XML route
  app.get('/sitemap.xml', async (_req, res) => {
    try {
      const xml = await generateLiveSitemapXml();
      res.header('Content-Type', 'application/xml');
      res.header('Cache-Control', 'public, max-age=60, s-maxage=60'); // Fresh every 1 min
      res.send(xml);
    } catch (error) {
      console.error('Failed to generate live sitemap:', error);
      res.status(500).send('Error generating sitemap');
    }
  });

  // Robots.txt route
  app.get('/robots.txt', (_req, res) => {
    res.header('Content-Type', 'text/plain');
    res.header('Cache-Control', 'public, max-age=86400');
    res.send(`User-agent: *\nAllow: /\n\nSitemap: https://vishaljogdeo.com/sitemap.xml\n`);
  });

  // Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    // Long-term caching for hashed build assets
    app.use('/assets', express.static(path.join(distPath, 'assets'), {
      maxAge: '1y',
      immutable: true,
    }));
    app.use(express.static(distPath, {
      maxAge: '1h',
    }));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
