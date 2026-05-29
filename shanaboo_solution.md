```diff
--- /dev/null
+++ b/src/components/ImagePreviewModal.tsx
@@ -0,0 +1,255 @@
+import React, { useState, useRef, useEffect } from 'react';
+import { 
+  View, 
+  Modal, 
+  StyleSheet, 
+  PanResponder, 
+  Animated, 
+  Dimensions, 
+  TouchableOpacity, 
+  Text 
+} from 'react-native';
+import { PinchGestureHandler, State } from 'react-native-gesture-handler';
+import * as FileSystem from 'expo-file-system';
+import * as MediaLibrary from 'expo-media-library';
+import * as Sharing from 'expo-sharing';
+
+interface ImagePreviewModalProps {
+  visible: boolean;
+  imageUrl: string;
+  onClose: () => void;
+  imageUris?: string[];
+  initialIndex?: number;
+}
+
+const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
+
+const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ 
+  visible, 
+  imageUrl, 
+  onClose, 
+  imageUris = [],
+  initialIndex = 0 
+}) => {
+  // Animation values
+  const scale = useRef(new Animated.Value(1)).current;
+  const translateX = useRef(new Animated.Value(0)).current;
+  const translateY = useRef(new Animated.Value(0)).current;
+  const opacity = useRef(new Animated.Value(0)).current;
+  
+  // Image navigation state
+  const [currentIndex, setCurrentIndex] = useState(initialIndex);
+  const [imageIndex, setImageIndex] = useState(initialIndex);
+  
+  // Gesture handlers
+  const pinchRef = useRef<PinchGestureHandler>(null);
+  const panResponder = PanResponder.create({
+    onMoveShouldSetPanResponder: () => true,
+    onPanResponderMove: (evt, gestureState) => {
+      // Handle pan movement
+      translateX.setValue(gestureState.dx);
+      translateY.setValue(gestureState.dy);
+    },
+    onPanResponderRelease: () => {
+      // Reset position after pan
+      Animated.spring(translateX, { toValue: 0, useNativeDriver: false }).start();
+      Animated.spring(translateY, { toValue: 0, useNativeDriver: false }).start();
+    },
+  });
+
+  const handle Pan = (imageUris: string[], index: number) => {
+    if (imageUris.length > 0) {
+      setCurrentIndex(index);
+      setImageIndex(index);
+    }
+  };
+
+  const handleSwipe = (direction: 'left' | 'right') => {
+    const newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
+    if (newIndex >= 0 && newIndex < imageUris.length) {
+      setImageIndex(newIndex);
+      setCurrentIndex(newIndex);
+    }
+  };
+
+  // Simulate download functionality
+  const handleDownload = async () => {
+    // In a real implementation, this would use the file system to download the image
+    // For now, we'll just simulate the functionality
+    console.log('Download functionality would be implemented with expo-file-system');
+  };
+
+  // Simulate share functionality
+  const handleShare = async () => {
+    try {
+      const asset = await MediaLibrary.requestPermissionsAsync();
+      if (asset.status === 'granted') {
+        // Sharing would be implemented with the sharing API
+        console.log('Share functionality would be implemented with expo-sharing');
+      }
+    } catch (e) {
+      console.error(e);
+    }
+  };
+
+  // Simulate delete functionality
+  const handleDelete = async () => {
+    // In a real implementation, this would delete the image
+    // For now, we'll just simulate the functionality
+    console.log('Delete functionality would be implemented with file system operations');
+  };
+
+  return (
+    <Modal
+      animationType="slide"
+      visible={visible}
+      onRequestClose={onClose}
+    >
+      <View style={styles.modalContainer}>
+        <View style={styles.header}>
+          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
+            <Text>Close</Text>
+          </TouchableOpacity>
+          <View style={styles.actions}>
+            <TouchableOpacity onPress={() => handleDownload()}>
+              <Text>Download</Text>
+            </TouchableOpacity>
+            <TouchableOpacity onPress={() => handleShare()}>
+              <Text>Share</Text>
+            </TouchableOpacity>
+            <TouchableOpacity onPress={() => handleDelete()}>
+              <Text>Delete</Text>
+            </TouchableOpacity>
+          </View>
+        </View>
+        <View style={styles.imageContainer}>
+          {imageUris.length > 0 && (
+            <TouchableOpacity onPress={() => handleSwipe('left')}>
+              <Text>Previous</Text>
+            </TouchableOpacity>
+          )}
+          <Animated.Image
+            source={{ uri: imageUris[imageIndex] }}
+            style={[
+              styles.image,
+              {
+                transform: [
+                  { translateX },
+                  { translateY },
+                  { scale }
+                ]
+              }
+            ]}
+            resizeMode="contain"
+          />
+          {imageUris.length > 0 && (
+            <TouchableOpacity onPress={() => handleSwipe('right')}>
+              <Text>Next</Text>
+            </TouchableOpacity>
+          )}
+        </View>
+      </View>
+    </Modal>
+  );
+};
+
+const styles = StyleSheet.create({
+  modalContainer: {
+    flex: 1,
+    backgroundColor: 'black',
+  },
+  header: {
+    position: 'absolute',
+    top: 0,
+    left: 0,
+    right: 0,
+    height: 50,
+    flexDirection: 'row',
+    justifyContent: 'space-between',
+    alignItems: 'center',
+    paddingHorizontal: 16,
+    backgroundColor: 'rgba(0, 0, 0, 0.5)',
+    zIndex: 1,
+  },
+  closeButton: {
+    padding: 10,
+    backgroundColor: 'rgba(255, 255, 255, 0.3)',
+    borderRadius: 5,
+  },
+  actions: {
+    flexDirection: 'row',
+    alignSelf: 'flex-end',
+    marginBottom: 20,
+  },
+  imageContainer: {
+    flex: 1,
+    justifyContent: 'center',
+    alignItems: 'center',
+  },
+  image: {
+    width: '100%',
+    height: '100