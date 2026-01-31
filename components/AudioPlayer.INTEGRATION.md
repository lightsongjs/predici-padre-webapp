# AudioPlayer Integration Guide

Quick guide to integrate the AudioPlayer component into your Semons app.

## Step 1: Import the Component

```tsx
import AudioPlayer from '@/components/AudioPlayer';
import { Sermon } from '@/data/data';
```

## Step 2: Basic Integration in a Screen

### Option A: Modal Player (Recommended for initial implementation)

```tsx
// app/(tabs)/sermons.tsx
import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, Modal, StyleSheet } from 'react-native';
import { sermons } from '@/data/data';
import AudioPlayer from '@/components/AudioPlayer';
import { Theme } from '@/constants/Theme';

export default function SermonsScreen() {
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  const [playerVisible, setPlayerVisible] = useState(false);

  const handleSermonPress = (sermon: Sermon) => {
    setSelectedSermon(sermon);
    setPlayerVisible(true);
  };

  const closePlayer = () => {
    setPlayerVisible(false);
    // Audio will continue playing until component unmounts
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sermons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.sermonCard}
            onPress={() => handleSermonPress(item)}
          >
            <Text style={styles.sermonTitle}>{item.title}</Text>
            <Text style={styles.sermonCategory}>{item.category}</Text>
            <Text style={styles.sermonDuration}>{item.duration}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Audio Player Modal */}
      <Modal
        visible={playerVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closePlayer}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedSermon && (
              <AudioPlayer sermon={selectedSermon} onClose={closePlayer} />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.main,
  },
  sermonCard: {
    backgroundColor: Theme.colors.background.paper,
    padding: Theme.spacing.md,
    marginHorizontal: Theme.spacing.md,
    marginVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.card,
    borderWidth: 1,
    borderColor: Theme.colors.border.light,
  },
  sermonTitle: {
    fontSize: Theme.typography.fontSize.h5,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.primary,
    marginBottom: 4,
  },
  sermonCategory: {
    fontSize: Theme.typography.fontSize.bodySmall,
    color: Theme.colors.text.secondary,
    marginBottom: 4,
  },
  sermonDuration: {
    fontSize: Theme.typography.fontSize.caption,
    color: Theme.colors.text.tertiary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    padding: Theme.spacing.lg,
  },
  modalContent: {
    // No extra styling needed, AudioPlayer handles its own style
  },
});
```

### Option B: Persistent Bottom Player (Advanced)

For a Spotify-like persistent player that stays visible across screens:

```tsx
// Create a context: contexts/AudioPlayerContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Sermon } from '@/data/data';

interface AudioPlayerContextType {
  currentSermon: Sermon | null;
  setCurrentSermon: (sermon: Sermon | null) => void;
  isPlayerVisible: boolean;
  showPlayer: () => void;
  hidePlayer: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentSermon, setCurrentSermon] = useState<Sermon | null>(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const showPlayer = () => setIsPlayerVisible(true);
  const hidePlayer = () => setIsPlayerVisible(false);

  return (
    <AudioPlayerContext.Provider
      value={{
        currentSermon,
        setCurrentSermon,
        isPlayerVisible,
        showPlayer,
        hidePlayer,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
  }
  return context;
};
```

Then wrap your app with the provider:

```tsx
// app/_layout.tsx
import { AudioPlayerProvider } from '@/contexts/AudioPlayerContext';
import PersistentAudioPlayer from '@/components/PersistentAudioPlayer';

export default function RootLayout() {
  return (
    <AudioPlayerProvider>
      <Stack>
        {/* Your screens */}
      </Stack>
      <PersistentAudioPlayer />
    </AudioPlayerProvider>
  );
}
```

Create the persistent player component:

```tsx
// components/PersistentAudioPlayer.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import { useAudioPlayer } from '@/contexts/AudioPlayerContext';
import AudioPlayer from './AudioPlayer';
import { Theme } from '@/constants/Theme';
import { ChevronDown } from 'lucide-react-native';

export default function PersistentAudioPlayer() {
  const { currentSermon, isPlayerVisible, hidePlayer } = useAudioPlayer();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!currentSermon || !isPlayerVisible) return null;

  return (
    <>
      {/* Mini Player */}
      {!isExpanded && (
        <TouchableOpacity
          style={styles.miniPlayer}
          onPress={() => setIsExpanded(true)}
        >
          <View style={styles.miniPlayerContent}>
            <Text style={styles.miniPlayerTitle} numberOfLines={1}>
              {currentSermon.title}
            </Text>
            <Text style={styles.miniPlayerSubtitle}>{currentSermon.category}</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Expanded Player Modal */}
      <Modal
        visible={isExpanded}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsExpanded(false)}
      >
        <View style={styles.expandedOverlay}>
          <TouchableOpacity
            style={styles.collapseButton}
            onPress={() => setIsExpanded(false)}
          >
            <ChevronDown size={32} color={Theme.colors.text.inverse} />
          </TouchableOpacity>
          <View style={styles.expandedContent}>
            <AudioPlayer sermon={currentSermon} />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  miniPlayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Theme.colors.primary.main,
    padding: Theme.spacing.md,
    borderTopLeftRadius: Theme.borderRadius.lg,
    borderTopRightRadius: Theme.borderRadius.lg,
    ...Platform.select({
      ios: Theme.shadows.ios.md,
      android: { elevation: Theme.shadows.android.md },
    }),
  },
  miniPlayerContent: {
    flexDirection: 'column',
  },
  miniPlayerTitle: {
    fontSize: Theme.typography.fontSize.body,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.inverse,
    marginBottom: 4,
  },
  miniPlayerSubtitle: {
    fontSize: Theme.typography.fontSize.caption,
    color: Theme.colors.accent.light,
  },
  expandedOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: Theme.spacing.lg,
    justifyContent: 'center',
  },
  collapseButton: {
    alignSelf: 'center',
    marginBottom: Theme.spacing.md,
  },
  expandedContent: {
    // AudioPlayer handles its own styling
  },
});
```

Then use it in any screen:

```tsx
import { useAudioPlayer } from '@/contexts/AudioPlayerContext';

export default function SermonsScreen() {
  const { setCurrentSermon, showPlayer } = useAudioPlayer();

  const handleSermonPress = (sermon: Sermon) => {
    setCurrentSermon(sermon);
    showPlayer();
  };

  // ... rest of your component
}
```

## Step 3: Test the Integration

1. **Start the app**:
   ```bash
   npm start
   ```

2. **Test on device/simulator**:
   - Press on a sermon
   - Player should open
   - Test play/pause
   - Test skip forward/backward
   - Test progress bar
   - Test volume control

3. **Test error scenarios**:
   - Try with invalid audio URL
   - Test with no internet connection
   - Test loading states

## Step 4: Customize (Optional)

### Custom Album Art
Replace the placeholder cross with actual Saint icons:

```tsx
// In AudioPlayer.tsx, replace:
<View style={styles.albumArt}>
  <Text style={styles.albumArtIcon}>✟</Text>
</View>

// With:
<Image
  source={{ uri: sermon.icon_url }}
  style={styles.albumArtImage}
  defaultSource={require('@/assets/images/default-icon.png')}
/>
```

### Custom Colors
Modify the Theme.ts file to change the color scheme.

### Add More Features
See AudioPlayer.README.md for ideas on future enhancements.

## Troubleshooting

### "Module not found" errors
Make sure the path aliases are set up correctly in tsconfig.json:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Audio not playing
1. Check that expo-av is installed: `npm list expo-av`
2. Verify the audio URL is accessible
3. Check device volume and silent mode settings

### Player not showing
1. Verify the sermon object has a valid `audio_url`
2. Check that the modal's `visible` state is true
3. Look for errors in console

## Next Steps

1. **Add Analytics**: Track which sermons are played most
2. **Add Notifications**: Show current sermon in notification bar
3. **Add Playlist**: Queue multiple sermons
4. **Add Bookmarks**: Save position for later
5. **Add Sharing**: Share sermon with friends (without download)

## Support

For issues or questions, check:
- AudioPlayer.README.md for detailed documentation
- AudioPlayer.example.tsx for usage examples
- Console logs for debugging information
