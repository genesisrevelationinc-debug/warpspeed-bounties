 ```diff
--- /dev/null
+++ b/src/components/AudioNote/AudioPlayer.tsx
@@ -0,0 +1,245 @@
+import React, { useState, useEffect, useCallback, useRef } from 'react';
+import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
+import Slider from '@react-native-community/slider';
+import { AudioAttachment } from '../../types/notes';
+import { audioService } from '../../services/audioService';
+import { formatDuration } from '../../utils/timeUtils';
+
+interface AudioPlayerProps {
+  audioAttachment: AudioAttachment;
+  onDelete?: () => void;
+  onTranscribe?: () => void;
+  noteId: string;
+}
+
+export const AudioPlayer: React.FC<AudioPlayerProps> = ({
+  audioAttachment,
+  onDelete,
+  onTranscribe,
+  noteId,
+}) => {
+  const [isPlaying, setIsPlaying] = useState(false);
+  const [currentPosition, setCurrentPosition] = useState(audioAttachment.lastPosition || 0);
+  const [duration, setDuration] = useState(audioAttachment.duration || 0);
+  const [playbackRate, setPlaybackRate] = useState(1.0);
+  const [isLoading, setIsLoading] = useState(false);
+  const progressAnim = useRef(new Animated.Value(0)).current;
+  const updateInterval = useRef<NodeJS.Timeout | null>(null);
+
+  useEffect(() => {
+    return () => {
+      stopPlayback();
+      if (updateInterval.current) {
+        clearInterval(updateInterval.current);
+      }
+    };
+  }, []);
+
+  const startPositionUpdate = useCallback(() => {
+    if (updateInterval.current) {
+      clearInterval(updateInterval.current);
+    }
+    updateInterval.current = setInterval(() => {
+      audioService.getCurrentPosition().then((position) => {
+        if (position >= 0) {
+          setCurrentPosition(position);
+        }
+      });
+    }, 250);
+  }, []);
+
+  const stopPositionUpdate = useCallback(() => {
+    if (updateInterval.current) {
+      clearInterval(updateInterval.current);
+      updateInterval.current = null;
+    }
+  }, []);
+
+  const play = async () => {
+    try {
+      setIsLoading(true);
+      await audioService.loadAudio(audioAttachment.uri, audioAttachment.lastPosition || 0);
+      await audioService.setPlaybackRate(playbackRate);
+      await audioService.play();
+      setIsPlaying(true);
+      setIsLoading(false);
+      startPositionUpdate();
+    } catch (error) {
+      console.error('Error playing audio:', error);
+      setIsLoading(false);
+    }
+  };
+
+  const pause = async () => {
+    try {
+      await audioService.pause();
+      setIsPlaying(false);
+      stopPositionUpdate();
+      await savePosition();
+    } catch (error) {
+      console.error('Error pausing audio:', error);
+    }
+  };
+
+  const stopPlayback = async () => {
+    try {
+      await audioService.stop();
+      setIsPlaying(false);
+      stopPositionUpdate();
+      await savePosition();
+    } catch (error) {
+      console.error('Error stopping audio:', error);
+    }
+  };
+
+  const savePosition = async () => {
+    const position = await audioService.getCurrentPosition();
+    // Save position to backend
+    await audioService.savePlaybackPosition(noteId, audioAttachment.id, position);
+  };
+
+  const seek = async (value: number) => {
+    try {
+      await audioService.seekTo(value);
+      setCurrentPosition(value);
+    } catch (error) {
+      console.error('Error seeking audio:', error);
+    }
+  };
+
+  const togglePlaybackRate = () => {
+    const rates = [1.0, 1.5, 2.0];
+    const currentIndex = rates.indexOf(playbackRate);
+    const nextRate = rates[(currentIndex + 1) % rates.length];
+    setPlaybackRate(nextRate);
+    audioService.setPlaybackRate(nextRate);
+  };
+
+  const skipForward = async () => {
+    const newPosition = Math.min(currentPosition + 15000, duration);
+    await seek(newPosition);
+  };
+
+  const skipBackward = async () => {
+    const newPosition = Math.max(currentPosition - 15000, 0);
+    await seek(newPosition);
+  };
+
+  const progress = duration > 0 ? currentPosition / duration : 0;
+
+  return (
+    <View style={styles.container}>
+      <View style={styles.waveformContainer}>
+        <AudioWaveform isPlaying={isPlaying} amplitude={0.5} />
+      </View>
+      
+      <View style={styles.progressContainer}>
+        <Slider
+          style={styles.slider}
+          minimumValue={0}
+          maximumValue={duration}
+          value={currentPosition}
+          onSlidingComplete={seek}
+          minimumTrackColor="#007AFF"
+          maximumTrackColor="#E5E5EA"
+          thumbTintColor="#007AFF"
+        />
+        <View style={styles.timeContainer}>
+          <Text style={styles.timeText}>{formatDuration(currentPosition)}</Text>
+          <Text style={styles.timeText}>{formatDuration(duration)}</Text>
+        </View>
+      </View>
+
+      <View style={styles.controlsContainer}>
+        <TouchableOpacity onPress={skipBackward} style={styles.controlButton}>
+          <Text style={styles.controlText}>⏪ 15s</Text>
+        </TouchableOpacity>
+        
+        <TouchableOpacity
+          onPress={isPlaying ? pause : play}
+          style={styles.playButton}
+          disabled={isLoading}
+        >
+          <Text style={styles.playButtonText}>
+            {isLoading ? '...' : isPlaying ? '⏸' : '▶️'}
+          </Text>
+        </TouchableOpacity>
+        
+        <TouchableOpacity onPress={skipForward} style={styles.controlButton}>
+          <Text style={styles.controlText}>15s ⏩</Text>
+        </TouchableOpacity>
+      </View>
+
+      <View style={styles.secondaryControls}>
+        <TouchableOpacity onPress={togglePlaybackRate} style={styles.rateButton}>
+          <Text style={styles.rateText}>{playbackRate}x</Text>
+        </TouchableOpacity>
+        
+        {onTranscribe && (
+          <TouchableOpacity onPress={onTranscribe} style={styles