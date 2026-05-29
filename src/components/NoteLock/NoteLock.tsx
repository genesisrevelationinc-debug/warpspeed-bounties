import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { NoteLockOverlay } from './NoteLockOverlay';
import { NoteLockSettings } from './NoteLockSettings';
import { SecureStorage } from '../../utils/SecureStorage';
import { useAuthTimeout } from '../../hooks/useAuthTimeout';

export type LockType = 'biometric' | 'device' | 'pin' | null;

export interface NoteLockConfig {
  noteId: string;
  lockType: LockType;
  pinHash?: string;
  isLocked: boolean;
  lastAuthenticatedAt?: number;
}

interface NoteLockProps {
  noteId: string;
  children: React.ReactNode;
  onLockChange?: (isLocked: boolean) => void;
}

const AUTH_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes default

export const NoteLock: React.FC<NoteLockProps> = ({ noteId, children, onLockChange }) => {
  const [lockConfig, setLockConfig] = useState<NoteLockConfig | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const { isTimedOut, resetTimeout } = useAuthTimeout(AUTH_TIMEOUT_MS);

  useEffect(() => {
    loadLockConfig();
  }, [noteId]);

  useEffect(() => {
    if (isTimedOut && lockConfig?.isLocked) {
      setIsAuthenticated(false);
    }
  }, [isTimedOut, lockConfig?.isLocked]);

  const loadLockConfig = async () => {
    try {
      const config = await SecureStorage.getItem<NoteLockConfig>(`note_lock_${noteId}`);
      if (config) {
        setLockConfig(config);
        // Check if we need re-authentication on app restart
        if (config.isLocked) {
          setIsAuthenticated(false);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const authenticate = useCallback(async (): Promise<boolean> => {
    if (!lockConfig || !lockConfig.isLocked) {
      return true;
    }

    try {
      if (lockConfig.lockType === 'biometric' || lockConfig.lockType === 'device') {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate to unlock note',
          fallbackLabel: 'Use passcode',
          disableDeviceFallback: false,
        });

        if (result.success) {
          setIsAuthenticated(true);
          resetTimeout();
          return true;
        }
        return false;
      } else if (lockConfig.lockType === 'pin') {
        // PIN authentication handled by overlay
        return false;
      }

      return true;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }, [lockConfig, resetTimeout]);

  const handlePinAuthenticate = useCallback((pin: string): boolean => {
    if (lockConfig?.pinHash && pin === lockConfig.pinHash) {
      setIsAuthenticated(true);
      resetTimeout();
      return true;
    }
    return false;
  }, [lockConfig, resetTimeout]);

  const handleLockChange = useCallback(async (newConfig: NoteLockConfig | null) => {
    if (newConfig) {
      await SecureStorage.setItem(`note_lock_${noteId}`, newConfig);
      setLockConfig(newConfig);
    } else {
      await SecureStorage.removeItem(`note_lock_${noteId}`);
      setLockConfig(null);
    }
    setIsAuthenticated(!newConfig?.isLocked);
    onLockChange?.(newConfig?.isLocked ?? false);
  }, [noteId, onLockChange]);

  if (isLoading) {
    return <View style={styles.container} />;
  }

  if (!lockConfig?.isLocked || isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <NoteLockOverlay
      lockType={lockConfig.lockType}
      onAuthenticate={authenticate}
      onPinAuthenticate={handlePinAuthenticate}
      onShowSettings={() => setShowSettings(true)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export { NoteLockSettings };
export type { NoteLockConfig };