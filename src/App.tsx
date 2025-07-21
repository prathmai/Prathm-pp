import React, { useState, useMemo } from 'react';
import { Note, FilterType } from './types/note';
import { useNotes } from './hooks/useNotes';
import { useSettings } from './hooks/useSettings';
import { sortNotes, filterNotes, searchNotes } from './utils/noteUtils';
import { Toolbar } from './components/Toolbar';
import { NotesList } from './components/NotesList';
import { NoteEditor } from './components/NoteEditor';
import { EmptyState } from './components/EmptyState';

function App() {
  // Hooks
  const {
    notes,
    loading,
    createNote,
    updateNote,
    deleteNote,
    togglePin,
    toggleArchive,
    duplicateNote,
  } = useNotes();

  const {
    settings,
    toggleDarkMode,
    setViewMode,
    setSortBy,
    setSortOrder,
  } = useSettings();

  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Process notes based on current filters and search
  const processedNotes = useMemo(() => {
    let filtered = filterNotes(notes, filter);
    
    if (searchTerm) {
      filtered = searchNotes(filtered, searchTerm);
    }
    
    return sortNotes(filtered, settings.sortBy, settings.sortOrder);
  }, [notes, filter, searchTerm, settings.sortBy, settings.sortOrder]);

  // Event handlers
  const handleNewNote = () => {
    setEditingNote(null);
    setIsEditorOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingNote(null);
  };

  const handleSaveNote = (title: string, content: string) => {
    createNote(title, content);
  };

  const handleUpdateNote = (id: string, updates: Partial<Note>) => {
    updateNote(id, updates);
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
  };

  const handleTogglePin = (id: string) => {
    togglePin(id);
  };

  const handleToggleArchive = (id: string) => {
    toggleArchive(id);
  };

  const handleDuplicateNote = (id: string) => {
    duplicateNote(id);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Notes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            {filter !== 'all' && ` • ${filter}`}
            {searchTerm && ` • searching for "${searchTerm}"`}
          </p>
        </div>
      </header>

      {/* Toolbar */}
      <Toolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filter={filter}
        onFilterChange={setFilter}
        viewMode={settings.viewMode}
        onViewModeChange={setViewMode}
        sortBy={settings.sortBy}
        onSortByChange={setSortBy}
        sortOrder={settings.sortOrder}
        onSortOrderChange={setSortOrder}
        darkMode={settings.darkMode}
        onToggleDarkMode={toggleDarkMode}
        onNewNote={handleNewNote}
        noteCount={notes.length}
      />

      {/* Main content */}
      <main className="min-h-[calc(100vh-200px)]">
        {processedNotes.length > 0 ? (
          <NotesList
            notes={processedNotes}
            viewMode={settings.viewMode}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
            onTogglePin={handleTogglePin}
            onToggleArchive={handleToggleArchive}
            onDuplicate={handleDuplicateNote}
          />
        ) : (
          <EmptyState
            filter={filter}
            searchTerm={searchTerm}
            onNewNote={handleNewNote}
            onClearSearch={searchTerm ? handleClearSearch : undefined}
          />
        )}
      </main>

      {/* Note Editor Modal */}
      <NoteEditor
        note={editingNote || undefined}
        isOpen={isEditorOpen}
        onClose={handleCloseEditor}
        onSave={handleSaveNote}
        onUpdate={handleUpdateNote}
        onDelete={handleDeleteNote}
        onTogglePin={handleTogglePin}
        onToggleArchive={handleToggleArchive}
      />
    </div>
  );
}

export default App;