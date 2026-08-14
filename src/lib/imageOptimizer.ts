/**
 * Helper utility to generate optimized thumbnail URLs and HD URLs
 * for faster loading and progressive image display.
 */

export function getThumbnailUrl(url?: string, width = 400): string {
  if (!url) return '';
  
  // Unsplash Optimization
  if (url.includes('images.unsplash.com')) {
    const cleanUrl = url.split('&w=')[0].split('?w=')[0];
    const separator = cleanUrl.includes('?') ? '&' : '?';
    return `${cleanUrl}${separator}w=${width}&q=60&auto=format&fit=crop`;
  }

  // Cloudinary Optimization
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', `/upload/w_${width},q_auto:eco,f_auto/`);
  }

  return url;
}

export function getHdImageUrl(url?: string): string {
  if (!url) return '';

  // Unsplash Optimization
  if (url.includes('images.unsplash.com')) {
    const cleanUrl = url.split('&w=')[0].split('?w=')[0];
    const separator = cleanUrl.includes('?') ? '&' : '?';
    return `${cleanUrl}${separator}w=2000&q=90&auto=format&fit=max`;
  }

  // Cloudinary Optimization
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', '/upload/q_auto:best,f_auto/');
  }

  return url;
}
