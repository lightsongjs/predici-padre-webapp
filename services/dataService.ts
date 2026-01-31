/**
 * Data Service
 *
 * Hybrid data loading strategy:
 * 1. Try cached remote data (AsyncStorage) - instant
 * 2. Fetch fresh data from R2 in background - updates without app reinstall
 * 3. Fallback to bundled data if offline - works without network
 *
 * This allows:
 * - Instant updates by uploading new JSON to R2 (no APK/PWA rebuild needed)
 * - Works offline with bundled data
 * - Best performance (cached data loads instantly)
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LibraryItem, libraryMetadata } from '../data/complete-library';

// Configuration
const REMOTE_DATA_URL = 'https://prediciduminica-r2.lightsongjs.workers.dev/sermons.json';
const CACHE_KEY = '@sermons-cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CachedData {
  sermons: LibraryItem[];
  metadata: typeof libraryMetadata;
  timestamp: number;
  version: string;
}

interface DataSource {
  sermons: LibraryItem[];
  metadata: typeof libraryMetadata;
  source: 'cache' | 'remote' | 'bundled';
  lastUpdated: Date;
}

/**
 * Loads sermon data with hybrid strategy
 *
 * Priority:
 * 1. Cached remote data (if fresh)
 * 2. Fetch new remote data (cache it)
 * 3. Bundled data (offline fallback)
 */
export async function loadSermonData(): Promise<DataSource> {
  try {
    // Step 1: Check cache first (instant)
    const cached = await getCachedData();
    if (cached && isCacheFresh(cached.timestamp)) {
      console.log('[DataService] Using cached data');
      return {
        sermons: cached.sermons,
        metadata: cached.metadata,
        source: 'cache',
        lastUpdated: new Date(cached.timestamp),
      };
    }

    // Step 2: Try to fetch fresh data from R2
    console.log('[DataService] Fetching fresh data from R2...');
    const remote = await fetchRemoteData();

    if (remote) {
      console.log('[DataService] Successfully fetched remote data');
      // Cache it for next time
      await cacheData(remote);
      return {
        sermons: remote.sermons,
        metadata: remote.metadata,
        source: 'remote',
        lastUpdated: new Date(),
      };
    }

    // Step 3: If we have stale cache, use it (better than nothing)
    if (cached) {
      console.log('[DataService] Using stale cache (remote fetch failed)');
      return {
        sermons: cached.sermons,
        metadata: cached.metadata,
        source: 'cache',
        lastUpdated: new Date(cached.timestamp),
      };
    }

    // Step 4: Ultimate fallback - bundled data
    console.log('[DataService] Using bundled fallback data');
    return await loadBundledData();

  } catch (error) {
    console.error('[DataService] Error loading data, using bundled fallback:', error);
    return await loadBundledData();
  }
}

/**
 * Fetches sermon data from Cloudflare R2
 */
async function fetchRemoteData(): Promise<{ sermons: LibraryItem[]; metadata: typeof libraryMetadata } | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(REMOTE_DATA_URL, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[DataService] Remote fetch failed: ${response.status}`);
      return null;
    }

    const data = await response.json();

    // Validate data structure
    if (!data.sermons || !Array.isArray(data.sermons)) {
      console.error('[DataService] Invalid remote data structure');
      return null;
    }

    return {
      sermons: data.sermons,
      metadata: data.metadata || libraryMetadata,
    };

  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('[DataService] Remote fetch timeout');
    } else {
      console.error('[DataService] Remote fetch error:', error);
    }
    return null;
  }
}

/**
 * Loads bundled data (offline fallback)
 */
async function loadBundledData(): Promise<DataSource> {
  // Dynamic import to avoid bundling issues
  const bundled = await import('../data/complete-library');

  return {
    sermons: bundled.sermons || [],
    metadata: bundled.libraryMetadata,
    source: 'bundled',
    lastUpdated: new Date(bundled.libraryMetadata.lastUpdated),
  };
}

/**
 * Gets cached data from AsyncStorage
 */
async function getCachedData(): Promise<CachedData | null> {
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const data = JSON.parse(cached) as CachedData;
    return data;
  } catch (error) {
    console.error('[DataService] Error reading cache:', error);
    return null;
  }
}

/**
 * Saves data to AsyncStorage cache
 */
async function cacheData(data: { sermons: LibraryItem[]; metadata: typeof libraryMetadata }): Promise<void> {
  try {
    const cacheData: CachedData = {
      sermons: data.sermons,
      metadata: data.metadata,
      timestamp: Date.now(),
      version: data.metadata.lastUpdated,
    };

    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    console.log('[DataService] Data cached successfully');
  } catch (error) {
    console.error('[DataService] Error caching data:', error);
  }
}

/**
 * Checks if cached data is still fresh
 */
function isCacheFresh(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_DURATION;
}

/**
 * Clears the sermon data cache
 * (useful for debugging or forcing a refresh)
 */
export async function clearSermonCache(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CACHE_KEY);
    console.log('[DataService] Cache cleared');
  } catch (error) {
    console.error('[DataService] Error clearing cache:', error);
  }
}

/**
 * Forces a refresh of sermon data from remote
 */
export async function forceRefreshSermonData(): Promise<DataSource> {
  await clearSermonCache();
  return loadSermonData();
}

/**
 * Gets cache info for debugging
 */
export async function getCacheInfo(): Promise<{
  isCached: boolean;
  age?: number;
  isFresh?: boolean;
  timestamp?: Date;
}> {
  const cached = await getCachedData();

  if (!cached) {
    return { isCached: false };
  }

  const age = Date.now() - cached.timestamp;

  return {
    isCached: true,
    age,
    isFresh: isCacheFresh(cached.timestamp),
    timestamp: new Date(cached.timestamp),
  };
}
