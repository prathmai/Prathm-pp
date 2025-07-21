import { Note, AppSettings } from '../types/note';

const NOTES_KEY = 'notes-app-notes';
const SETTINGS_KEY = 'notes-app-settings';

export const defaultSettings: AppSettings = {
  darkMode: false,
  viewMode: 'grid',
  sortBy: 'updatedAt',
  sortOrder: 'desc',
};

export const loadNotes = (): Note[] => {
  try {
    const stored = localStorage.getItem(NOTES_KEY);
    if (!stored) return [];
    
    const notes = JSON.parse(stored);
    return notes.map((note: any) => ({
      ...note,
      createdAt: new Date(note.createdAt),
      updatedAt: new Date(note.updatedAt),
    }));
  } catch (error) {
    console.error('Error loading notes:', error);
    return [];
  }
};

export const saveNotes = (notes: Note[]): void => {
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving notes:', error);
  }
};

export const loadSettings = (): AppSettings => {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (!stored) return defaultSettings;
    
    return { ...defaultSettings, ...JSON.parse(stored) };
  } catch (error) {
    console.error('Error loading settings:', error);
    return defaultSettings;
  }
};

export const saveSettings = (settings: AppSettings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};