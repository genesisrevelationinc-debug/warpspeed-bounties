 ```diff
--- /dev/null
+++ b b/src/components/PollCreation/PollCreation.stories.tsx
@@ -0,0 +1,45 @@
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
+export const SingleChoice = Template.bind({});
+SingleChoice.args = {
+  onCreatePoll: (poll) => console.log('Poll created:', poll),
+  onCancel: () => console.log('Cancelled'),
+  defaultAllowMultiple: false,
+};
+
+export const MultipleChoice = Template.bind({});
+MultipleChoice.args = {
+  onCreatePoll: (poll) => console.log('Poll created:', poll),
+  onCancel: () => console.log('Cancelled'),
+  defaultAllowMultiple: true,
+};
+--- /dev/null
+++ b b/src/components/PollCreation/PollCreation.tsx
@@ -0,0 +1,268 @@
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
+import { Poll, PollOption } from '../../types/poll';
+
+interface PollCreationProps {
+  onCreatePoll: (poll: Omit<Poll, 'id' | 'createdAt' | 'votes'>) => void;
+  onCancel: () => void;
+  defaultAllowMultiple?: boolean;
+}
+
+const MAX_OPTIONS = 12;
+const MAX_QUESTION_LENGTH = 255;
+
+export const PollCreation: React.FC<PollCreationProps> = ({
+  onCreatePoll,
+  onCancel,
+  defaultAllowMultiple = false,
+}) => {
+  const [question, setQuestion] = useState('');
+  const [options, setOptions] = useState<string[]>(['', '']);
+  const [allowMultiple, setAllowMultiple] = useState(defaultAllowMultiple);
+  const [errors, setErrors] = useState<Record<string, string>>({});
+
+  const validate = useCallback(() => {
+    const newErrors: Record<string, string> = {};
+
+    if (!question.trim()) {
+      newErrors.question = 'Question is required';
+    } else if (question.length > MAX_QUESTION_LENGTH) {
+      newErrors.question = `Question must be ${MAX_QUESTION_LENGTH} characters or less`;
+    }
+
+    const validOptions = options.filter((opt) => opt.trim().length > 0);
+    if (validOptions.length < 2) {
+      newErrors.options = 'At least 2 options are required';
+    }
+
+    setErrors(newErrors);
+    return Object.keys(newErrors).length === 0;
+  }, [question, options]);
+
+  const handleAddOption = useCallback(() => {
+    if (options.length < MAX_OPTIONS) {
+      setOptions((prev) => [...prev, '']);
+    }
+  }, [options.length]);
+
+  const handleRemoveOption = useCallback((index: number) => {
+    setOptions((prev) => prev.filter((_, i) => i !== index));
+  }, []);
+
+  const handleOptionChange = useCallback((index: number, value: string) => {
+    setOptions((prev) => {
+      const newOptions = [...prev];
+      newOptions[index] = value;
+      return newOptions;
+    });
+  }, []);
+
+  const handleCreatePoll = useCallback(() => {
+    if (!validate()) return;
+
+    const validOptions = options
+      .filter((opt) => opt.trim().length > 0)
+      .map((text, index) => ({
+        id: `option-${index}-${Date.now()}`,
+        text: text.trim(),
+        voteCount: 0,
+      }));
+
+    onCreatePoll({
+      question: question.trim(),
+      options: validOptions,
+      allowMultiple,
+      totalParticipants: 0,
+      isActive: true,
+    });
+  }, [question, options, allowMultiple, validate, onCreatePoll]);
+
+  const canAddMoreOptions = options.length < MAX_OPTIONS;
+
+  return (
+    <KeyboardAvoidingView
+      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
+      style={styles.container}
+    >
+      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
+        <View style={styles.header}>
+          <Text style={styles.title}>Create Poll</Text>
+          <TouchableOpacity onPress={onCancel}>
+            <Text style={styles.cancelText}>Cancel</Text>
+          </TouchableOpacity>
+        </View>
+
+        <View style={styles.section}>
+          <Text style={styles.label}>Question</Text>
+          <TextInput
+            style={[styles.questionInput, errors.question && styles.inputError]}
+            value={question}
+            onChangeText={setQuestion}
+            placeholder="Ask a question..."
+            placeholderTextColor="#999"
+            maxLength={MAX_QUESTION_LENGTH}
+            multiline
+          />
+          <Text style={styles.characterCount}>
+            {question.length}/{MAX_QUESTION_LENGTH}
+          </Text>
+          {errors.question && (
+            <Text style={styles.errorText}>{errors.question}</Text>
+          )}
+        </View>
+
+        <View style={styles.section}>
+          <Text style={styles.label}>Options</Text>
+          {options.map((option, index) => (
+            <View key={index} style={styles.optionRow}>
+              <TextInput
+                style={[styles.optionInput, errors.options && styles.inputError]}
+                value={option}
+                onChangeText={(value) => handleOptionChange(index, value)}
+                placeholder={`Option ${index + 1}`}
+                placeholderTextColor="#999"
+              />
+              {options.length > 2 && (
+                <TouchableOpacity
+                 