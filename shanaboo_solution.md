 ```diff
--- /dev/null
+++ b/src/components/audio/AudioPlayer.tsx
@@ -0,0 +1,268 @@
+import React, { useCallback, useEffect, useRef, useState } from 'react';
+import {
+  View,
+  Text,
+  TouchableOpacity,
+  StyleSheet,
+  Animated,
+  PanResponder,
+  GestureResponderEvent,
+} from 'react-native';
+import { Audio } from 'expo-av';
+import { Ionicons } from '@expo/vector-icons';
+import { AudioPlayerProps, PlaybackSpeed } from './types';
+import { formatDuration } from '../../utils/audioUtils';
+
+const PLAYBACK_SPEEDS: PlaybackSpeed[] = [1, 1.5, 2];
+
+export const AudioPlayer: React.FC<AudioPlayerProps> = ({
+  audioUri,
+  initialPosition = 0,
+  onPositionChange,
+  onDelete,
+  style,
+}) => {
+  const [sound, setSound] = useState<Audio.Sound | null>(null);
+  const [isPlaying, setIsPlaying] = useState(false);
+  const [position, setPosition] = useState(initialPosition);
+  const [duration, setDuration] = useState(0);
+  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1);
+  const [isLoading, setIsLoading] = useState(true);
+  const progressAnim = useRef(new Animated.Value(0)).current;
+  const positionRef = useRef(position);
+  const durationRef = useRef(duration);
+
+  useEffect(() => {
+    positionRef.current = position;
+  }, [position]);
+
+  useEffect(() => {
+    durationRef.current = duration;
+  }, [duration]);
+
+  const loadSound = useCallback(async () => {
+    try {
+      setIsLoading(true);
+      const { sound: newSound, status } = await Audio.Sound.createAsync(
+        { uri: audioUri },
+        {
+          positionMillis: initialPosition,
+          shouldPlay: false,
+          rate: playbackSpeed,
+        },
+        onPlaybackStatusUpdate
+      );
+
+      setSound(newSound);
+      if (status.isLoaded) {
+        setDuration(status.durationMillis || 0);
+        setPosition(status.positionMillis);
+      }
+      setIsLoading(false);
+    } catch (error) {
+      console.error('Error loading sound:', error);
+      setIsLoading(false);
+    }
+  }, [audioUri, initialPosition]);
+
+  useEffect(() => {
+    loadSound();
+    return () => {
+      if (sound) {
+        sound.unloadAsync();
+      }
+    };
+  }, [audioUri]);
+
+  const onPlaybackStatusUpdate = useCallback(
+    (status: Audio.PlaybackStatus) => {
+      if (!status.isLoaded) return;
+
+      if (status.didJustFinish) {
+        setIsPlaying(false);
+        setPosition(0);
+        onPositionChange?.(0);
+        progressAnim.setValue(0);
+        return;
+      }
+
+      setPosition(status.positionMillis);
+      setDuration(status.durationMillis || durationRef.current);
+
+      const progress = status.durationMillis
+        ? status.positionMillis / status.durationMillis
+        : 0;
+      progressAnim.setValue(progress);
+
+      if (status.isPlaying) {
+        onPositionChange?.(status.positionMillis);
+      }
+    },
+    [onPositionChange, progressAnim]
+  );
+
+  const togglePlayPause = useCallback(async () => {
+    if (!sound) return;
+
+    if (isPlaying) {
+      await sound.pauseAsync();
+      setIsPlaying(false);
+    } else {
+      await sound.playAsync();
+      setIsPlaying(true);
+    }
+  }, [sound, isPlaying]);
+
+  const seekTo = useCallback(
+    async (millis: number) => {
+      if (!sound) return;
+      const clampedMillis = Math.max(0, Math.min(millis, duration));
+      await sound.setPositionAsync(clampedMillis);
+      setPosition(clampedMillis);
+      const progress = duration > 0 ? clampedMillis / duration : 0;
+      progressAnim.setValue(progress);
+    },
+    [sound, duration, progressAnim]
+  );
+
+  const skipForward = useCallback(async () => {
+    await seekTo(position + 15000); // 15 seconds
+  }, [seekTo, position]);
+
+  const skipBackward = useCallback(async () => {
+    await seekTo(position - 15000); // 15 seconds
+  }, [seekTo, position]);
+
+  const changePlaybackSpeed = useCallback(() => {
+    const currentIndex = PLAYBACK_SPEEDS.indexOf(playbackSpeed);
+    const nextIndex = (currentIndex + 1) % PLAYBACK_SPEEDS.length;
+    const newSpeed = PLAYBACK_SPEEDS[nextIndex];
+    setPlaybackSpeed(newSpeed);
+    sound?.setRateAsync(newSpeed, true);
+  }, [playbackSpeed, sound]);
+
+  const panResponder = useRef(
+    PanResponder.create({
+      onStartShouldSetPanResponder: () => true,
+      onMoveShouldSetPanResponder: () => true,
+      onPanResponderMove: (_, gestureState) => {
+        const { moveX } = gestureState;
+        // Calculate progress based on touch position
+        // This is simplified; in production, measure the progress bar layout
+      },
+      onPanResponderRelease: (_, gestureState) => {
+        // Handle seek on release
+      },
+    })
+  ).current;
+
+  const progressPercent = duration > 0 ? (position / duration) * 100 : 0;
+
+  return (
+    <View style={[styles.container, style]}>
+      <View style={styles.controlsRow}>
+        <TouchableOpacity onPress={skipBackward} style={styles.controlButton}>
+          <Ionicons name="play-back" size={20} color="#666" />
+          <Text style={styles.skipText}>15</Text>
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
+        <TouchableOpacity onPress={skipForward} style={styles.controlButton}>
+          <Ionicons name="play-forward" size={20} color="#666"