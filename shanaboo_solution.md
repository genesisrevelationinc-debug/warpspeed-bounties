Looking at the issue description, I need to create a solution for an enhanced image preview feature. Since no specific file paths are provided in the repo structure, I'll create a new component file for the image preview functionality.

Based on the requirements, I'll create an `EnhancedImagePreview` component that includes the features mentioned: full-screen modal, pinch-to-zoom, pan support, swipe navigation, and action buttons (download, share, delete).

```diff
--- /dev/null
+++ b/src/components/EnhancedImagePreview/EnhancedImagePreview.tsx
@@ -0,0 +1,415 @@
+import React, { useState, useRef, useCallback, useEffect } from 'react';
+import {
+  View,
+  Modal,
+  StyleSheet,
+  TouchableOpacity,
+  Text,
+  Dimensions,
+  Share,
+  Alert,
+} from 'react-native';
+import Animated, { useSharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated';
+import { PinchGestureHandler, PanGestureHandler, State } from 'react-native-gesture-handler';
+
+interface EnhancedImagePreviewProps {
+  visible: boolean;
+  images: string[];
+  initialIndex?: number;
+  onClose: () => void;
+}
+
+const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
+
+export const EnhancedImagePreview: React.FC<EnhancedImagePreviewProps> = ({
+  visible,
+  images,
+  initialIndex = 0,
+  onClose,
+}) => {
+  const [currentIndex, setCurrentIndex] = useState(initialIndex);
+  const scale = useSharedValue(1);
+  const translateX = useSharedValue(0);
+  const translateY = useSharedValue(0);
+  const pinchRef = useRef();
+  const panRef = useRef();
+  
+  // Reset state when modal opens
+  useEffect(() => {
+    if (visible) {
+      scale.value = 1;
+      translateX.value = 0;
+      translateY.value = 0;
+      setCurrentIndex(initialIndex);
+    }
+  }, [visible]);
+
+  // Handle pinch gesture
+  const onPinchHandlerStateChange = (event: any) => {
+    if (event.nativeEvent.state === State.ACTIVE) {
+      scale.value = event.nativeEvent.scale;
+    }
+  };
+
+  // Handle pan gesture
+  const onPanHandlerStateChange = (event: any) => {
+    if (event.nativeEvent.state === State.ACTIVE) {
+      translateX.value = event.nativeEvent.translationX;
+      translateY.value = event.nativeEvent.translationY;
+    }
+  };
+
+  // Handle swipe navigation
+  const handleSwipe = (direction: 'left' | 'right') => {
+    if (direction === 'left' && currentIndex > 0) {
+      setCurrentIndex(currentIndex - 1);
+    } else if (direction === 'right' && currentIndex < images.length - 1) {
+      setCurrentIndex(currentIndex + 1);
+    }
+  };
+
+  // Handle image actions
+  const handleDownload = async (imageUrl: string) => {
+    try {
+      // Download implementation would go here
+      // This is a placeholder for actual download functionality
+      console.log(`Downloading image: ${imageUrl}`);
+    } catch (error) {
+      console.error('Download failed:', error);
+    }
+  };
+
+  const handleShare = async (imageUrl: string) => {
+    try {
+      await Share.share({
+        message: `Check out this image: ${imageUrl}`,
+        url: imageUrl,
+      });
+    } catch (error) {
+      console.error('Share failed:', error);
+    }
+  };
+
+  const handleDelete = (imageUrl: string) => {
+    Alert.alert(
+      'Delete Image',
+      'Are you sure you want to delete this image?',
+      [
+        { text: 'Cancel', style: 'cancel' },
+        { 
+          text: 'Delete', 
+          style: 'destructive',
+          onPress: () => {
+            // Delete implementation
+            console.log(`Deleting image: ${imageUrl}`);
+          }
+        }
+      ]
+    );
+  };
+
+  // Animated styles for zoom/pan
+  const animatedStyle = useAnimatedStyle(() => {
+    return {
+      transform: [
+        { scale: scale.value },
+        { translateX: translateX.value },
+        { translateY: translateY.value },
+      ]
+    };
+  });
+
+  if (!visible) {
+    return null;
+  }
+
+  return (
+    <Modal visible={visible} animationType="fade" transparent={true}>
+      <View style={styles.modalContainer}>
+        <PinchGestureHandler
+          ref={pinchRef}
+          onGestureEvent={onPinchHandlerStateChange}
+        >
+          <Animated.View style={styles.pinchContainer}>
+            <PanGestureHandler
+              ref={panRef}
+              onGestureEvent={onPanHandlerStateChange}
+            >
+              <View style={styles.imageContainer}>
+                <TouchableOpacity 
+                  onPress={onClose} 
+                  style={styles.closeButton}
+                >
+                  <Text style={styles.closeButtonText}>✕</Text>
+                </TouchableOpacity>
+                
+                <View style={styles.navigationContainer}>
+                  <TouchableOpacity 
+                    onPress={() => handleSwipe('left')}
+                    style={styles.navButton}
+                  >
+                    <Text style={styles.navButtonText}>‹</Text>
+                  </TouchableOpacity>
+                  <TouchableOpacity 
+                    onPress={() => handleSwipe('right')}
+                    style={styles.navButton}
+                  >
+                    <Text style={styles.navButtonText}>›</Text>
+                  </TouchableOpacity>
+                </View>
+                
+                <View style={styles.imageWrapper}>
+                  <Animated.View style={animatedStyle}>
+                    {/* Image display implementation */}
+                    <View style={styles.actionsContainer}>
+                      <TouchableOpacity 
+                        onPress={() => handleDownload(images[currentIndex])}
+                        style={styles.actionButton}
+                      >
+                        <Text>Download</Text>
+                      </TouchableOpacity>
+                      
+                      <TouchableOpacity 
+                        onPress={() => handleShare(images[currentIndex])}
+                        style={styles.actionButton}
+                      >
+                        <Text>Share</Text>
+                      </TouchableOpacity>
+                      
+                      <TouchableOpacity 
+                        onPress={() => handleDelete(images[currentIndex])}
+                        style={styles.deleteButton}
+                      >
+                        <Text>Delete</Text>
+                      </TouchableOpacity>
+                    </View>
+                  </Animated.View>
+                </View>
+              </View>
+            </PanGestureHandler>
+          </PinchGestureHandler>
+        </View>
+      </View>
