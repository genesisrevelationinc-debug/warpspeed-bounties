 ```diff
--- /dev/null
+++ b/src/components/Poll/PollCreation.tsx
@@ -0,0 +1,298 @@
+import React, { useState, useCallback } from 'react';
+import {
+  View,
+  Text,
+  TextInput,
+  TouchableOpacity,
+  ScrollView,
+  Switch,
+  StyleSheet,
+  KeyboardAvoidingView,
+  Platform,
+} from 'react-native';
+import { Ionicons } from '@expo/vector-icons';
+
+export interface PollOption {
+  id: string;
+  text: string;
+}
+
+export interface PollData {
+  question: string;
+  options: PollOption[];
+  allowMultipleChoice: boolean;
+  createdAt: Date;
+}
+
+interface PollCreationProps {
+  onCreatePoll: (poll: PollData) => void;
+  onCancel: () => void;
+  maxOptions?: number;
+  maxQuestionLength?: number;
+}
+
+const MAX_OPTIONS_DEFAULT = 12;
+const MAX_QUESTION_LENGTH_DEFAULT = 255;
+
+export const PollCreation: React.FC<PollCreationProps> = ({
+  onCreatePoll,
+  onCancel,
+  maxOptions = MAX_OPTIONS_DEFAULT,
+  maxQuestionLength = MAX_QUESTION_LENGTH_DEFAULT,
+}) => {
+  const [question, setQuestion] = useState('');
+  const [options, setOptions] = useState<PollOption[]>([
+    { id: '1', text: '' },
+    { id: '2', text: '' },
+  ]);
+  const [allowMultipleChoice, setAllowMultipleChoice] = useState(false);
+
+  const addOption = useCallback(() => {
+    if (options.length >= maxOptions) return;
+    const newOption: PollOption = {
+      id: Date.now().toString(),
+      text: '',
+    };
+    setOptions((prev) => [...prev, newOption]);
+  }, [options.length, maxOptions]);
+
+  const removeOption = useCallback((id: string) => {
+    setOptions((prev) => prev.filter((opt) => opt.id !== id));
+  }, []);
+
+  const updateOption = useCallback((id: string, text: string) => {
+    setOptions((prev) =>
+      prev.map((opt) => (opt.id === id ? { ...opt, text } : opt))
+    );
+  }, []);
+
+  const handleCreatePoll = useCallback(() => {
+    const validOptions = options.filter((opt) => opt.text.trim().length > 0);
+    if (question.trim().length === 0 || validOptions.length < 2) return;
+
+    const pollData: PollData = {
+      question: question.trim(),
+      options: validOptions,
+      allowMultipleChoice,
+      createdAt: new Date(),
+    };
+
+    onCreatePoll(pollData);
+    setQuestion('');
+    setOptions([
+      { id: '1', text: '' },
+      { id: '2', text: '' },
+    ]);
+    setAllowMultipleChoice(false);
+  }, [question, options, allowMultipleChoice, onCreatePoll]);
+
+  const canCreatePoll =
+    question.trim().length > 0 &&
+    options.filter((opt) => opt.text.trim().length > 0).length >= 2;
+
+  return (
+    <KeyboardAvoidingView
+      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
+      style={styles.container}
+    >
+      <View style={styles.header}>
+        <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
+          <Ionicons name="close" size={24} color="#666" />
+        </TouchableOpacity>
+        <Textain style={styles.headerTitle}>Create Poll</Text>
+        <TouchableOpacity
+          onPress={handleCreatePoll}
+          disabled={!canCreatePoll}
+          style={[styles.createButton, !canCreatePoll && styles.createButtonDisabled]}
+        >
+          <Text style={[styles.createButtonText, !canCreatePoll && styles.createButtonTextDisabled]}>
+            Create
+          </Text>
+        </TouchableOpacity>
+      </View>
+
+      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
+        <TextInput
+          style={styles.questionInput}
+          placeholder="Ask a question..."
+          placeholderTextColor="#999"
+          value={question}
+          onChangeText={setQuestion}
+          maxLength={maxQuestionLength}
+          multiline
+        />
+        <Text style={styles.characterCount}>
+          {question.length}/{maxQuestionLength}
+        </Text>
+
+        <View style={styles.optionsContainer}>
+          {options.map((option, index) => (
+            <View key={option.id} style={styles.optionRow}>
+              <Text style={styles.optionNumber}>{index + 1}.</Text>
+              <TextInput
+                style={styles.optionInput}
+                placeholder={`Option ${index + 1}`}
+                placeholderTextColor="#999"
+                value={option.text}
+                onChangeText={(text) => updateOption(option.id, text)}
+              />
+              {options.length > 2 && (
+                <TouchableOpacity onPress={() => removeOption(option.id)}>
+                  <Ionicons name="close-circle" size={20} color="#FF4444" />
+                </TouchableOpacity>
+              )}
+            </View>
+          ))}
+        </View>
+
+        {options.length < maxOptions && (
+          <TouchableOpacity onPress={addOption} style={styles.addOptionButton}>
+            <Ionicons name="add-circle-outline" size={20} color="#007AFF" />
+            <Text style={styles.addOptionText}>Add Option</Text>
+          </TouchableOpacity>
+        )}
+
+        <View style={styles.multipleChoiceContainer}>
+          <Text style={styles.multipleChoiceText}>Allow multiple choice</Text>
+          <Switch
+            value={allowMultipleChoice}
+            onValueChange={setAllowMultipleChoice}
+            trackColor={{ false: '#767577', true: '#81b0ff' }}
+            thumbColor={allowMultipleChoice ? '#007AFF' : '#f4f3f4'}
+          />
+        </View>
+      </ScrollView>
+    </KeyboardAvoidingView>
+  );
+};
+
+const styles = StyleSheet.create({
+  container: {
+    flex: 1,
+    backgroundColor: '#FFFFFF',
+  },
+  header: {
+    flexDirection: 'row',
+    alignItems: 'center',
+    justifyContent: 'space-between',
+   