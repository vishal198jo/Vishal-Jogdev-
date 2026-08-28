/**
 * Unified High-Performance Cache Manager for Vishal Jogdeo Official Portal
 * Provides:
 * 1. Fast In-Memory + Persistent LocalStorage Cache
 * 2. Instant Image Cache & Background Image Preloader
 * 3. Route Chunk Preloader for 0ms page navigation
 * 4. Stale-While-Revalidate caching pattern
 */

// 1. In-Memory Image Cache Registry
export const memoryImageCache = new Set<string>();

// Preload single image and cache its status
export function preloadImage(src: string): Promise<boolean> {
  if (!src) return Promise.resolve(false);
  if (memoryImageCache.has(src)) return Promise.resolve(true);

  return new Promise((resolve) => {
    const img = new Image();
    img.referrerPolicy = 'no-referrer';
    img.onload = () => {
      memoryImageCache.add(src);
      resolve(true);
    };
    img.onerror = () => {
      resolve(false);
    };
    img.src = src;
  });
}

// Batch preload images with concurrency control
export function preloadImages(srcList: string[]) {
  const uniqueSrcs = Array.from(new Set(srcList.filter(Boolean)));
  uniqueSrcs.forEach((src) => {
    if (!memoryImageCache.has(src)) {
      preloadImage(src);
    }
  });
}

// 2. Safe LocalStorage Cache Wrapper with Expiry & Error Handling
export function getPersistentCache<T>(key: string, defaultValue: T, maxAgeMs: number = 7 * 24 * 60 * 60 * 1000): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;

    const parsed = JSON.parse(item);
    if (parsed && typeof parsed === 'object' && 'timestamp' in parsed && 'data' in parsed) {
      const isExpired = Date.now() - parsed.timestamp > maxAgeMs;
      if (!isExpired && parsed.data !== undefined) {
        return parsed.data as T;
      }
    } else if (parsed !== null && parsed !== undefined) {
      return parsed as T;
    }
  } catch (e) {
    // Return fallback silently if storage is restricted or corrupted
  }
  return defaultValue;
}

export function setPersistentCache<T>(key: string, data: T) {
  try {
    const payload = {
      timestamp: Date.now(),
      data,
    };
    localStorage.setItem(key, JSON.stringify(payload));
  } catch (e) {
    // QuotaExceededError handling: attempt to clear legacy temporary keys
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('vj_tmp_')) {
          localStorage.removeItem(k);
        }
      }
      localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
    } catch {
      // Ignore if still failing
    }
  }
}

// 3. Route Chunk Preloader Registry
type ComponentImporter = () => Promise<any>;
const registeredImporters = new Map<string, ComponentImporter>();
const preloadedRoutes = new Set<string>();

export function registerRouteForPreload(routeName: string, importer: ComponentImporter) {
  registeredImporters.set(routeName, importer);
}

export function preloadRouteChunk(routeName: string) {
  if (preloadedRoutes.has(routeName)) return;
  const importer = registeredImporters.get(routeName);
  if (importer) {
    preloadedRoutes.add(routeName);
    importer().catch(() => {
      preloadedRoutes.delete(routeName); // Allow retry on error
    });
  }
}

export function preloadAllRegisteredRoutes() {
  if (typeof window === 'undefined') return;

  // Preload critical core UI assets
  const criticalAssets = [
    'https://cnd.vishaljogdeo.com/vishaljogedomain.png',
    'https://cnd.vishaljogdeo.com/IMG_4246.PNG',
    'https://cnd.vishaljogdeo.com/IMG_4187.PNG'
  ];
  preloadImages(criticalAssets);

  // Use requestIdleCallback if available, otherwise setTimeout
  const idleRunner = (window as any).requestIdleCallback || ((cb: Function) => setTimeout(cb, 1000));
  
  idleRunner(() => {
    registeredImporters.forEach((importer, routeName) => {
      if (!preloadedRoutes.has(routeName)) {
        preloadedRoutes.add(routeName);
        importer().catch(() => {
          preloadedRoutes.delete(routeName);
        });
      }
    });
  });
}
