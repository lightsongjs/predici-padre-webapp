/**
 * Type Definitions for the Sermon App
 *
 * Comprehensive TypeScript types for:
 * - Sermons and liturgical data
 * - Easter calculations
 * - Cache system
 * - Search and matching
 */

/**
 * Type of sermon based on calendar system
 */
export type SermonType = 'fixed' | 'movable';

/**
 * Sermon categories
 */
export type SermonCategory =
  | 'Predici Duminicale'
  | 'Predici de Sărbători'
  | 'Cursuri Biblice'
  | 'Predici Speciale';

/**
 * Core sermon data structure
 */
export interface Sermon {
  id: string;
  title: string;
  category: SermonCategory | string;
  audio_url: string;
  type: SermonType;
  fixed_month?: number | null;
  fixed_day?: number | null;
  pascha_offset?: number | null;
  duration?: string;
  description?: string;
  gospelReading?: string;
  liturgicalDate?: string;
}

/**
 * Liturgical seasons in the Orthodox calendar
 */
export type LiturgicalSeason =
  | 'Triod' // Pre-Lenten period
  | 'Postul Mare' // Great Lent
  | 'Săptămâna Luminată' // Bright Week
  | 'Perioada Paștală' // Paschal season
  | 'După Rusalii' // After Pentecost
  | 'Perioada Obișnuită'; // Ordinary time

/**
 * Liturgical date with both English and Romanian names
 */
export interface LiturgicalDate {
  name: string;
  nameRo: string;
  offset: number;
  date?: Date;
}

/**
 * Easter dates data structure from JSON
 */
export interface EasterDatesData {
  source: string;
  description: string;
  lastUpdated: string;
  dates: Record<string, string>;
}

/**
 * Cache entry with timestamp
 */
export interface CacheEntry<T> {
  value: T;
  timestamp: number;
  key: string;
}

/**
 * Cache statistics for debugging
 */
export interface CacheStats {
  easterCacheSize: number;
  offsetCacheSize: number;
  sermonCacheSize: number;
  lastCleanup: Date;
}

/**
 * Match type for sermon matching
 */
export type SermonMatchType = 'pascha_offset' | 'fixed_date' | 'both' | 'unknown';

/**
 * Confidence level for sermon matching
 */
export type MatchConfidence = 'exact' | 'partial' | 'none';

/**
 * Result of sermon matching with metadata
 */
export interface SermonMatchResult {
  sermon: Sermon;
  matchType: SermonMatchType;
  paschaOffset?: number;
  confidence: MatchConfidence;
  date: Date;
}

/**
 * Search options for querying sermons
 */
export interface SermonSearchOptions {
  query?: string;
  category?: SermonCategory | string;
  startDate?: Date;
  endDate?: Date;
  includeMovable?: boolean;
  includeFixed?: boolean;
  limit?: number;
  offset?: number;
}

/**
 * Sermon with date context
 */
export interface SermonWithDate {
  date: Date;
  sermon: Sermon;
  matchType?: SermonMatchType;
}

/**
 * Date match information for debugging
 */
export interface DateMatchInfo {
  date: string;
  paschaOffset: number;
  month: number;
  day: number;
  season: LiturgicalSeason;
  matchingSermon: Sermon | null;
  potentialMatches: Array<{ sermon: Sermon; reason: string }>;
}

/**
 * Calendar event (for calendar view integration)
 */
export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  titleRo: string;
  type: 'fixed_feast' | 'movable_feast' | 'sunday' | 'weekday';
  sermon?: Sermon;
  liturgicalInfo?: LiturgicalDate;
}

/**
 * Month calendar data
 */
export interface MonthCalendar {
  year: number;
  month: number;
  days: Array<{
    date: Date;
    dayOfWeek: number;
    sermon: Sermon | null;
    liturgicalName?: string;
    isFeast: boolean;
    isSunday: boolean;
  }>;
}

/**
 * Filter options for sermon library
 */
export interface SermonFilterOptions {
  categories?: SermonCategory[];
  types?: SermonType[];
  hasAudio?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
  sortBy?: 'date' | 'title' | 'category' | 'duration';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Sermon playback state
 */
export interface PlaybackState {
  sermon: Sermon | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isLoading: boolean;
  error: Error | null;
}

/**
 * User preferences for sermon app
 */
export interface UserPreferences {
  autoPlay: boolean;
  playbackSpeed: number;
  darkMode: boolean;
  notificationsEnabled: boolean;
  favoriteCategories: SermonCategory[];
  lastPlayedSermonId?: string;
  bookmarks: string[]; // Sermon IDs
}

/**
 * Analytics event for sermon interaction
 */
export interface SermonAnalyticsEvent {
  type: 'play' | 'pause' | 'complete' | 'bookmark' | 'share';
  sermonId: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

/**
 * Error types for sermon operations
 */
export type SermonErrorType =
  | 'NOT_FOUND'
  | 'NETWORK_ERROR'
  | 'CACHE_ERROR'
  | 'PLAYBACK_ERROR'
  | 'INVALID_DATE'
  | 'UNKNOWN';

/**
 * Sermon operation error
 */
export interface SermonError {
  type: SermonErrorType;
  message: string;
  details?: any;
  timestamp: Date;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: SermonError;
  cached?: boolean;
}
