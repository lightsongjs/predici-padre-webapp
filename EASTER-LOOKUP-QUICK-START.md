# Orthodox Easter Lookup System - Quick Start Guide

## Quick Overview

This system provides accurate Orthodox Easter dates for the Romanian Orthodox Church (New Calendar/Gregorian) using a verified lookup table instead of algorithmic calculations.

**Coverage**: 2026-2040 (15 years)
**Source**: Official Romanian Orthodox Church calendars

---

## Installation

No installation needed - the system is already part of the predicile-parintelui project.

---

## Basic Usage

### 1. Get Easter Date for a Year

```typescript
import { getOrthodoxEasterLookup } from './utils/easterLookup';

const easter2028 = getOrthodoxEasterLookup(2028);
console.log(easter2028); // Sun Apr 16 2028
```

### 2. Calculate Days from Easter

```typescript
import { calculatePaschaOffsetLookup } from './utils/easterLookup';

const palmSunday = new Date('2028-04-09');
const offset = calculatePaschaOffsetLookup(palmSunday);
console.log(offset); // -7 (7 days before Easter)
```

### 3. Get Liturgical Calendar for a Year

```typescript
import { getLiturgicalCalendar } from './utils/easterLookup';

const calendar = getLiturgicalCalendar(2028);
calendar.forEach(feast => {
  console.log(`${feast.nameRo} - ${feast.date}`);
});
```

### 4. Get Feast Name for a Specific Date

```typescript
import { getLiturgicalDateName } from './utils/easterLookup';

const feastName = getLiturgicalDateName(new Date('2028-04-16'));
console.log(feastName); // "PAȘTELE - Învierea Domnului"
```

### 5. Generate Complete Calendar

```typescript
import { getCompleteLiturgicalCalendar } from './utils/easterLookup';

const completeCalendar = getCompleteLiturgicalCalendar(2028);
// Returns: { "2028-04-16": "PAȘTELE - Învierea Domnului", ... }
```

---

## Verified Easter Dates (2026-2040)

| Year | Easter Date | Romanian |
|------|-------------|----------|
| 2026 | April 12 | 12 aprilie |
| 2027 | May 2 | 2 mai |
| 2028 | April 16 | 16 aprilie |
| 2029 | April 8 | 8 aprilie |
| 2030 | April 28 | 28 aprilie |
| 2031 | April 13 | 13 aprilie |
| 2032 | May 2 | 2 mai |
| 2033 | April 24 | 24 aprilie |
| 2034 | April 9 | 9 aprilie |
| 2035 | April 29 | 29 aprilie |
| 2036 | April 20 | 20 aprilie |
| 2037 | April 5 | 5 aprilie |
| 2038 | April 25 | 25 aprilie |
| 2039 | April 17 | 17 aprilie |
| 2040 | May 6 | 6 mai |

---

## Key Liturgical Offsets

Calculate any liturgical date by adding these offsets to Easter:

### Before Easter (Lent)
- **-70**: Sunday of Publican & Pharisee
- **-49**: Forgiveness Sunday (start of Triodion)
- **-48**: Clean Monday (start of Great Lent)
- **-42**: Sunday of Orthodoxy
- **-7**: Palm Sunday
- **-2**: Good Friday

### After Easter
- **+7**: Thomas Sunday
- **+39**: Ascension (Thursday)
- **+49**: Pentecost
- **+56**: All Saints Sunday

---

## Testing

Run the test suite to verify the system:

```bash
# JavaScript version
node test-easter-lookup.js

# TypeScript version (if ts-node available)
npx ts-node test-easter-lookup.ts
```

---

## Adding More Years

1. Get official dates from [Patriarhia Română](https://patriarhia.ro/)
2. Edit `orthodox-easter-dates.json`:
```json
{
  "dates": {
    ...existing dates...,
    "2041": "2041-04-21",
    "2042": "2042-04-13"
  }
}
```
3. Update `lastUpdated` field
4. Run tests to verify

---

## Common Patterns

### Check if Year is Available

```typescript
import { hasEasterDate } from './utils/easterLookup';

if (hasEasterDate(2028)) {
  // Use lookup
  const easter = getOrthodoxEasterLookup(2028);
} else {
  // Use fallback algorithm
}
```

### Get Available Years

```typescript
import { getAvailableYears } from './utils/easterLookup';

const years = getAvailableYears();
console.log(years); // [2026, 2027, 2028, ..., 2040]
```

### Save Calendar to File

```typescript
import { getCompleteLiturgicalCalendar } from './utils/easterLookup';
import fs from 'fs';

const calendar = getCompleteLiturgicalCalendar(2028);
fs.writeFileSync(
  'calendar-2028.json',
  JSON.stringify({ year: 2028, calendar }, null, 2)
);
```

---

## Why Lookup vs Algorithm?

1. **Accuracy**: Sourced from official Romanian Orthodox Church
2. **Reliability**: No computational errors
3. **Simplicity**: Easy to verify and maintain
4. **Performance**: Instant O(1) lookup

See `ORTHODOX-EASTER-LOOKUP-DOCUMENTATION.md` for detailed explanation.

---

## Troubleshooting

**Year not found?**
- Check if year is in range (2026-2040)
- Add year to `orthodox-easter-dates.json`

**Wrong date?**
- Verify you're checking Orthodox Easter (not Western)
- Cross-check with [official calendar](https://patriarhia.ro/)

**Feast name empty?**
- Date might not be a special feast day
- Check both fixed and movable feasts

---

## Files

- `orthodox-easter-dates.json` - Verified Easter dates
- `utils/easterLookup.ts` - Lookup functions
- `utils/calendarUtils.ts` - Original algorithmic functions (legacy)
- `test-easter-lookup.js` - Test suite
- `ORTHODOX-EASTER-LOOKUP-DOCUMENTATION.md` - Full documentation

---

## Quick Reference: Movable Feasts 2028

```
Feb 6:  Publican & Pharisee
Feb 13: Prodigal Son
Feb 20: Last Judgment
Feb 27: Forgiveness Sunday
Feb 28: Clean Monday (Lent begins)
Mar 5:  Sunday of Orthodoxy
Apr 9:  Palm Sunday
Apr 14: Good Friday
Apr 16: EASTER
Apr 23: Thomas Sunday
May 25: Ascension
Jun 4:  Pentecost
Jun 11: All Saints
```

---

**Last Updated**: 2026-01-31
**Version**: 1.0
**For full documentation**: See `ORTHODOX-EASTER-LOOKUP-DOCUMENTATION.md`
