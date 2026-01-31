# Sermon System Quick Start Guide

## Installation

The sermon system is already integrated. No additional installation needed!

## Basic Usage

### Get Today's Sermon

```typescript
import { getTodaysSermon } from '@/utils/calendarUtils';
import { sermons } from '@/data/data';

const sermon = getTodaysSermon(sermons);
```

### Get Sermon for Specific Date

```typescript
import { getSermonForDate } from '@/services/sermonMatcher';
import { sermons } from '@/data/data';

const pascha = new Date('2026-04-12');
const sermon = getSermonForDate(pascha, sermons);
```

### Search Sermons

```typescript
import { searchSermons } from '@/services/sermonMatcher';
import { sermons } from '@/data/data';

const results = searchSermons({ query: 'Învierea' }, sermons);
```

## Common Patterns

### Display Today's Sermon

```typescript
function TodaysSermon() {
  const sermon = useMemo(() => getTodaysSermon(sermons), []);

  if (!sermon) {
    return <Text>No sermon for today</Text>;
  }

  return (
    <View>
      <Text>{sermon.title}</Text>
      <Text>{sermon.description}</Text>
    </View>
  );
}
```

### Show Month Calendar

```typescript
import { getSermonsForMonth } from '@/services/sermonMatcher';

function MonthCalendar({ year, month }: { year: number; month: number }) {
  const sermons = getSermonsForMonth(year, month, allSermons);

  return (
    <FlatList
      data={sermons}
      renderItem={({ item }) => (
        <View>
          <Text>{item.date.toLocaleDateString()}</Text>
          <Text>{item.sermon.title}</Text>
        </View>
      )}
    />
  );
}
```

### Search Interface

```typescript
function SermonSearch() {
  const [query, setQuery] = useState('');
  const results = searchSermons({ query }, sermons);

  return (
    <>
      <TextInput value={query} onChangeText={setQuery} />
      <FlatList
        data={results}
        renderItem={({ item }) => <SermonCard sermon={item} />}
      />
    </>
  );
}
```

## Debugging

### Enable Debug Mode

```typescript
const DEV_MODE = __DEV__;

if (DEV_MODE) {
  const matchInfo = getDateMatchInfo(new Date(), sermons);
  console.log('Debug:', matchInfo);
}
```

### Check Cache Stats

```typescript
import { sermonCache } from '@/utils/sermonCache';

const stats = sermonCache.getCacheStats();
console.log(stats);
```

## Common Dates

### 2026 Orthodox Calendar

- **Easter (Pascha):** April 12, 2026
- **Palm Sunday:** April 5, 2026 (offset: -7)
- **Good Friday:** April 10, 2026 (offset: -2)
- **Pentecost:** May 31, 2026 (offset: 49)
- **Christmas:** December 25, 2026 (fixed)

### Get Easter for Any Year

```typescript
import { getOrthodoxEaster } from '@/utils/calendarUtils';

const easter2027 = getOrthodoxEaster(2027);
// Returns: May 2, 2027
```

## Performance Tips

1. **Use useMemo for sermon lookups**
   ```typescript
   const sermon = useMemo(() => getTodaysSermon(sermons), []);
   ```

2. **Initialize cache early**
   ```typescript
   import { initializeSermonCache } from '@/utils/sermonCache';

   useEffect(() => {
     initializeSermonCache();
   }, []);
   ```

3. **Batch operations**
   ```typescript
   // Good: Single month lookup
   const monthSermons = getSermonsForMonth(2026, 4, sermons);

   // Avoid: Multiple individual lookups in a loop
   ```

## Error Handling

```typescript
try {
  const sermon = getSermonForDate(date, sermons);

  if (!sermon) {
    console.log('No sermon found for this date');
  }
} catch (error) {
  console.error('Error fetching sermon:', error);
}
```

## Testing

Run the test suite:

```bash
npm test -- __tests__/integration/sermonSystem.test.ts
```

## Need Help?

- Check full documentation: `docs/SERMON_SYSTEM.md`
- Review test examples: `__tests__/integration/sermonSystem.test.ts`
- Check type definitions: `types/sermon.ts`

---

**Quick Links:**
- [Full Documentation](./SERMON_SYSTEM.md)
- [Type Definitions](../types/sermon.ts)
- [Integration Tests](../__tests__/integration/sermonSystem.test.ts)
