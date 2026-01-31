/**
 * AudioPlayer Example Usage
 *
 * This file demonstrates how to use the AudioPlayer component in your app.
 * You can integrate it as a modal, bottom sheet, or persistent player.
 */

import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';
import AudioPlayer from './AudioPlayer';
import { Sermon } from '@/data/data';
import { Theme } from '@/constants/Theme';

interface AudioPlayerModalProps {
  visible: boolean;
  sermon: Sermon | null;
  onClose: () => void;
}

/**
 * Example 1: AudioPlayer as a Modal
 */
export function AudioPlayerModal({ visible, sermon, onClose }: AudioPlayerModalProps) {
  if (!sermon) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color={Theme.colors.text.inverse} />
          </TouchableOpacity>

          {/* Audio Player */}
          <AudioPlayer sermon={sermon} onClose={onClose} />
        </View>
      </View>
    </Modal>
  );
}

/**
 * Example 2: AudioPlayer as a Bottom Sheet (Persistent Player)
 */
export function PersistentAudioPlayer({ sermon }: { sermon: Sermon | null }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!sermon) return null;

  return (
    <View style={styles.persistentContainer}>
      {isExpanded ? (
        <View style={styles.expandedPlayer}>
          <TouchableOpacity
            style={styles.collapseButton}
            onPress={() => setIsExpanded(false)}
          >
            <Text style={styles.collapseText}>▼</Text>
          </TouchableOpacity>
          <AudioPlayer sermon={sermon} />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.miniPlayer}
          onPress={() => setIsExpanded(true)}
        >
          <Text style={styles.miniPlayerText} numberOfLines={1}>
            {sermon.title}
          </Text>
          <Text style={styles.miniPlayerSubtext}>Apăsați pentru a extinde</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

/**
 * Example 3: Usage in a Screen Component
 */
export function ExampleScreen() {
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Example sermon data
  const exampleSermon: Sermon = {
    id: 'sermon-001',
    title: 'Învierea Domnului',
    category: 'Predici Duminicale',
    audio_url: 'https://example.com/audio/sermon-invierea-domnului.mp3',
    type: 'movable',
    pascha_offset: 0,
    duration: '52:15',
    description: 'Predică despre Învierea Domnului nostru Iisus Hristos'
  };

  const openPlayer = (sermon: Sermon) => {
    setSelectedSermon(sermon);
    setModalVisible(true);
  };

  const closePlayer = () => {
    setModalVisible(false);
    // Note: Audio will continue playing unless you implement cleanup
  };

  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => openPlayer(exampleSermon)}
      >
        <Text style={styles.playButtonText}>Ascultă Predica</Text>
      </TouchableOpacity>

      <AudioPlayerModal
        visible={modalVisible}
        sermon={selectedSermon}
        onClose={closePlayer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    padding: Theme.spacing.lg,
  },
  modalContent: {
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: -Theme.spacing.xl,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: Theme.borderRadius.round,
    backgroundColor: Theme.colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  // Persistent Player Styles
  persistentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  expandedPlayer: {
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.background.paper,
  },
  collapseButton: {
    alignSelf: 'center',
    marginBottom: Theme.spacing.sm,
  },
  collapseText: {
    fontSize: 20,
    color: Theme.colors.text.primary,
  },
  miniPlayer: {
    backgroundColor: Theme.colors.primary.main,
    padding: Theme.spacing.md,
    borderTopLeftRadius: Theme.borderRadius.lg,
    borderTopRightRadius: Theme.borderRadius.lg,
  },
  miniPlayerText: {
    fontSize: Theme.typography.fontSize.body,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.inverse,
    marginBottom: 4,
  },
  miniPlayerSubtext: {
    fontSize: Theme.typography.fontSize.caption,
    color: Theme.colors.accent.light,
  },

  // Example Screen Styles
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background.main,
  },
  playButton: {
    backgroundColor: Theme.colors.primary.main,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    borderRadius: Theme.borderRadius.button,
  },
  playButtonText: {
    fontSize: Theme.typography.fontSize.button,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.inverse,
  },
});
