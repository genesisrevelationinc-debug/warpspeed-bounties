 ```diff
--- /dev/null
+++ b/src/components/audio/AudioPlayer.tsx
@@ -0,0 +1,268 @@
+import React, { useState, useEffect, useRef, useCallback } from 'react';
+import { View, StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
+import Slider from '@react-native-community/slider';
+import { AudioService } from '../../services/audio/AudioService';
+import { formatDuration } from '../../utils/time';
+import { AudioPlayerProps, PlaybackSpeed } from './types';
+
+const SPEEDS: PlaybackSpeed[] = [0.5, 1, 1.5, 2];
+
+export const AudioPlayer: React.FC<AudioPlayerProps> = ({
+  audioUri,
+  initialPosition = 0,
+  onPositionChange,
+  onDelete,
+  onTranscribe,
+  style,
+}) => {
+  const [isPlaying, setIsPlaying] = useState(false);
+  const [position, setPosition] = useState(initialPosition);
+  const [duration, setDuration] = useState(0);
+  const [speed, setSpeed] = useState<PlaybackSpeed>(1);
+  const [isLoading, setIsLoading] = useState(true);
+  const [error, setError] = useState<string | null>(null);
+  
+  const audioServiceRef = useRef<AudioService | null>(null);
+  const progressAnim = useRef(new Animated.Value(0)).current;
+  const positionRef = useRef(position);
+  const isMounted = useRef(true);
+
+  useEffect(() => {
+    isMounted.current = true;
+    return () => {
+      isMounted.current = false;
+    };
+  }, []);
+
+  useEffect(() => {
+    positionRef.current = position;
+  }, [position]);
+
+  useEffect(() => {
+    const initAudio = async () => {
+      try {
+        setIsLoading(true);
+        setError(null);
+        
+        const service = new AudioService();
+        audioServiceRef.current = service;
+        
+        await service.loadAudio(audioUri);
+        const audioDuration = await service.getDuration();
+        
+        if (!isMounted.current) return;
+        
+        setDuration(audioDuration);
+        
+        if (initialPosition > 0 && initialPosition < audioDuration) {
+          await service.seekTo(initialPosition);
+          setPosition(initialPosition);
+        }
+        
+        setIsLoading(false);
+      } catch (err) {
+        if (!isMounted.current) return;
+        setError(err instanceof Error ? err.message : 'Failed to load audio');
+        setIsLoading(false);
+      }
+    };
+
+    initAudio();
+
+    return () => {
+      audioServiceRef.current?.cleanup();
+      audioServiceRef.current = null;
+    };
+  }, [audioUri]);
+
+  useEffect(() => {
+    const interval = setInterval(() => {
+      if (isPlaying && audioServiceRef.current) {
+        const currentPos = audioServiceRef.current.getCurrentPosition();
+        setPosition(currentPos);
+        onPositionChange?.(currentPos);
+      }
+    }, 100);
+
+    return () => clearInterval(interval);
+  }, [isPlaying, onPositionChange]);
+
+  useEffect(() => {
+    Animated.timing(progressAnim, {
+      toValue: duration > 0 ? position / duration : 0,
+      duration: 100,
+      useNativeDriver: false,
+    }).start();
+  }, [position, duration, progressAnim]);
+
+  const handlePlayPause = useCallback(async () => {
+    if (!audioServiceRef.current) return;
+
+    try {
+      if (isPlaying) {
+        await audioServiceRef.current.pause();
+        setIsPlaying(false);
+      } else {
+        await audioServiceRef.current.play();
+        setIsPlaying(true);
+      }
+    } catch (err) {
+      setError(err instanceof Error ? err.message : 'Playback error');
+    }
+  }, [isPlaying]);
+
+  const handleSeek = useCallback(async (value: number) => {
+    if (!audioServiceRef.current) return;
+    
+    const newPosition = value * duration;
+    await audioServiceRef.current.seekTo(newPosition);
+    setPosition(newPosition);
+    onPositionChange?.(newPosition);
+  }, [duration, onPositionChange]);
+
+  const handleSkip = useCallback(async (seconds: number) => {
+    if (!audioServiceRef.current) return;
+    
+    const newPosition = Math.max(0, Math.min(duration, position + seconds));
+    await audioServiceRef.current.seekTo(newPosition);
+    setPosition(newPosition);
+    onPositionChange?.(newPosition);
+  }, [duration, position, onPositionChange]);
+
+  const handleSpeedChange = useCallback(async () => {
+    if (!audioServiceRef.current) return;
+    
+    const currentIndex = SPEEDS.indexOf(speed);
+    const nextIndex = (currentIndex + 1) % SPEEDS.length;
+    const newSpeed = SPEEDS[nextIndex];
+    
+    await audioServiceRef.current.setSpeed(newSpeed);
+    setSpeed(newSpeed);
+  }, [speed]);
+
+  const progressWidth = progressAnim.interpolate({
+    inputRange: [0, 1],
+    outputRange: ['0%', '100%'],
+  });
+
+  if (isLoading) {
+    return (
+      <View style={[styles.container, style]}>
+        <Text style={styles.loadingText}>Loading audio...</Text>
+      </View>
+    );
+  }
+
+  if (error) {
+    return (
+      <View style={[styles.container, style]}>
+        <Text style={styles.errorText}>{error}</Text>
+      </View>
+    );
+  }
+
+  return (
+    <View style={[styles.container, style]}>
+      <View style={styles.waveformContainer}>
+        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
+      </View>
+      
+      <View style={styles.timeContainer}>
+        <Text style={styles.timeText}>{formatDuration(position)}</Text>
+        <Text style={styles.timeText}>{formatDuration(duration)}</Text>
+      </View>
+
+      <View style={styles.controlsContainer}>
+        <TouchableOpacity onPress={() => handleSkip(-10)} style={styles.skipButton}>
+          <Text style={styles.controlText}>-10s</Text>
+        </TouchableOpacity>
+
+        <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
+          <Text