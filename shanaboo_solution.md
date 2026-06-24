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
+import Image from 'react-native-fast-image';
+import { ImagePreviewProps, ImagePreviewRef } from './ImagePreview.types';
+import { ImagePreviewActions } from './ImagePreviewActions';
+import { useImageGestures } from './useImageGestures';
+import { useImageSwipe } from './useImageSwipe';
+
+const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
+
+export const ImagePreview = React.forwardRef<ImagePreviewRef, ImagePreviewProps>(
+  (
+    {
+      images,
+      initialIndex = 0,
+      visible,
+      onClose,
+      onIndexChange,
+      onDownload,
+      onShare,
+      onDelete,
+      enableDownload = false,
+      enableShare = false,
+      enableDelete = false,
+      downloadPermission = false,
+      sharePermission = false,
+      deletePermission = false,
+      backgroundColor = '#000000',
+      swipeThreshold = 120,
+      maxZoom = 4,
+      minZoom = 1,
+      doubleTapZoom = 2.5,
+      renderHeader,
+      renderFooter,
+      testID,
+    },
+    ref
+  ) => {
+    const [currentIndex, setCurrentIndex] = useState(initialIndex);
+    const [isLoading, setIsLoading] = useState(true);
+    const [isTransitioning, setIsTransitioning] = useState(false);
+    const [showActions, setShowActions] = useState(true);
+
+    const scaleAnim = useRef(new Animated.Value(1)).current;
+    const translateXAnim = useRef(new Animated.Value(0)).current;
+    const translateYAnim = useRef(new Animated.Value(0)).current;
+    const opacityAnim = useRef(new Animated.Value(0)).current;
+    const actionsOpacityAnim = useRef(new Animated.Value(1)).current;
+
+    const panRef = useRef(null);
+    const pinchRef = useRef(null);
+    const tapRef = useRef(null);
+
+    const currentScale = useRef(1);
+    const currentTranslateX = useRef(0);
+    const currentTranslateY = useRef(0);
+
+    useEffect(() => {
+      if (visible) {
+        setCurrentIndex(initialIndex);
+        setIsLoading(true);
+        Animated.timing(opacityAnim, {
+          toValue: 1,
+          duration: 200,
+          useNativeDriver: true,
+        }).start();
+      } else {
+        opacityAnim.setValue(0);
+        resetTransformations();
+      }
+    }, [visible, initialIndex]);
+
+    useEffect(() => {
+      onIndexChange?.(currentIndex);
+    }, [currentIndex, onIndexChange]);
+
+    const resetTransformations = useCallback(() => {
+      currentScale.current = 1;
+      currentTranslateX.current = 0;
+      currentTranslateY.current = 0;
+      scaleAnim.setValue(1);
+      translateXAnim.setValue(0);
+      translateYAnim.setValue(0);
+    }, []);
+
+    const animateToValue = useCallback(
+      (value: Animated.Value, toValue: number, duration: number = 200) => {
+        return new Promise<void>((resolve) => {
+          Animated.timing(value, {
+            toValue,
+            duration,
+            useNativeDriver: true,
+          }).start(() => resolve());
+        });
+      },
+      []
+    );
+
+    const handleDoubleTap = useCallback(
+      (event: any) => {
+        const { x, y } = event.nativeEvent;
+        const newScale = currentScale.current > 1.5 ? minZoom : doubleTapZoom;
+
+        if (newScale === minZoom) {
+          animateToValue(scaleAnim, minZoom);
+          animateToValue(translateXAnim, 0);
+          animateToValue(translateYAnim, 0);
+          currentScale.current = minZoom;
+          currentTranslateX.current = 0;
+          currentTranslateY.current = 0;
+        } else {
+          const offsetX = (x - SCREEN_WIDTH / 2) * (1 - newScale);
+          const offsetY = (y - SCREEN_HEIGHT / 2) * (1 - newScale);
+          animateToValue(scaleAnim, newScale);
+          animateToValue(translateXAnim, offsetX);
+          animateToValue(translateYAnim, offsetY);
+          currentScale.current = newScale;
+          currentTranslateX.current = offsetX;
+          currentTranslateY.current = offsetY;
+        }
+      },
+      [minZoom, doubleTapZoom, scaleAnim, translateXAnim, translateYAnim]
+    );
+
+    const handlePinch = useGestureHandler({
+      onActive: ({ scale }) => {
+        const newScale = Math.max(minZoom, Math.min(maxZoom, scale));
+        scaleAnim.setValue(newScale);
+      },
+      onEnd: ({ scale }) => {
+        const newScale = Math.max(minZoom, Math.min(maxZoom, scale));
+        currentScale.current = newScale;
+        if (newScale <= minZoom) {
+          animateToValue(scaleAnim, minZoom);
+          animateToValue(translateXAnim, 0);
+          animateToValue(translateYAnim, 0);
+          currentTranslateX.current = 0;
+          currentTranslateY.current = 0;
+        }
+      },
+    });
+
+    const handlePan = useGestureHandler({
+      onActive: ({ translationX, translationY }) => {
+        if (currentScale.current > minZoom) {
+          const newTranslateX = currentTranslateX.current + translationX;
+          const newTranslateY = currentTranslateY.current + translationY;
+          translateXAnim.setValue(newTranslateX);
+          translateYAnim.setValue(newTranslateY);
+        }
+      },
+      onEnd: ({ translationX, translationY, velocityX }) => {
+        if (currentScale.current <= minZoom && Math.abs(translationX) > swipeThreshold) {
+          const direction = translationX >