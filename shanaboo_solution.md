 ```diff
--- /dev/null
+++ b/b/src/components/AudioNote/AudioPlayer.tsx
@@ -0,0 +1,268 @@
+import React, { useState, useEffect, useCallback, useRef } from 'react';
+import {
+  View,
+  Text,
+  TouchableOpacity,
+  StyleSheet,
+  Slider,
+  ActivityIndicator,
+} from 'react-native';
+import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
+import { AudioService } from '../../services/audio/AudioService';
+import { formatDuration } from '../../utils/timeUtils';
+
+interface AudioPlayerProps {
+  audioUri: string;
+  noteId: string;
+  lastListenedTimestamp?: number;
+  onDelete?: () => void;
+  onTranscribe?: () => void;
+}
+
+export const AudioPlayer: React.FC<AudioPlayerProps> = ({
+  audioUri,
+  noteId,
+  lastListenedTimestamp = 0,
+  onDelete,
+  onTranscribe,
+}) => {
+  const [isPlaying, setIsPlaying] = useState(false);
+  const [isLoading, setIsLoading] = useState(true);
+  const [duration, setDuration] = useState(0);
+  const [position, setPosition] = useState(lastListenedTimestamp);
+  const [playbackSpeed, setPlaybackSpeed] = useState(1);
+  const [isSeeking, setIsSeeking] = useState(false);
+  const audioService = useRef<AudioService | null>(null);
+  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
+
+  const speedOptions = [0.5, 1, 1.5, 2];
+
+  useEffect(() => {
+    audioService.current = new AudioService();
+    loadAudio();
+
+    return () => {
+      stopProgressTracking();
+      audioService.current?.stop();
+      saveLastListenedTimestamp();
+    };
+  }, []);
+
+  const loadAudio = async () => {
+    try {
+      setIsLoading(true);
+      await audioService.current?.load(audioUri);
+      const audioDuration = await audioService.current?.getDuration();
+      setDuration(audioDuration || 0);
+      if (lastListenedTimestamp > 0) {
+        await audioService.current?.seekTo(lastListenedTimestamp);
+      }
+    } catch (error) {
+      console.error('Failed to load audio:', error);
+    } finally {
+      setIsLoading(false);
+    }
+  };
+
+  const startProgressTracking = () => {
+    progressInterval.current = setInterval(async () => {
+      if (!isSeeking && audioService.current) {
+        const currentPosition = await audioService.current.getCurrentPosition();
+        setPosition(currentPosition);
+      }
+    }, 100);
+  };
+
+  const stopProgressTracking = () => {
+    if (progressInterval.current) {
+      clearInterval(progressInterval.current);
+      progressInterval.current = null;
+    }
+  };
+
+  const saveLastListenedTimestamp = async () => {
+    // Persist last listened timestamp via API or local storage
+    // Implementation depends on the app's state management
+  };
+
+  const handlePlayPause = async () => {
+    if (isPlaying) {
+      await audioService.current?.pause();
+      setIsPlaying(false);
+      stopProgressTracking();
+    } else {
+      await audioService.current?.play();
+      setIsPlaying(true);
+      startProgressTracking();
+    }
+  };
+
+  const handleSeek = async (value: number) => {
+    setIsSeeking(true);
+    setPosition(value);
+  };
+
+  const handleSeekComplete = async (value: number) => {
+    await audioService.current?.seekTo(value);
+    setPosition(value);
+    setIsSeeking(false);
+  };
+
+  const handleRewind = async () => {
+    const newPosition = Math.max(0, position - 10);
+    await audioService.current?.seekTo(newPosition);
+    setPosition(newPosition);
+  };
+
+  const handleFastForward = async () => {
+    const newPosition = Math.min(duration, position + 10);
+    await audioService.current?.seekTo(newPosition);
+    setPosition(newPosition);
+  };
+
+  const handleSpeedChange = () => {
+    const currentIndex = speedOptions.indexOf(playbackSpeed);
+    const nextIndex = (currentIndex + 1) % speedOptions.length;
+    const newSpeed = speedOptions[nextIndex];
+    setPlaybackSpeed(newSpeed);
+    audioService.current?.setPlaybackSpeed(newSpeed);
+  };
+
+  if (isLoading) {
+    return (
+      <View style={styles.container}>
+        <ActivityIndicator size="small" color="#007AFF" />
+      </View>
+    );
+  }
+
+  return (
+    <View style={styles.container}>
+      <View style={styles.waveformContainer}>
+        {/* Waveform visualization component would go here */}
+        <View style={styles.waveformPlaceholder} />
+      </View>
+
+      <View style={styles.progressContainer}>
+        <Text style={styles.timeText}>{formatDuration(position)}</Text>
+        <Slider
+          style={styles.progressBar}
+          minimumValue={0}
+          maximumValue={duration}
+          value={position}
+          onValueChange={handleSeek}
+          onSlidingComplete={handleSeekComplete}
+          minimumTrackTintColor="#007AFF"
+          maximumTrackTintColor="#E5E5EA"
+          thumbTintColor="#007AFF"
+        />
+        <Text style={styles.timeText}>{formatDuration(duration)}</Text>
+      </View>
+
+      <View style={styles.controlsContainer}>
+        <TouchableOpacity onPress={handleRewind} style={styles.controlButton}>
+          <Icon name="rewind-10" size={24} color="#007AFF" />
+        </TouchableOpacity>
+
+        <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
+          <Icon
+            name={isPlaying ? 'pause' : 'play'}
+            size={32}
+            color="#FFFFFF"
+          />
+        </TouchableOpacity>
+
+        <TouchableOpacity onPress={handleFastForward} style={styles.controlButton}>
+          <Icon name="fast-forward-10" size={24} color="#007AFF" />
+        </TouchableOpacity>
+
+        <TouchableOpacity onPress={handleSpeedChange} style={styles.speedButton}>
+          <Text style={styles.speedText}>{playbackSpeed}x</Text>
+        </TouchableOpacity