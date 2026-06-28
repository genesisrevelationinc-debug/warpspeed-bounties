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
+import { Ionicons } from '@expo/vector-icons';
+import { AudioPlayerProps, PlaybackSpeed } from '../../types/audio';
+import { formatDuration } from '../../utils/timeUtils';
+import { audioService } from '../../services/audioService';
+
+const { width: SCREEN_WIDTH } = Dimensions.get('window');
+
+const PLAYBACK_SPEEDS: PlaybackSpeed[] = [0.5, 1, 1.5, 2];
+
+export const AudioPlayer: React.FC<AudioPlayerProps> = ({
+  audioUri,
+  duration,
+  lastPosition = 0,
+  onDelete,
+  onPositionChange,
+  noteId,
+}) => {
+  const [isPlaying, setIsPlaying] = useState(false);
+  const [currentPosition, setCurrentPosition] = useState(lastPosition);
+  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1);
+  const [isLoading, setIsLoading] = useState(false);
+  const progressAnim = useRef(new Animated.Value(0)).current;
+  const progressRef = useRef(0);
+
+  useEffect(() => {
+    const subscription = audioService.onPlaybackStatusUpdate((status) => {
+      if (status.isLoaded) {
+        setCurrentPosition(status.positionMillis);
+        setIsPlaying(status.isPlaying);
+
+        if (status.didJustFinish) {
+          setCurrentPosition(0);
+          setIsPlaying(false);
+          onPositionChange?.(0);
+        }
+      }
+    });
+
+    return () => {
+      subscription.remove();
+    };
+  }, [onPositionChange]);
+
+  useEffect(() => {
+    const progress = duration > 0 ? currentPosition / duration : 0;
+    progressAnim.setValue(progress * SCREEN_WIDTH * 0.7);
+    progressRef.current = progress;
+  }, [currentPosition, duration, progressAnim]);
+
+  useEffect(() => {
+    return () => {
+      audioService.stopPlayback();
+    };
+  }, []);
+
+  const handlePlayPause = async () => {
+    if (isPlaying) {
+      await audioService.pausePlayback();
+      setIsPlaying(false);
+      onPositionChange?.(currentPosition);
+    } else {
+      setIsLoading(true);
+      try {
+        await audioService.startPlayback(audioUri, currentPosition, playbackSpeed);
+        setIsPlaying(true);
+      } catch (error) {
+        console.error('Playback error:', error);
+      } finally {
+        setIsLoading(false);
+      }
+    }
+  };
+
+  const handleSeek = async (seekPosition: number) => {
+    const clampedPosition = Math.max(0, Math.min(seekPosition, duration));
+    setCurrentPosition(clampedPosition);
+    await audioService.seekTo(clampedPosition);
+    onPositionChange?.(clampedPosition);
+  };
+
+  const handleRewind = () => {
+    handleSeek(Math.max(0, currentPosition - 10000));
+  };
+
+  const handleFastForward = () => {
+    handleSeek(Math.min(duration, currentPosition + 10000));
+  };
+
+  const toggleSpeed = () => {
+    const currentIndex = PLAYBACK_SPEEDS.indexOf(playbackSpeed);
+    const nextIndex = (currentIndex + 1) % PLAYBACK_SPEEDS.length;
+    const newSpeed = PLAYBACK_SPEEDS[nextIndex];
+    setPlaybackSpeed(newSpeed);
+    audioService.setPlaybackSpeed(newSpeed);
+  };
+
+  const panResponder = useRef(
+    PanResponder.create({
+      onStartShouldSetPanResponder: () => true,
+      onMoveShouldSetPanResponder: () => true,
+      onPanResponderGrant: (evt) => {
+        const { locationX } = evt.nativeEvent;
+        const progressBarWidth = SCREEN_WIDTH * 0.7;
+        const newPosition = (locationX / progressBarWidth) * duration;
+        handleSeek(newPosition);
+      },
+      onPanResponderMove: (evt) => {
+        const { locationX } = evt.nativeEvent;
+        const progressBarWidth = SCREEN_WIDTH * 0.7;
+        const newPosition = (locationX / progressBarWidth) * duration;
+        handleSeek(newPosition);
+      },
+    })
+  ).current;
+
+  const progressBarWidth = SCREEN_WIDTH * 0.7;
+  const progressWidth = (currentPosition / duration) * progressBarWidth;
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
+                  height: 4 + Math.random() * 20,
+                  opacity: i / 40 <= progressRef.current ? 1 : 0.3,
+                },
+              ]}
+            />
+          ))}
+        </View>
+      </View>
+
+      <View style={styles.controls}>
+        <TouchableOpacity onPress={handleRewind} style={styles.controlButton}>
+          <Ionicons name="play-back" size={20} color="#333" />
+        </TouchableOpacity>
+
+        <TouchableOpacity
+          onPress={handlePlayPause}
+          disabled={isLoading}
+          style={styles.playButton}
+        >
+          <Ionicons
+            name={isPlaying ? 'pause' : 'play'}
+            size={28}
+            color="#fff"
+          />
+        </TouchableOpacity>
+
+        <TouchableOpacity onPress={handleFastForward} style={styles.controlButton}>
+          <Ionicons name="play-forward" size={20} color="#333" />
+        </TouchableOpacity>
+
+        <TouchableOpacity onPress={toggleSpeed} style={styles.speedButton}>
+          <Text style={styles.speedText}>{playbackSpeed}x</Text>
+        </TouchableOpacity>
+      </View>
+
+      <View style={styles.progressContainer} {...panResponder.panHandlers}>
+        <View style={styles.progressBar}>
+          <View style={[styles.progressFill, { width: progressWidth }]} />
+