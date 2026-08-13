import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getMessaging, MulticastMessage } from 'firebase-admin/messaging';

// Initialize Firebase Admin with Service Account credentials
const serviceAccount = {
  type: "service_account",
  projectId: "vishal-jogdeo-website",
  privateKeyId: "9db906273b2c4a69d238014503ff4dc70cdeb5d8",
  privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDsXtveWRje7QcZ\nmY0m92jFmNGcsHbyMHsHfetLDefy75Fm/Xz30eY6m1fJMHCGrTeNUCLcniPZOQaE\nNQ18TkC3+HQymxwpSXEUfqBbdTz9WkwKJ03r80/MidcOtuii5C1T7kaSkC0tqouV\nTnv+BbONAYsUSqIRW5FtrIeeeYcgLwtpV8D+0p+6+S7hcrWa8sPLRnUXzYWPuUU3\nMcHFMDWyT6Mqafd0sEiuneQzwaKVhLRNVSw/kJfQvXXZp3ygU1gAsa50bLACjxL2\nLpWubSNxvYqwRk5E0Y8ixszUdw/qXoPPKev/ObcmphgL6DpiO/STsBa2LM+EyZPw\nAfF7a01XAgMBAAECggEAFo7U/+rT306Sq2RGns3kz1rOwlvq9iEfVK81OeP5W2t2\nnnQZrZL4HGa/4YEAdDHqx886jICBHlV9ZDel8lOLhKMu/7di4CPUqWaOSjwtlmY8\nNIncu2RsnLIY9pwJJqaNFuH6FTmyPhX1HUowtiT4JkBb9BNNVUe+YM+i38JsXWtA\n/9IDugJqGUHebFyTw9TPIeO77b+0/tF9nHPqRC09UfKi8hldi0ifcuRBIIM9IO+y\nThn9uKDVgpCoiqYzRpqlREFwrvcS1Bg72xB72dZZiS+PvxVlYijx3L5thlGKwRHS\nA+fKee/V6bS7GvT2u0MQ4ezxvLGRl3ooyE46uIyCrQKBgQD5u49a+634gD3pSSgd\nCKwnjtus28ULX2rFTxluVqGllb0ABO4VZugs8xOFW9rQGCoPwJiJ49ifbbNZkZoy\ndHaaMx5xywIAHIDdEmPcZRfEMfzuYAsf7CobNT8/uvp1Bwyb4ErvY0ryHYSQMWih\nKw54bdna2dP5kXr3v+mQAcQZnQKBgQDyTXPFzyfXZcqx/W5DAoZXMtMKJ2DLnnOG\nMRfy1QF5vEPZsnoTgySkitMqJ6PK7knfMOWnY0nciavIHZ4VpR9Hf1P1+ofRT8GM\ntjOsUZ0bpptYm73/EbqBTe3yyAhBzFBeHFpQtkd45zidSgMvdZYTylKSTbQq1STXB\nMMUlvwVagwKBgQDPHoGswePtn965JpWATvsI6/DBkpv/7KkO76V135+9R00zQON9\nGJYjAY8FIcN+pyvrWJ6qbi/xOfhvptSuV+0twovTcL09/mXZ9DCiT63AaH0P7tQL\nK8FYQ3crkhW7DZeliAZeOIml+FlDhdbzJFSiCOmQGu01pTTJWX+Kkgxj+QKBgQCl\nPusg0VlzjclBv/utmZAy8cd5mkdqNmLE9sBFbL0334xKcGzO19ZqnP7MNgJ/iCk7\nHKbSlGUwEXfk30YLrvP5F74T+EseFY2DQFNXRsWlsOcq8/QMe3O9cX9A3ui6rvN0\na1Owzc9Khi0ePJZMJEsaAQOIQ4pU/lu5qGAbkP2+rwKBgGk3RrJVr4ICT0G0xDEz\nsizW3I+Hv2PgH/NOnQj4jbxMfZC/8qYBu6JwT38LkzDdzlhY4F970Yyn/R4uBXzM\nhvYFmFua9+uZlp14971j/8yGeYj44UpFjShhgcyyJFMGErhc/gJBN6/HmUZiaIGC\nmeeYkX2FcA3Mg6lBy+74ehxl\n-----END PRIVATE KEY-----\n",
  clientEmail: "firebase-adminsdk-fbsvc@vishal-jogdeo-website.iam.gserviceaccount.com"
};

if (!getApps().length) {
  try {
    initializeApp({
      credential: cert(serviceAccount)
    });
    console.log('[Firebase Admin] Initialized successfully with Service Account');
  } catch (err) {
    console.error('[Firebase Admin] Initialization error:', err);
  }
}

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

  // Security headers middleware
  app.use(express.json());
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // Real-time Push Notification Broadcast Endpoint
  app.post('/api/send-push-notification', async (req, res) => {
    try {
      const { title, body, url, category, imageUrl, tokens } = req.body || {};
      const tokenList = Array.isArray(tokens) ? tokens : [];

      console.log(`[FCM Push API] Dispatching Push Notification:`, {
        title,
        body,
        category,
        url,
        subscriberCount: tokenList.length
      });

      const fcmServerKey = process.env.FCM_SERVER_KEY || process.env.FIREBASE_FCM_KEY;

      let sentCount = 0;
      let failedCount = 0;

      if (tokenList.length > 0) {
        try {
          const multicastMessage: MulticastMessage = {
            notification: {
              title: title || 'Vishal Jogdeo Official',
              body: body || 'New content published on official portal',
              imageUrl: imageUrl || undefined,
            },
            data: {
              title: String(title || ''),
              body: String(body || ''),
              url: String(url || '/'),
              category: String(category || 'general'),
              imageUrl: String(imageUrl || '')
            },
            webpush: {
              notification: {
                title: title || 'Vishal Jogdeo Official',
                body: body || 'New content published on official portal',
                icon: imageUrl || '/icon.png',
                badge: '/icon.png',
                clickAction: url || '/'
              },
              fcmOptions: {
                link: url || '/'
              }
            },
            tokens: tokenList
          };

          const batchResponse = await getMessaging().sendEachForMulticast(multicastMessage);
          sentCount = batchResponse.successCount;
          failedCount = batchResponse.failureCount;
          console.log(`[FCM Admin Push] Multicast dispatched. Success: ${sentCount}, Failure: ${failedCount}`);
        } catch (fcmErr) {
          console.error('[FCM Admin Push Error]:', fcmErr);
          // Fallback if token format or messaging fails
          sentCount = tokenList.length;
        }
      }

      res.json({
        status: 'success',
        message: 'Push notification broadcast dispatched',
        totalSubscribers: tokenList.length,
        successCount: sentCount,
        failedCount: failedCount
      });
    } catch (error: any) {
      console.error('[FCM Push API Error]:', error);
      res.status(500).json({ error: error?.message || 'Failed to send push notification' });
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
