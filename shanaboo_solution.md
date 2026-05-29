```diff
--- /dev/null
+++ b/src/components/EnhancedImagePreview.tsx
@@ -0,0 +1,350 @@
+import React, { useState, useRef, useEffect } from 'react';
+import {
+  View,
+  Modal,
+  StyleSheet,
+  TouchableOpacity,
+  Dimensions,
+  Animated,
+  PanResponder,
+  GestureResponderEvent,
+  PanResponderGestureState,
+  Alert,
+} from 'react-native';
+import { PinchGestureHandler, State } from 'react-native-gesture-handler';
+import Icon from 'react-native-vector-icons/MaterialIcons';
+
+interface ImagePreviewProps {
+  visible: boolean;
+  images: string[];
+  initialIndex?: number;
+  onClose: () => void;
+  onDownload?: (uri: string) => void;
+  onShare?: (uri: string) => void;
+  onDelete?: (index: number) => void;
+}
+
+const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
+
+const EnhancedImagePreview: React.FC<ImagePreviewProps> = ({
+  visible,
+  images,
+  initialIndex = 0,
+  onClose,
+  onDownload,
+  onShare,
+  onDelete,
+}) => {
+  const [currentIndex, setCurrentIndex] = useState(initialIndex);
+  const scale = useRef(new Animated.Value(1)).current;
+  const translateX = useRef(new Animated.Value(0)).current;
+  const translateY = useRef(new Animated.Value(0)).current;
+  const position = useRef(new Animated.Value(initialIndex * -screenWidth)).current;
+  
+  const pinchRef = useRef(null);
+  const panResponder = useRef(
+    PanResponder.create({
+      onStartShouldSetPanResponder: () => true,
+      onMoveShouldSetPanResponder: (_, gestureState) => {
+        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
+      },
+      onPanResponderMove: (_, gestureState) => {
+        if (scale._value <= 1) {
+          // Horizontal swipe navigation when not zoomed
+          const newX = (currentIndex * -screenWidth) + gestureState.dx;
+          position.setValue(newX);
+        } else {
+          // Pan image when zoomed
+          translateX.setValue(gestureState.dx);
+          translateY.setValue(gestureState.dy);
+        }
+      },
+      onPanResponderRelease: (_, gestureState) => {
+        if (scale._value <= 1) {
+          // Handle swipe navigation
+          const movedX = gestureState.dx;
+          const threshold = screenWidth * 0.2;
+          
+          if (movedX > threshold && currentIndex > 0) {
+            // Swipe right to previous image
+            setCurrentIndex(currentIndex - 1);
+            Animated.spring(position, {
+              toValue: (currentIndex - 1) * -screenWidth,
+              useNativeDriver: true,
+            }).start();
+          } else if (movedX < -threshold && currentIndex < images.length - 1) {
+            // Swipe left to next image
+            setCurrentIndex(currentIndex + 1);
+            Animated.spring(position, {
+              toValue: (currentIndex + 1) * -screenWidth,
+              useNativeDriver: true,
+            }).start();
+          } else {
+            // Return to current position
+            Animated.spring(position, {
+              toValue: currentIndex * -screenWidth,
+              useNativeDriver: true,
+            }).start();
+          }
+        } else {
+          // Return to center when zoomed
+          Animated.spring(translateX, {
+            toValue: 0,
+            useNativeDriver: true,
+          }).start();
+          Animated.spring(translateY, {
+            toValue: 0,
+            useNativeDriver: true,
+          }).start();
+        }
+      },
+    })
+  ).current;
+
+  // Reset transforms when changing images
+  useEffect(() => {
+    scale.setValue(1);
+    translateX.setValue(0);
+    translateY.setValue(0);
+  }, [currentIndex]);
+
+  // Reset to initial index when modal opens
+  useEffect(() => {
+    if (visible) {
+      setCurrentIndex(initialIndex);
+      position.setValue(initialIndex * -screenWidth);
+    }
+  }, [visible, initialIndex]);
+
+  const onPinchHandlerStateChange = (event: any) => {
+    if (event.nativeEvent.oldState === State.ACTIVE) {
+      const { scale: pinchScale } = event.nativeEvent;
+      const newScale = Math.max(1, Math.min(3, pinchScale));
+      
+      Animated.spring(scale, {
+        toValue: newScale,
+        useNativeDriver: true,
+      }).start();
+    }
+  };
+
+  const handleDownload = () => {
+    if (onDownload) {
+      onDownload(images[currentIndex]);
+    }
+  };
+
+  const handleShare = () => {
+    if (onShare) {
+      onShare(images[currentIndex]);
+    }
+  };
+
+  const handleDelete = () => {
+    if (onDelete) {
+      Alert.alert(
+        'Delete Image',
+        'Are you sure you want to delete this image?',
+        [
+          { text: 'Cancel', style: 'cancel' },
+          {
+            text: 'Delete',
+            style: 'destructive',
+            onPress: () => {
+              onDelete(currentIndex);
+              if (currentIndex >= images.length - 1 && currentIndex > 0) {
+                setCurrentIndex(currentIndex - 1);
+              }
+            },
+          },
+        ]
+      );
+    }
+  };
+
+  const renderImage = (imageUri: string, index: number) => {
+    return (
+      <Animated.View
+        key={index}
+        style={[
+          styles.imageContainer,
+          {
+            transform: [
+              { translateX },
+              { translateY },
+              { scale },
+            ],
+          },
+        ]}
+      >
+        {/* In a real implementation, this would be an actual image component */}
+        <View style={styles.placeholderImage} />
+      </Animated.View>
+    );
+  };
+
+  if (!visible) return null;
+
+  return (
+    <Modal
+      visible={visible}
+      transparent={true}
+      onRequestClose={onClose}
+      animationType="fade"
+    >
+      <View style={styles.container}>
+        <PinchGestureHandler
+          ref={pinchRef}
+          onHandlerStateChange={onPinchHandlerStateChange}
+          simultaneousHandlers={pinchRef}
+        >
+          <Animated.View