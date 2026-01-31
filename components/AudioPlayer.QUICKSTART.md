# AudioPlayer Quick Start Guide

Get the AudioPlayer working in 5 minutes!

## Step 1: Import the Component (30 seconds)

```tsx
import AudioPlayer from '@/components/AudioPlayer';
import { sermons } from '@/data/data';
import { useState } from 'react';
import { Modal, View } from 'react-native';
```

## Step 2: Add State (30 seconds)

```tsx
const [selectedSermon, setSelectedSermon] = useState(null);
const [showPlayer, setShowPlayer] = useState(false);
```

## Step 3: Add Modal (2 minutes)

```tsx
<Modal
  visible={showPlayer}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setShowPlayer(false)}
>
  <View style={{
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    padding: 20
  }}>
    {selectedSermon && (
      <AudioPlayer
        sermon={selectedSermon}
        onClose={() => setShowPlayer(false)}
      />
    )}
  </View>
</Modal>
```

## Step 4: Add Play Button (2 minutes)

```tsx
<TouchableOpacity
  onPress={() => {
    setSelectedSermon(sermons[0]); // First sermon
    setShowPlayer(true);
  }}
  style={{
    backgroundColor: '#8B1E3F',
    padding: 16,
    borderRadius: 8,
  }}
>
  <Text style={{ color: 'white', fontSize: 16 }}>
    Ascultă Predica
  </Text>
</TouchableOpacity>
```

## Complete Example

```tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet } from 'react-native';
import AudioPlayer from '@/components/AudioPlayer';
import { sermons } from '@/data/data';

export default function MyScreen() {
  const [selectedSermon, setSelectedSermon] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setSelectedSermon(sermons[0]);
          setShowPlayer(true);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Ascultă Predica</Text>
      </TouchableOpacity>

      <Modal
        visible={showPlayer}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPlayer(false)}
      >
        <View style={styles.modalOverlay}>
          {selectedSermon && (
            <AudioPlayer
              sermon={selectedSermon}
              onClose={() => setShowPlayer(false)}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
  },
  button: {
    backgroundColor: '#8B1E3F',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    padding: 20,
  },
});
```

## Test It!

1. Save the file
2. Run `npm start`
3. Open on your device/simulator
4. Click "Ascultă Predica"
5. Player should open and audio should stream!

## Controls

- **Large Gold Button**: Play/Pause
- **Left Arrow + 15**: Skip back 15 seconds
- **Right Arrow + 15**: Skip forward 15 seconds
- **Shuffle Icon**: Toggle shuffle (for playlists)
- **Volume Icon**: Show volume slider
- **Progress Bar**: Drag to seek

## Troubleshooting

**Player doesn't open?**
- Check console for errors
- Verify `sermons` is imported correctly
- Make sure `showPlayer` state updates

**Audio won't play?**
- Check internet connection
- Verify the `audio_url` in sermons data
- Check device volume

**TypeScript errors?**
- Make sure `@/components/AudioPlayer` path works
- Check tsconfig.json has path aliases

## Next Steps

- Read **AudioPlayer.INTEGRATION.md** for advanced usage
- Read **AudioPlayer.README.md** for full documentation
- Check **AudioPlayer.example.tsx** for more examples

## Need Help?

1. Check the console for error messages
2. Verify expo-av is installed: `npm list expo-av`
3. Make sure you're on a physical device or simulator (web has limited support)

---

**That's it! You now have a working audio player!** 🎵
