 ```diff
--- /dev/null
+++ b/b/src/components/audio/AudioPlayer.tsx
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
+import { AudioService, AudioPlaybackState } from '../../services/audio/AudioService';
+import { formatDuration } from '../../utils/time';
+
+const { width: SCREEN_WIDTH } = Dimensions.get('window');
+
+interface AudioPlayerProps {
+  audioUri: string;
+  initialPosition?: number;
+  onPositionChange?: (position: number) => void;
+  onDelete?: () => void;
+  noteId: string;
+}
+
+export const AudioPlayer: React.FC<AudioPlayerProps> = ({
+  audioUri,
+  initialPosition = 0,
+  onPositionChange,
+  onDelete,
+  noteId,
+}) => {
+  const [state, setState] = useState<AudioPlaybackState>({
+    isPlaying: false,
+    isPaused: false,
+    isLoading: true,
+    currentTime: 0,
+    duration: 0,
+    playbackSpeed: 1,
+    error: null,
+  });
+
+  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
+  const progressAnim = useRef(new Animated.Value(0)).current;
+  const audioServiceRef = useRef<AudioService | null>(null);
+
+  useEffect(() => {
+    const initAudio = async () => {
+      audioServiceRef.current = new AudioService();
+      await audioServiceRef.current.loadAudio(audioUri, initialPosition);
+      
+      const updateState = () => {
+        if (audioServiceRef.current) {
+          const currentState = audioServiceRef.current.getState();
+          setState(currentState);
+          
+          if (currentState.duration > 0) {
+            const progress = currentState.currentTime / currentState.duration;
+            progressAnim.setValue(progress * (SCREEN_WIDTH - 80));
+          }
+          
+          if (currentState.isPlaying || currentState.isPaused) {
+            requestAnimationFrame(updateState);
+          }
+        }
+      };
+
+      audioServiceRef.current.onStateChange = updateState;
+      updateState();
+    };
+
+    initAudio();
+
+    return () => {
+      if (audioServiceRef.current) {
+        audioServiceRef.current.stop();
+        audioServiceRef.current.unload();
+      }
+    };
+  }, [audioUri, initialPosition]);
+
+  const handlePlayPause = useCallback(async () => {
+    if (!audioServiceRef.current) return;
+
+    if (state.isPlaying) {
+      await audioServiceRef.current.pause();
+    } else {
+      await audioServiceRef.current.play();
+    }
+  }, [state.isPlaying]);
+
+  const handleSeek = useCallback((position: number) => {
+    if (!audioServiceRef.current) return;
+    const seekTime = (position / (SCREEN_WIDTH - 80)) * state.duration;
+    audioServiceRef.current.seek(seekTime);
+  }, [state.duration]);
+
+  const handleRewind = useCallback(async () => {
+    if (!audioServiceRef.current) return;
+    const newTime = Math.max(0, state.currentTime - 10);
+    await audioServiceRef.current.seek(newTime);
+  }, [state.currentTime]);
+
+  const handleFastForward = useCallback(async () => {
+    if (!audioServiceRef.current) return;
+    const newTime = Math.min(state.duration, state.currentTime + 10);
+    await audioServiceRef.current.seek(newTime);
+  }, [state.currentTime, state.duration]);
+
+  const handleSpeedChange = useCallback(async (speed: number) => {
+    if (!audioServiceRef.current) return;
+    await audioServiceRef.current.setPlaybackSpeed(speed);
+    setShowSpeedOptions(false);
+  }, []);
+
+  const panResponder = useRef(
+    PanResponder.create({
+      onStartShouldSetPanResponder: () => true,
+      onMoveShouldSetPanResponder: () => true,
+      onPanResponderMove: (_, gestureState) => {
+        const newPosition = Math.max(0, Math.min(gestureState.moveX - 40, SCREEN_WIDTH - 80));
+        progressAnim.setValue(newPosition);
+      },
+      onPanResponderRelease: (_, gestureState) => {
+        const newPosition = Math.max(0, Math.min(gestureState.moveX - 40, SCREEN_WIDTH - 80));
+        handleSeek(newPosition);
+      },
+    })
+  ).current;
+
+  const speedOptions = [0.5, 1, 1.5, 2];
+
+  return (
+    <View style={styles.container}>
+      <View style={styles.progressContainer}>
+        <View style={styles.progressBar} {...panResponder.panHandlers}>
+          <View style={styles.progressBackground} />
+          <Animated.View
+            style={[
+              styles.progressFill,
+              { width: progressAnim },
+            ]}
+          />
+          <Animated.View
+            style={[
+              styles.progressThumb,
+              { transform: [{ translateX: progressAnim }] },
+            ]}
+          />
+        </View>
+      </View>
+
+      <View style={styles.timeContainer}>
+        <Text style={styles.timeText}>{formatDuration(state.currentTime)}</Text>
+        <Text style={styles.timeText}>{formatDuration(state.duration)}</Text>
+      </View>
+
+      <View style={styles.controlsContainer}>
+        <TouchableOpacity onPress={handleRewind} style={styles.controlButton}>
+          <Text style={styles.controlText}>⏪ 10s</Text>
+        </TouchableOpacity>
+
+        <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
+          <Text style={styles.playButtonText}>
+            {state.isPlaying ? '⏸' : '▶️'}
+          </Text>
+        </TouchableOpacity>
+
+        <TouchableOpacity onPress={handleFastForward} style={styles.controlButton}>
+          <Text style={styles.controlText}>10s ⏩</Text>
+        </TouchableOpacity>
+      </View>
+
+      <View style={styles.speedContainer}>
+        <TouchableOpacity
+          onPress={() => setShowSpeedOptions(!showSpeedOptions)}
+          style={styles.speedButton}
+        >
+          <Text style={styles.speedText}>{state.playbackSpeed