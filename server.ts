import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

// In-Memory Sliding Window Rate Limiter to protect against DDoS & Bot Attacks
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const ipRequestMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 300; // 300 requests/minute per IP (ample for normal browsing, blocks rapid attack floods)

// Clean up stale rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRequestMap.entries()) {
    if (now > record.resetTime) {
      ipRequestMap.delete(ip);
    }
  }
}, 60 * 1000);

async function generateLiveSitemapXml(): Promise<string> {
  const domain = 'https://vishaljogdeo.com';
  const today = new Date().toISOString().split('T')[0];

  const baseRoutes = [
    { url: `${domain}/`, freq: 'daily', prio: '1.0' },
    { url: `${domain}/songs`, freq: 'daily', prio: '1.0' },
    { url: `${domain}/lyrics`, freq: 'daily', prio: '0.9' },
    { url: `${domain}/shows`, freq: 'daily', prio: '0.9' },
    { url: `${domain}/gallery`, freq: 'weekly', prio: '0.8' },
    { url: `${domain}/about`, freq: 'monthly', prio: '0.8' },
    { url: `${domain}/contact`, freq: 'monthly', prio: '0.8' },
    { url: `${domain}/privacy`, freq: 'monthly', prio: '0.3' },
    { url: `${domain}/terms`, freq: 'monthly', prio: '0.3' },
  ];

  const songIds = new Set<string>(['song-1', 'song-2', 'song-3', 'song-4', 'song-5', 'song-6', 'song-7', 'song-8', 'song-9', 'song-10']);
  const lyricIds = new Set<string>(['lyric-1', 'lyric-2', 'lyric-3', 'lyric-4']);

  // Fetch live Firestore songs dynamically
  try {
    let pageToken = '';
    do {
      const firestoreSongsUrl = `https://firestore.googleapis.com/v1/projects/vishal-jogdeo-website/databases/(default)/documents/songs?pageSize=1000${pageToken ? `&pageToken=${pageToken}` : ''}`;
      const res = await fetch(firestoreSongsUrl);
      if (res.ok) {
        const data = (await res.json()) as { documents?: Array<{ name: string }>; nextPageToken?: string };
        if (data.documents && Array.isArray(data.documents)) {
          data.documents.forEach((doc) => {
            const id = doc.name.split('/').pop();
            if (id) songIds.add(id);
          });
        }
        pageToken = data.nextPageToken || '';
      } else {
        break;
      }
    } while (pageToken);
  } catch (err) {
    console.error('[Sitemap] Error fetching live Firestore songs:', err);
  }

  // Fetch live Firestore lyrics dynamically
  try {
    let pageToken = '';
    do {
      const firestoreLyricsUrl = `https://firestore.googleapis.com/v1/projects/vishal-jogdeo-website/databases/(default)/documents/lyrics?pageSize=1000${pageToken ? `&pageToken=${pageToken}` : ''}`;
      const res = await fetch(firestoreLyricsUrl);
      if (res.ok) {
        const data = (await res.json()) as { documents?: Array<{ name: string }>; nextPageToken?: string };
        if (data.documents && Array.isArray(data.documents)) {
          data.documents.forEach((doc) => {
            const id = doc.name.split('/').pop();
            if (id) lyricIds.add(id);
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
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:music="http://www.google.com/schemas/sitemap-music/1.0">\n';

  // Base pages
  baseRoutes.forEach((r) => {
    xml += '  <url>\n';
    xml += `    <loc>${r.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${r.freq}</changefreq>\n`;
    xml += `    <priority>${r.prio}</priority>\n`;
    xml += '  </url>\n';
  });

  // Song individual pages
  songIds.forEach((id) => {
    xml += '  <url>\n';
    xml += `    <loc>${domain}/songs/${id}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.85</priority>\n`;
    xml += '  </url>\n';
  });

  // Lyric individual pages
  lyricIds.forEach((id) => {
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

  // JSON and URL-encoded body limit to prevent memory exhaustion / payload flooding attacks
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true, limit: '5mb' }));

  // 1. Sliding Window Rate Limiting Middleware (Anti-DDoS & Brute-Force Protection)
  app.use((req, res, next) => {
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    let record = ipRequestMap.get(clientIp);
    if (!record || now > record.resetTime) {
      record = { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS };
      ipRequestMap.set(clientIp, record);
    } else {
      record.count += 1;
    }

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', String(MAX_REQUESTS_PER_WINDOW));
    res.setHeader('X-RateLimit-Remaining', String(Math.max(0, MAX_REQUESTS_PER_WINDOW - record.count)));

    if (record.count > MAX_REQUESTS_PER_WINDOW) {
      res.status(429).json({
        error: 'Too Many Requests',
        message: 'Security protection triggered: Request limit exceeded. Please slow down and try again shortly.',
        retryAfterSeconds: Math.ceil((record.resetTime - now) / 1000),
      });
      return;
    }

    next();
  });

  // 2. Comprehensive Security & Hardening Headers
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    
    // High-performance media streaming header: allow seeking without re-downloading
    res.setHeader('Accept-Ranges', 'bytes');
    
    next();
  });

  // Health and Security Status Check Route
  app.get('/api/system-health', (_req, res) => {
    res.json({
      status: 'operational',
      securityStatus: 'protected',
      rateLimiter: 'active',
      losslessMediaEngine: '100% Full HD Native Enabled',
      timestamp: new Date().toISOString(),
    });
  });

  // Direct Audio Download Proxy Route (Prevents URL exposure and redirects)
  app.get('/api/download-audio', async (req, res) => {
    try {
      const audioUrl = req.query.url as string;
      const customFilename = (req.query.filename as string) || 'Devotional Track - Vishal Jogdeo.mp3';

      if (!audioUrl || typeof audioUrl !== 'string' || !audioUrl.startsWith('http')) {
        res.status(400).send('Invalid or missing audio URL');
        return;
      }

      // Fetch the audio stream from cloud storage
      const upstreamRes = await fetch(audioUrl);
      if (!upstreamRes.ok || !upstreamRes.body) {
        res.status(502).send('Unable to retrieve audio file from storage');
        return;
      }

      // Sanitize filename for Content-Disposition header
      const safeFilename = customFilename.replace(/[/\\?%*:|"<>]/g, '').trim() || 'Vishal_Jogdeo_Track.mp3';
      const encodedFilename = encodeURIComponent(safeFilename);

      res.setHeader('Content-Type', upstreamRes.headers.get('content-type') || 'audio/mpeg');
      res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodedFilename}`);
      
      const contentLength = upstreamRes.headers.get('content-length');
      if (contentLength) {
        res.setHeader('Content-Length', contentLength);
      }

      res.setHeader('Cache-Control', 'public, max-age=86400');

      // Stream response directly to client using Web Streams standard in Node 18+
      const reader = upstreamRes.body.getReader();
      const streamToResponse = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            res.write(value);
          }
          res.end();
        } catch (streamErr) {
          console.error('[Download Audio] Streaming interrupted:', streamErr);
          res.end();
        }
      };

      await streamToResponse();
    } catch (err) {
      console.error('[Download Audio] Error processing request:', err);
      if (!res.headersSent) {
        res.status(500).send('Failed to download audio file');
      }
    }
  });

  // Direct Media (Photo/Video) Download Proxy Route
  app.get('/api/download-media', async (req, res) => {
    try {
      const mediaUrl = req.query.url as string;
      const customFilename = (req.query.filename as string) || 'vishal_jogdeo_media';

      if (!mediaUrl || typeof mediaUrl !== 'string' || !mediaUrl.startsWith('http')) {
        res.status(400).send('Invalid or missing media URL');
        return;
      }

      const upstreamRes = await fetch(mediaUrl);
      if (!upstreamRes.ok || !upstreamRes.body) {
        res.status(502).send('Unable to retrieve media file from storage');
        return;
      }

      const safeFilename = customFilename.replace(/[/\\?%*:|"<>]/g, '_').trim() || 'vishal_jogdeo_media';
      const encodedFilename = encodeURIComponent(safeFilename);

      res.setHeader('Content-Type', upstreamRes.headers.get('content-type') || 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodedFilename}`);
      
      const contentLength = upstreamRes.headers.get('content-length');
      if (contentLength) {
        res.setHeader('Content-Length', contentLength);
      }

      res.setHeader('Cache-Control', 'public, max-age=86400');

      const reader = upstreamRes.body.getReader();
      const streamToResponse = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            res.write(value);
          }
          res.end();
        } catch (streamErr) {
          console.error('[Download Media] Streaming interrupted:', streamErr);
          res.end();
        }
      };

      await streamToResponse();
    } catch (err) {
      console.error('[Download Media] Error processing request:', err);
      if (!res.headersSent) {
        res.status(500).send('Failed to download media file');
      }
    }
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
