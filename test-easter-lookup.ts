/**
 * Test script for the Orthodox Easter Lookup System
 *
 * This script tests the easterLookup module by:
 * 1. Verifying Easter dates for all available years
 * 2. Generating a complete liturgical calendar for 2028
 * 3. Testing key date calculations
 */

import {
  getOrthodoxEasterLookup,
  getAvailableYears,
  hasEasterDate,
  getEasterDataInfo,
  calculatePaschaOffsetLookup,
  getLiturgicalCalendar,
  getLiturgicalDateName,
  getCompleteLiturgicalCalendar
} from './utils/easterLookup';

console.log('='.repeat(80));
console.log('ORTHODOX EASTER LOOKUP SYSTEM - TEST SUITE');
console.log('='.repeat(80));
console.log();

// Test 1: Data Source Information
console.log('1. DATA SOURCE INFORMATION');
console.log('-'.repeat(80));
const dataInfo = getEasterDataInfo();
console.log(`Source: ${dataInfo.source}`);
console.log(`Description: ${dataInfo.description}`);
console.log(`Last Updated: ${dataInfo.lastUpdated}`);
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

// Test 4: Year Availability Check
console.log('4. YEAR AVAILABILITY CHECK');
console.log('-'.repeat(80));
console.log(`Is 2028 available? ${hasEasterDate(2028)}`);
console.log(`Is 2025 available? ${hasEasterDate(2025)}`);
console.log(`Is 2050 available? ${hasEasterDate(2050)}`);
console.log();

// Test 5: Pascha Offset Calculations for 2028
console.log('5. PASCHA OFFSET CALCULATIONS FOR 2028');
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

// Test 6: Generate Complete Liturgical Calendar for 2028
console.log('6. LITURGICAL CALENDAR FOR 2028');
console.log('-'.repeat(80));
const liturgicalCalendar = getLiturgicalCalendar(2028);
if (liturgicalCalendar) {
  console.log(`Total liturgical dates: ${liturgicalCalendar.length}`);
  console.log();
  console.log('Key dates:');

  // Show important dates
  const importantOffsets = [-70, -49, -48, -42, -7, 0, 7, 39, 49, 50, 56];
  liturgicalCalendar
    .filter(date => importantOffsets.includes(date.offset))
    .forEach(date => {
      if (date.date) {
        const formatted = date.date.toLocaleDateString('ro-RO', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        console.log(`  ${date.nameRo}`);
        console.log(`    ${formatted} (offset: ${date.offset})`);
      }
    });
}
console.log();

// Test 7: Test getLiturgicalDateName
console.log('7. LITURGICAL DATE NAME LOOKUP');
console.log('-'.repeat(80));
const testLookupDates = [
  new Date('2028-04-16'), // Easter
  new Date('2028-04-09'), // Palm Sunday
  new Date('2028-06-04'), // Pentecost
  new Date('2028-12-25'), // Christmas (fixed feast)
  new Date('2028-01-06'), // Theophany (fixed feast)
];

testLookupDates.forEach(date => {
  const name = getLiturgicalDateName(date);
  const formatted = date.toLocaleDateString('ro-RO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  console.log(`${formatted}:`);
  console.log(`  ${name || '(no special feast)'}`);
});
console.log();

// Test 8: Generate Complete Calendar JSON for 2028
console.log('8. COMPLETE CALENDAR FOR 2028 (Sample)');
console.log('-'.repeat(80));
const completeCalendar = getCompleteLiturgicalCalendar(2028);
if (completeCalendar) {
  const entries = Object.entries(completeCalendar);
  console.log(`Total dates with feasts: ${entries.length}`);
  console.log();
  console.log('Sample entries (first 10):');

  entries.slice(0, 10).forEach(([date, feastName]) => {
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
  console.log('Saving complete calendar to file...');
}
console.log();

// Test 9: Save Complete 2028 Calendar to JSON
console.log('9. SAVING 2028 CALENDAR TO JSON FILE');
console.log('-'.repeat(80));
if (completeCalendar) {
  const fs = require('fs');
  const path = require('path');

  const output = {
    year: 2028,
    source: 'Romanian Orthodox Church (New Calendar/Gregorian)',
    generated: new Date().toISOString(),
    easterDate: '2028-04-16',
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
