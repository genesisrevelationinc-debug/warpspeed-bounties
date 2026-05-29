```diff
--- /dev/null
+++ b/src/components/ClassicInbox/ClassicInbox.tsx
@@ -0,0 +1,320 @@
+import React, { useState, useEffect, useRef } from 'react';
+import {
+  View,
+  Text,
+  StyleSheet,
+  ScrollView,
+  TouchableOpacity,
+  TextInput,
+  Animated,
+  Platform,
+} from 'react-native';
+
+// Mock data for emails
+const mockEmails = [
+  {
+    id: '1',
+    sender: 'John Doe',
+    subject: 'Meeting tomorrow',
+    preview: 'Let\'s schedule a meeting for tomorrow at 10am...',
+    timestamp: '10:30 AM',
+    isRead: false,
+    category: 'primary',
+  },
+  {
+    id: '2',
+    sender: 'Jane Smith',
+    subject: 'Project Update',
+    preview: 'The project is progressing well and on schedule...',
+    timestamp: 'Yesterday',
+    isRead: true,
+    category: 'work',
+  },
+  {
+    id: '3',
+    sender: 'Amazon',
+    subject: 'Your order has shipped',
+    preview: 'Your recent order has been shipped and is on its way...',
+    timestamp: '2 days ago',
+    isRead: false,
+    category: 'promotions',
+  },
+  {
+    id: '4',
+    sender: 'Newsletter Team',
+    subject: 'Weekly Digest',
+    preview: 'Here are this week\'s top stories and updates...',
+    timestamp: '3 days ago',
+    isRead: true,
+    category: 'updates',
+  },
+  {
+    id: '5',
+    sender: 'Support Team',
+    subject: 'Your ticket has been resolved',
+    preview: 'We\'ve resolved your support ticket...',
+    timestamp: '1 week ago',
+    isRead: true,
+    category: 'primary',
+  },
+];
+
+// Category options
+const categories = [
+  { id: 'primary', name: 'Primary', icon: '📧' },
+  { id: 'promotions', name: 'Promotions', icon: '📢' },
+  { id: 'updates', name: 'Updates', icon: '🔄' },
+  { id: 'forums', name: 'Forums', icon: '💬' },
+  { id: 'social', name: 'Social', icon: '👥' },
+];
+
+// Navigation options
+const navigationOptions = [
+  { id: 'flow', name: 'Flow' },
+  { id: 'dashboard', name: 'Dashboard' },
+  { id: 'classic', name: 'Classic' },
+  { id: 'compose', name: 'Compose' },
+];
+
+const ClassicInbox = () => {
+  const [activeCategory, setActiveCategory] = useState('primary');
+  const [activeNav, setActiveNav] = useState('classic');
+  const [searchQuery, setSearchQuery] = useState('');
+  const scrollY = useRef(new Animated.Value(0)).current;
+  const headerTranslateY = scrollY.interpolate({
+    inputRange: [0, 80],
+    outputRange: [0, -80],
+    extrapolate: 'clamp',
+  });
+
+  // Handle scroll to animate header
+  const handleScroll = Animated.event(
+    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
+    { useNativeDriver: true }
+  );
+
+  return (
+    <View style={styles.container}>
+      {/* Animated Header */}
+      <Animated.View
+        style={[
+          styles.header,
+          {
+            transform: [{ translateY: headerTranslateY }],
+          },
+        ]}>
+        {/* Top Navigation Row */}
+        <View style={styles.topNav}>
+          <TouchableOpacity style={styles.accountSelector}>
+            <Text style={styles.accountText}>Account 1</Text>
+          </TouchableOpacity>
+          <View style={styles.navOptions}>
+            {navigationOptions.map((option) => (
+              <TouchableOpacity
+                key={option.id}
+                style={[
+                  styles.navButton,
+                  activeNav === option.id && styles.activeNavButton,
+                ]}
+                onPress={() => setActiveNav(option.id)}>
+                <Text
+                  style={[
+                    styles.navButtonText,
+                    activeNav === option.id && styles.activeNavButtonText,
+                  ]}>
+                  {option.name}
+                </Text>
+              </TouchableOpacity>
+            ))}
+          </View>
+        </View>
+
+        {/* Category Buttons */}
+        <ScrollView
+          horizontal
+          showsHorizontalScrollIndicator={false}
+          style={styles.categoryScroll}>
+          {categories.map((category) => (
+            <TouchableOpacity
+              key={category.id}
+              style={[
+                styles.categoryButton,
+                activeCategory === category.id && styles.activeCategoryButton,
+              ]}
+              onPress={() => setActiveCategory(category.id)}>
+              <Text style={styles.categoryIcon}>{category.icon}</Text>
+              <Text
+                style={[
+                  styles.categoryText,
+                  activeCategory === category.id && styles.activeCategoryText,
+                ]}>
+                {category.name}
+              </Text>
+            </TouchableOpacity>
+          ))}
+        </ScrollView>
+
+        {/* Search and Filter */}
+        <View style={styles.searchContainer}>
+          <View style={styles.searchBar}>
+            <TextInput
+              style={styles.searchInput}
+              placeholder="Search emails..."
+              value={searchQuery}
+              onChangeText={setSearchQuery}
+              placeholderTextColor="#999"
+            />
+            <TouchableOpacity style={styles.searchButton}>
+              <Text style={styles.searchIcon}>🔍</Text>
+            </TouchableOpacity>
+          </View>
+          <TouchableOpacity style={styles.filterButton}>
+            <Text style={styles.filterIcon}>⚙️</Text>
+          </TouchableOpacity>
+        </View>
+      </Animated.View>
+
+      {/* Email List */}
+      <ScrollView
+        style={styles.emailList}
+        onScroll={handleScroll}
+        scrollEventThrottle={16}
+        contentContainerStyle={styles.emailListContent}>
+        {mockEmails.map((email) => (
+          <TouchableOpacity
+            key={email.id}
+            style={[
+              styles.emailItem,
+              !email.isRead && styles.unreadEmail,
+            ]}>
+            <View style={styles.emailHeader}>
+              <Text style={styles.sender}>{email.sender}</Text>
+              <Text style={styles.timestamp}>{email.timestamp}</Text>
+            </View>
+            <Text style={[styles.subject, !email.isRead && styles