 ```diff
--- /dev/null
+++ b/src/components/poll/PollCreation.stories.tsx
@@ -0,0 +1,72 @@
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
+  maxOptions: 12,
+  maxQuestionLength: 255,
+};
+
+export const WithQuestion = Template.bind({});
+WithQuestion.args = {
+  ...Default.args,
+  initialQuestion: 'What time should we meet?',
+};
+
+export const WithOptions = Template.bind({});
+WithOptions.args = {
+  ...Default.args,
+  initialQuestion: 'What time should we meet?',
+  initialOptions: ['6:00 PM', '7:00 PM', '8:00 PM'],
+};
+
+export const MaxOptionsReached = Template.bind({});
+MaxOptionsReached.args = {
+  ...Default.args,
+  initialQuestion: 'Vote for your favorite color',
+  initialOptions: [
+    'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange',
+    'Pink', 'Black', 'White', 'Gray', 'Brown', 'Cyan',
+  ],
+};
+
+export const SingleChoice = Template.bind({});
+SingleChoice.args = {
+  ...Default.args,
+  initialQuestion: 'Single choice poll',
+  initialOptions: ['Option A', 'Option B'],
+  allowMultipleChoice: false,
+};
+
+export const MultipleChoice = Template.bind({});
+MultipleChoice.args = {
+  ...Default.args,
+  initialQuestion: 'Multiple choice poll',
+  initialOptions: ['Option A', 'Option B', 'Option C'],
+  allowMultipleChoice: true,
+};
+
+export const LongQuestion = Template.bind({});
+LongQuestion.args = {
+  ...Default.args,
+  initialQuestion: 'This is a very long question that demonstrates the character limit behavior when the user types more than the allowed number of characters in the poll question field',
+  initialOptions: ['Yes', 'No'],
+};
+
+export const ValidationError = Template.bind({});
+ValidationError.args = {
+  ...Default.args,
+  initialQuestion: '',
+  initialOptions: ['', 'Valid option'],
+  showValidation: true,
+};
+
+--- /dev/null
+++ src/components/poll/PollCreation.tsx
@@ -0,0 +1,298 @@
+import React, { useState, useCallback, useRef } from 'react';
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
+import { PollOption, PollType } from './types';
+
+interface PollCreationProps {
+  maxOptions?: number;
+  maxQuestionLength?: number;
+  onCreatePoll: (poll: {
+    question: string;
+    options: PollOption[];
+    type: PollType;
+  }) => void;
+  onCancel?: () => void;
+  initialQuestion?: string;
+  initialOptions?: string[];
+  allowMultipleChoice?: boolean;
+  showValidation?: boolean;
+}
+
+export const PollCreation: React.FC<PollCreationProps> = ({
+  maxOptions = 12,
+  maxQuestionLength = 255,
+  onCreatePoll,
+  onCancel,
+  initialQuestion = '',
+  initialOptions = [],
+  allowMultipleChoice = false,
+  showValidation = false,
+}) => {
+  const [question, setQuestion] = useState(initialQuestion);
+  const [options, setOptions] = useState<PollOption[]>(
+    initialOptions.length > 0
+      ? initialOptions.map((text, index) => ({
+          id: `option-${index}`,
+          text,
+          voteCount: 0,
+        }))
+      : [{ id: 'option-0', text: '', voteCount: 0 }]
+  );
+  const [pollType, setPollType] = useState<PollType>(
+    allowMultipleChoice ? PollType.MULTIPLE_CHOICE : PollType.SINGLE_CHOICE
+  );
+  const [errors, setErrors] = useState<Record<string, string>>({});
+
+  const optionRefs = useRef<(TextInput | null)[]>([]);
+
+  const validate = useCallback(() => {
+    const newErrors: Record<string, string> = {};
+
+    if (!question.trim()) {
+      newErrors.question = 'Please enter a poll question';
+    } else if (question.length > maxQuestionLength) {
+      newErrors.question = `Question must be ${maxQuestionLength} characters or less`;
+    }
+
+    const validOptions = options.filter((o) => o.text.trim());
+    if (validOptions.length < 2) {
+      newErrors.options = 'Please provide at least 2 options';
+    }
+
+    const emptyOptionIndex = options.findIndex((o, i) => !o.text.trim() && i < validOptions.length);
+    if (emptyOptionIndex !== -1) {
+      newErrors[`option-${emptyOptionIndex}`] = 'Option cannot be empty';
+    }
+
+    setErrors(newErrors);
+    return Object.keys(newErrors).length === 0;
+  }, [question, options, maxQuestionLength]);
+
+  const handleAddOption = useCallback(() => {
+    if (options.length >= maxOptions) return;
+    const newOption: PollOption = {
+      id: `option-${Date.now()}`,
+      text: '',
+      voteCount: 0,
+    };
+    setOptions((prev) => [...prev, newOption]);
+    setTimeout(() => {
+      optionRefs.current[options.length]?.focus();
+    }, 100);
+  }, [options.length, maxOptions]);
+
+  const handleRemoveOption = useCallback((index: number) => {
+    setOptions((prev) => prev.filter((_, i) => i !== index));
+  }, []);
+
+  const handleOptionChange = useCallback((index: number, text: string) => {
+    setOptions((prev) =>
+      prev.map((opt, i) => (i === index ? { ...opt, text } : opt))
+    );
+  }, []);
+
+  const handleCreatePoll = useCallback(() => {
+    if (!validate()) return;
+
+    const validOptions = options.filter((