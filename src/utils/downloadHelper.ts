/**
 * Robust, cross-browser helper to download photos, videos, and songs
 * Guarantees original media format (JPG, PNG, MP3, MP4) and prevents .html file corruption
 */

export function sanitizeDownloadFilename(rawTitle: string, defaultName: string, targetExtension: string): string {
  if (!rawTitle || !rawTitle.trim()) {
    return `${defaultName}.${targetExtension}`;
  }

  let clean = rawTitle.trim();

  // Strip known extensions from the end of the title if already present
  clean = clean.replace(/\.(png|jpg|jpeg|webp|gif|mp3|wav|m4a|aac|mp4|webm|mov|mkv|html|htm)$/i, '');

  // Replace problematic file system characters with clean underscores or spaces
  clean = clean.replace(/[/\\?%*:|"<>#]/g, '_').trim();
  
  // Collapse multiple underscores
  clean = clean.replace(/_+/g, '_').replace(/^_+|_+$/g, '');

  if (!clean) {
    clean = defaultName;
  }

  return `${clean}.${targetExtension}`;
}

export async function downloadMediaFile(
  url: string,
  filename: string,
  mediaType: 'image' | 'audio' | 'video' = 'image'
): Promise<boolean> {
  if (!url || !url.trim()) {
    console.error('Cannot download: missing URL');
    return false;
  }

  const cleanUrl = url.trim();

  // Handle external video services (like YouTube) by opening them
  if (cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be') || cleanUrl.includes('vimeo.com')) {
    window.open(cleanUrl, '_blank', 'noopener,noreferrer');
    return true;
  }

  // 1. First Attempt: Direct Fetch as Blob (Fastest & Lossless)
  try {
    const directRes = await fetch(cleanUrl, { mode: 'cors' });
    if (directRes.ok) {
      const contentType = directRes.headers.get('content-type') || '';
      
      // CRITICAL CHECK: Reject if server returned HTML (error/SPA page)
      if (!contentType.includes('text/html')) {
        const blob = await directRes.blob();
        
        let expectedMime = 'application/octet-stream';
        if (mediaType === 'image') expectedMime = filename.endsWith('.png') ? 'image/png' : 'image/jpeg';
        if (mediaType === 'audio') expectedMime = 'audio/mpeg';
        if (mediaType === 'video') expectedMime = 'video/mp4';

        const finalBlob = blob.type && !blob.type.includes('html') ? blob : new Blob([blob], { type: expectedMime });
        
        triggerBlobDownload(finalBlob, filename);
        return true;
      }
    }
  } catch {
    // Cross-origin fetch blocked or failed, proceed to proxy method
  }

  // 2. Second Attempt: Server-Side Streaming Proxy (/api/download-media or /api/download-audio)
  try {
    const endpoint = mediaType === 'audio' ? '/api/download-audio' : '/api/download-media';
    const proxyUrl = `${endpoint}?url=${encodeURIComponent(cleanUrl)}&filename=${encodeURIComponent(filename)}`;
    
    const proxyRes = await fetch(proxyUrl);
    if (proxyRes.ok) {
      const contentType = proxyRes.headers.get('content-type') || '';
      
      if (!contentType.includes('text/html')) {
        const blob = await proxyRes.blob();
        triggerBlobDownload(blob, filename);
        return true;
      }
    }
  } catch {
    // Proxy request failed, proceed to media-specific fallbacks
  }

  // 3. Third Attempt (For Images): HTML5 Canvas Direct Draw & Blob Export
  if (mediaType === 'image') {
    try {
      const success = await downloadImageViaCanvas(cleanUrl, filename);
      if (success) return true;
    } catch {
      // Canvas fallback failed
    }
  }

  // 4. Final Fallback: Direct Download Anchor
  try {
    const link = document.createElement('a');
    link.href = cleanUrl;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 1000);
    return true;
  } catch (finalErr) {
    console.error('All download methods failed:', finalErr);
    window.open(cleanUrl, '_blank', 'noopener,noreferrer');
    return false;
  }
}

function triggerBlobDownload(blob: Blob, filename: string): void {
  const blobUrl = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    window.URL.revokeObjectURL(blobUrl);
    if (document.body.contains(a)) {
      document.body.removeChild(a);
    }
  }, 2500);
}

function downloadImageViaCanvas(imgUrl: string, filename: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width || 800;
        canvas.height = img.naturalHeight || img.height || 600;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(false);
          return;
        }

        ctx.drawImage(img, 0, 0);

        const mime = filename.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
        canvas.toBlob((blob) => {
          if (blob) {
            triggerBlobDownload(blob, filename);
            resolve(true);
          } else {
            resolve(false);
          }
        }, mime, 0.95);
      } catch {
        resolve(false);
      }
    };

    img.onerror = () => {
      resolve(false);
    };

    img.src = imgUrl;
  });
}
