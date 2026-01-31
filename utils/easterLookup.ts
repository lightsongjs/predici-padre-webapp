/**
 * Orthodox Easter Lookup System
 *
 * This module provides functions to work with Orthodox Easter dates for the Romanian Orthodox Church
 * which follows the New Calendar (Gregorian calendar with Julian Paschalion).
 *
 * Instead of using algorithmic calculations which can be error-prone for future years,
 * this system uses a verified lookup table of official Orthodox Easter dates.
 */

import easterDatesData from '../orthodox-easter-dates.json';

/**
 * Interface for the Easter dates data structure
 */
interface EasterDatesData {
  source: string;
  description: string;
  lastUpdated: string;
  dates: Record<string, string>;
}

const easterDates: EasterDatesData = easterDatesData as EasterDatesData;

/**
 * Retrieves the Orthodox Easter date for a given year from the lookup table.
 *
 * This function uses verified Orthodox Easter dates from official Romanian Orthodox Church sources
 * rather than algorithmic calculations, ensuring accuracy for the New Calendar (Gregorian).
 *
 * @param year - The year to get Easter date for
 * @returns The Gregorian date of Orthodox Easter, or null if year is not in lookup table
 *
 * @example
 * const easter2028 = getOrthodoxEasterLookup(2028);
 * // Returns: Date object for April 16, 2028
 */
export function getOrthodoxEasterLookup(year: number): Date | null {
  const yearStr = year.toString();

  if (!easterDates.dates[yearStr]) {
    console.warn(`Orthodox Easter date not found for year ${year}. Available years: ${getAvailableYears().join(', ')}`);
    return null;
  }

  const dateStr = easterDates.dates[yearStr];
  return new Date(dateStr);
}

/**
 * Returns an array of all years available in the Easter dates lookup table.
 *
 * @returns Array of years (as numbers) for which Easter dates are available
 */
export function getAvailableYears(): number[] {
  return Object.keys(easterDates.dates).map(year => parseInt(year, 10)).sort((a, b) => a - b);
}

/**
 * Checks if a given year has an Easter date available in the lookup table.
 *
 * @param year - The year to check
 * @returns True if the year is available, false otherwise
 */
export function hasEasterDate(year: number): boolean {
  return year.toString() in easterDates.dates;
}

/**
 * Gets metadata about the Easter dates data source.
 *
 * @returns Object containing source information and last update date
 */
export function getEasterDataInfo(): { source: string; description: string; lastUpdated: string } {
  return {
    source: easterDates.source,
    description: easterDates.description,
    lastUpdated: easterDates.lastUpdated
  };
}

/**
 * Calculates the number of days between a given date and Orthodox Easter of that year.
 * Negative values indicate days before Easter, positive values indicate days after Easter.
 *
 * @param date - The date to calculate the offset for
 * @returns The number of days from Orthodox Easter (negative = before, positive = after), or null if year unavailable
 *
 * @example
 * const offset = calculatePaschaOffsetLookup(new Date('2028-03-12'));
 * // Returns: -35 (35 days before Easter, which is Palm Sunday - 7 days before)
 */
export function calculatePaschaOffsetLookup(date: Date): number | null {
  const year = date.getFullYear();
  const easter = getOrthodoxEasterLookup(year);

  if (!easter) {
    return null;
  }

  // Reset time components to compare only dates
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const easterOnly = new Date(easter.getFullYear(), easter.getMonth(), easter.getDate());

  const diffTime = dateOnly.getTime() - easterOnly.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * Key liturgical dates and their offsets from Pascha (Easter)
 */
export interface LiturgicalDate {
  name: string;
  nameRo: string;
  offset: number;
  date?: Date;
}

/**
 * Generates all key liturgical dates for a given year based on Orthodox Easter.
 *
 * This includes all movable feasts and important dates in the liturgical calendar
 * that are calculated relative to Pascha (Easter).
 *
 * @param year - The year to generate the liturgical calendar for
 * @returns Array of liturgical dates with names and dates, or null if year unavailable
 *
 * @example
 * const calendar2028 = getLiturgicalCalendar(2028);
 * // Returns array of all movable feasts and Sundays for 2028
 */
export function getLiturgicalCalendar(year: number): LiturgicalDate[] | null {
  const easter = getOrthodoxEasterLookup(year);

  if (!easter) {
    return null;
  }

  // Define all movable feasts and their offsets from Pascha
  const movableFeasts: Omit<LiturgicalDate, 'date'>[] = [
    // Pre-Lenten Sundays
    { name: 'Sunday of the Publican and Pharisee', nameRo: 'Duminica Vameșului și a Fariseului', offset: -70 },
    { name: 'Sunday of the Prodigal Son', nameRo: 'Duminica Fiului Risipitor', offset: -63 },
    { name: 'Sunday of the Last Judgment (Meatfare)', nameRo: 'Duminica Înfricoșătoarei Judecăți', offset: -56 },
    { name: 'Forgiveness Sunday (Cheesefare)', nameRo: 'Duminica Izgonirii lui Adam din Rai', offset: -49 },

    // Great Lent
    { name: 'Beginning of Great Lent (Clean Monday)', nameRo: 'Începutul Postului Mare', offset: -48 },
    { name: 'Sunday of Orthodoxy (1st Sunday of Lent)', nameRo: 'Duminica Ortodoxiei', offset: -42 },
    { name: 'Sunday of St. Gregory Palamas (2nd Sunday of Lent)', nameRo: 'Sfântul Grigorie Palama', offset: -35 },
    { name: 'Sunday of the Holy Cross (3rd Sunday of Lent)', nameRo: 'Duminica Sfintei Cruci', offset: -28 },
    { name: 'Sunday of St. John Climacus (4th Sunday of Lent)', nameRo: 'Sfântul Ioan Scărarul', offset: -21 },
    { name: 'Sunday of St. Mary of Egypt (5th Sunday of Lent)', nameRo: 'Sfânta Maria Egipteanca', offset: -14 },

    // Holy Week
    { name: 'Palm Sunday (Entry into Jerusalem)', nameRo: 'Duminica Floriilor', offset: -7 },
    { name: 'Holy Monday', nameRo: 'Lunea Mare', offset: -6 },
    { name: 'Holy Tuesday', nameRo: 'Marțea Mare', offset: -5 },
    { name: 'Holy Wednesday', nameRo: 'Miercurea Mare', offset: -4 },
    { name: 'Holy Thursday', nameRo: 'Joia Mare', offset: -3 },
    { name: 'Good Friday (Crucifixion)', nameRo: 'Vinerea Mare', offset: -2 },
    { name: 'Holy Saturday', nameRo: 'Sâmbăta Mare', offset: -1 },

    // Pascha and Bright Week
    { name: 'PASCHA - Resurrection of Our Lord', nameRo: 'PAȘTELE - Învierea Domnului', offset: 0 },
    { name: 'Bright Monday', nameRo: 'Lunea Luminată', offset: 1 },
    { name: 'Bright Tuesday', nameRo: 'Marțea Luminată', offset: 2 },
    { name: 'Bright Wednesday', nameRo: 'Miercurea Luminată', offset: 3 },
    { name: 'Bright Thursday', nameRo: 'Joia Luminată', offset: 4 },
    { name: 'Bright Friday', nameRo: 'Vinerea Luminată', offset: 5 },
    { name: 'Bright Saturday', nameRo: 'Sâmbăta Luminată', offset: 6 },

    // Post-Paschal Period
    { name: 'Thomas Sunday (Antipascha)', nameRo: 'Duminica Tomii', offset: 7 },
    { name: 'Sunday of the Myrrhbearers', nameRo: 'Duminica Mironosițelor', offset: 14 },
    { name: 'Sunday of the Paralytic', nameRo: 'Duminica Slăbănogului', offset: 21 },
    { name: 'Sunday of the Samaritan Woman', nameRo: 'Duminica Samarinencei', offset: 28 },
    { name: 'Sunday of the Blind Man', nameRo: 'Duminica Orbului', offset: 35 },

    // Major Feasts
    { name: 'Ascension of Our Lord', nameRo: 'Înălțarea Domnului', offset: 39 },
    { name: 'Sunday of the Fathers of the First Ecumenical Council', nameRo: 'Duminica Sfinților Părinți', offset: 42 },
    { name: 'PENTECOST - Descent of the Holy Spirit', nameRo: 'RUSALIILE - Pogorârea Sfântului Duh', offset: 49 },
    { name: 'Monday of the Holy Spirit', nameRo: 'Lunea Sfântului Duh', offset: 50 },
    { name: 'Sunday of All Saints', nameRo: 'Duminica Tuturor Sfinților', offset: 56 },
  ];

  // Calculate actual dates for each feast
  const liturgicalDates: LiturgicalDate[] = movableFeasts.map(feast => {
    const date = new Date(easter);
    date.setDate(easter.getDate() + feast.offset);

    return {
      ...feast,
      date
    };
  });

  // Add Sundays after Pentecost (typically up to 32-38 depending on the year)
  // We'll add up to 35 Sundays to cover most years
  for (let i = 2; i <= 35; i++) {
    const offset = 49 + (i * 7); // Pentecost is offset 49, then every 7 days
    const date = new Date(easter);
    date.setDate(easter.getDate() + offset);

    // Stop if we've reached the next year
    if (date.getFullYear() !== year) {
      break;
    }

    liturgicalDates.push({
      name: `${i}${getOrdinalSuffix(i)} Sunday after Pentecost`,
      nameRo: `Duminica a ${i}-a după Rusalii`,
      offset,
      date
    });
  }

  return liturgicalDates;
}

/**
 * Helper function to get ordinal suffix for English numbers
 */
function getOrdinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

/**
 * Gets the specific liturgical date name for a given date.
 * Checks both fixed feasts and movable feasts.
 *
 * @param date - The date to get the liturgical name for
 * @returns The Romanian name of the feast/Sunday, or an empty string if no special feast
 */
export function getLiturgicalDateName(date: Date): string {
  const year = date.getFullYear();
  const calendar = getLiturgicalCalendar(year);

  if (!calendar) {
    return '';
  }

  // Check for movable feast
  const dateStr = date.toISOString().split('T')[0];
  const matchingDate = calendar.find(liturgicalDate => {
    if (!liturgicalDate.date) return false;
    const liturgicalDateStr = liturgicalDate.date.toISOString().split('T')[0];
    return liturgicalDateStr === dateStr;
  });

  if (matchingDate) {
    return matchingDate.nameRo;
  }

  // Fixed feasts (by calendar date)
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const fixedFeasts: Record<string, string> = {
    '1-1': 'Anul Nou - Sfântul Vasile cel Mare',
    '1-6': 'Bobotează - Botezul Domnului',
    '1-7': 'Sfântul Ioan Botezătorul',
    '1-30': 'Sfinții Trei Ierarhi',
    '2-2': 'Întâmpinarea Domnului',
    '3-9': 'Sfinții 40 de Mucenici',
    '3-25': 'Buna Vestire',
    '4-23': 'Sfântul Gheorghe',
    '5-21': 'Sfinții Constantin și Elena',
    '6-29': 'Sfinții Petru și Pavel',
    '7-20': 'Sfântul Ilie',
    '8-6': 'Schimbarea la Față',
    '8-15': 'Adormirea Maicii Domnului',
    '8-29': 'Tăierea Capului Sfântului Ioan Botezătorul',
    '9-8': 'Nașterea Maicii Domnului',
    '9-14': 'Înălțarea Sfintei Cruci',
    '10-14': 'Acoperământul Maicii Domnului',
    '11-8': 'Soborul Sfinților Arhangheli Mihail și Gavriil',
    '11-21': 'Intrarea în Biserică a Maicii Domnului',
    '11-30': 'Sfântul Apostol Andrei',
    '12-6': 'Sfântul Nicolae',
    '12-25': 'Nașterea Domnului - Crăciunul',
    '12-26': 'Soborul Maicii Domnului',
    '12-27': 'Sfântul Ștefan',
  };

  const fixedKey = `${month}-${day}`;
  return fixedFeasts[fixedKey] || '';
}

/**
 * Generates a complete liturgical calendar object for a year,
 * including both movable and fixed feasts organized by date.
 *
 * @param year - The year to generate the complete calendar for
 * @returns Object with dates as keys and feast names as values, or null if year unavailable
 */
export function getCompleteLiturgicalCalendar(year: number): Record<string, string> | null {
  const movableFeasts = getLiturgicalCalendar(year);

  if (!movableFeasts) {
    return null;
  }

  const calendar: Record<string, string> = {};

  // Add all movable feasts
  movableFeasts.forEach(feast => {
    if (feast.date) {
      const dateKey = feast.date.toISOString().split('T')[0];
      calendar[dateKey] = feast.nameRo;
    }
  });

  // Add all fixed feasts for this year
  const fixedFeasts: Record<string, string> = {
    '1-1': 'Anul Nou - Sfântul Vasile cel Mare',
    '1-6': 'Bobotează - Botezul Domnului',
    '1-7': 'Sfântul Ioan Botezătorul',
    '1-30': 'Sfinții Trei Ierarhi',
    '2-2': 'Întâmpinarea Domnului',
    '3-9': 'Sfinții 40 de Mucenici',
    '3-25': 'Buna Vestire',
    '4-23': 'Sfântul Gheorghe',
    '5-21': 'Sfinții Constantin și Elena',
    '6-29': 'Sfinții Petru și Pavel',
    '7-20': 'Sfântul Ilie',
    '8-6': 'Schimbarea la Față',
    '8-15': 'Adormirea Maicii Domnului',
    '8-29': 'Tăierea Capului Sfântului Ioan Botezătorul',
    '9-8': 'Nașterea Maicii Domnului',
    '9-14': 'Înălțarea Sfintei Cruci',
    '10-14': 'Acoperământul Maicii Domnului',
    '11-8': 'Soborul Sfinților Arhangheli Mihail și Gavriil',
    '11-21': 'Intrarea în Biserică a Maicii Domnului',
    '11-30': 'Sfântul Apostol Andrei',
    '12-6': 'Sfântul Nicolae',
    '12-25': 'Nașterea Domnului - Crăciunul',
    '12-26': 'Soborul Maicii Domnului',
    '12-27': 'Sfântul Ștefan',
  };

  Object.entries(fixedFeasts).forEach(([monthDay, feastName]) => {
    const [month, day] = monthDay.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const dateKey = date.toISOString().split('T')[0];

    // If there's already a movable feast on this day, combine them
    if (calendar[dateKey]) {
      calendar[dateKey] = `${calendar[dateKey]} / ${feastName}`;
    } else {
      calendar[dateKey] = feastName;
    }
  });

  return calendar;
}
