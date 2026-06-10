 ```diff
--- /dev/null
+++ b/src/components/EmailInbox/EmailInbox.stories.tsx
@@ -0,0 +1,56 @@
+import React from 'react';
+import { ComponentStory, ComponentMeta } from '@storybook/react-native';
+import { EmailInbox } from './EmailInbox';
+import { EmailCategory, EmailItem } from './types';
+
+export default {
+  title: 'Email/EmailInbox',
+  component: EmailInbox,
+} as ComponentMeta<typeof EmailInbox>;
+
+const Template: ComponentStory<typeof EmailInbox> = (args) => <EmailInbox {...args} />;
+
+const mockEmails: EmailItem[] = [
+  {
+    id: '1',
+    sender: 'Alice Johnson',
+    subject: 'Project Update: Q4 Goals',
+    preview: 'Hey team, I wanted to share the latest updates on our Q4 goals and progress so far...',
+    timestamp: '10:30 AM',
+    isRead: false,
+    category: 'primary',
+    avatar: 'https://i.pravatar.cc/150?u=alice',
+  },
+  {
+    id: '2',
+    sender: 'Marketing Team',
+    subject: 'New Campaign Launch',
+    preview: 'The new marketing campaign is ready to go live next week. Please review the attached materials...',
+    timestamp: '9:15 AM',
+    isRead: false,
+    category: 'promotions',
+    avatar: 'https://i.pravatar.cc/150?u=marketing',
+  },
+  {
+    id: '3',
+    sender: 'GitHub',
+    subject: 'Security alert for your repository',
+    preview: 'We noticed a new authentication method was added to your account...',
+    timestamp: 'Yesterday',
+    isRead: true,
+    category: 'updates',
+    avatar: 'https://i.pravatar.cc/150?u=github',
+  },
+  {
+    id: '4',
+    sender: 'Bob Smith',
+    subject: 'Lunch next week?',
+    preview: 'Hey! Are you free for lunch next Tuesday? I found a great new place downtown...',
+    timestamp: 'Yesterday',
+    isRead: true,
+    category: 'primary',
+    avatar: 'https://i.pravatar.cc/150?u=bob',
+  },
+];
+
+export const Default = Template.bind({});
+Default.args = {
+  emails: mockEmails,
+  activeCategory: 'primary',
+  onCategoryChange: (category: EmailCategory) => console.log('Category changed:', category),
+  onEmailPress: (email: EmailItem) => console.log('Email pressed:', email.id),
+  onSearch: (query: string) => console.log('Search:', query),
+  onFilter: () => console.log('Filter pressed'),
+};
+
+export const Empty = Template.bind({});
+Empty.args = {
+  emails: [],
+  activeCategory: 'primary',
+  onCategoryChange: (category: EmailCategory) => console.log('Category changed:', category),
+  onEmailPress: (email: EmailItem) => console.log('Email pressed:', email.id),
+  onSearch: (query: string) => console.log('Search:', query),
+  onFilter: () => console.log('Filter pressed'),
+};
+
+export const AllRead = Template.bind({});
+AllRead.args = {
+  emails: mockEmails.map(e => ({ ...e, isRead: true })),
+  activeCategory: 'primary',
+  onCategoryChange: (category: EmailCategory) => console.log('Category changed:', category),
+  onEmailPress: (email: EmailItem) => console.log('Email pressed:', email.id),
+  onSearch: (query: string) => console.log('Search:', query),
+  onFilter: () => console.log('Filter pressed'),
+};
+
+--- /dev/null
+++ src/components/EmailInbox/types.ts
@@ -0,0 +1,22 @@
+export type EmailCategory = 'primary' | 'promotions' | 'updates' | 'social' | 'forums';
+
+export type InboxView = 'flow' | 'dashboard' | 'classic' | 'compose';
+
+export interface EmailItem {
+  id: string;
+  sender: string;
+  subject: string;
+  preview: string;
+  timestamp: string;
+  isRead: boolean;
+  category: EmailCategory;
+  avatar?: string;
+  hasAttachments?: boolean;
+  starred?: boolean;
+}
+
+export interface Account {
+  id: string;
+  name: string;
+  email: string;
+  avatar?: string;
+}
+
+--- /dev/null
+++ src/components/EmailInbox/EmailInbox.tsx
@@ -0,0 +1,268 @@
+import React, { useState, useCallback, useRef } from 'react';
+import {
+  View,
+  Text,
+  StyleSheet,
+  FlatList,
+  TouchableOpacity,
+  TextInput,
+  Animated,
+  Platform,
+  Image,
+} from 'react-native';
+import { EmailCategory, EmailItem, Account } from './types';
+import { CategoryButton } from './CategoryButton';
+import { EmailListItem } from './EmailListItem';
+import { AccountSelector } from './AccountSelector';
+
+interface EmailInboxProps {
+  emails: EmailItem[];
+  activeCategory: EmailCategory;
+  onCategoryChange: (category: EmailCategory) => void;
+  onEmailPress: (email: EmailItem) => void;
+  onSearch: (query: string) => void;
+  onFilter: () => void;
+  accounts?: Account[];
+  activeAccount?: Account;
+  onAccountChange?: (account: Account) => void;
+  onViewChange?: (view: 'flow' | 'dashboard' | 'classic' | 'compose') => void;
+}
+
+const CATEGORIES: { key: EmailCategory; label: string; icon: string }[] = [
+  { key: 'primary', label: 'Primary', icon: 'inbox' },
+  { key: 'promotions', label: 'Promotions', icon: 'tag' },
+  { key: 'updates', label: 'Updates', icon: 'bell' },
+  { key: 'social', label: 'Social', icon: 'users' },
+  { key: 'forums', label: 'Forums', icon: 'message-circle' },
+];
+
+const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
+
+export const EmailInbox: React.FC<EmailInboxProps> = ({
+  emails,
+  activeCategory,
+  on