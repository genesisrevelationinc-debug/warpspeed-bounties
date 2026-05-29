import React, { createContext, useContext, useState, useEffect } from 'react';
import { BiometryType, startBiometryAuth } from '../services/biometryService';
import { StorageService } from '../services/storageService';
import { Note } from '../types/note';

interface NoteLockContextType {
  lockedNotes: string[];
  isNoteLocked: (noteId: string) => boolean;
  lockNote: (noteId: string, pin?: string) => Promise<boolean>;
  unlockNote: (noteId: string) => Promise<boolean>;
  removeNoteLock: (noteId: string) => Promise<boolean>;
  isAuthenticated: boolean;
  authenticateUser: () => Promise<boolean>;
  biometryType: BiometryType | null;
}

const NoteLockContext = createContext<NoteLockContextType | undefined>(undefined);

export const NoteLockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lockedNotes, setLockedNotes] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [biometryType, setBiometryType] = useState<BiometryType | null>(null);
  const [authTimeout, setAuthTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    initializeLockManager();
    return () => {
      if (authTimeout) clearTimeout(authTimeout);
    };
  }, []);

  const initializeLockManager = async () => {
    try {
      const savedLockedNotes = await StorageService.getItem('lockedNotes');
      if (savedLockedNotes) {
        setLockedNotes(JSON.parse(savedLockedNotes));
      }
      
      const biometry = await startBiometryAuth.getSupportedBiometryType();
      setBiometryType(biometry);
    } catch (error) {
      console.error('Failed to initialize lock manager:', error);
    }
  };

  const isNoteLocked = (noteId: string): boolean => {
    return lockedNotes.includes(noteId);
  };

  const lockNote = async (noteId: string, pin?: string): Promise<boolean> => {
    try {
      // Store PIN if provided
      if (pin) {
        await StorageService.setItem(`note_pin_${noteId}`, pin);
      }
      
      const newLockedNotes = [...lockedNotes, noteId];
      setLockedNotes(newLockedNotes);
      await StorageService.setItem('lockedNotes', JSON.stringify(newLockedNotes));
      return true;
    } catch (error) {
      console.error('Failed to lock note:', error);
      return false;
    }
  };

  const unlockNote = async (noteId: string): Promise<boolean> => {
    try {
      const success = await authenticateUser();
      if (success) {
        // Reset authentication timeout
        if (authTimeout) clearTimeout(authTimeout);
        const timeout = setTimeout(() => {
          setIsAuthenticated(false);
        }, 5 * 60 * 1000); // 5 minutes timeout
        setAuthTimeout(timeout);
      }
      return success;
    } catch (error) {
      console.error('Failed to unlock note:', error);
      return false;
    }
  };

  const removeNoteLock = async (noteId: string): Promise<boolean> => {
    try {
      const success = await authenticateUser();
      if (success) {
        const newLockedNotes = lockedNotes.filter(id => id !== noteId);
        setLockedNotes(newLockedNotes);
        await StorageService.removeItem(`note_pin_${noteId}`);
        await StorageService.setItem('lockedNotes', JSON.stringify(newLockedNotes));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to remove note lock:', error);
      return false;
    }
  };

  const authenticateUser = async (): Promise<boolean> => {
    try {
      const success = await startBiometryAuth.authenticate();
      if (success) {
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Authentication failed:', error);
      return false;
    }
  };

  const value = {
    lockedNotes,
    isNoteLocked,
    lockNote,
    unlockNote,
    removeNoteLock,
    isAuthenticated,
    authenticateUser,
    biometryType
  };

  return (
    <NoteLockContext.Provider value={value}>
      {children}
    </NoteLockContext.Provider>
  );
};

export const useNoteLock = (): NoteLockContextType => {
  const context = useContext(NoteLockContext);
  if (context === undefined) {
    throw new Error('useNoteLock must be used within a NoteLockProvider');
  }
  return context;
};