# Sermon System Architecture

## System Overview

```
╔══════════════════════════════════════════════════════════════════════════╗
║                           USER INTERFACE                                 ║
║                      (app/(tabs)/index.tsx)                              ║
╠══════════════════════════════════════════════════════════════════════════╣
║  • Today's Sermon Display                                                ║
║  • Debug Information (Dev Mode)                                          ║
║  • Fallback Messages                                                     ║
║  • Cache Statistics                                                      ║
╚═══════════════════════════════╦══════════════════════════════════════════╝
                                ║
                                ▼
╔══════════════════════════════════════════════════════════════════════════╗
║                      SERMON MATCHING LAYER                               ║
║                   (services/sermonMatcher.ts)                            ║
╠══════════════════════════════════════════════════════════════════════════╣
║  Functions:                                                              ║
║  ┌──────────────────────────────────────────────────────────────────┐   ║
║  │ getSermonForDate()      → Get sermon for specific date          │   ║
║  │ getSermonsForMonth()    → Get all sermons in month              │   ║
║  │ searchSermons()         → Search with filters                   │   ║
║  │ getUpcomingSermons()    → Get next N days                       │   ║
║  │ getLiturgicalSeason()   → Get current season                    │   ║
║  │ getDateMatchInfo()      → Debug information                     │   ║
║  └──────────────────────────────────────────────────────────────────┘   ║
╚═══════════╦════════════════════════════════════════╦═════════════════════╝
            ║                                        ║
            ▼                                        ▼
╔══════════════════════════════╗    ╔════════════════════════════════════╗
║   CALENDAR UTILITIES         ║    ║      SERMON CACHE                  ║
║ (utils/calendarUtils.ts)     ║    ║   (utils/sermonCache.ts)           ║
╠══════════════════════════════╣    ╠════════════════════════════════════╣
║ • getOrthodoxEaster()        ║    ║  Cache Layers:                     ║
║ • calculatePaschaOffset()    ║    ║  ┌──────────────────────────────┐  ║
║ • getTodaysSermon()          ║    ║  │ Level 1: Sermon Cache        │  ║
║ • getOrthodoxFeastName()     ║    ║  │   (by date string)           │  ║
╚═══════════╦══════════════════╝    ║  ├──────────────────────────────┤  ║
            ║                       ║  │ Level 2: Offset Cache        │  ║
            ▼                       ║  │   (by date string)           │  ║
╔══════════════════════════════╗    ║  ├──────────────────────────────┤  ║
║    EASTER LOOKUP             ║    ║  │ Level 3: Easter Cache        │  ║
║  (utils/easterLookup.ts)     ║    ║  │   (by year)                  │  ║
╠══════════════════════════════╣    ║  └──────────────────────────────┘  ║
║ • getOrthodoxEasterLookup()  ║    ║                                    ║
║ • calculatePaschaOffsetLookup║    ║  Auto-Cleanup:                     ║
║ • getLiturgicalCalendar()    ║    ║  • Every 24 hours                  ║
║ • hasEasterDate()            ║    ║  • Removes 7+ day old entries      ║
║ • getAvailableYears()        ║    ║  • Memory efficient                ║
╚═══════════╦══════════════════╝    ╚════════════════════════════════════╝
            ║
            ▼
╔══════════════════════════════╗
║     DATA SOURCE              ║
║ (orthodox-easter-dates.json) ║
╠══════════════════════════════╣
║  {                           ║
║    "2026": "2026-04-12",     ║
║    "2027": "2027-05-02",     ║
║    "2028": "2028-04-16",     ║
║    ...                       ║
║    "2040": "2040-05-06"      ║
║  }                           ║
╚══════════════════════════════╝
```

## Data Flow Diagram

### Getting Today's Sermon

```
┌─────────────┐
│   User      │
│  Opens App  │
└──────┬──────┘
       │
       ▼
┌──────────────────────────┐
│   HomeScreen Component   │
│  useMemo(() =>           │
│    getTodaysSermon()     │
│  )                       │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐    ┌─────────────────┐
│  getTodaysSermon()       │───>│ Check Cache?    │
│  (calendarUtils.ts)      │    └────────┬────────┘
└──────┬───────────────────┘             │
       │                           Cache Hit? ──Yes──> Return Cached
       │                                 │
       ▼                                No
┌──────────────────────────┐             │
│  Calculate Components:   │<────────────┘
│  • month = getMonth()    │
│  • day = getDate()       │
│  • paschaOffset =        │
│    calculatePaschaOffset │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  calculatePaschaOffset() │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐    ┌──────────────────┐
│  getOrthodoxEaster()     │───>│ Lookup Available?│
└──────┬───────────────────┘    └────────┬─────────┘
       │                              Yes │  │ No
       │                                  │  │
       │                     ┌────────────┘  └──────────────┐
       │                     ▼                              ▼
       │          ┌─────────────────────┐    ┌──────────────────────┐
       │          │ getOrthodoxEaster   │    │  Algorithm Fallback  │
       │          │ Lookup(year)        │    │  (Gauss Algorithm)   │
       │          └──────┬──────────────┘    └──────────┬───────────┘
       │                 │                              │
       │                 ▼                              ▼
       │          ┌─────────────────────┐    ┌──────────────────────┐
       │          │ orthodox-easter-    │    │  Calculate with      │
       │          │ dates.json          │    │  19*c + 15, etc.     │
       │          └──────┬──────────────┘    └──────────┬───────────┘
       │                 │                              │
       │                 └──────────┬───────────────────┘
       │                            ▼
       │                 ┌────────────────────┐
       │                 │   Easter Date      │
       │                 │   Cache Result     │
       │                 └──────┬─────────────┘
       │                        │
       ▼                        ▼
┌──────────────────────────────────────┐
│  Calculate Offset:                   │
│  offset = (date - easter) / 86400000 │
│  Cache Result                        │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Search Sermon Database  │
│  for matching:           │
│  • fixed_date OR         │
│  • pascha_offset         │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Cache Sermon Result     │
│  (even if null)          │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Return to Component     │
└──────────────────────────┘
```

## Cache Architecture

### Multi-Level Cache Strategy

```
Request for Sermon on Date 2026-04-12
    │
    ▼
┌─────────────────────────────────────────┐
│  LEVEL 1: Sermon Cache                  │
│  Key: "2026-04-12"                      │
│  Value: Sermon | null                   │
├─────────────────────────────────────────┤
│  Hit? ──Yes──> Return immediately       │
│  │                                       │
│  No                                      │
└──┬──────────────────────────────────────┘
   │
   ▼
┌─────────────────────────────────────────┐
│  LEVEL 2: Pascha Offset Cache           │
│  Key: "2026-04-12"                      │
│  Value: number (offset)                 │
├─────────────────────────────────────────┤
│  Hit? ──Yes──> Skip to sermon search    │
│  │                                       │
│  No                                      │
└──┬──────────────────────────────────────┘
   │
   ▼
┌─────────────────────────────────────────┐
│  LEVEL 3: Easter Date Cache             │
│  Key: 2026 (year)                       │
│  Value: Date object                     │
├─────────────────────────────────────────┤
│  Hit? ──Yes──> Calculate offset          │
│  │                                       │
│  No                                      │
└──┬──────────────────────────────────────┘
   │
   ▼
┌─────────────────────────────────────────┐
│  LEVEL 4: Lookup Table                  │
│  Source: orthodox-easter-dates.json     │
│  Years: 2026-2040                       │
├─────────────────────────────────────────┤
│  Found? ──Yes──> Cache & return          │
│  │                                       │
│  No                                      │
└──┬──────────────────────────────────────┘
   │
   ▼
┌─────────────────────────────────────────┐
│  LEVEL 5: Algorithm Fallback            │
│  Gauss Algorithm for Julian Calendar    │
│  + 13 days for Gregorian                │
├─────────────────────────────────────────┤
│  Always returns a date                  │
│  (May be less accurate for future years)│
└─────────────────────────────────────────┘
```

### Cache Lifecycle

```
┌──────────────────────┐
│   App Starts         │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ initializeSermonCache│
│ ()                   │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Initial Cleanup      │
│ (remove old entries) │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Start 24h Timer      │
│ for auto-cleanup     │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Cache Active                    │
│  ┌────────────────────────────┐  │
│  │  Sermon Cache   (Map)      │  │
│  │  Offset Cache   (Map)      │  │
│  │  Easter Cache   (Map)      │  │
│  └────────────────────────────┘  │
└──────────┬───────────────────────┘
           │
           ├──> Lookups (cached in <1ms)
           │
           ├──> Writes (immediate)
           │
           │ Every 24 hours
           ▼
┌──────────────────────┐
│ Auto Cleanup         │
│ • Remove 7+ day old  │
│ • Update timestamp   │
└──────────────────────┘
```

## Sermon Matching Logic

### Priority-Based Matching

```
Input: Date (e.g., 2026-12-25)
    │
    ▼
┌─────────────────────────────────────┐
│  PRIORITY 1: Fixed Date Match       │
│  • Check fixed_month & fixed_day    │
│  • Example: Christmas (12/25)       │
├─────────────────────────────────────┤
│  Match Found? ──Yes──> Return       │
│  │                                   │
│  No                                  │
└──┬──────────────────────────────────┘
   │
   ▼
┌─────────────────────────────────────┐
│  Calculate Pascha Offset            │
│  • Get Easter for year              │
│  • offset = (date - easter) / 86400 │
└──┬──────────────────────────────────┘
   │
   ▼
┌─────────────────────────────────────┐
│  PRIORITY 2: Pascha Offset Match    │
│  • Check pascha_offset field        │
│  • Example: Palm Sunday (-7)        │
├─────────────────────────────────────┤
│  Match Found? ──Yes──> Return       │
│  │                                   │
│  No                                  │
└──┬──────────────────────────────────┘
   │
   ▼
┌─────────────────────────────────────┐
│  NO MATCH                           │
│  Return null                        │
└─────────────────────────────────────┘
```

## Type System Hierarchy

```
┌───────────────────────────────────────────────────────────┐
│                    Sermon (Core Type)                     │
├───────────────────────────────────────────────────────────┤
│  id: string                                               │
│  title: string                                            │
│  category: SermonCategory                                 │
│  type: SermonType ('fixed' | 'movable')                   │
│  fixed_month?: number                                     │
│  fixed_day?: number                                       │
│  pascha_offset?: number                                   │
│  ...                                                      │
└────────────┬──────────────────────────────────────────────┘
             │
    ┌────────┴────────┬──────────────────┬─────────────────┐
    │                 │                  │                 │
    ▼                 ▼                  ▼                 ▼
┌─────────┐  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐
│ Sermon  │  │   Sermon    │  │   Sermon     │  │  Sermon      │
│ Match   │  │   With      │  │   Search     │  │  Filter      │
│ Result  │  │   Date      │  │   Options    │  │  Options     │
└─────────┘  └─────────────┘  └──────────────┘  └──────────────┘
```

## Performance Characteristics

### Time Complexity

```
Operation                  | Complexity | Notes
──────────────────────────┼────────────┼──────────────────────
Cache Lookup              | O(1)       | HashMap access
Sermon Search (uncached)  | O(n)       | n = sermon count
Month Scan                | O(d*n)     | d = days, n = sermons
Easter Calculation        | O(1)       | Simple arithmetic
Cache Cleanup             | O(c)       | c = cache size
```

### Space Complexity

```
Cache Type      | Size        | Max Items  | Cleanup
────────────────┼─────────────┼────────────┼─────────────
Sermon Cache    | ~1KB/entry  | ~100       | 7 days
Offset Cache    | ~20B/entry  | ~200       | 7 days
Easter Cache    | ~50B/entry  | ~15        | Never
Total Memory    | ~150KB      | Peak usage | Auto-managed
```

## Error Handling Flow

```
┌──────────────────┐
│  Function Call   │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────┐
│  Input Validation        │
│  • Year in range?        │
│  • Date valid?           │
│  • Sermon array exists?  │
└────────┬─────────────────┘
         │
    Valid │   Invalid
         │      │
         │      ▼
         │  ┌──────────────┐
         │  │ Return null  │
         │  │ or fallback  │
         │  └──────────────┘
         ▼
┌──────────────────────────┐
│  Try Operation           │
│  • Lookup                │
│  • Calculate             │
│  • Search                │
└────────┬─────────────────┘
         │
    Success │  Error
         │      │
         │      ▼
         │  ┌──────────────┐
         │  │ Catch Error  │
         │  │ Log Warning  │
         │  │ Return Safe  │
         │  │ Default      │
         │  └──────────────┘
         ▼
┌──────────────────────────┐
│  Cache Result            │
│  (even if null)          │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│  Return to Caller        │
└──────────────────────────┘
```

## Module Dependencies

```
app/(tabs)/index.tsx
    │
    ├──> @/utils/calendarUtils
    │       │
    │       ├──> @/utils/easterLookup
    │       │       │
    │       │       └──> orthodox-easter-dates.json
    │       │
    │       └──> @/data/data (sermons)
    │
    ├──> @/services/sermonMatcher
    │       │
    │       ├──> @/utils/calendarUtils
    │       ├──> @/utils/sermonCache
    │       └──> @/data/data (sermons)
    │
    └──> @/utils/sermonCache
            │
            ├──> @/utils/easterLookup
            ├──> @/utils/calendarUtils
            └──> @/data/data (Sermon type)
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│             Production App                      │
├─────────────────────────────────────────────────┤
│  Code (TypeScript compiled to JavaScript)      │
│  ├─ Business Logic                             │
│  ├─ Cache System                               │
│  └─ UI Components                              │
├─────────────────────────────────────────────────┤
│  Static Data                                    │
│  └─ orthodox-easter-dates.json (bundled)       │
├─────────────────────────────────────────────────┤
│  Runtime                                        │
│  ├─ React Native                               │
│  ├─ Expo                                       │
│  └─ Native Platform                            │
└─────────────────────────────────────────────────┘
```

---

**Last Updated:** 2026-01-31
**Version:** 1.0.0
