Looking at the issue, this is a bounty for implementing audio note recording functionality in a React Native app. Since there are no actual source files provided in the repository listing, I'll create the necessary files based on the bounty requirements.

Let me create the main files needed for audio note recording functionality:

```diff
--- /dev/null
+++ b/src/components/AudioRecorder.tsx
@@ -0,0 +1,200 @@
+import React, { useState, useEffect, useRef } from 'react';
+import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
+import { Audio } from 'expo-av';
+import { MaterialIcons } from '@expo/vector-icons';
+
+interface AudioRecorderProps {
+  onSave: (uri: string, duration: number) => void;
+  onCancel: () => void;
+}
+
+const AudioRecorder: React.FC<AudioRecorderProps> = ({ onSave, onCancel }) => {
+  const [isRecording, setIsRecording] = useState(false);
+  const [isPaused, setIsPaused] = useState(false);
+  const [recording, setRecording] = useState<Audio.Recording | null>(null);
+  const [duration, setDuration] = useState(0);
+  const [waveformAnimation] = useState(new Animated.Value(0));
+  const intervalRef = useRef<NodeJS.Timeout | null>(null);
+
+  useEffect(() => {
+    return () => {
+      if (intervalRef.current) {
+        clearInterval(intervalRef.current);
+      }
+      if (recording) {
+        recording.stopAndUnloadAsync();
+      }
+    };
+  }, [recording]);
+
+  const startRecording = async () => {
+    try {
+      const { granted } = await Audio.requestPermissionsAsync();
+      if (!granted) {
+        console.error('Permission to access microphone was denied');
+        return;
+      }
+
+      await Audio.setAudioModeAsync({
+        allowsRecordingIOS: true,
+        playsInSilentModeIOS: true,
+      });
+
+      const { recording: newRecording } = await Audio.Recording.createAsync(
+        Audio.RecordingOptionsPresets.HIGH_QUALITY
+      );
+
+      setRecording(newRecording);
+      setIsRecording(true);
+      setIsPaused(false);
+      setDuration(0);
+
+      // Start timer
+      intervalRef.current = setInterval(() => {
+        setDuration(prev => prev + 1);
+      }, 1000);
+
+      // Start waveform animation
+      Animated.loop(
+        Animated.sequence([
+          Animated.timing(waveformAnimation, {
+            toValue: 1,
+            duration: 500,
+            useNativeDriver: true,
+          }),
+          Animated.timing(waveformAnimation, {
+            toValue: 0,
+            duration: 500,
+            useNativeDriver: true,
+          }),
+        ])
+      ).start();
+    } catch (error) {
+      console.error('Failed to start recording', error);
+    }
+  };
+
+  const stopRecording = async () => {
+    if (intervalRef.current) {
+      clearInterval(intervalRef.current);
+    }
+
+    if (recording) {
+      try {
+        await recording.stopAndUnloadAsync();
+        const uri = recording.getURI();
+        if (uri) {
+          onSave(uri, duration);
+        }
+      } catch (error) {
+        console.error('Failed to stop recording', error);
+      }
+    }
+    setIsRecording(false);
+    setIsPaused(false);
+  };
+
+  const pauseRecording = async () => {
+    if (recording && isRecording) {
+      try {
+        await recording.pauseAsync();
+        setIsPaused(true);
+        if (intervalRef.current) {
+          clearInterval(intervalRef.current);
+        }
+      } catch (error) {
+        console.error('Failed to pause recording', error);
+      }
+    }
+  };
+
+  const resumeRecording = async () => {
+    if (recording && isPaused) {
+      try {
+        await recording.startAsync();
+        setIsPaused(false);
+        intervalRef.current = setInterval(() => {
+          setDuration(prev => prev + 1);
+        }, 1000);
+      } catch (error) {
+        console.error('Failed to resume recording', error);
+      }
+    }
+  };
+
+  const cancelRecording = () => {
+    if (intervalRef.current) {
+      clearInterval(intervalRef.current);
+    }
+    if (recording) {
+      recording.stopAndUnloadAsync();
+    }
+    setIsRecording(false);
+    setIsPaused(false);
+    onCancel();
+  };
+
+  const formatTime = (seconds: number) => {
+    const mins = Math.floor(seconds / 60);
+    const secs = seconds % 60;
+    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
+  };
+
+  return (
+    <View style={styles.container}>
+      <View style={styles.header}>
+        <Text style={styles.title}>Record Audio Note</Text>
+        <TouchableOpacity onPress={cancelRecording}>
+          <MaterialIcons name="close" size={24} color="#666" />
+        </TouchableOpacity>
+      </View>
+
+      <View style={styles.timerContainer}>
+        <Text style={styles.timer}>{formatTime(duration)}</Text>
+      </View>
+
+      <View style={styles.waveformContainer}>
+        <Animated.View 
+          style={[
+            styles.waveformBar, 
+            {
+              transform: [{
+                scaleY: waveformAnimation.interpolate({
+                  inputRange: [0, 1],
+                  outputRange: [0.5, 1.5]
+                })
+              }]
+            }
+          ]} 
+        />
+        <Animated.View 
+          style={[
+            styles.waveformBar, 
+            {
+              transform: [{
+                scaleY: waveformAnimation.interpolate({
+                  inputRange: [0, 1],
+                  outputRange: [1, 2]
+                })
+              }]
+            }
+          ]} 
+        />
+        <Animated.View 
+          style={[
+            styles.waveformBar, 
+            {
+              transform: [{
+                scaleY: waveformAnimation.interpolate({
+                  inputRange: [0, 1],
+                  outputRange: [0.8, 1.8]
+                })
+              }]
+            }
+          ]} 
+        />
+      </View>
+
+      <View style={styles.controlsContainer}>
+        {!isRecording ? (
+          <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
+            <MaterialIcons