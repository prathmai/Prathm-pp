import React from 'react';
import { Note, ViewMode } from '../types/note';
import { NoteCard } from './NoteCard';

interface NotesListProps {
  notes: Note[];
  viewMode: ViewMode;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export const NotesList: React.FC<NotesListProps> = ({
  notes,
  viewMode,
  onEdit,
  onDelete,
  onTogglePin,
  onToggleArchive,
  onDuplicate,
}) => {
  const getGridClasses = () => {
    switch (viewMode) {
      case 'grid':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';
      case 'list':
        return 'space-y-2';
      case 'compact':
        return 'space-y-1';
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';
    }
  };

  return (
    <div className={`px-6 py-4 ${getGridClasses()}`}>
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          viewMode={viewMode}
          onEdit={onEdit}
          onDelete={onDelete}
          onTogglePin={onTogglePin}
          onToggleArchive={onToggleArchive}
          onDuplicate={onDuplicate}
        />
      ))}
    </div>
  );
};