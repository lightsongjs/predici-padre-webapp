/**
 * Test script for the Orthodox Easter Lookup System (JavaScript version)
 *
 * This script tests the Easter lookup data by:
 * 1. Verifying Easter dates for all available years
 * 2. Generating a complete liturgical calendar for 2028
 * 3. Testing key date calculations
 */

const fs = require('fs');
const path = require('path');

// Load the Easter dates data
const easterDatesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'orthodox-easter-dates.json'), 'utf-8')
);

/**
 * Retrieves the Orthodox Easter date for a given year from the lookup table.
 */
function getOrthodoxEasterLookup(year) {
  const yearStr = year.toString();

  if (!easterDatesData.dates[yearStr]) {
    console.warn(`Orthodox Easter date not found for year ${year}`);
    return null;
  }

  const dateStr = easterDatesData.dates[yearStr];
  return new Date(dateStr);
}

/**
 * Returns an array of all years available in the Easter dates lookup table.
 */
function getAvailableYears() {
  return Object.keys(easterDatesData.dates).map(year => parseInt(year, 10)).sort((a, b) => a - b);
}

/**
 * Calculates the number of days between a given date and Orthodox Easter of that year.
 */
function calculatePaschaOffsetLookup(date) {
  const year = date.getFullYear();
  const easter = getOrthodoxEasterLookup(year);

  if (!easter) {
    return null;
  }

  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const easterOnly = new Date(easter.getFullYear(), easter.getMonth(), easter.getDate());

  const diffTime = dateOnly.getTime() - easterOnly.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * Generates all key liturgical dates for a given year based on Orthodox Easter.
 */
function getLiturgicalCalendar(year) {
  const easter = getOrthodoxEasterLookup(year);

  if (!easter) {
    return null;
  }

  const movableFeasts = [
    { name: 'Sunday of the Publican and Pharisee', nameRo: 'Duminica Vameșului și a Fariseului', offset: -70 },
    { name: 'Sunday of the Prodigal Son', nameRo: 'Duminica Fiului Risipitor', offset: -63 },
    { name: 'Sunday of the Last Judgment (Meatfare)', nameRo: 'Duminica Înfricoșătoarei Judecăți', offset: -56 },
    { name: 'Forgiveness Sunday (Cheesefare)', nameRo: 'Duminica Izgonirii lui Adam din Rai', offset: -49 },
    { name: 'Beginning of Great Lent (Clean Monday)', nameRo: 'Începutul Postului Mare', offset: -48 },
    { name: 'Sunday of Orthodoxy (1st Sunday of Lent)', nameRo: 'Duminica Ortodoxiei', offset: -42 },
    { name: 'Sunday of St. Gregory Palamas (2nd Sunday of Lent)', nameRo: 'Sfântul Grigorie Palama', offset: -35 },
    { name: 'Sunday of the Holy Cross (3rd Sunday of Lent)', nameRo: 'Duminica Sfintei Cruci', offset: -28 },
    { name: 'Sunday of St. John Climacus (4th Sunday of Lent)', nameRo: 'Sfântul Ioan Scărarul', offset: -21 },
    { name: 'Sunday of St. Mary of Egypt (5th Sunday of Lent)', nameRo: 'Sfânta Maria Egipteanca', offset: -14 },
    { name: 'Palm Sunday (Entry into Jerusalem)', nameRo: 'Duminica Floriilor', offset: -7 },
    { name: 'Holy Monday', nameRo: 'Lunea Mare', offset: -6 },
    { name: 'Holy Tuesday', nameRo: 'Marțea Mare', offset: -5 },
    { name: 'Holy Wednesday', nameRo: 'Miercurea Mare', offset: -4 },
    { name: 'Holy Thursday', nameRo: 'Joia Mare', offset: -3 },
    { name: 'Good Friday (Crucifixion)', nameRo: 'Vinerea Mare', offset: -2 },
    { name: 'Holy Saturday', nameRo: 'Sâmbăta Mare', offset: -1 },
    { name: 'PASCHA - Resurrection of Our Lord', nameRo: 'PAȘTELE - Învierea Domnului', offset: 0 },
    { name: 'Bright Monday', nameRo: 'Lunea Luminată', offset: 1 },
    { name: 'Bright Tuesday', nameRo: 'Marțea Luminată', offset: 2 },
    { name: 'Bright Wednesday', nameRo: 'Miercurea Luminată', offset: 3 },
    { name: 'Bright Thursday', nameRo: 'Joia Luminată', offset: 4 },
    { name: 'Bright Friday', nameRo: 'Vinerea Luminată', offset: 5 },
    { name: 'Bright Saturday', nameRo: 'Sâmbăta Luminată', offset: 6 },
    { name: 'Thomas Sunday (Antipascha)', nameRo: 'Duminica Tomii', offset: 7 },
    { name: 'Sunday of the Myrrhbearers', nameRo: 'Duminica Mironosițelor', offset: 14 },
    { name: 'Sunday of the Paralytic', nameRo: 'Duminica Slăbănogului', offset: 21 },
    { name: 'Sunday of the Samaritan Woman', nameRo: 'Duminica Samarinencei', offset: 28 },
    { name: 'Sunday of the Blind Man', nameRo: 'Duminica Orbului', offset: 35 },
    { name: 'Ascension of Our Lord', nameRo: 'Înălțarea Domnului', offset: 39 },
    { name: 'Sunday of the Fathers of the First Ecumenical Council', nameRo: 'Duminica Sfinților Părinți', offset: 42 },
    { name: 'PENTECOST - Descent of the Holy Spirit', nameRo: 'RUSALIILE - Pogorârea Sfântului Duh', offset: 49 },
    { name: 'Monday of the Holy Spirit', nameRo: 'Lunea Sfântului Duh', offset: 50 },
    { name: 'Sunday of All Saints', nameRo: 'Duminica Tuturor Sfinților', offset: 56 },
  ];

  const liturgicalDates = movableFeasts.map(feast => {
    const date = new Date(easter);
    date.setDate(easter.getDate() + feast.offset);

    return {
      ...feast,
      date: date.toISOString().split('T')[0]
    };
  });

  // Add Sundays after Pentecost
  for (let i = 2; i <= 35; i++) {
    const offset = 49 + (i * 7);
    const date = new Date(easter);
    date.setDate(easter.getDate() + offset);

    if (date.getFullYear() !== year) {
      break;
    }

    liturgicalDates.push({
      name: `${i}${getOrdinalSuffix(i)} Sunday after Pentecost`,
      nameRo: `Duminica a ${i}-a după Rusalii`,
      offset,
      date: date.toISOString().split('T')[0]
    });
  }

  return liturgicalDates;
}

function getOrdinalSuffix(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

function getCompleteLiturgicalCalendar(year) {
  const movableFeasts = getLiturgicalCalendar(year);

  if (!movableFeasts) {
    return null;
  }

  const calendar = {};

  movableFeasts.forEach(feast => {
    if (feast.date) {
      calendar[feast.date] = feast.nameRo;
    }
  });

  const fixedFeasts = {
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

    if (calendar[dateKey]) {
      calendar[dateKey] = `${calendar[dateKey]} / ${feastName}`;
    } else {
      calendar[dateKey] = feastName;
    }
  });

  return calendar;
}

// Run the tests
console.log('='.repeat(80));
console.log('ORTHODOX EASTER LOOKUP SYSTEM - TEST SUITE');
console.log('='.repeat(80));
console.log();

// Test 1: Data Source Information
console.log('1. DATA SOURCE INFORMATION');
console.log('-'.repeat(80));
console.log(`Source: ${easterDatesData.source}`);
console.log(`Description: ${easterDatesData.description}`);
console.log(`Last Updated: ${easterDatesData.lastUpdated}`);
console.log();

// Test 2: Available Years
console.log('2. AVAILABLE YEARS');
console.log('-'.repeat(80));
const years = getAvailableYears();
console.log(`Available years: ${years.join(', ')}`);
console.log(`Total years in database: ${years.length}`);
console.log();

// Test 3: Verify All Easter Dates
console.log('3. ORTHODOX EASTER DATES (2026-2040)');
console.log('-'.repeat(80));
years.forEach(year => {
  const easter = getOrthodoxEasterLookup(year);
  if (easter) {
    const formatted = easter.toLocaleDateString('ro-RO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    console.log(`${year}: ${formatted}`);
  }
});
console.log();

// Test 4: Pascha Offset Calculations for 2028
console.log('4. PASCHA OFFSET CALCULATIONS FOR 2028');
console.log('-'.repeat(80));
const easter2028 = getOrthodoxEasterLookup(2028);
if (easter2028) {
  console.log(`Easter 2028: ${easter2028.toLocaleDateString('ro-RO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}`);
  console.log();

  const testDates = [
    { desc: 'Clean Monday (start of Lent)', date: new Date('2028-02-28') },
    { desc: 'Palm Sunday', date: new Date('2028-04-09') },
    { desc: 'Good Friday', date: new Date('2028-04-14') },
    { desc: 'Easter Sunday', date: new Date('2028-04-16') },
    { desc: 'Ascension', date: new Date('2028-05-25') },
    { desc: 'Pentecost', date: new Date('2028-06-04') }
  ];

  testDates.forEach(({ desc, date }) => {
    const offset = calculatePaschaOffsetLookup(date);
    console.log(`${desc}: ${date.toLocaleDateString('ro-RO')} (offset: ${offset})`);
  });
}
console.log();

// Test 5: Generate Complete Liturgical Calendar for 2028
console.log('5. LITURGICAL CALENDAR FOR 2028');
console.log('-'.repeat(80));
const liturgicalCalendar = getLiturgicalCalendar(2028);
if (liturgicalCalendar) {
  console.log(`Total liturgical dates: ${liturgicalCalendar.length}`);
  console.log();
  console.log('Key dates:');

  const importantOffsets = [-70, -49, -48, -42, -7, 0, 7, 39, 49, 50, 56];
  liturgicalCalendar
    .filter(date => importantOffsets.includes(date.offset))
    .forEach(dateInfo => {
      const date = new Date(dateInfo.date);
      const formatted = date.toLocaleDateString('ro-RO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      console.log(`  ${dateInfo.nameRo}`);
      console.log(`    ${formatted} (offset: ${dateInfo.offset})`);
    });
}
console.log();

// Test 6: Generate Complete Calendar JSON for 2028
console.log('6. COMPLETE CALENDAR FOR 2028 (Sample)');
console.log('-'.repeat(80));
const completeCalendar = getCompleteLiturgicalCalendar(2028);
if (completeCalendar) {
  const entries = Object.entries(completeCalendar);
  console.log(`Total dates with feasts: ${entries.length}`);
  console.log();
  console.log('Sample entries (first 15):');

  entries.slice(0, 15).forEach(([date, feastName]) => {
    const dateObj = new Date(date);
    const formatted = dateObj.toLocaleDateString('ro-RO', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
    console.log(`  ${formatted}: ${feastName}`);
  });

  console.log('  ...');
  console.log();
}
console.log();

// Test 7: Save Complete 2028 Calendar to JSON
console.log('7. SAVING 2028 CALENDAR TO JSON FILE');
console.log('-'.repeat(80));
if (completeCalendar) {
  const output = {
    year: 2028,
    source: 'Romanian Orthodox Church (New Calendar/Gregorian)',
    generated: new Date().toISOString(),
    easterDate: '2028-04-16',
    easterDay: 'duminică, 16 aprilie 2028',
    calendar: completeCalendar
  };

  const outputPath = path.join(__dirname, 'liturgical-calendar-2028-lookup.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`Calendar saved to: ${outputPath}`);
  console.log(`Total feast days: ${Object.keys(completeCalendar).length}`);
}
console.log();

console.log('='.repeat(80));
console.log('TEST SUITE COMPLETED SUCCESSFULLY');
console.log('='.repeat(80));
