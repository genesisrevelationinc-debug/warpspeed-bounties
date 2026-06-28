 ```diff
--- /dev/null
+++ b/src/components/Poll/PollCreation.stories.tsx
@@ -0,0 +1,42 @@
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
+++ src/components/Poll/PollCreation.tsx
@@ -0,0 +1,242 @@
+import React, { useState, useCallback } from 'react';
+import {
+  View,
+  Text,
+  TextInput,
+  TouchableOpacity,
+  ScrollView,
+  StyleSheet,
+  Switch,
+} from 'react-native';
+
+export interface PollOption {
+  id: string;
+  text: string;
+}
+
+export interface PollData {
+  question: string;
+  options: PollOption[];
+  allowMultiple: boolean;
+  createdAt: Date;
+}
+
+interface PollCreationProps {
+  onCreatePoll: (poll: PollData) => void;
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
+  const [options, setOptions] = useState<PollOption[]>([
+    { id: '1', text: '' },
+    { id: '2', text: '' },
+  ]);
+  const [allowMultiple, setAllowMultiple] = useState(defaultAllowMultiple);
+
+  const addOption = useCallback(() => {
+    if (options.length >= MAX_OPTIONS) return;
+    setOptions((prev) => [
+      ...prev,
+      { id: Date.now().toString(), text: '' },
+    ]);
+  }, [options.length]);
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
+    onCreatePoll({
+      question: question.trim(),
+      options: validOptions,
+      allowMultiple,
+      createdAt: new Date(),
+    });
+  }, [question, options, allowMultiple, onCreatePoll]);
+
+  const canCreatePoll =
+    question.trim().length > 0 &&
+    options.filter((opt) => opt.text.trim().length > 0).length >= 2;
+
+  return (
+    <View style={styles.container}>
+      <View style={styles.header}>
+        <TouchableOpacity onPress={onCancel}>
+          <Text style={styles.cancelText}>Cancel</Text>
+        </TouchableOpacity>
+        <Text style={styles.title}>Create Poll</Text>
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
+      <ScrollView style={styles.scrollView}>
+        <TextInput
+          style={styles.questionInput}
+          placeholder="Ask a question..."
+          placeholderTextColor="#999"
+          value={question}
+          onChangeText={setQuestion}
+          maxLength={MAX_QUESTION_LENGTH}
+          multiline
+        />
+        <Text style={styles.characterCount}>
+          {question.length}/{MAX_QUESTION_LENGTH}
+        </Text>
+
+        <View style={styles.optionsContainer}>
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
+            </View>
+          ))}
+        </View>
+
+        {options.length < MAX_OPTIONS && (
+          <TouchableOpacity onPress={addOption} style={styles.addOptionButton}>
+            <Text style={styles.addOptionText}>+ Add Option</Text>
+          </TouchableOpacity>
+        )}
+
+        <View style={styles.multipleChoiceRow}>
+          <Text style={styles.multipleChoiceText}>Allow multiple choices</Text>
+          <Switch
+            value={allowMultiple}
+            onValueChange={setAllowMultiple}
+            trackColor={{ false: