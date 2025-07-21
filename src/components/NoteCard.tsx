import React from 'react';
import { Note, ViewMode } from '../types/note';
import { getPreviewText } from '../utils/noteUtils';
import { format } from 'date-fns';
import { 
  Pin, 
  Archive, 
  ArchiveRestore, 
  Edit2, 
  Trash2, 
  Copy,
  MoreVertical
} from 'lucide-react';

interface NoteCardProps {
  note: Note;
  viewMode: ViewMode;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  viewMode,
  onEdit,
  onDelete,
  onTogglePin,
  onToggleArchive,
  onDuplicate,
}) => {
  const [showActions, setShowActions] = React.useState(false);

  const handleEdit = () => {
    onEdit(note);
    setShowActions(false);
  };

  const handlePin = () => {
    onTogglePin(note.id);
    setShowActions(false);
  };

  const handleArchive = () => {
    onToggleArchive(note.id);
    setShowActions(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDelete(note.id);
    }
    setShowActions(false);
  };

  const handleDuplicate = () => {
    onDuplicate(note.id);
    setShowActions(false);
  };

  const cardClass = `note-card ${note.isPinned ? 'pinned' : ''} ${
    viewMode === 'list' 
      ? 'p-4 mb-2' 
      : viewMode === 'compact'
      ? 'p-3 mb-2'
      : 'p-4 mb-4'
  } relative group cursor-pointer animate-fade-in`;

  const isListView = viewMode === 'list';
  const isCompactView = viewMode === 'compact';

  return (
    <div className={cardClass} onClick={handleEdit}>
      {/* Pin indicator */}
      {note.isPinned && (
        <div className="absolute top-2 right-2">
          <Pin className="w-4 h-4 text-yellow-500 fill-current" />
        </div>
      )}

      {/* Actions menu */}
      <div className="absolute top-2 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowActions(!showActions);
          }}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {showActions && (
          <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
              className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePin();
              }}
              className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
            >
              <Pin className="w-4 h-4" />
              {note.isPinned ? 'Unpin' : 'Pin'}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleArchive();
              }}
              className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
            >
              {note.isArchived ? (
                <>
                  <ArchiveRestore className="w-4 h-4" />
                  Unarchive
                </>
              ) : (
                <>
                  <Archive className="w-4 h-4" />
                  Archive
                </>
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDuplicate();
              }}
              className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
            >
              <Copy className="w-4 h-4" />
              Duplicate
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Note content */}
      <div className={isListView ? 'flex items-start gap-4' : ''}>
        <div className={isListView ? 'flex-1' : ''}>
          <h3 className={`font-semibold text-gray-900 dark:text-gray-100 mb-2 pr-8 ${
            isCompactView ? 'text-sm' : 'text-lg'
          }`}>
            {note.title}
          </h3>
          
          {!isCompactView && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed">
              {getPreviewText(note.content, isListView ? 200 : 120)}
            </p>
          )}
          
          <div className={`flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 ${
            isListView ? 'mt-2' : ''
          }`}>
            <span>
              {format(note.updatedAt, 'MMM d, yyyy')}
            </span>
            <div className="flex items-center gap-2">
              {note.isArchived && (
                <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">
                  Archived
                </span>
              )}
              {note.isPinned && !isCompactView && (
                <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-xs">
                  Pinned
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click overlay */}
      <div 
        className="absolute inset-0" 
        onClick={handleEdit}
        onBlur={() => setShowActions(false)}
      />
    </div>
  );
};