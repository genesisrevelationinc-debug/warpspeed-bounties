 ```diff
--- /dev/null
+++ b/src/components/audio/AudioPlayer.tsx
@@ -0,0 +1,268 @@
+import React, { useState, useEffect, useCallback, useRef } from 'react';
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
+import { AudioService } from '../../services/audio/AudioService';
+import { formatDuration } from '../../utils/time';
+import { AudioPlayerProps, PlaybackSpeed } from '../../types/audio';
+
+const PLAYBACK_SPEEDS: PlaybackSpeed[] = [0.5, 1, 1.5, 2];
+
+export const AudioPlayer: React.FC<AudioPlayerProps> = ({
+  audioUri,
+  initialPosition = 0,
+  onPositionChange,
+  onDelete,
+  noteId,
+}) => {
+  const [isPlaying, setIsPlaying] = useState(false);
+  const [position, setPosition] = useState(initialPosition);
+  const [duration, setDuration] = useState(0);
+  const [speed, setSpeed] = useState<PlaybackSpeed>(1);
+  const [isLoading, setIsLoading] = useState(true);
+  const progressAnim = useRef(new Animated.Value(0)).current;
+  const updateInterval = useRef<NodeJS.Timeout | null>(null);
+
+  const audioService = useRef(new AudioService()).current;
+
+  useEffect(() => {
+    loadAudio();
+    return () => {
+      cleanup();
+    };
+  }, [audioUri]);
+
+  const loadAudio = async () => {
+    try {
+      setIsLoading(true);
+      await audioService.loadAudio(audioUri);
+      const audioDuration = await audioService.getDuration();
+      setDuration(audioDuration);
+      if (initialPosition > 0) {
+        await audioService.seekTo(initialPosition);
+        setPosition(initialPosition);
+      }
+      setIsLoading(false);
+    } catch (error) {
+      console.error('Failed to load audio:', error);
+      setIsLoading(false);
+    }
+  };
+
+  const cleanup = () => {
+    if (updateInterval.current) {
+      clearInterval(updateInterval.current);
+    }
+    audioService.stop();
+  };
+
+  const startProgressUpdate = () => {
+    updateInterval.current = setInterval(async () => {
+      const currentPosition = await audioService.getCurrentPosition();
+      setPosition(currentPosition);
+      onPositionChange?.(currentPosition);
+    }, 100);
+  };
+
+  const stopProgressUpdate = () => {
+    if (updateInterval.current) {
+      clearInterval(updateInterval.current);
+      updateInterval.current = null;
+    }
+  };
+
+  const togglePlayback = async () => {
+    if (isPlaying) {
+      await audioService.pause();
+      setIsPlaying(false);
+      stopProgressUpdate();
+    } else {
+      await audioService.play();
+      setIsPlaying(true);
+      startProgressUpdate();
+    }
+  };
+
+  const handleSeek = async (value: number) => {
+    await audioService.seekTo(value);
+    setPosition(value);
+  };
+
+  const handleSpeedChange = () => {
+    const currentIndex = PLAYBACK_SPEEDS.indexOf(speed);
+    const nextIndex = (currentIndex + 1) % PLAYBACK_SPEEDS.length;
+    const newSpeed = PLAYBACK_SPEEDS[nextIndex];
+    setSpeed(newSpeed);
+    audioService.setSpeed(newSpeed);
+  };
+
+  const handleRewind = async () => {
+    const newPosition = Math.max(0, position - 10);
+    await handleSeek(newPosition);
+  };
+
+  const handleFastForward = async () => {
+    const newPosition = Math.min(duration, position + 10);
+    await handleSeek(newPosition);
+  };
+
+  const progress = duration > 0 ? (position / duration) * 100 : 0;
+
+  return (
+    <View style={styles.container}>
+      <View style={styles.waveformContainer}>
+        <AudioWaveform isPlaying={isPlaying} amplitude={0.5} />
+      </View>
+
+      <View style={styles.progressContainer}>
+        <Text style={styles.timeText}>{formatDuration(position)}</Text>
+        <Slider
+          style={styles.slider}
+          minimumValue={0}
+          maximumValue={duration}
+          value={position}
+          onSlidingComplete={handleSeek}
+          minimumTrackTintColor="#007AFF"
+          maximumTrackTintColor="#D3D3D3"
+          thumbTintColor="#007AFF"
+        />
+        <Text style={styles.timeText}>{formatDuration(duration)}</Text>
+      </View>
+
+      <View style={styles.controlsContainer}>
+        <TouchableOpacity onPress={handleRewind} style={styles.controlButton}>
+          <Text style={styles.controlText}>⏪ 10s</Text>
+        </TouchableOpacity>
+
+        <TouchableOpacity onPress={togglePlayback} style={styles.playButton}>
+          <Text style={styles.playButtonText}>{isPlaying ? '⏸' : '▶️'}</Text>
+        </TouchableOpacity>
+
+        <TouchableOpacity onPress={handleFastForward} style={styles.controlButton}>
+          <Text style={styles.controlText}>10s ⏩</Text>
+        </TouchableOpacity>
+
+        <TouchableOpacity onPress={handleSpeedChange} style={styles.speedButton}>
+          <Text style={styles.speedText}>{speed}x</Text>
+        </TouchableOpacity>
+      </View>
+
+      {onDelete && (
+        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
+          <Text style={styles.deleteText}>🗑️ Delete Audio</Text>
+        </TouchableOpacity>
+      )}
+    </View>
+  );
embaliased
+};
+
+const AudioWaveform: React.FC<{ isPlaying: boolean; amplitude: number }> = ({
+  isPlaying,
+  amplitude,
+}) => {
+  const bars = Array.from({ length: 40 }, (_, i) => i);
+  const animations = useRef(bars.map(() => new Animated.Value(0.3))).current;
+
+  useEffect(() => {
+    if (isPlaying) {
+      animations.forEach((anim, index) => {
+        Animated.loop(
+          Animated.sequence([
+            Animated.timing(anim, {
+              toValue: Math.random() *