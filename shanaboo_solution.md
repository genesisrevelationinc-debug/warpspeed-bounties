```diff
--- /dev/null
+++ b/src/components/audio/AudioPlayer.tsx
@@ -0,0 +1,268 @@
+import React, { useState, useEffect, useRef, useCallback } from 'react';
+import {
+  View,
+  Text,
+  TouchableOpacity,
+  StyleSheet,
+  Animated,
+  PanResponder,
+  Dimensions,
+} from 'react-native';
+import { Audio } from 'expo-av';
+import { Ionicons } from '@expo/vector-icons';
+import { AudioPlayerProps, PlaybackSpeed } from '../../types/audio';
+import { formatDuration } from '../../utils/time';
+import { useAudioStore } from '../../store/audioStore';
+
+const { width: screenWidth } = Dimensions.get('window');
+
+const PLAYBACK_SPEEDS: PlaybackSpeed[] = [0.5, 1, 1.5, 2];
+
+export const AudioPlayer: React.FC<AudioPlayerProps> = ({
+  audioUri,
+  noteId,
+  initialPosition = 0,
+  onDelete,
+  onTranscribe,
+}) => {
+  const [sound, setSound] = useState<Audio.Sound | null>(null);
+  const [isPlaying, setIsPlaying] = useState(false);
+  const [position, setPosition] = useState(initialPosition);
+  const [duration, setDuration] = useState(0);
+  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1);
+  const [isLoading, setIsLoading] = useState(true);
+  const progressAnim = useRef(new Animated.Value(0)).current;
+  const { savePlaybackPosition } = useAudioStore();
+
+  useEffect(() => {
+    loadAudio();
+    return () => {
+      cleanup();
+    };
+  }, [audioUri]);
+
+  const cleanup = async () => {
+    if (sound) {
+      await sound.stopAsync();
+      await sound.unloadAsync();
+    }
+  };
+
+  const loadAudio = async () => {
+    try {
+      setIsLoading(true);
+      const { sound: newSound } = await Audio.Sound.createAsync(
+        { uri: audioUri },
+        {
+          shouldPlay: false,
+          positionMillis: initialPosition,
+          rate: playbackSpeed,
+        },
+        onPlaybackStatusUpdate
+      );
+      setSound(newSound);
+      const status = await newSound.getStatusAsync();
+      if (status.isLoaded) {
+        setDuration(status.durationMillis || 0);
+        setPosition(status.positionMillis || 0);
+      }
+      setIsLoading(false);
+    } catch (error) {
+      console.error('Error loading audio:', error);
+      setIsLoading(false);
+    }
+  };
+
+  const onPlaybackStatusUpdate = useCallback(
+    (status: Audio.PlaybackStatus) => {
+      if (!status.isLoaded) return;
+
+      setPosition(status.positionMillis);
+      setIsPlaying(status.isPlaying);
+
+      if (status.durationMillis) {
+        const progress = status.positionMillis / status.durationMillis;
+        progressAnim.setValue(progress);
+      }
+
+      if (status.didJustFinish) {
+        savePlaybackPosition(noteId, 0);
+        progressAnim.setValue(0);
+      }
+    },
+    [noteId, progressAnim, savePlaybackPosition]
+  );
+
+  const togglePlayPause = async () => {
+    if (!sound) return;
+
+    if (isPlaying) {
+      await sound.pauseAsync();
+    } else {
+      await sound.playAsync();
+    }
+  };
+
+  const seekTo = async (percentage: number) => {
+    if (!sound || !duration) return;
+
+    const newPosition = Math.max(0, Math.min(duration * percentage, duration));
+    await sound.setPositionAsync(newPosition);
+    setPosition(newPosition);
+  };
+
+  const skipForward = async () => {
+    if (!sound) return;
+    const newPosition = Math.min(position + 15000, duration);
+    await sound.setPositionAsync(newPosition);
+  };
+
+  const skipBackward = async () => {
+    if (!sound) return;
+    const newPosition = Math.max(position - 15000, 0);
+    await sound.setPositionAsync(newPosition);
+  };
+
+  const changePlaybackSpeed = async () => {
+    const currentIndex = PLAYBACK_SPEEDS.indexOf(playbackSpeed);
+    const nextIndex = (currentIndex + 1) % PLAYBACK_SPEEDS.length;
+    const newSpeed = PLAYBACK_SPEEDS[nextIndex];
+    setPlaybackSpeed(newSpeed);
+
+    if (sound) {
+      await sound.setRateAsync(newSpeed, true);
+    }
+  };
+
+  const handleDelete = () => {
+    cleanup();
+    onDelete?.();
+  };
+
+  const progressBarWidth = screenWidth - 120;
+  const panResponder = useRef(
+    PanResponder.create({
+      onStartShouldSetPanResponder: () => true,
+      onMoveShouldSetPanResponder: () => true,
+      onPanResponderMove: (_, gestureState) => {
+        const percentage = Math.max(
+          0,
+          Math.min(gestureState.moveX / progressBarWidth, 1)
+        );
+        progressAnim.setValue(percentage);
+      },
+      onPanResponderRelease: (_, gestureState) => {
+        const percentage = Math.max(
+          0,
+          Math.min(gestureState.moveX / progressBarWidth, 1)
+        );
+        seekTo(percentage);
+      },
+    })
+  ).current;
+
+  const progressWidth = progressAnim.interpolate({
+    inputRange: [0, 1],
+    outputRange: ['0%', '100%'],
+  });
+
+  return (
+    <View style={styles.container}>
+      <View style={styles.waveformContainer}>
+        <AudioWaveform isPlaying={isPlaying} />
+      </View>
+
+      <View style={styles.controlsContainer}>
+        <TouchableOpacity onPress={skipBackward} style={styles.controlButton}>
+          <Ionicons name="play-back" size={20} color="#666" />
+        </TouchableOpacity>
+
+        <TouchableOpacity
+          onPress={togglePlayPause}
+          style={styles.playButton}
+          disabled={isLoading}
+        >
+          <Ionicons
+            name={isPlaying ? 'pause' : 'play'}
+            size={28}
+            color="#fff"
+          />
+        </TouchableOpacity>
+
+        <TouchableOpacity onPress