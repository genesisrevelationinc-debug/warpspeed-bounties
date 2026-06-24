 ```diff
--- /dev/null
+++ b/src/components/ImagePreview/ImagePreview.tsx
@@ -0,0 +1,298 @@
+import React, { useCallback, useEffect, useRef, useState } from 'react';
+import {
+  View,
+  StyleSheet,
+  Dimensions,
+  Modal,
+  Animated,
+  ActivityIndicator,
+  Platform,
+  Alert,
+} from 'react-native';
+import {
+  GestureHandlerRootView,
+  PanGestureHandler,
+  PinchGestureHandler,
+  State,
+  TapGestureHandler,
+} from 'react-native-gesture-handler';
+import ImageViewer from './ImageViewer';
+import ImagePreviewHeader from './ImagePreviewHeader';
+import ImagePreviewFooter from './ImagePreviewFooter';
+import { ImageItem, ImagePreviewProps } from './types';
+
+const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
+
+const ImagePreview: React.FC<ImagePreviewProps> = ({
+  visible,
+  images,
+  initialIndex = 0,
+  onClose,
+  onIndexChange,
+  onDownload,
+  onShare,
+  onDelete,
+  showDownload = true,
+  showShare = true,
+  showDelete = true,
+  headerTitle,
+  backgroundColor = '#000000',
+}) => {
+  const [currentIndex, setCurrentIndex] = useState(initialIndex);
+  const [isLoading, setIsLoading] = useState(true);
+  const [showControls, setShowControls] = useState(true);
+  const [scale, setScale] = useState(1);
+  const [isZoomed, setIsZoomed] = useState(false);
+
+  const panRef = useRef(null);
+  const pinchRef = useRef(null);
+  const doubleTapRef = useRef(null);
+
+  const translateX = useRef(new Animated.Value(0)).current;
+  const translateY = useRef(new Animated.Value(0)).current;
+  const scaleAnim = useRef(new Animated.Value(1)).current;
+  const opacityAnim = useRef(new Animated.Value(0)).current;
+  const controlsOpacity = useRef(new Animated.Value(1)).current;
+
+  const currentImage = images[currentIndex];
+  const isFirstImage = currentIndex === 0;
+  const isLastImage = currentIndex === images.length - 1;
+
+  useEffect(() => {
+    if (visible) {
+      setCurrentIndex(initialIndex);
+      setIsLoading(true);
+      setScale(1);
+      setIsZoomed(false);
+      translateX.setValue(0);
+      translateY.setValue(0);
+      scaleAnim.setValue(1);
+      Animated.timing(opacityAnim, {
+        toValue: 1,
+        duration: 200,
+        useNativeDriver: true,
+      }).start();
+    }
+  }, [visible, initialIndex]);
+
+  const animateControls = useCallback((show: boolean) => {
+    Animated.timing(controlsOpacity, {
+      toValue: show ? 1 : 0,
+      duration: 200,
+      useNativeDriver: true,
+    }).start();
+    setShowControls(show);
+  }, []);
+
+  const handleClose = useCallback(() => {
+    Animated.timing(opacityAnim, {
+      toValue: 0,
+      duration: 200,
+      useNativeDriver: true,
+    }).start(() => {
+      onClose();
+    });
+  }, [onClose, opacityAnim]);
+
+  const handleIndexChange = useCallback((newIndex: number) => {
+    setCurrentIndex(newIndex);
+    setIsLoading(true);
+    setScale(1);
+    setIsZoomed(false);
+    translateX.setValue(0);
+    translateY.setValue(0);
+    scaleAnim.setValue(1);
+    onIndexChange?.(newIndex);
+  }, [onIndexChange, translateX, translateY, scaleAnim]);
+
+  const handleNext = useCallback(() => {
+    if (!isLastImage && !isZoomed) {
+      handleIndexChange(currentIndex + 1);
+    }
+  }, [isLastImage, isZoomed, currentIndex, handleIndexChange]);
+
+  const handlePrevious = useCallback(() => {
+    if (!isFirstImage && !isZoomed) {
+      handleIndexChange(currentIndex - 1);
+    }
+  }, [isFirstImage, isZoomed, currentIndex, handleIndexChange]);
+
+  const onPanGestureEvent = Animated.event(
+    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
+    { useNativeDriver: true }
+  );
+
+  const onPanHandlerStateChange = useCallback(
+    (event: any) => {
+      if (event.nativeEvent.oldState === State.ACTIVE) {
+        const { translationX, translationY } = event.nativeEvent;
+        const swipeThreshold = SCREEN_WIDTH * 0.25;
+
+        if (scale === 1) {
+          if (translationX < -swipeThreshold && !isLastImage) {
+            handleNext();
+          } else if (translationX > swipeThreshold && !isFirstImage) {
+            handlePrevious();
+          } else if (Math.abs(translationY) > 100) {
+            handleClose();
+          } else {
+            Animated.spring(translateX, {
+              toValue: 0,
+              useNativeDriver: true,
+            }).start();
+            Animated.spring(translateY, {
+              toValue: 0,
+              useNativeDriver: true,
+            }).start();
+          }
+        } else {
+          Animated.spring(translateX, {
+            toValue: 0,
+            useNativeDriver: true,
+          }).start();
+          Animated.spring(translateY, {
+            toValue: 0,
+            useNativeDriver: true,
+          }).start();
+        }
+      }
+    },
+    [scale, isLastImage, isFirstImage, handleNext, handlePrevious, handleClose, translateX, translateY]
+  );
+
+  const onPinchGestureEvent = Animated.event(
拓
+    [{ nativeEvent: { scale: scaleAnim } }],
+    { useNativeDriver: true }
+  );
+
+  const onPinchHandlerStateChange = useCallback(
+    (event: any) => {
+      if (event.nativeEvent.oldState === State.ACTIVE) {
+        const newScale = event.nativeEvent.scale;
+        const clampedScale = Math.min(Math.max(newScale, 1), 4);
+        
+        setScale(clampedScale);
+        setIs