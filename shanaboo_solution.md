```diff
--- a/src/components/NoteList.tsx
+++ b/src/components/NoteList.tsx
@@ -1,6 +1,7 @@
 import React, { useState, useEffect } from 'react';
 import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
 import { useNotes } from '../hooks/useNotes';
+import { useAuth } from '../hooks/useAuth';
 import { Note } from '../types/Note';
 import { LockIcon } from './LockIcon';
 import { BiometricAuth } from '../utils/biometrics';
@@ -10,6 +11,8 @@ interface NoteListProps {
 }
 
 export const NoteList: React.FC<NoteListProps> = ({ onNotePress }) => {
+  const { isAuthenticated, authenticate, requireAuth } = useAuth();
+  const [unlockedNoteIds, setUnlockedNoteIds] = useState<Set<string>>(new Set());
   const { notes, loading } = useNotes();
 
   const handleNotePress = async (note: Note) => {
@@ -17,6 +20,16 @@ export const NoteList: React.FC<NoteListProps> = ({ onNotePress }) => {
       onNotePress(note);
       return;
     }
+    
+    if (unlockedNoteIds.has(note.id)) {
+      onNotePress(note);
+      return;
+    }
+    
+    const success = await requireAuth();
+    if (success) {
+      setUnlockedNoteIds(prev => new Set(prev).add(note.id));
+      onNotePress(note);
+    }
   };
 
   const renderNote = ({ item }: { item: Note }) => (
@@ -24,7 +37,9 @@ export const NoteList: React.FC<NoteListProps> = ({ onNotePress }) => {
       style={styles.noteItem}
       onPress={() => handleNotePress(item)}
     >
-      <Text style={styles.noteTitle}>{item.title}</Text>
+      <Text style={styles.noteTitle}>
+        {item.isLocked ? '🔒 Locked Note' : item.title}
+      </Text>
       {item.isLocked && <LockIcon />}
     </TouchableOpacity>
   );
@@ -50,4 +65,4 @@ const styles = StyleSheet.create({
     fontSize: 16,
     fontWeight: '500',
   },
-});
\ No newline at end of file
+});
--- a/src/hooks/useAuth.ts
+++ b/src/hooks/useAuth.ts
@@ -0,0 +1,78 @@
+import { useState, useCallback, useRef } from 'react';
+import * as LocalAuthentication from 'expo-local-authentication';
+import AsyncStorage from '@react-native-async-storage/async-storage';
+import { Platform } from 'react-native';
+
+const AUTH_TIMEOUT_KEY = '@auth_timeout';
+const LAST_AUTH_KEY = '@last_authenticated';
+const DEFAULT_TIMEOUT = 5 * 60 * 1000; // 5 minutes
+
+interface AuthState {
+  isAuthenticated: boolean;
+  authenticate: () => Promise<boolean>;
+  requireAuth: () => Promise<boolean>;
+  resetAuth: () => void;
+}
+
+export const useAuth = (): AuthState => {
+  const [isAuthenticated, setIsAuthenticated] = useState(false);
+  const authPromiseRef = useRef<Promise<boolean> | null>(null);
+
+  const checkAuthTimeout = async (): Promise<boolean> => {
+    try {
+      const timeoutStr = await AsyncStorage.getItem(AUTH_TIMEOUT_KEY);
+      const lastAuthStr = await AsyncStorage.getItem(LAST_AUTH_KEY);
+      const timeout = timeoutStr ? parseInt(timeoutStr, 10) : DEFAULT_TIMEOUT;
+      const lastAuth = lastAuthStr ? parseInt(lastAuthStr, 10) : 0;
+      
+      return Date.now() - lastAuth < timeout;
+    } catch {
+      return false;
+    }
+  };
+
+  const authenticate = useCallback(async (): Promise<boolean> => {
+    if (authPromiseRef.current) {
+      return authPromiseRef.current;
+    }
+
+    const authPromise = (async () => {
+      try {
+        const hasHardware = await LocalAuthentication.hasHardwareAsync();
+        if (!hasHardware) {
+          // Fall back to PIN or allow if no biometrics available
+          setIsAuthenticated(true);
+          await AsyncStorage.setItem(LAST_AUTH_KEY, Date.now().toString());
+          return true;
+        }
+
+        const result = await LocalAuthentication.authenticateAsync({
+          promptMessage: 'Authenticate to access locked note',
+          fallbackLabel: 'Use PIN',
+        });
+
+        if (result.success) {
+          setIsAuthenticated(true);
+          await AsyncStorage.setItem(LAST_AUTH_KEY, Date.now().toString());
+          return true;
+        }
+        return false;
+      } catch (error) {
+        console.error('Authentication error:', error);
+        return false;
+      } finally {
+        authPromiseRef.current = null;
+      }
+    })();
+
+    authPromiseRef.current = authPromise;
+    return authPromise;
+  }, []);
+
+  const requireAuth = useCallback(async (): Promise<boolean> => {
+    if (isAuthenticated) {
+      const stillValid = await checkAuthTimeout();
+      if (stillValid) return true;
+    }
+    
+    const stillValid = await checkAuthTimeout();
+    if (stillValid) {
+      setIsAuthenticated(true);
+      return true;
+    }
+    
+    return authenticate();
+  }, [isAuthenticated, authenticate]);
+
+  const resetAuth = useCallback(() => {
+    setIsAuthenticated(false);
+    AsyncStorage.removeItem(LAST_AUTH_KEY);
+  }, []);
+
+  return {
+    isAuthenticated,
+    authenticate,
+    requireAuth,
+    resetAuth,
+  };
+};
--- a/src/utils/biometrics.ts
+++ b/src/utils/biometrics.ts
@@ -1,12 +1,45 @@
 import * as LocalAuthentication from 'expo-local-authentication';
+import AsyncStorage from '@react-native-async-storage/async-storage';
+
+const PIN_STORAGE_KEY = '@user_pin';
+const USE_BIOMETRIC_KEY = '@use_biometric';
 
 export class BiometricAuth {
   static async isAvailable(): Promise<boolean> {
     return await LocalAuthentication.hasHardwareAsync();
   }
 
+  static async isBiometricEnabled(): Promise<boolean> {
+    const enabled = await AsyncStorage.getItem(USE_BIOMETRIC_KEY);
+    return enabled === 'true';
+  }
+
+  static async setBiometricEnabled(enabled: boolean): Promise<void> {
+    await AsyncStorage.setItem(USE_BIOMETRIC_KEY, enabled ? 'true' : 'false');
+  }
+
   static async authenticate(): Promise<boolean> {
     const