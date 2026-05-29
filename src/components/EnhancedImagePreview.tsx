import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  PanResponder,
  Animated,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { PinchGestureHandler, PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import { useSharedValue, useAnimatedGestureHandler, useAnimatedStyle, interpolate } from 'react-native-reanimated';

interface EnhancedImagePreviewProps {
  imageUris: string[];
  visible: boolean;
  onClose: () => void;
  initialIndex?: number;
}

const { width, height } = Dimensions.get('window');

const EnhancedImagePreview = ({ imageUris, visible, onClose, initialIndex = 0 }: EnhancedImagePreviewProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  
  const pinchGestureRef = useRef();
  const panGestureRef = useRef();
  
  const handlePinch = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startingScale = scale.value;
    },
    onChange: (event) => {
      scale.value = event.startingScale * event.scale;
    },
    onEnd: () => {
      if (scale.value > 2) {
        scale.value = 2;
      } else if (scale.value < 0.5) {
        scale.value = 0.5;
      }
    },
  });

  const handlePan = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startingX = translateX.value;
      ctx.startingY = translateY.value;
    },
    onChange: (event) => {
      translateX.value = event.startingX + event.translationX;
      translateY.value = event.startingY + event.translationY;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  const handleDoubleTap = () => {
    scale.value = 1;
    translateX.value = 0;
    translateY.value = 0;
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'right' && currentIndex < imageUris.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const renderImage = () => {
    return (
      <Animated.View style={[styles.imageContainer, { opacity }]}>
        <Animated.Image 
          source={{ uri: imageUris[currentIndex] }} 
          style={[styles.image, { transform: animatedStyle }]} 
          resizeMode="contain"
        />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Modal visible={visible} transparent={true} animationType="fade">
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>×</Text>
          </TouchableOpacity>
          {renderImage()}
          <TouchableOpacity style={styles.navButton} onPress={() => handleSwipe('left')}>
            <Text>‹</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => handleSwipe('right')}>
            <Text>›</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.8,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 20,
    borderRadius: 30,
  }
});