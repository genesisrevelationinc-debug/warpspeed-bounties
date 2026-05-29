import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { AudioService } from '../services/AudioService';
import { useAudioRecorder } from '../hooks/useAudioRecorder';

interface AudioRecorderProps {
  onSave: (audioUri: string) => void;
  onCancel: () => void;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({ onSave, onCancel }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecordingActive, setIsRecordingActive] = useState(false);
  const [maxDuration, setMaxDuration] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();
  const recordingUri = useRef<string | null>(null);
  const timerAnimation = useRef(new Animated.Value(0)).current;
  const [progress] = useState(new Animated.Value(0));
  
  // Update timer display
  useEffect(() => {
    if (isRecordingActive) {
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    
    return () => {
      if (interval0.5s.current) clearInterval(intervalRef.current);
    };
  }, [isRecordingActive]);

  const startRecording = async () => {
    try {
      setIsRecording(true);
      setIsRecordingActive(true);
      const result = await AudioService.startRecording();
      if (result.uri) {
        recordingUri.current = result.uri;
      }
    } catch (error) {
      console.error('Recording error:', error);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      setIsRecordingActive(false);
      const result = await AudioService.stopRecording();
      if (result.uri) {
        recordingUri.current = result.uri;
        onSave(result.uri);
      }
    } catch (error) {
      console.error('Stop recording error:', error);
    }
  };

  const pauseRecording = () => {
    AudioService.pauseRecording();
    setIsPaused(true);
  };
  
  const resumeRecording = () => {
    setIsPaused(false);
    // Actual resume implementation would go here
  };

  const cancelRecording = () => {
    setIsRecording(false);
    setIsRecordingActive(false);
    setRecordingTime(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    onCancel();
  };

  const saveRecording = () => {
    setIsRecording(false);
    setIsRecordingActive(false);
    if (recordingUri.current) {
      onSave(recordingUri.current);
    }
    setRecordingTime(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.recorderContainer}>
        <Text style={styles.timer}>{formatTime(recordingTime)}</Text>
        <View style={styles.controls}>
          {!isRecording ? (
            <TouchableOpacity onPress={startRecording} style={styles.controlButton}>
              <Text>Start Recording</Text>
            </TouchableOpacity>
          ) : (
            <>
              {isPaused ? (
                <TouchableOpacity onPress={resumeRecording} style={styles.controlButton}>
                  <Text>Resume</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={pauseRecording} style={styles.controlButton}>
                  <Text>Pause</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={saveRecording} style={styles.controlButton}>
                <Text>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelRecording} style={styles.controlButton}>
                <Text>Cancel</TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  recorderContainer: {
    flex: 1,
    alignItems: 'center',
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 20,
  },
  controlButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  }
});