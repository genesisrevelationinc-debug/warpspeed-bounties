```diff
--- /dev/null
+++ b/src/components/ImageEditor/ImageEditor.tsx
@@ -0,0 +1,345 @@
+import React, { useRef, useState, useCallback, useEffect } from 'react';
+import {
+  View,
+  StyleSheet,
+  Dimensions,
+  GestureResponderEvent,
+  PanResponder,
+  PanResponderGestureState,
+} from 'react-native';
+import { ImageEditorCanvas } from './ImageEditorCanvas';
+import { ImageEditorToolbar } from './ImageEditorToolbar';
+import { ImageEditorControls } from './ImageEditorControls';
+import { AnnotationToolbar } from './AnnotationToolbar';
+import { UndoRedoManager } from './UndoRedoManager';
+import {
+  ImageEditState,
+  CropRegion,
+  Annotation,
+  AnnotationType,
+  EditorTool,
+  Point,
+} from './types';
+import { processImage, saveEditedImage } from './imageProcessing';
+
+const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
+
+interface ImageEditorProps {
+  originalImageUri: string;
+  onSave: (editedImageUri: string) => void;
+  onCancel: () => void;
+  context?: 'notes' | 'messenger';
+  originalSendTime?: Date;
+}
+
+export const ImageEditor: React.FC<ImageEditorProps> = ({
+  originalImageUri,
+  onSave,
+  onCancel,
+  context = 'notes',
+  originalSendTime,
+}) => {
+  const canvasRef = useRef<ImageEditorCanvas>(null);
+  const undoRedoManager = useRef(new UndoRedoManager<ImageEditState>()).current;
+  
+  const [currentTool, setCurrentTool] = useState<EditorTool>('crop');
+  const [activeAnnotation, setActiveAnnotation] = useState<AnnotationType>('pen');
+  const [brightness, setBrightness] = useState(0);
+  const [contrast, setContrast] = useState(0);
+  const [saturation, setSaturation] = useState(0);
+  const [rotation, setRotation] = useState(0);
+  const [cropRegion, setCropRegion] = useState<CropRegion | null>(null);
+  const [annotations, setAnnotations] = useState<Annotation[]>([]);
+  const [isProcessing, setIsProcessing] = useState(false);
+  const [canUndo, setCanUndo] = useState(false);
+  const [canRedo, setCanRedo] = useState(false);
+  const [showAnnotationToolbar, setShowAnnotationToolbar] = useState(false);
+
+  const updateUndoRedoState = useCallback(() => {
+    setCanUndo(undoRedoManager.canUndo());
+    setCanRedo(undoRedoManager.canRedo());
+  }, [undoRedoManager]);
+
+  const captureState = useCallback((): ImageEditState => ({
+    brightness,
+    contrast,
+    saturation,
+    rotation,
+    cropRegion,
+    annotations,
+  }), [brightness, contrast, saturation, rotation, cropRegion, annotations]);
+
+  const pushState = useCallback(() => {
+    undoRedoManager.pushState(captureState());
+    updateUndoRedoState();
+  }, [captureState, undoRedoManager, updateUndoRedoState]);
+
+  const applyState = useCallback((state: ImageEditState) => {
+    setBrightness(state.brightness);
+    setContrast(state.contrast);
+    setSaturation(state.saturation);
+    setRotation(state.rotation);
+    setCropRegion(state.cropRegion);
+    setAnnotations(state.annotations);
+  }, []);
+
+  const handleUndo = useCallback(() => {
+    const state = undoRedoManager.undo();
+    if (state) {
+      applyState(state);
+      updateUndoRedoState();
+    }
+  }, [undoRedoManager, applyState, updateUndoRedoState]);
+
+  const handleRedo = useCallback(() => {
+    const state = undoRedoManager.redo();
+    if (state) {
+      applyState(state);
+      updateUndoRedoState();
+    }
+  }, [undoRedoManager, applyState, updateUndoRedoState]);
+
+  const handleBrightnessChange = useCallback((value: number) => {
+    setBrightness(value);
+  }, []);
+
+  const handleContrastChange = useCallback((value: number) => {
+    setContrast(value);
+  }, []);
+
+  const handleSaturationChange = useCallback((value: number) => {
+    setSaturation(value);
+  }, []);
+
+  const handleRotate = useCallback((degrees: number) => {
+    setRotation((prev) => (prev + degrees) % 360);
+    pushState();
+  }, [pushState]);
+
+  const handleCrop = useCallback((region: CropRegion) => {
+    setCropRegion(region);
+    pushState();
+  }, [pushState]);
+
+  const handleAnnotationAdd = useCallback((annotation: Annotation) => {
+    setAnnotations((prev) => [...prev, annotation]);
+    pushState();
+  }, [pushState]);
+
+  const handleToolChange = useCallback((tool: EditorTool) => {
+    setCurrentTool(tool);
+    setShowAnnotationToolbar(tool === 'annotate');
+  }, []);
+
+  const handleSave = useCallback(async () => {
+    setIsProcessing(true);
+    try {
+      const editedImageUri = await processImage({
+        originalUri: originalImageUri,
+        brightness,
+        contrast,
+        saturation,
+        rotation,
+        cropRegion,
+        annotations,
+      });
+
+      const isMessengerEdit = context === 'messenger';
+      const isWithin15Minutes = originalSendTime
+        ? Date.now() - originalSendTime.getTime() <= 15 * 60 * 1000
+        : false;
+
+      const finalUri = await saveEditedImage(
+        editedImageUri,
+        isMessengerEdit && isWithin15Minutes
+      );
+
+      onSave(finalUri);
+    } catch (error) {
+      console.error('Image processing failed:', error);
+    } finally {
+      setIsProcessing(false);
+    }
+  }, [
+    originalImageUri,
+    brightness,
+    contrast,
+    saturation,
+    rotation,
+    cropRegion,
+    annotations,
+    context,
+    originalSendTime,
+    onSave,
+  ]);
+
+  useEffect(() => {
+    undoRedoManager.pushState(captureState());
+    updateUndoRedoState();
+  }, []);
+
+  return (
+    <View style={styles.container}>
+      <ImageEditorCanvas
+        ref={canvasRef}
+        imageUri={originalImageUri}
+        brightness={brightness