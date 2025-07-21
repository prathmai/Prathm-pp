import { useState, useEffect } from 'react';
import { AppSettings } from '../types/note';
import { loadSettings, saveSettings, defaultSettings } from '../utils/storage';

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  // Load settings on mount
  useEffect(() => {
    const loadedSettings = loadSettings();
    setSettings(loadedSettings);
    
    // Apply dark mode to document
    if (loadedSettings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Save settings whenever they change
  useEffect(() => {
    saveSettings(settings);
    
    // Apply dark mode to document
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const toggleDarkMode = () => {
    setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const setViewMode = (viewMode: AppSettings['viewMode']) => {
    setSettings(prev => ({ ...prev, viewMode }));
  };

  const setSortBy = (sortBy: AppSettings['sortBy']) => {
    setSettings(prev => ({ ...prev, sortBy }));
  };

  const setSortOrder = (sortOrder: AppSettings['sortOrder']) => {
    setSettings(prev => ({ ...prev, sortOrder }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return {
    settings,
    updateSettings,
    toggleDarkMode,
    setViewMode,
    setSortBy,
    setSortOrder,
    resetSettings,
  };
};