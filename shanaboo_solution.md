 ```diff
--- /dev/null
+++ b/src/components/poll/PollCreation.stories.tsx
@@ -0,0 +1,78 @@
+import React from 'react';
+import { ComponentStory, ComponentMeta } from '@storybook/react-native';
+import { PollCreation } from './PollCreation';
+
+export default {
+  title: 'Poll/PollCreation',
+  component: PollCreation,
+} as ComponentMeta<typeof PollCreation>;
+
+const Template: ComponentStory<typeof PollCreation> = (args) => <PollCreation {...args} />;
+
+export const Default = Template.bind({});
+Default.args = {
+  onCreatePoll: (poll) => console.log('Poll created:', poll),
+  onCancel: () => console.log('Cancelled'),
+};
+
+export const WithMaxOptions = Template.bind({});
+WithMaxOptions.args = {
+  onCreatePoll: (poll) => console.log('Poll created:', poll),
+  onCancel: () => console.log('Cancelled'),
+};
+
+export const WithLongQuestion = Template.bind({});
+WithLongQuestion.args = {
+  onCreatePoll: (poll) => console.log('Poll created:', poll),
+  onCancel: () => console.log('Cancelled'),
+};
+--- /dev/null
++++ src/components/poll/PollCreation.tsx
@@ -0,0 +1,264 @@
+import React, { useState, useCallback } from 'react';
+import {
+  View,
+  Text,
+  TextInput,
+  TouchableOpacity,
+  ScrollView,
+  StyleSheet,
+  KeyboardAvoidingView,
+  Platform,
+} from 'react-native';
+
+export interface PollOption {
+  id: string;
+  text: string;
+}
+
+export interface PollData {
+  id: string;
+  question: string;
+  options: PollOption[];
+  allowMultipleChoice: boolean;
+  createdAt: Date;
+  totalParticipants: number;
+}
+
+interface PollCreationProps {
+  onCreatePoll: (poll: PollData) => void;
+  onCancel: () => void;
+  maxOptions?: number;
+  questionMaxLength?: number;
+}
+
+const MAX_OPTIONS = 12;
+const QUESTION_MAX_LENGTH = 255;
+
+export const PollCreation: React.FC<PollCreationProps> = ({
+  onCreatePoll,
+  onCancel,
+  maxOptions = MAX_OPTIONS,
+  questionMaxLength = QUESTION_MAX_LENGTH,
+}) => {
+  const [question, setQuestion] = useState('');
+  const [options, setOptions] = useState<PollOption[]>([
+    { id: '1', text: '' },
+    { id: '2', text: '' },
+  ]);
+  const [allowMultipleChoice, setAllowMultipleChoice] = useState(false);
+  const [errors, setErrors] = useState<Record<string, string>>({});
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
+  const validate = (): boolean => {
+    const newErrors: Record<string, string> = {};
+
+    if (!question.trim()) {
+      newErrors.question = 'Question is required';
+    } else if (question.length > questionMaxLength) {
+      newErrors.question = `Question must be less than ${questionMaxLength} characters`;
+    }
+
+    const validOptions = options.filter((opt) => opt.text.trim());
+    if (validOptions.length < 2) {
+      newErrors.options = 'At least 2 options are required';
+    }
+
+    setErrors(newErrors);
+    return Object.keys(newErrors).length === 0;
+  };
+
+  const handleCreate = () => {
+    if (!validate()) return;
+
+    const poll: PollData = {
+      id: Date.now().toString(),
+      question: question.trim(),
+      options: options.filter((opt) => opt.text.trim()),
+      allowMultipleChoice,
+      createdAt: new Date(),
+      totalParticipants: 0,
+    };
+
+    onCreatePoll(poll);
+  };
+
+  const canAddMore = options.length < maxOptions;
+
+  return (
+    <KeyboardAvoidingView
+      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
+      style={styles.container}
+    >
+      <ScrollView style={styles.scrollView}>
+        <View style={styles.header}>
+          <Text style={styles.title}>Create Poll</Text>
+          <TouchableOpacity onPress={onCancel}>
+            <Text style={styles.cancelText}>Cancel</Text>
+          </TouchableOpacity>
+        </View>
+
+        <View style={styles.questionContainer}>
+          <TextInput
+            style={[styles.questionInput, errors.question && styles.inputError]}
+            placeholder="Ask a question..."
+            placeholderTextColor="#999"
+            value={question}
+            onChangeText={setQuestion}
+            maxLength={questionMaxLength}
+            multiline
+          />
+          <Text style={styles.characterCount}>
+            {question.length}/{questionMaxLength}
+          </Text>
+          {errors.question && (
+            <Text style={styles.errorText}>{errors.question}</Text>
+          )}
+        </View>
+
+        <View style={styles.optionsContainer}>
+          <Text style={styles.sectionTitle}>Options</Text>
+          {options.map((option, index) => (
+            <View key={option.id} style={styles.optionRow}>
+              <TextInput
+                style={styles.optionInput}
+                placeholder={`Option ${index + 1}`}
+                placeholderTextColor="#999"
+                value={option.text}
+                onChangeText={(text) => updateOption(option.id, text)}
+              />
+              {options.length > 2 && (
+                <TouchableOpacity
+                  onPress={() => removeOption(option.id)}
+                  style={styles.removeButton}
+                >
+                  <Text style={styles.removeButtonText}>×</Text>
+                </TouchableOpacity>
+              )}
+           