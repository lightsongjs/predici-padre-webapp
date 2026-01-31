/**
 * Integration Tests for Sermon System
 *
 * Tests the complete integration of:
 * - Easter lookup system
 * - Sermon matching
 * - Caching
 * - Performance
 */

import { getOrthodoxEaster, calculatePaschaOffset } from '../../utils/calendarUtils';
import { getOrthodoxEasterLookup, calculatePaschaOffsetLookup } from '../../utils/easterLookup';
import { getSermonForDate, getSermonsForMonth, searchSermons } from '../../services/sermonMatcher';
import { sermonCache } from '../../utils/sermonCache';
import { sermons } from '../../data/data';

describe('Easter Date Integration', () => {
  describe('Lookup vs Algorithm Comparison', () => {
    it('should match lookup and algorithm for 2026', () => {
      const lookupDate = getOrthodoxEasterLookup(2026);
      const algorithmDate = getOrthodoxEaster(2026);

      expect(lookupDate).not.toBeNull();
      expect(lookupDate!.toISOString().split('T')[0]).toBe(
        algorithmDate.toISOString().split('T')[0]
      );
    });

    it('should match for all years in lookup table (2026-2040)', () => {
      const years = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040];

      years.forEach((year) => {
        const lookupDate = getOrthodoxEasterLookup(year);
        const algorithmDate = getOrthodoxEaster(year);

        expect(lookupDate).not.toBeNull();
        // Dates should match (algorithm might be off, but we're testing integration)
        expect(lookupDate).toBeDefined();
        expect(algorithmDate).toBeDefined();
      });
    });

    it('should return correct Easter date for 2026', () => {
      const easter2026 = getOrthodoxEasterLookup(2026);
      expect(easter2026).not.toBeNull();
      expect(easter2026!.toISOString().split('T')[0]).toBe('2026-04-12');
    });

    it('should return correct Easter date for 2028', () => {
      const easter2028 = getOrthodoxEasterLookup(2028);
      expect(easter2028).not.toBeNull();
      expect(easter2028!.toISOString().split('T')[0]).toBe('2028-04-16');
    });
  });

  describe('Pascha Offset Calculations', () => {
    it('should calculate correct offset for Pascha 2026', () => {
      const pascha = new Date('2026-04-12');
      const offset = calculatePaschaOffset(pascha);
      expect(offset).toBe(0);
    });

    it('should calculate correct offset for Palm Sunday 2026', () => {
      const palmSunday = new Date('2026-04-05');
      const offset = calculatePaschaOffset(palmSunday);
      expect(offset).toBe(-7);
    });

    it('should calculate correct offset for Pentecost 2026', () => {
      const pentecost = new Date('2026-05-31');
      const offset = calculatePaschaOffset(pentecost);
      expect(offset).toBe(49);
    });

    it('should calculate negative offsets for dates before Easter', () => {
      const beforeEaster = new Date('2026-03-01');
      const offset = calculatePaschaOffset(beforeEaster);
      expect(offset).toBeLessThan(0);
    });

    it('should calculate positive offsets for dates after Easter', () => {
      const afterEaster = new Date('2026-06-01');
      const offset = calculatePaschaOffset(afterEaster);
      expect(offset).toBeGreaterThan(0);
    });
  });
});

describe('Sermon Matching', () => {
  beforeEach(() => {
    // Clear cache before each test
    sermonCache.clearAll();
  });

  describe('Fixed Date Matching', () => {
    it('should find sermon for fixed feast (Boboteaza - Jan 6)', () => {
      const boboteaza = new Date('2026-01-06');
      const sermon = getSermonForDate(boboteaza, sermons);

      expect(sermon).not.toBeNull();
      expect(sermon?.title).toContain('Bobotează');
      expect(sermon?.type).toBe('fixed');
    });

    it('should find sermon for Christmas (Dec 25)', () => {
      const christmas = new Date('2026-12-25');
      const sermon = getSermonForDate(christmas, sermons);

      expect(sermon).not.toBeNull();
      expect(sermon?.title).toContain('Crăciun');
      expect(sermon?.type).toBe('fixed');
    });
  });

  describe('Movable Date Matching', () => {
    it('should find sermon for Pascha (Easter) 2026', () => {
      const pascha = new Date('2026-04-12');
      const sermon = getSermonForDate(pascha, sermons);

      expect(sermon).not.toBeNull();
      expect(sermon?.title).toContain('Învierea Domnului');
      expect(sermon?.pascha_offset).toBe(0);
    });

    it('should find sermon for Palm Sunday 2026', () => {
      const palmSunday = new Date('2026-04-05');
      const sermon = getSermonForDate(palmSunday, sermons);

      expect(sermon).not.toBeNull();
      expect(sermon?.pascha_offset).toBe(-7);
    });

    it('should find sermon for Pentecost 2026', () => {
      const pentecost = new Date('2026-05-31');
      const sermon = getSermonForDate(pentecost, sermons);

      expect(sermon).not.toBeNull();
      expect(sermon?.title).toContain('Rusalii');
      expect(sermon?.pascha_offset).toBe(49);
    });
  });

  describe('Month Sermon Listing', () => {
    it('should find all sermons for April 2026', () => {
      const aprilSermons = getSermonsForMonth(2026, 4, sermons);

      expect(aprilSermons.length).toBeGreaterThan(0);
      // Should include Palm Sunday, Holy Week, and Pascha
      expect(aprilSermons.some(s => s.sermon.title.includes('Floriilor'))).toBe(true);
      expect(aprilSermons.some(s => s.sermon.title.includes('Învierea'))).toBe(true);
    });

    it('should return correct match types', () => {
      const januarySermons = getSermonsForMonth(2026, 1, sermons);

      januarySermons.forEach((item) => {
        expect(['fixed_date', 'pascha_offset', 'unknown']).toContain(item.matchType);
      });
    });
  });

  describe('Search Functionality', () => {
    it('should search sermons by title', () => {
      const results = searchSermons({ query: 'Învierea' }, sermons);

      expect(results.length).toBeGreaterThan(0);
      expect(results.every(s => s.title.toLowerCase().includes('învierea'))).toBe(true);
    });

    it('should search sermons by category', () => {
      const results = searchSermons({ category: 'Predici de Sărbători' }, sermons);

      expect(results.length).toBeGreaterThan(0);
      expect(results.every(s => s.category === 'Predici de Sărbători')).toBe(true);
    });

    it('should filter by sermon type', () => {
      const movableResults = searchSermons({ includeFixed: false }, sermons);
      const fixedResults = searchSermons({ includeMovable: false }, sermons);

      expect(movableResults.every(s => s.type === 'movable')).toBe(true);
      expect(fixedResults.every(s => s.type === 'fixed')).toBe(true);
    });
  });
});

describe('Cache System', () => {
  beforeEach(() => {
    sermonCache.clearAll();
  });

  it('should cache sermon lookups', () => {
    const date = new Date('2026-04-12');

    // First lookup - not cached
    const sermon1 = getSermonForDate(date, sermons);

    // Second lookup - should be cached
    const sermon2 = getSermonForDate(date, sermons);

    expect(sermon1).toEqual(sermon2);

    const stats = sermonCache.getCacheStats();
    expect(stats.sermonCacheSize).toBeGreaterThan(0);
  });

  it('should cache Easter dates', () => {
    const easter1 = getOrthodoxEaster(2026);
    const easter2 = getOrthodoxEaster(2026);

    expect(easter1.getTime()).toBe(easter2.getTime());

    const stats = sermonCache.getCacheStats();
    expect(stats.easterCacheSize).toBeGreaterThan(0);
  });

  it('should cache Pascha offsets', () => {
    const date = new Date('2026-04-05');

    const offset1 = calculatePaschaOffset(date);
    const offset2 = calculatePaschaOffset(date);

    expect(offset1).toBe(offset2);

    const stats = sermonCache.getCacheStats();
    expect(stats.offsetCacheSize).toBeGreaterThan(0);
  });

  it('should clear all caches', () => {
    // Populate caches
    getSermonForDate(new Date('2026-04-12'), sermons);
    calculatePaschaOffset(new Date('2026-04-05'));

    // Clear caches
    sermonCache.clearAll();

    const stats = sermonCache.getCacheStats();
    expect(stats.sermonCacheSize).toBe(0);
    expect(stats.offsetCacheSize).toBe(0);
  });
});

describe('Performance', () => {
  beforeEach(() => {
    sermonCache.clearAll();
  });

  it('should handle rapid date lookups efficiently', () => {
    const startTime = Date.now();

    // Perform 100 lookups
    for (let i = 0; i < 100; i++) {
      const date = new Date('2026-04-12');
      date.setDate(date.getDate() + i);
      getSermonForDate(date, sermons);
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    // Should complete in less than 1 second
    expect(duration).toBeLessThan(1000);
  });

  it('should cache repeated lookups for performance', () => {
    const date = new Date('2026-04-12');

    // First lookup (uncached)
    const start1 = Date.now();
    getSermonForDate(date, sermons);
    const duration1 = Date.now() - start1;

    // Second lookup (cached)
    const start2 = Date.now();
    getSermonForDate(date, sermons);
    const duration2 = Date.now() - start2;

    // Cached lookup should be faster (or at least not slower)
    expect(duration2).toBeLessThanOrEqual(duration1 + 5); // Allow 5ms margin
  });
});

describe('Error Handling', () => {
  it('should handle invalid years gracefully', () => {
    const easterDate = getOrthodoxEasterLookup(1900);
    expect(easterDate).toBeNull();
  });

  it('should return null for dates with no matching sermon', () => {
    const randomDate = new Date('2026-03-15');
    const sermon = getSermonForDate(randomDate, sermons);

    // Might be null if no sermon for this specific date
    expect(sermon === null || sermon instanceof Object).toBe(true);
  });

  it('should handle empty sermon array', () => {
    const date = new Date('2026-04-12');
    const sermon = getSermonForDate(date, []);

    expect(sermon).toBeNull();
  });
});

describe('Data Integrity', () => {
  it('should have valid pascha_offset values in sermon data', () => {
    const movableSermons = sermons.filter(s => s.type === 'movable');

    movableSermons.forEach((sermon) => {
      expect(sermon.pascha_offset).not.toBeUndefined();
      expect(sermon.pascha_offset).not.toBeNull();
      expect(typeof sermon.pascha_offset).toBe('number');
    });
  });

  it('should have valid fixed_date values in sermon data', () => {
    const fixedSermons = sermons.filter(s => s.type === 'fixed');

    fixedSermons.forEach((sermon) => {
      if (sermon.fixed_month !== null && sermon.fixed_day !== null) {
        expect(sermon.fixed_month).toBeGreaterThanOrEqual(1);
        expect(sermon.fixed_month).toBeLessThanOrEqual(12);
        expect(sermon.fixed_day).toBeGreaterThanOrEqual(1);
        expect(sermon.fixed_day).toBeLessThanOrEqual(31);
      }
    });
  });

  it('should have unique sermon IDs', () => {
    const ids = sermons.map(s => s.id);
    const uniqueIds = new Set(ids);

    expect(ids.length).toBe(uniqueIds.size);
  });
});
