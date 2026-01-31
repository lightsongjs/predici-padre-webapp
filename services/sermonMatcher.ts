/**
 * Sermon Matcher Service
 *
 * Provides intelligent sermon matching based on:
 * - Pascha offset (movable feasts)
 * - Fixed calendar dates
 * - Date ranges
 * - Search queries
 *
 * Includes efficient caching to minimize redundant calculations.
 */

import { Sermon } from '../data/data';
import { calculatePaschaOffset } from '../utils/calendarUtils';
import { sermonCache } from '../utils/sermonCache';

/**
 * Result of sermon matching with metadata
 */
export interface SermonMatchResult {
  sermon: Sermon;
  matchType: 'pascha_offset' | 'fixed_date' | 'both';
  paschaOffset?: number;
  confidence: 'exact' | 'partial';
}

/**
 * Search options for sermon queries
 */
export interface SermonSearchOptions {
  query?: string;
  category?: string;
  startDate?: Date;
  endDate?: Date;
  includeMovable?: boolean;
  includeFixed?: boolean;
}

/**
 * Finds the sermon for a specific date, with caching.
 *
 * Matching priority:
 * 1. Check cache first
 * 2. Fixed date matches (saints' feast days)
 * 3. Pascha offset matches (movable feasts)
 *
 * @param date - The date to find sermon for
 * @param sermons - Array of all available sermons
 * @returns The matching sermon or null
 */
export function getSermonForDate(
  date: Date,
  sermons: Sermon[]
): Sermon | null {
  // Check cache first
  const cached = sermonCache.getSermon(date);
  if (cached !== undefined) {
    return cached;
  }

  // Calculate date components
  const month = date.getMonth() + 1; // JavaScript months are 0-indexed
  const day = date.getDate();
  const paschaOffset = calculatePaschaOffset(date);

  // Find matching sermon
  const matchingSermon = sermons.find((sermon) => {
    // Check for fixed date match (highest priority - major feast days)
    if (sermon.fixed_month !== null && sermon.fixed_day !== null) {
      if (sermon.fixed_month === month && sermon.fixed_day === day) {
        return true;
      }
    }

    // Check for pascha offset match (movable feasts and Sundays)
    if (sermon.pascha_offset !== null && sermon.pascha_offset === paschaOffset) {
      return true;
    }

    return false;
  });

  const result = matchingSermon || null;

  // Cache the result (even if null)
  sermonCache.setSermon(date, result);

  return result;
}

/**
 * Gets all sermons for a specific month.
 *
 * @param year - The year
 * @param month - The month (1-12)
 * @param sermons - Array of all available sermons
 * @returns Array of sermon match results with dates
 */
export function getSermonsForMonth(
  year: number,
  month: number,
  sermons: Sermon[]
): Array<{ date: Date; sermon: Sermon; matchType: string }> {
  const results: Array<{ date: Date; sermon: Sermon; matchType: string }> = [];

  // Get number of days in the month
  const daysInMonth = new Date(year, month, 0).getDate();

  // Check each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const sermon = getSermonForDate(date, sermons);

    if (sermon) {
      const paschaOffset = calculatePaschaOffset(date);
      const matchType =
        sermon.fixed_month !== null && sermon.fixed_day !== null
          ? 'fixed_date'
          : sermon.pascha_offset !== null && sermon.pascha_offset === paschaOffset
          ? 'pascha_offset'
          : 'unknown';

      results.push({ date, sermon, matchType });
    }
  }

  return results;
}

/**
 * Gets all Sundays in a specific month with their sermons.
 *
 * @param year - The year
 * @param month - The month (1-12)
 * @param sermons - Array of all available sermons
 * @returns Array of Sundays with their sermons
 */
export function getSundaysForMonth(
  year: number,
  month: number,
  sermons: Sermon[]
): Array<{ date: Date; sermon: Sermon | null }> {
  const sundays: Array<{ date: Date; sermon: Sermon | null }> = [];
  const daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);

    // Check if it's Sunday (0 = Sunday)
    if (date.getDay() === 0) {
      const sermon = getSermonForDate(date, sermons);
      sundays.push({ date, sermon });
    }
  }

  return sundays;
}

/**
 * Searches sermons by title, description, or gospel reading.
 *
 * @param options - Search options
 * @param sermons - Array of all available sermons
 * @returns Array of matching sermons
 */
export function searchSermons(
  options: SermonSearchOptions,
  sermons: Sermon[]
): Sermon[] {
  let results = [...sermons];

  // Filter by category
  if (options.category) {
    results = results.filter(
      (sermon) =>
        sermon.category.toLowerCase() === options.category!.toLowerCase()
    );
  }

  // Filter by sermon type
  if (options.includeMovable === false) {
    results = results.filter((sermon) => sermon.type !== 'movable');
  }
  if (options.includeFixed === false) {
    results = results.filter((sermon) => sermon.type !== 'fixed');
  }

  // Filter by text query
  if (options.query) {
    const queryLower = options.query.toLowerCase();
    results = results.filter((sermon) => {
      const titleMatch = sermon.title.toLowerCase().includes(queryLower);
      const descriptionMatch = sermon.description
        ?.toLowerCase()
        .includes(queryLower);
      const gospelMatch = sermon.gospelReading
        ?.toLowerCase()
        .includes(queryLower);
      const categoryMatch = sermon.category.toLowerCase().includes(queryLower);

      return titleMatch || descriptionMatch || gospelMatch || categoryMatch;
    });
  }

  return results;
}

/**
 * Gets upcoming sermons (next N days from today).
 *
 * @param days - Number of days to look ahead
 * @param sermons - Array of all available sermons
 * @returns Array of upcoming sermons with their dates
 */
export function getUpcomingSermons(
  days: number,
  sermons: Sermon[]
): Array<{ date: Date; sermon: Sermon }> {
  const results: Array<{ date: Date; sermon: Sermon }> = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const sermon = getSermonForDate(date, sermons);
    if (sermon) {
      results.push({ date, sermon });
    }
  }

  return results;
}

/**
 * Gets all major feast sermons (fixed and movable).
 *
 * @param sermons - Array of all available sermons
 * @returns Array of feast day sermons
 */
export function getMajorFeastSermons(sermons: Sermon[]): Sermon[] {
  // Major feast categories
  const feastCategories = ['Predici de Sărbători'];

  return sermons.filter((sermon) =>
    feastCategories.includes(sermon.category)
  );
}

/**
 * Gets the liturgical season for a given date.
 *
 * @param date - The date to check
 * @returns The liturgical season name
 */
export function getLiturgicalSeason(date: Date): string {
  const paschaOffset = calculatePaschaOffset(date);

  // Great Lent
  if (paschaOffset >= -48 && paschaOffset <= -1) {
    return 'Postul Mare';
  }

  // Bright Week (Week after Pascha)
  if (paschaOffset >= 0 && paschaOffset <= 7) {
    return 'Săptămâna Luminată';
  }

  // Paschal season (until Pentecost)
  if (paschaOffset >= 8 && paschaOffset <= 49) {
    return 'Perioada Paștală';
  }

  // After Pentecost
  if (paschaOffset >= 50) {
    return 'După Rusalii';
  }

  // Pre-Lenten period (Triodion)
  if (paschaOffset >= -70 && paschaOffset <= -49) {
    return 'Triod';
  }

  // Ordinary time
  return 'Perioada Obișnuită';
}

/**
 * Gets detailed match information for debugging.
 *
 * @param date - The date to analyze
 * @param sermons - Array of all available sermons
 * @returns Detailed matching information
 */
export function getDateMatchInfo(
  date: Date,
  sermons: Sermon[]
): {
  date: string;
  paschaOffset: number;
  month: number;
  day: number;
  season: string;
  matchingSermon: Sermon | null;
  potentialMatches: Array<{ sermon: Sermon; reason: string }>;
} {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const paschaOffset = calculatePaschaOffset(date);
  const season = getLiturgicalSeason(date);
  const matchingSermon = getSermonForDate(date, sermons);

  // Find all potential matches for debugging
  const potentialMatches: Array<{ sermon: Sermon; reason: string }> = [];

  sermons.forEach((sermon) => {
    if (sermon.fixed_month === month && sermon.fixed_day === day) {
      potentialMatches.push({
        sermon,
        reason: `Fixed date match: ${month}/${day}`,
      });
    }

    if (sermon.pascha_offset === paschaOffset) {
      potentialMatches.push({
        sermon,
        reason: `Pascha offset match: ${paschaOffset}`,
      });
    }
  });

  return {
    date: date.toISOString().split('T')[0],
    paschaOffset,
    month,
    day,
    season,
    matchingSermon,
    potentialMatches,
  };
}
