 ```diff
--- /dev/null
+++ b/b/src/components/AudioNote/AudioPlayer.tsx
@@ -0,0 +1,298 @@
+import React, { useState, useEffect, useRef, useCallback } from 'react';
+import {
+  View,
+  Text,
+  TouchableOpacity,
+  StyleSheet,
+  Slider,
+  ActivityIndicator,
+} from 'react-native';
+import { Audio } from 'expo-av';
+import { Ionicons } from '@expo/vector-icons';
+import { AudioNote, PlaybackSpeed } from '../../types/audio';
+import { audioService } from '../../services/audioService';
+import { formatDuration } from '../../utils/timeUtils';
+
+interface AudioPlayerProps {
+  audioNote: AudioNote;
+  onDelete?: () => void;
+  onTranscribe?: () => void;
+  showTranscribe?: boolean;
+}
+
+export const AudioPlayer: React.FC<AudioPlayerProps> = ({
+  audioNote,
+  onDelete,
+  onTranscribe,
+  showTranscribe = true,
+}) => {
+  const [isPlaying, setIsPlaying] = useState(false);
+  const [position, setPosition] = useState(audioNote.lastPosition || 0);
+  const [duration, setDuration] = useState(audioNote.duration || 0);
+  const [isLoading, setIsLoading] = useState(false);
+  const [speed, setSpeed] = useState<PlaybackSpeed>(PlaybackSpeed.NORMAL);
+  const soundRef = useRef<Audio.Sound | null>(null);
+  const positionInterval = useRef<ReturnType<typeof setInterval> | null>(null);
+
+  useEffect(() => {
+    return () => {
+      stopPlayback();
+    };
+  }, []);
+
+  const stopPlayback = async () => {
+    if (positionInterval.current) {
+      clearInterval(positionInterval.current);
+      positionInterval.current = null;
+    }
+    if (soundRef.current) {
+      await soundRef.current.stopAsync();
+      soundRef.current.unloadAsync();
+      soundRef.current = null;
+    }
+    setIsPlaying(false);
+  };
+
+  const loadAndPlay = async () => {
+    setIsLoading(true);
+    try {
+      if (soundRef.current) {
+        await soundRef.current.unloadAsync();
+      }
+
+      const { sound } = await Audio.Sound.createAsync(
+        { uri: audioNote.audioUrl },
+        {
+          positionMillis: position,
+          shouldPlay: true,
+          rate: speed,
+        }
+      );
+
+      soundRef.current = sound;
+
+      const status = await sound.getStatusAsync();
+      if (status.isLoaded) {
+        setDuration(status.durationMillis || audioNote.duration || 0);
+      }
+
+      sound.setOnPlaybackStatusUpdate((playbackStatus) => {
+        if (!playbackStatus.isLoaded) return;
+
+        if (playbackStatus.didJustFinish) {
+          setPosition(0);
+          setIsPlaying(false);
+          if (positionInterval.current) {
+            clearInterval(positionInterval.current);
+            positionInterval.current = null;
+          }
+        } else {
+          setPosition(playbackStatus.positionMillis);
+        }
+      });
+
+      setIsPlaying(true);
+      startPositionTracking();
+    } catch (error) {
+      console.error('Error loading audio:', error);
+    } finally {
+      setIsLoading(false);
+    }
+  };
+
+  const startPositionTracking = () => {
+    positionInterval.current = setInterval(async () => {
+      if (soundRef.current) {
+        const status = await soundRef.current.getStatusAsync();
+        if (status.isLoaded) {
+          setPosition(status.positionMillis);
+        }
+      }
+    }, 100);
+  };
+
+  const togglePlayPause = async () => {
+    if (isPlaying) {
+      await soundRef.current?.pauseAsync();
+      setIsPlaying(false);
+      if (positionInterval.current) {
+        clearInterval(positionInterval.current);
+        positionInterval.current = null;
+      }
+    } else {
+      if (!soundRef.current) {
+        await loadAndPlay();
+      } else {
+        await soundRef.current.playAsync();
+        setIsPlaying(true);
+        startPositionTracking();
+      }
+    }
+  };
+
+  const seek = async (value: number) => {
+    const newPosition = Math.max(0, Math.min(value, duration));
+    setPosition(newPosition);
+    if (soundRef.current) {
+      await soundRef.current.setPositionAsync(newPosition);
+    }
+  };
+
+  const skipForward = async () => {
+    const newPosition = Math.min(position + 15000, duration);
+    await seek(newPosition);
+  };
+
+  const skipBackward = async () => {
+    const newPosition = Math.max(position - 15000, 0);
+    await seek(newPosition);
+  };
+
+  const cycleSpeed = () => {
+    const speeds = [PlaybackSpeed.NORMAL, PlaybackSpeed.FAST, PlaybackSpeed.VERY_FAST];
+    const currentIndex = speeds.indexOf(speed);
+    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
+    setSpeed(nextSpeed);
+    soundRef.current?.setRateAsync(nextSpeed, true);
+  };
+
+  const progress = duration > 0 ? position / duration : 0;
+
+  return (
+    <View style={styles.container}>
+      <View style={styles.waveformContainer}>
+        <View style={styles.waveform}>
+          {Array.from({ length: 40 }).map((_, i) => (
+            <View
+              key={i}
+              style={[
+                styles.waveformBar,
+                {
+                  height: 4 + Math.random() * 24,
+                  backgroundColor: i / 40 <= progress ? '#4A90D9' : '#E0E0E0',
+                },
+              ]}
+            />
+          ))}
+        </View>
+      </View>
+
+      <View style={styles.progressContainer}>
+        <Text style={styles.timeText}>{formatDuration(position)}</Text>
+        <Text style={styles.timeText}>{formatDuration(duration)}</Text>
+      </View>
+
+      <Slider
+        style={styles.slider}
+        minimumValue={0}
+        maximumValue={duration}
+        value={position}
+        onSlidingComplete={seek}
+        minimumTrackTintColor="#4A90D9"
+        maximumTrackTintColor="#E0E0E0"
+        thumb