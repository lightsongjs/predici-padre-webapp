# Testing Guide - Predicile Parintelui

This comprehensive testing guide covers manual testing procedures, calendar validation, edge case scenarios, and future automated testing recommendations for the Predicile Parintelui Orthodox Christian sermon app.

## Table of Contents
1. [Manual Testing Checklist](#manual-testing-checklist)
2. [Calendar Testing](#calendar-testing)
3. [Edge Cases](#edge-cases)
4. [Future Test Setup](#future-test-setup)

---

## Manual Testing Checklist

### 1. Home Screen Load Test

**Objective**: Verify the home screen loads correctly with all UI elements

**Steps**:
1. Launch the application
2. Wait for the splash screen to complete
3. Verify the header displays "Predicile Parintelui" in burgundy background with gold text
4. Verify the "Predica de Astazi" section is visible
5. Verify the search bar is present and accessible
6. Verify the "Toate Predicile" list is visible below
7. Check for any layout issues or overlapping elements
8. Test on different screen sizes (small phone, large phone, tablet)

**Expected Result**:
- Clean, centered layout
- No console errors
- All text is readable
- Burgundy (#8B1E3F) and gold (#D4AF37) color scheme is consistent

**Pass/Fail**: [ ]

---

### 2. Today's Sermon Display Test

**Objective**: Verify today's sermon appears when there's a calendar match

**Test Case A - When Sermon Exists for Today**:

**Prerequisites**:
- Set device date to a date with a matching sermon (see Calendar Testing section)
- Example test dates:
  - December 6 (any year) - Sfantul Nicolae
  - December 25 (any year) - Nasterea Domnului
  - January 6 (any year) - Boboteaza

**Steps**:
1. Set device date to test date
2. Launch/reload the app
3. Observe the "Predica de Astazi" section

**Expected Result**:
- Today's sermon card displays with:
  - Orthodox cross icon (☦) in burgundy circle
  - Feast name in Romanian (e.g., "Sfantul Nicolae")
  - Sermon title
  - Duration (if available)
  - "Asculta" (Listen) button in gold

**Pass/Fail**: [ ]

---

**Test Case B - When No Sermon for Today**:

**Prerequisites**: Set device date to a date with NO matching sermon (e.g., March 3)

**Steps**:
1. Set device date to non-feast day
2. Launch/reload the app
3. Observe the "Predica de Astazi" section

**Expected Result**:
- White card displays with:
  - Message: "Nu exista o predica programata pentru astazi."
  - Subtext: "Explorati predicile disponibile mai jos."
  - No play button

**Pass/Fail**: [ ]

---

### 3. Search/Filter Functionality Test

**Objective**: Verify search and filter work correctly

**Test Case A - Text Search**:

**Steps**:
1. Tap on the search input field
2. Type "Nicolae" (search for St. Nicholas sermon)
3. Observe the filtered results
4. Clear the search by tapping the X button
5. Verify all sermons reappear

**Expected Result**:
- Search filters in real-time as you type
- Results counter updates (e.g., "Rezultate (1)")
- Only matching sermons appear
- Search is case-insensitive
- Clear button (X) appears when text is entered
- All sermons return when cleared

**Pass/Fail**: [ ]

---

**Test Case B - Category Search**:

**Steps**:
1. Search for "Cursuri" (Courses category)
2. Verify filtered results
3. Search for "Predici Duminicale" (Sunday Sermons)
4. Verify filtered results

**Expected Result**:
- Category-based filtering works
- Multiple sermons from same category appear

**Pass/Fail**: [ ]

---

**Test Case C - No Results**:

**Steps**:
1. Type a search term with no matches (e.g., "xyz123")
2. Observe the result

**Expected Result**:
- Message displays: "Nu s-au gasit predici pentru 'xyz123'"
- No sermon items shown
- Search can be cleared to return to full list

**Pass/Fail**: [ ]

---

### 4. Audio Player Functionality Test

**Note**: Audio playback is currently in TODO state (placeholder implementation)

**When Implemented, Test**:

**Test Case A - Play/Pause**:

**Steps**:
1. Tap the "Asculta" button on any sermon
2. Verify audio player appears/activates
3. Verify audio begins playing
4. Tap pause button
5. Verify audio pauses
6. Tap play again
7. Verify audio resumes

**Expected Result**:
- Smooth play/pause transitions
- Visual feedback (play/pause icon change)
- Audio continues in background (iOS/Android)
- No interruption when switching to another app

**Pass/Fail**: [ ]

---

**Test Case B - Skip Forward/Backward**:

**Steps**:
1. Start playing a sermon
2. Tap skip forward button (typically +15s or +30s)
3. Verify playback jumps forward
4. Tap skip backward button
5. Verify playback jumps backward

**Expected Result**:
- Accurate time jumps (15 or 30 seconds)
- Smooth playback continuation
- Progress bar updates correctly

**Pass/Fail**: [ ]

---

**Test Case C - Seek Bar**:

**Steps**:
1. Start playing a sermon
2. Drag the progress/seek bar to different positions
3. Verify playback jumps to selected time

**Expected Result**:
- Responsive seeking
- Accurate time display
- No audio glitches

**Pass/Fail**: [ ]

---

### 5. Orthodox Calendar Calculations Test

**Objective**: Verify calendar calculations are accurate

See detailed [Calendar Testing](#calendar-testing) section below for specific test cases.

**Quick Validation**:
1. Test with known Easter dates (see table below)
2. Verify fixed feasts appear on correct calendar dates
3. Verify movable feasts appear on correct dates relative to Easter

**Pass/Fail**: [ ]

---

### 6. Notifications Test

**Note**: Notification implementation details TBD

**When Implemented, Test**:

**Test Case A - Daily Notification**:

**Prerequisites**: Enable notifications in app settings and device settings

**Steps**:
1. Set up daily notification (e.g., 8 AM)
2. Wait for scheduled time or use device time manipulation
3. Verify notification appears
4. Tap notification
5. Verify app opens to today's sermon

**Expected Result**:
- Notification appears at scheduled time
- Shows today's feast/sermon name
- Tapping opens app to correct screen
- Icon and color match app branding (burgundy #8B1E3F)

**Pass/Fail**: [ ]

---

**Test Case B - Notification Permissions**:

**Steps**:
1. Launch app for first time
2. Verify permission request appears
3. Test "Allow" and "Don't Allow" scenarios

**Expected Result**:
- Clear permission request
- App handles both acceptance and rejection gracefully
- Settings screen allows re-enabling if initially denied

**Pass/Fail**: [ ]

---

### 7. PWA (Progressive Web App) Test - Web Platform

**Objective**: Verify PWA functionality on web browsers

**Test Case A - Installation**:

**Steps**:
1. Open app in Chrome/Edge/Safari
2. Look for "Install App" prompt or menu option
3. Install the app
4. Verify app icon appears on home screen/desktop
5. Launch from installed icon

**Expected Result**:
- Install prompt appears
- Icon uses correct branding (burgundy/gold theme)
- App launches in standalone mode (no browser UI)
- App name is "Predicile Parintelui"

**Pass/Fail**: [ ]

---

**Test Case B - Offline Capability**:

**Steps**:
1. Load the app while online
2. Disconnect from internet
3. Navigate within the app
4. Attempt to play previously loaded content

**Expected Result**:
- App shell loads offline
- Sermon list displays (if cached)
- Graceful handling of unavailable content
- Appropriate offline messaging

**Pass/Fail**: [ ]

---

**Test Case C - Manifest Validation**:

**Steps**:
1. Open browser DevTools
2. Navigate to Application/Manifest tab
3. Verify manifest details

**Expected Result** (from app.json):
- Name: "Predicile Parintelui"
- Short name: "Predicile"
- Theme color: #8B1E3F
- Background color: #F0F4F8
- Display: standalone
- Orientation: portrait-primary
- Icons present and valid

**Pass/Fail**: [ ]

---

### 8. Mobile App Test - iOS

**Objective**: Verify native iOS functionality

**Test Case A - Installation & Launch**:

**Steps**:
1. Install app via TestFlight or development build
2. Launch app
3. Check App Store metadata
4. Verify splash screen

**Expected Result**:
- Clean installation process
- Burgundy splash screen with app icon
- No crashes on launch
- Proper SafeArea handling (no notch overlap)

**Pass/Fail**: [ ]

---

**Test Case B - Background Audio**:

**Steps**:
1. Start playing a sermon
2. Press home button
3. Verify audio continues
4. Open Control Center
5. Verify playback controls appear

**Expected Result**:
- Audio continues in background
- Control Center shows sermon info
- Lock screen shows playback controls
- App name and sermon title visible

**Pass/Fail**: [ ]

---

**Test Case C - Permissions**:

**Steps**:
1. Check app permissions in Settings > Predicile Parintelui
2. Verify only necessary permissions are requested

**Expected Result** (from app.json):
- NO microphone access requested
- NO camera access requested
- Notifications permission (if enabled)
- Background audio capability enabled

**Pass/Fail**: [ ]

---

### 9. Mobile App Test - Android

**Objective**: Verify native Android functionality

**Test Case A - Installation & Launch**:

**Steps**:
1. Install APK or AAB via Play Store or development build
2. Launch app
3. Verify splash screen
4. Check edge-to-edge display

**Expected Result**:
- Clean installation
- Burgundy splash screen
- Edge-to-edge rendering enabled
- Adaptive icon with burgundy background

**Pass/Fail**: [ ]

---

**Test Case B - Background Audio**:

**Steps**:
1. Start playing a sermon
2. Press home button or recent apps
3. Verify audio continues
4. Check notification shade

**Expected Result**:
- Audio continues in background
- Media notification appears
- Playback controls in notification
- Notification color matches app theme (#8B1E3F)

**Pass/Fail**: [ ]

---

**Test Case C - Permissions**:

**Steps**:
1. Check app permissions in Settings
2. Verify requested permissions

**Expected Result** (from app.json):
- INTERNET permission
- RECEIVE_BOOT_COMPLETED permission
- VIBRATE permission
- WAKE_LOCK permission
- NO microphone or camera permissions

**Pass/Fail**: [ ]

---

**Test Case D - Deep Linking**:

**Steps**:
1. Create a test link: https://predicileparintelui.app/
2. Click link from another app (browser, email)
3. Verify app opens

**Expected Result**:
- App opens from web link
- Correct screen displays
- Fallback to website if app not installed

**Pass/Fail**: [ ]

---

## Calendar Testing

### Understanding Orthodox Easter Calculation

The app uses the **Gauss algorithm** to calculate Orthodox Easter on the Julian calendar, then adds 13 days to convert to the Gregorian (New Calendar) used by Romanian Orthodox Church.

**Key Formula**:
```
a = year % 4
b = year % 7
c = year % 19
d = (19 * c + 15) % 30
e = (2 * a + 4 * b - d + 34) % 7
month = floor((d + e + 114) / 31)
day = ((d + e + 114) % 31) + 1
Gregorian date = Julian date + 13 days
```

---

### Easter Calculation Test Cases

**Test with Known Orthodox Easter Dates**:

| Year | Orthodox Easter (Gregorian) | Test Status |
|------|----------------------------|-------------|
| 2024 | May 5, 2024 | [ ] |
| 2025 | April 20, 2025 | [ ] |
| 2026 | April 12, 2026 | [ ] |
| 2027 | May 2, 2027 | [ ] |
| 2028 | April 16, 2028 | [ ] |
| 2029 | April 8, 2029 | [ ] |
| 2030 | April 28, 2030 | [ ] |

**Validation Steps**:
1. For each year, set device date to the Easter date listed
2. Launch app
3. Verify "Invierea Domnului - Pastele" appears as today's sermon
4. Verify feast name displays correctly
5. Calculate and verify movable feast dates (see below)

---

### Fixed Feasts Test Cases

**Objective**: Verify sermons appear on correct fixed calendar dates

**Test Matrix**:

| Date | Feast Name | Sermon in Database | Test Status |
|------|------------|-------------------|-------------|
| Jan 6 | Boboteaza - Botezul Domnului | Yes (sermon-007) | [ ] |
| Dec 6 | Sfantul Nicolae | Yes (sermon-005) | [ ] |
| Dec 25 | Nasterea Domnului | Yes (sermon-006) | [ ] |
| Jan 1 | Anul Nou - Sfantul Vasile cel Mare | No | [ ] |
| Jan 7 | Sfantul Ioan Botezatorul | No | [ ] |
| Feb 2 | Intampinarea Domnului | No | [ ] |
| Mar 25 | Buna Vestire | No | [ ] |
| Aug 15 | Adormirea Maicii Domnului | No | [ ] |
| Sep 14 | Inaltarea Sfintei Cruci | No | [ ] |

**Testing Procedure**:
1. Set device date to each test date
2. Launch/reload app
3. For dates WITH sermons in database:
   - Verify sermon appears in "Predica de Astazi"
   - Verify feast name displays
   - Verify "Asculta" button is present
4. For dates WITHOUT sermons in database:
   - Verify "Nu exista o predica programata pentru astazi" message
   - Verify feast name still displays (in `getOrthodoxFeastName()`)

---

### Movable Feasts Test Cases

**Objective**: Verify sermons appear on correct dates relative to Easter (Pascha)

**Based on Easter 2025 (April 20)**:

| Pascha Offset | Days from Easter | Date (2025) | Feast Name | Sermon ID | Test Status |
|--------------|-----------------|-------------|------------|-----------|-------------|
| -70 | 70 days before | Feb 9 | Duminica Vamesului si a Fariseului | sermon-010 | [ ] |
| -7 | 7 days before | Apr 13 | Duminica Floriilor | sermon-002 | [ ] |
| 0 | Easter Day | Apr 20 | Invierea Domnului | sermon-001 | [ ] |
| +35 | 35 days after | May 25 | Duminica Orbului | sermon-003 | [ ] |
| +39 | 39 days after | May 29 | Inaltarea Domnului | sermon-012 | [ ] |
| +49 | 49 days after | Jun 8 | Pogorarea Sfantului Duh (Rusalii) | sermon-004 | [ ] |

**Testing Procedure**:
1. For each date, set device date
2. Launch/reload app
3. Verify correct sermon appears
4. Verify feast name matches expected
5. Cross-reference with Orthodox calendar for accuracy

**Additional Validation**:
1. Use online Orthodox calendar tools to verify dates:
   - https://www.calendarortodox.ro/
   - https://www.crestinortodox.ro/calendar-ortodox/
2. Compare app's feast name with official calendar

---

### Pascha Offset Calculation Test

**Objective**: Verify the `calculatePaschaOffset()` function accuracy

**Manual Calculation Method**:

**Example**: Calculate offset for May 25, 2025 (Orthodox Easter is April 20, 2025)

```
Step 1: Get Easter date for year 2025
  Using getOrthodoxEaster(2025) = April 20, 2025

Step 2: Calculate difference
  May 25 - April 20 = 35 days

Step 3: Verify
  May has 31 days
  From April 20 to April 30 = 10 days
  From May 1 to May 25 = 25 days
  Total = 10 + 25 = 35 days ✓
```

**Test Cases**:

| Test Date | Expected Offset | Calculation | Test Status |
|-----------|----------------|-------------|-------------|
| Apr 13, 2025 | -7 | 7 days before Easter | [ ] |
| Apr 20, 2025 | 0 | Easter Day | [ ] |
| Apr 27, 2025 | +7 | Sunday of Thomas | [ ] |
| May 25, 2025 | +35 | Blind Man Sunday | [ ] |
| Jun 8, 2025 | +49 | Pentecost | [ ] |

**Debugging Method** (for developers):
```javascript
import { calculatePaschaOffset, getOrthodoxEaster } from './utils/calendarUtils';

const testDate = new Date(2025, 4, 25); // May 25, 2025 (month is 0-indexed)
const offset = calculatePaschaOffset(testDate);
const easter = getOrthodoxEaster(2025);

console.log('Test Date:', testDate.toDateString());
console.log('Easter 2025:', easter.toDateString());
console.log('Calculated Offset:', offset);
console.log('Expected Offset: 35');
```

---

### Sunday Count After Pentecost Test

**Objective**: Verify generic Sunday naming for Sundays after All Saints

**Algorithm**:
- Pentecost (Rusalii) = Pascha + 49 days
- All Saints Sunday = Pascha + 56 days
- Subsequent Sundays named: "Duminica a N-a dupa Rusalii"

**Test Cases (Based on Easter 2025 - April 20)**:

| Date | Pascha Offset | Expected Name | Test Status |
|------|--------------|---------------|-------------|
| Jun 8, 2025 | +49 | Duminica Rusaliilor | [ ] |
| Jun 15, 2025 | +56 | Duminica Tuturor Sfintilor | [ ] |
| Jun 22, 2025 | +63 | Duminica a 2-a dupa Rusalii | [ ] |
| Jun 29, 2025 | +70 | Duminica a 3-a dupa Rusalii | [ ] |
| Jul 6, 2025 | +77 | Duminica a 4-a dupa Rusalii | [ ] |

**Validation**:
1. Verify formula: `sundaysAfterPentecost = Math.floor((paschaOffset - 49) / 7)`
2. Verify Romanian number formatting (a 2-a, a 3-a, etc.)
3. Verify only Sundays get these names (not weekdays)

---

### Calendar Edge Cases

**Test Case A - Leap Year Handling**:

**Test Years**: 2024 (leap year), 2025 (non-leap year)

**Steps**:
1. Set date to Feb 29, 2024
2. Verify calendar functions don't crash
3. Calculate Easter for both years
4. Verify date arithmetic is correct

**Expected Result**:
- No errors on Feb 29
- Correct Easter calculations
- Pascha offset accurate across Feb 29

**Pass/Fail**: [ ]

---

**Test Case B - Year Boundary**:

**Steps**:
1. Test Dec 31, 2024 to Jan 1, 2025 transition
2. Verify feast names for both dates
3. Check Easter calculation for different years

**Expected Result**:
- No errors at year boundary
- Correct feast names
- Easter calculated for correct year

**Pass/Fail**: [ ]

---

**Test Case C - Multiple Feasts Same Day**:

**Note**: Some dates may have both fixed and movable feasts

**Steps**:
1. Find dates where fixed feast and movable feast coincide
2. Verify which takes precedence
3. Check sermon matching logic

**Expected Result**:
- App handles gracefully (currently first match wins)
- Document behavior for future enhancement

**Pass/Fail**: [ ]

---

## Edge Cases

### 1. No Sermon for Today

**Scenario**: User opens app on a date with no sermon

**Test Steps**:
1. Set device date to a non-feast date (e.g., March 3)
2. Launch app

**Expected Behavior**:
- White card with message: "Nu exista o predica programata pentru astazi."
- Subtext: "Explorati predicile disponibile mai jos."
- Full sermon list still accessible below
- Search functionality still works
- No errors or crashes

**Pass/Fail**: [ ]

---

### 2. Empty Search Results

**Scenario**: User searches for non-existent content

**Test Steps**:
1. Enter search query with no matches (e.g., "xyz123")
2. Observe results section

**Expected Behavior**:
- Message: "Nu s-au gasit predici pentru 'xyz123'"
- No sermon items displayed
- Search is clearable (X button works)
- Returning to empty search shows all sermons

**Pass/Fail**: [ ]

---

### 3. Audio Loading Errors

**Note**: Test when audio player is implemented

**Scenario A - Network Timeout**:

**Test Steps**:
1. Use network throttling (slow 3G)
2. Attempt to play sermon
3. Simulate timeout

**Expected Behavior**:
- Loading indicator appears
- Timeout after reasonable duration (30s suggested)
- Error message: "Nu s-a putut incarca audio. Verificati conexiunea."
- Retry button available
- App doesn't crash

**Pass/Fail**: [ ]

---

**Scenario B - Invalid Audio URL**:

**Test Steps**:
1. Modify data.ts to include invalid audio URL
2. Attempt to play that sermon

**Expected Behavior**:
- Error detected
- Message: "Fisierul audio nu este disponibil momentan."
- Graceful fallback
- Other sermons still playable

**Pass/Fail**: [ ]

---

**Scenario C - Audio Format Not Supported**:

**Test Steps**:
1. Test with non-MP3 format (if any in database)
2. Attempt playback

**Expected Behavior**:
- Format detection
- Error message if unsupported
- Clear explanation to user

**Pass/Fail**: [ ]

---

### 4. Network Offline Scenarios

**Scenario A - App Launch While Offline**:

**Test Steps**:
1. Enable airplane mode
2. Launch app (assuming previously cached)

**Expected Behavior**:
- App shell loads from cache
- Previously loaded sermon list displays
- Offline indicator visible
- Message about limited functionality
- No crashes

**Pass/Fail**: [ ]

---

**Scenario B - Going Offline During Playback**:

**Test Steps**:
1. Start playing a sermon
2. Enable airplane mode mid-playback

**Expected Behavior**:
- If audio buffered: continues playing
- If not buffered: pauses with error message
- Clear indication of offline status
- Ability to resume when back online

**Pass/Fail**: [ ]

---

**Scenario C - Going Offline During Search**:

**Test Steps**:
1. Load app online
2. Enable airplane mode
3. Attempt to search cached sermons

**Expected Behavior**:
- Search works on cached data
- Filter functionality still works
- Clear offline indicator
- No attempts to fetch new data

**Pass/Fail**: [ ]

---

### 5. Large Data Set Performance

**Scenario**: Test app with many sermons

**Test Steps**:
1. Add 100+ sermons to data.ts
2. Launch app
3. Scroll through list
4. Search and filter

**Expected Behavior**:
- Smooth scrolling (60fps target)
- Fast search/filter (< 100ms response)
- No memory leaks
- List virtualization (if implemented)

**Pass/Fail**: [ ]

---

### 6. Long Sermon Titles

**Scenario**: Test UI with extra-long text

**Test Steps**:
1. Add sermon with 100+ character title
2. View in list and today's sermon card

**Expected Behavior**:
- Text truncates with ellipsis (...)
- numberOfLines=2 respected in list items
- Card doesn't overflow
- Responsive layout maintained

**Pass/Fail**: [ ]

---

### 7. Special Characters in Search

**Scenario**: Test search with Romanian diacritics

**Test Steps**:
1. Search for "Sfântul" (with diacritic)
2. Search for "Sfantul" (without diacritic)
3. Search with accented characters (ă, â, î, ș, ț)

**Expected Behavior**:
- Both should find matching sermons
- Case-insensitive matching
- Diacritic-insensitive matching (recommended for Romanian)

**Current Behavior**: Case-insensitive only (exact diacritics required)

**Improvement Suggestion**: Implement diacritic normalization

**Pass/Fail**: [ ]

---

### 8. Rapid User Actions

**Scenario**: Stress test UI interactions

**Test Steps**:
1. Rapidly tap multiple sermon items
2. Quickly type and delete search text
3. Fast scroll through list
4. Rapid play/pause if audio player implemented

**Expected Behavior**:
- No crashes or freezes
- Debounced actions where appropriate
- No duplicate actions triggered
- Smooth performance

**Pass/Fail**: [ ]

---

### 9. Device Orientation Change

**Scenario**: Test portrait/landscape transitions

**Test Steps**:
1. Launch app in portrait
2. Rotate to landscape
3. Navigate between screens
4. Rotate back to portrait

**Expected Behavior**:
- Layout adapts responsively
- No content loss
- Playback continues (if playing)
- State preserved

**Note**: app.json sets orientation to "portrait-primary" for web, but mobile may rotate

**Pass/Fail**: [ ]

---

### 10. Memory Pressure

**Scenario**: Test app under low memory conditions

**Test Steps**:
1. Open multiple apps
2. Launch Predicile Parintelui
3. Navigate and play audio
4. Switch to other apps and back

**Expected Behavior**:
- App doesn't crash
- State preserved when returning
- Audio resumes properly
- Graceful handling of memory warnings

**Pass/Fail**: [ ]

---

## Future Test Setup

### Recommended Testing Stack

For comprehensive automated testing, consider implementing:

1. **Unit Tests**: Jest
2. **Component Tests**: React Native Testing Library
3. **E2E Tests**: Detox (iOS/Android) or Maestro
4. **Visual Regression**: Percy or Chromatic (for web)
5. **Performance**: Lighthouse (web), Flashlight (mobile)

---

### 1. Jest + React Native Testing Library Setup

**Installation**:

```bash
npm install --save-dev @testing-library/react-native @testing-library/jest-native jest
```

**Configuration** (jest.config.js):

```javascript
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|expo|@expo|@react-navigation|lucide-react-native)/)',
  ],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/__tests__/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
```

**Update package.json**:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

### 2. Unit Test Examples

**Test File**: `utils/__tests__/calendarUtils.test.ts`

```typescript
import {
  getOrthodoxEaster,
  calculatePaschaOffset,
  getTodaysSermon,
  getOrthodoxFeastName,
} from '../calendarUtils';
import { Sermon } from '../../data/data';

describe('calendarUtils', () => {
  describe('getOrthodoxEaster', () => {
    it('should calculate correct Easter date for 2024', () => {
      const easter2024 = getOrthodoxEaster(2024);
      expect(easter2024.getMonth()).toBe(4); // May (0-indexed)
      expect(easter2024.getDate()).toBe(5);
      expect(easter2024.getFullYear()).toBe(2024);
    });

    it('should calculate correct Easter date for 2025', () => {
      const easter2025 = getOrthodoxEaster(2025);
      expect(easter2025.getMonth()).toBe(3); // April
      expect(easter2025.getDate()).toBe(20);
    });

    it('should calculate correct Easter date for 2026', () => {
      const easter2026 = getOrthodoxEaster(2026);
      expect(easter2026.getMonth()).toBe(3); // April
      expect(easter2026.getDate()).toBe(12);
    });
  });

  describe('calculatePaschaOffset', () => {
    it('should return 0 for Easter Sunday 2025', () => {
      const easterDate = new Date(2025, 3, 20); // April 20, 2025
      const offset = calculatePaschaOffset(easterDate);
      expect(offset).toBe(0);
    });

    it('should return -7 for Palm Sunday 2025', () => {
      const palmSunday = new Date(2025, 3, 13); // April 13, 2025
      const offset = calculatePaschaOffset(palmSunday);
      expect(offset).toBe(-7);
    });

    it('should return 35 for Blind Man Sunday 2025', () => {
      const blindManSunday = new Date(2025, 4, 25); // May 25, 2025
      const offset = calculatePaschaOffset(blindManSunday);
      expect(offset).toBe(35);
    });

    it('should return 49 for Pentecost 2025', () => {
      const pentecost = new Date(2025, 5, 8); // June 8, 2025
      const offset = calculatePaschaOffset(pentecost);
      expect(offset).toBe(49);
    });
  });

  describe('getTodaysSermon', () => {
    const mockSermons: Sermon[] = [
      {
        id: 'test-1',
        title: 'Sfantul Nicolae',
        category: 'Predici Duminicale',
        audio_url: 'https://example.com/nicolae.mp3',
        type: 'fixed',
        fixed_month: 12,
        fixed_day: 6,
      },
      {
        id: 'test-2',
        title: 'Invierea Domnului',
        category: 'Predici Duminicale',
        audio_url: 'https://example.com/paste.mp3',
        type: 'movable',
        pascha_offset: 0,
      },
    ];

    it('should find sermon for fixed feast (St. Nicholas)', () => {
      // Mock date to December 6, 2025
      jest.useFakeTimers();
      jest.setSystemTime(new Date(2025, 11, 6)); // Dec 6, 2025

      const sermon = getTodaysSermon(mockSermons);
      expect(sermon).not.toBeNull();
      expect(sermon?.title).toBe('Sfantul Nicolae');

      jest.useRealTimers();
    });

    it('should find sermon for movable feast (Easter)', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(2025, 3, 20)); // Apr 20, 2025 (Easter)

      const sermon = getTodaysSermon(mockSermons);
      expect(sermon).not.toBeNull();
      expect(sermon?.title).toBe('Invierea Domnului');

      jest.useRealTimers();
    });

    it('should return null when no sermon matches', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(2025, 2, 3)); // Mar 3, 2025 (no sermon)

      const sermon = getTodaysSermon(mockSermons);
      expect(sermon).toBeNull();

      jest.useRealTimers();
    });
  });

  describe('getOrthodoxFeastName', () => {
    it('should return correct name for fixed feast', () => {
      const stNicholas = new Date(2025, 11, 6); // Dec 6
      const name = getOrthodoxFeastName(stNicholas);
      expect(name).toBe('Sfântul Nicolae');
    });

    it('should return correct name for movable feast', () => {
      const easter2025 = new Date(2025, 3, 20); // Apr 20, 2025
      const name = getOrthodoxFeastName(easter2025);
      expect(name).toBe('Învierea Domnului - Paștele');
    });

    it('should return empty string for non-feast day', () => {
      const regularDay = new Date(2025, 2, 3); // Mar 3
      const name = getOrthodoxFeastName(regularDay);
      expect(name).toBe('');
    });

    it('should return correct Sunday after Pentecost name', () => {
      const secondSundayAfterPentecost = new Date(2025, 5, 22); // Jun 22, 2025
      const name = getOrthodoxFeastName(secondSundayAfterPentecost);
      expect(name).toContain('după Rusalii');
    });
  });
});
```

**Run Tests**:
```bash
npm test
```

---

### 3. Component Test Examples

**Test File**: `app/(tabs)/__tests__/index.test.tsx`

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../index';

// Mock the data
jest.mock('../../../data/data', () => ({
  sermons: [
    {
      id: '1',
      title: 'Test Sermon 1',
      category: 'Predici Duminicale',
      audio_url: 'https://example.com/1.mp3',
      type: 'fixed',
      fixed_month: 12,
      fixed_day: 25,
      duration: '45:00',
    },
    {
      id: '2',
      title: 'Test Sermon 2',
      category: 'Cursuri',
      audio_url: 'https://example.com/2.mp3',
      type: 'fixed',
      fixed_month: 1,
      fixed_day: 1,
      duration: '30:00',
    },
  ],
}));

describe('HomeScreen', () => {
  it('should render header correctly', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Predicile Părintelui')).toBeTruthy();
  });

  it('should render search input', () => {
    render(<HomeScreen />);
    expect(screen.getByPlaceholderText('Caută predici...')).toBeTruthy();
  });

  it('should filter sermons when searching', () => {
    render(<HomeScreen />);
    const searchInput = screen.getByPlaceholderText('Caută predici...');

    fireEvent.changeText(searchInput, 'Test Sermon 1');

    expect(screen.getByText('Test Sermon 1')).toBeTruthy();
    expect(screen.queryByText('Test Sermon 2')).toBeNull();
  });

  it('should show all sermons when search is cleared', () => {
    render(<HomeScreen />);
    const searchInput = screen.getByPlaceholderText('Caută predici...');

    fireEvent.changeText(searchInput, 'Test');
    fireEvent.changeText(searchInput, '');

    expect(screen.getByText('Test Sermon 1')).toBeTruthy();
    expect(screen.getByText('Test Sermon 2')).toBeTruthy();
  });

  it('should show no results message when search has no matches', () => {
    render(<HomeScreen />);
    const searchInput = screen.getByPlaceholderText('Caută predici...');

    fireEvent.changeText(searchInput, 'nonexistent');

    expect(screen.getByText(/Nu s-au găsit predici/)).toBeTruthy();
  });

  it('should show results count when filtering', () => {
    render(<HomeScreen />);
    const searchInput = screen.getByPlaceholderText('Caută predici...');

    fireEvent.changeText(searchInput, 'Cursuri');

    expect(screen.getByText('Rezultate (1)')).toBeTruthy();
  });
});
```

---

### 4. E2E Testing with Detox

**Why Detox?**
- Gray box testing (direct access to native code)
- Fast and reliable for React Native
- Supports iOS and Android
- Synchronization with React Native bridge

**Installation**:

```bash
npm install --save-dev detox detox-cli
```

**Configuration** (package.json):

```json
{
  "detox": {
    "test-runner": "jest",
    "configurations": {
      "ios.sim.debug": {
        "device": {
          "type": "iPhone 15 Pro"
        },
        "app": "ios.debug"
      },
      "android.emu.debug": {
        "device": {
          "avdName": "Pixel_7_API_33"
        },
        "app": "android.debug"
      }
    }
  }
}
```

**E2E Test Example** (e2e/homeScreen.e2e.ts):

```typescript
describe('Home Screen E2E', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display home screen on launch', async () => {
    await expect(element(by.text('Predicile Părintelui'))).toBeVisible();
  });

  it('should search for sermons', async () => {
    await element(by.id('search-input')).typeText('Nicolae');
    await expect(element(by.text('Sfântul Nicolae'))).toBeVisible();
  });

  it('should clear search when X is tapped', async () => {
    await element(by.id('search-input')).typeText('test');
    await element(by.id('clear-search-button')).tap();
    await expect(element(by.id('search-input'))).toHaveText('');
  });

  it('should play sermon when tapping listen button', async () => {
    // Set date to Dec 6 for St. Nicholas
    await device.setSystemTime('2025-12-06T10:00:00Z');
    await device.reloadReactNative();

    await element(by.text('▶ Ascultă')).tap();
    // Verify audio player appears/starts (when implemented)
    // await expect(element(by.id('audio-player'))).toBeVisible();
  });
});
```

**Run E2E Tests**:
```bash
detox build --configuration ios.sim.debug
detox test --configuration ios.sim.debug
```

---

### 5. E2E Testing with Maestro (Alternative)

**Why Maestro?**
- Simpler setup than Detox
- No SDK integration required
- Cross-platform (iOS, Android, Web)
- YAML-based test flows
- Great for rapid prototyping

**Installation**:

```bash
# macOS/Linux
curl -Ls "https://get.maestro.mobile.dev" | bash

# Windows (via WSL)
# Install WSL first, then run above command
```

**Test Example** (maestro/home-screen-test.yaml):

```yaml
appId: com.predicileparintelui.app

---
- launchApp

- assertVisible: "Predicile Părintelui"

- tapOn: "Caută predici..."
- inputText: "Nicolae"
- assertVisible: "Sfântul Nicolae"

- tapOn: "✕"
- assertNotVisible: "Nicolae"

- tapOn: "▶ Ascultă"
# Audio player assertions when implemented

- scroll
- assertVisible: "Toate Predicile"
```

**Calendar Test** (maestro/calendar-test.yaml):

```yaml
appId: com.predicileparintelui.app

---
# Test fixed feast - St. Nicholas Day
- setSystemTime: "2025-12-06T08:00:00Z"
- launchApp
- assertVisible: "Sfântul Nicolae"
- assertVisible: "▶ Ascultă"

---
# Test movable feast - Easter 2025
- setSystemTime: "2025-04-20T08:00:00Z"
- launchApp
- assertVisible: "Învierea Domnului"
- assertVisible: "Paștele"

---
# Test no sermon day
- setSystemTime: "2025-03-03T08:00:00Z"
- launchApp
- assertVisible: "Nu există o predică programată pentru astăzi"
```

**Run Maestro Tests**:
```bash
maestro test maestro/home-screen-test.yaml
maestro test maestro/calendar-test.yaml
```

---

### 6. Performance Testing

**Lighthouse (Web PWA)**:

```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse https://your-deployed-pwa.com --view

# CI Integration
lighthouse https://your-deployed-pwa.com --output=json --output-path=./lighthouse-report.json
```

**Key Metrics to Track**:
- Performance Score: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90
- PWA: Passes all checks

**Flashlight (Mobile)**:

```bash
# Install Flashlight
npm install -g @perf-profiler/profiler

# Run performance test
flashlight test --appId com.predicileparintelui.app --testCommand "maestro test maestro/home-screen-test.yaml"
```

---

### 7. Visual Regression Testing

**Percy (Web)**:

```bash
npm install --save-dev @percy/cli @percy/puppeteer

# Run visual tests
percy exec -- node percy-tests.js
```

**Chromatic (Storybook)**:

```bash
npm install --save-dev chromatic

# Run chromatic
npx chromatic --project-token=<your-token>
```

---

### 8. Continuous Integration Setup

**GitHub Actions Example** (.github/workflows/test.yml):

```yaml
name: Test

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v3

  e2e-ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx detox build --configuration ios.sim.debug
      - run: npx detox test --configuration ios.sim.debug

  e2e-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx detox build --configuration android.emu.debug
      - run: npx detox test --configuration android.emu.debug
```

---

### 9. Code Coverage Goals

**Recommended Coverage Targets**:

| File Type | Coverage Target |
|-----------|----------------|
| Utils (calendarUtils.ts) | 95%+ |
| Components | 80%+ |
| Screens | 70%+ |
| Overall | 75%+ |

**Track Coverage**:
```bash
npm test -- --coverage --coverageReporters=html
open coverage/index.html
```

---

### 10. Testing Checklist for Future Development

**Before Each Release**:

- [ ] Run all unit tests (`npm test`)
- [ ] Run E2E tests on iOS simulator
- [ ] Run E2E tests on Android emulator
- [ ] Manual testing on real iOS device
- [ ] Manual testing on real Android device
- [ ] Web PWA testing on Chrome
- [ ] Web PWA testing on Safari
- [ ] Lighthouse audit (score > 90)
- [ ] Accessibility audit (WCAG AA compliance)
- [ ] Calendar calculations verified with online calendars
- [ ] Test with 3+ different Easter years
- [ ] All fixed feasts tested
- [ ] All movable feasts tested
- [ ] Offline functionality tested
- [ ] Audio playback tested (when implemented)
- [ ] Notifications tested (when implemented)

---

## Testing Resources

### Orthodox Calendar References
- **Calendar Ortodox**: https://www.calendarortodox.ro/
- **Crestin Ortodox**: https://www.crestinortodox.ro/calendar-ortodox/
- **BOR Official**: https://patriarhia.ro/calendar-ortodox

### Testing Tools Documentation
- **Jest**: https://jestjs.io/
- **React Native Testing Library**: https://callstack.github.io/react-native-testing-library/
- **Detox**: https://wix.github.io/Detox/
- **Maestro**: https://maestro.mobile.dev/
- **Lighthouse**: https://developer.chrome.com/docs/lighthouse/

### React Native Testing Best Practices
- Avoid testing implementation details
- Test user-visible behavior
- Use accessibility identifiers
- Mock external dependencies
- Keep tests fast and isolated

---

## Appendix: Known Issues & Future Enhancements

### Current Limitations
1. **Audio player not implemented** - Placeholder console.log only
2. **Notifications not implemented** - Configuration exists but no logic
3. **Search is diacritic-sensitive** - Users must match exact accents
4. **No offline sermon storage** - Audio requires internet
5. **No sermon bookmarking** - Users can't save favorites

### Recommended Enhancements
1. Implement diacritic-insensitive search for Romanian
2. Add sermon history/recently played
3. Implement playback speed control
4. Add sleep timer for nighttime listening
5. Support sermon downloads for offline playback
6. Add sharing functionality (social media, messaging)
7. Implement sermon notes/annotations
8. Add multi-language support (English, French for diaspora)

---

**Document Version**: 1.0
**Last Updated**: 2026-01-31
**Maintained By**: Development Team
