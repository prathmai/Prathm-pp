import { useState, useEffect, useCallback } from 'react';
import { Note } from '../types/note';
import { loadNotes, saveNotes, generateId } from '../utils/storage';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // Load notes on mount
  useEffect(() => {
    const loadedNotes = loadNotes();
    setNotes(loadedNotes);
    setLoading(false);
  }, []);

  // Save notes whenever notes change
  useEffect(() => {
    if (!loading) {
      saveNotes(notes);
    }
  }, [notes, loading]);

  const createNote = useCallback((title: string, content: string): Note => {
    const newNote: Note = {
      id: generateId(),
      title: title.trim() || 'Untitled Note',
      content: content.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false,
      isArchived: false,
    };

    setNotes(prev => [newNote, ...prev]);
    return newNote;
  }, []);

  const updateNote = useCallback((id: string, updates: Partial<Note>): void => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, ...updates, updatedAt: new Date() }
        : note
    ));
  }, []);

  const deleteNote = useCallback((id: string): void => {
    setNotes(prev => prev.filter(note => note.id !== id));
  }, []);

  const togglePin = useCallback((id: string): void => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, isPinned: !note.isPinned, updatedAt: new Date() }
        : note
    ));
  }, []);

  const toggleArchive = useCallback((id: string): void => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, isArchived: !note.isArchived, updatedAt: new Date() }
        : note
    ));
  }, []);

  const duplicateNote = useCallback((id: string): Note | null => {
    const note = notes.find(n => n.id === id);
    if (!note) return null;

    const duplicatedNote: Note = {
      ...note,
      id: generateId(),
      title: `${note.title} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false,
    };

    setNotes(prev => [duplicatedNote, ...prev]);
    return duplicatedNote;
  }, [notes]);

  const getNoteById = useCallback((id: string): Note | undefined => {
    return notes.find(note => note.id === id);
  }, [notes]);

  return {
    notes,
    loading,
    createNote,
    updateNote,
    deleteNote,
    togglePin,
    toggleArchive,
    duplicateNote,
    getNoteById,
  };
};