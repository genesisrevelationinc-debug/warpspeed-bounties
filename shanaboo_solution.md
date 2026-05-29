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
+  GestureResponderEvent,
+} from 'react-native';
+import Slider from '@react-native-community/slider';
+import { Audio } from 'expo-av';
+import { useAudioStore } from '../../store/audioStore';
+import { formatDuration } from '../../utils/timeUtils';
+import { AudioPlayerProps, PlaybackSpeed } from '../../types/audio';
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
+  const { updateLastPosition, getLastPosition } = useAudioStore();
+
+  const loadAudio = useCallback(async () => {
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
+      setIsLoading(false);
+    } catch (error) {
+      console.error('Error loading audio:', error);
+      setIsLoading(false);
+    }
+  }, [audioUri, initialPosition, playbackSpeed]);
+
+  useEffect(() => {
+    loadAudio();
+    return () => {
+      sound?.unloadAsync();
+    };
+  }, [loadAudio]);
+
+  const onPlaybackStatusUpdate = (status: Audio.PlaybackStatus) => {
+    if (status.isLoaded) {
+      setPosition(status.positionMillis);
+      setDuration(status.durationMillis || 0);
+      setIsPlaying(status.isPlaying);
+      
+      if (status.durationMillis) {
+        const progress = status.positionMillis / status.durationMillis;
+        progressAnim.setValue(progress);
+      }
+
+      if (status.didJustFinish) {
+        updateLastPosition(noteId, 0);
+        setPosition(0);
+      }
+    }
+  };
+
+  const togglePlayPause = async () => {
+    if (!sound) return;
+
+    if (isPlaying) {
+      await sound.pauseAsync();
+    } else {
+      const lastPosition = getLastPosition(noteId);
+      if (lastPosition > 0 && position === 0) {
+        await sound.setPositionAsync(lastPosition);
+      }
+      await sound.playAsync();
+    }
+  };
+
+  const seekTo = async (value: number) => {
+    if (!sound || !duration) return;
+    const newPosition = Math.floor(value * duration);
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
+    if (!sound) return;
+    const currentIndex = PLAYBACK_SPEEDS.indexOf(playbackSpeed);
+    const nextIndex = (currentIndex + 1) % PLAYBACK_SPEEDS.length;
+    const newSpeed = PLAYBACK_SPEEDS[nextIndex];
+    await sound.setRateAsync(newSpeed, true);
+    setPlaybackSpeed(newSpeed);
+  };
+
+  const handleDelete = () => {
+    sound?.unloadAsync();
+    onDelete?.();
+  };
+
+  const progressPercent = duration > 0 ? (position / duration) * 100 : 0;
+
+  return (
+    <View style={styles.container}>
+      <View style={styles.waveformContainer}>
+        <View style={styles.waveform}>
+          {Array.from({ length: 40 }).map((_, i) => (
+            <Animated.View
+              key={i}
+              style={[
+                styles.waveformBar,
+                {
+                  height: Math.random() * 30 + 5,
+                  backgroundColor:
+                    i < progressPercent / 2.5
+                      ? '#4A90D9'
+                      : '#E0E0E0',
+                },
+              ]}
+            />
+          ))}
+        </View>
+      </View>
+
+      <View style={styles.progressContainer}>
+        <Text style={styles.timeText}>{formatDuration(position)}</Text>
+        <Slider
+          style={styles.progressBar}
+          value={position}
+          minimumValue={0}
+          maximumValue={duration || 1}
+          onSlidingComplete={(value) => seekTo(value / (duration || 1))}
+          minimumTrackTintColor="#4A90D9"
+          maximumTrackTintColor="#E0E0E0"
+          thumbTintColor="#4A90D9"
+        />
+        <Text style={styles.timeText}>{formatDuration(duration)}</Text>
+      </View>
+
+      <View style={styles.controlsContainer}>
+        <TouchableOpacity onPress={skipBackward} style={styles.controlButton}>
+          <Text style={styles.controlText}>⏪ 15s</Text>
+        </TouchableOpacity>
+
+        <TouchableOpacity
+          onPress={togglePlayPause}
+          style={styles.playButton}
+          disabled={isLoading}
+        >
+          <Text style={styles.playButtonText}>
+            {isPlaying ? '⏸' : '▶️'}
+          </Text>
+        </