/**
 * Sermon Cache System
 *
 * Provides efficient caching for:
 * - Easter dates (by year)
 * - Pascha offsets (by date)
 * - Today's sermon (invalidated daily)
 *
 * This minimizes expensive date calculations and database lookups.
 */

import { getOrthodoxEasterLookup } from './easterLookup';
import { calculatePaschaOffset } from './calendarUtils';
import { Sermon } from '../data/data';

/**
 * Cache entry with timestamp for invalidation
 */
interface CacheEntry<T> {
  value: T;
  timestamp: number;
  key: string;
}

/**
 * In-memory cache storage
 */
class SermonCacheStorage {
  private easterCache: Map<number, Date> = new Map();
  private offsetCache: Map<string, number> = new Map();
  private sermonCache: Map<string, Sermon | null> = new Map();
  private lastCacheCleanup: number = Date.now();

  /**
   * Gets Easter date from cache or calculates and caches it
   */
  getEasterDate(year: number): Date | null {
    if (this.easterCache.has(year)) {
      return this.easterCache.get(year)!;
    }

    const easterDate = getOrthodoxEasterLookup(year);
    if (easterDate) {
      this.easterCache.set(year, easterDate);
    }

    return easterDate;
  }

  /**
   * Gets Pascha offset from cache or calculates and caches it
   */
  getPaschaOffset(date: Date): number {
    const dateKey = this.getDateKey(date);

    if (this.offsetCache.has(dateKey)) {
      return this.offsetCache.get(dateKey)!;
    }

    const offset = calculatePaschaOffset(date);
    this.offsetCache.set(dateKey, offset);

    return offset;
  }

  /**
   * Gets cached sermon for a specific date
   */
  getSermon(date: Date): Sermon | null | undefined {
    const dateKey = this.getDateKey(date);
    return this.sermonCache.get(dateKey);
  }

  /**
   * Caches a sermon for a specific date
   */
  setSermon(date: Date, sermon: Sermon | null): void {
    const dateKey = this.getDateKey(date);
    this.sermonCache.set(dateKey, sermon);
  }

  /**
   * Clears all caches (useful for testing or manual refresh)
   */
  clearAll(): void {
    this.easterCache.clear();
    this.offsetCache.clear();
    this.sermonCache.clear();
    this.lastCacheCleanup = Date.now();
  }

  /**
   * Clears old sermon cache entries (older than 7 days)
   * Call this periodically to prevent memory bloat
   */
  cleanupOldEntries(): void {
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

    // Only cleanup once per day
    if (now - this.lastCacheCleanup < 24 * 60 * 60 * 1000) {
      return;
    }

    // Remove sermon cache entries older than 7 days
    const keysToDelete: string[] = [];
    this.sermonCache.forEach((_, key) => {
      const date = this.parseDateKey(key);
      if (date && date.getTime() < sevenDaysAgo) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach((key) => {
      this.sermonCache.delete(key);
    });

    // Remove offset cache entries older than 7 days
    const offsetKeysToDelete: string[] = [];
    this.offsetCache.forEach((_, key) => {
      const date = this.parseDateKey(key);
      if (date && date.getTime() < sevenDaysAgo) {
        offsetKeysToDelete.push(key);
      }
    });

    offsetKeysToDelete.forEach((key) => {
      this.offsetCache.delete(key);
    });

    this.lastCacheCleanup = now;
  }

  /**
   * Converts a Date to a cache key (YYYY-MM-DD)
   */
  private getDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Parses a date key back to a Date object
   */
  private parseDateKey(key: string): Date | null {
    const parts = key.split('-');
    if (parts.length !== 3) return null;

    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;

    return new Date(year, month, day);
  }

  /**
   * Gets cache statistics for debugging
   */
  getCacheStats(): {
    easterCacheSize: number;
    offsetCacheSize: number;
    sermonCacheSize: number;
    lastCleanup: Date;
  } {
    return {
      easterCacheSize: this.easterCache.size,
      offsetCacheSize: this.offsetCache.size,
      sermonCacheSize: this.sermonCache.size,
      lastCleanup: new Date(this.lastCacheCleanup),
    };
  }
}

/**
 * Singleton cache instance
 */
const sermonCache = new SermonCacheStorage();

/**
 * Exports for use throughout the app
 */
export { sermonCache };

/**
 * Hook-style interface for React components
 */
export function useSermonCache() {
  return {
    getEasterDate: (year: number) => sermonCache.getEasterDate(year),
    getPaschaOffset: (date: Date) => sermonCache.getPaschaOffset(date),
    getSermon: (date: Date) => sermonCache.getSermon(date),
    setSermon: (date: Date, sermon: Sermon | null) =>
      sermonCache.setSermon(date, sermon),
    clearAll: () => sermonCache.clearAll(),
    getCacheStats: () => sermonCache.getCacheStats(),
  };
}

/**
 * Initialize cache cleanup on app start
 * This should be called once when the app initializes
 */
export function initializeSermonCache(): void {
  // Run initial cleanup
  sermonCache.cleanupOldEntries();

  // Set up periodic cleanup (every 24 hours)
  if (typeof setInterval !== 'undefined') {
    setInterval(() => {
      sermonCache.cleanupOldEntries();
    }, 24 * 60 * 60 * 1000);
  }
}
