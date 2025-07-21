import React, { useState, useEffect, useRef } from 'react';
import { Note } from '../types/note';
import { X, Save, Pin, Archive, ArchiveRestore, Trash2 } from 'lucide-react';

interface NoteEditorProps {
  note?: Note;
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
  onUpdate?: (id: string, updates: Partial<Note>) => void;
  onDelete?: (id: string) => void;
  onTogglePin?: (id: string) => void;
  onToggleArchive?: (id: string) => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
  note,
  isOpen,
  onClose,
  onSave,
  onUpdate,
  onDelete,
  onTogglePin,
  onToggleArchive,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Reset form when note changes or editor opens
  useEffect(() => {
    if (isOpen) {
      setTitle(note?.title || '');
      setContent(note?.content || '');
      
      // Focus title input for new notes, content for existing notes
      setTimeout(() => {
        if (!note) {
          titleInputRef.current?.focus();
        } else {
          contentTextareaRef.current?.focus();
          contentTextareaRef.current?.setSelectionRange(
            contentTextareaRef.current.value.length,
            contentTextareaRef.current.value.length
          );
        }
      }, 100);
    }
  }, [isOpen, note]);

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    const textarea = contentTextareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [content]);

  const handleSave = async () => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle && !trimmedContent) {
      onClose();
      return;
    }

    setIsSaving(true);

    try {
      if (note && onUpdate) {
        // Update existing note
        onUpdate(note.id, {
          title: trimmedTitle || 'Untitled Note',
          content: trimmedContent,
        });
      } else {
        // Create new note
        onSave(trimmedTitle || 'Untitled Note', trimmedContent);
      }
      
      onClose();
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    const hasChanges = note 
      ? (title !== note.title || content !== note.content)
      : (title.trim() || content.trim());

    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Do you want to save before closing?')) {
        handleSave();
        return;
      }
    }
    
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    } else if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSave();
    }
  };

  const handlePin = () => {
    if (note && onTogglePin) {
      onTogglePin(note.id);
    }
  };

  const handleArchive = () => {
    if (note && onToggleArchive) {
      onToggleArchive(note.id);
    }
  };

  const handleDelete = () => {
    if (note && onDelete && window.confirm('Are you sure you want to delete this note?')) {
      onDelete(note.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col animate-slide-up"
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {note ? 'Edit Note' : 'New Note'}
          </h2>
          
          <div className="flex items-center gap-2">
            {note && (
              <>
                <button
                  onClick={handlePin}
                  className={`p-2 rounded-lg transition-colors ${
                    note.isPinned
                      ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  title={note.isPinned ? 'Unpin note' : 'Pin note'}
                >
                  <Pin className="w-4 h-4" />
                </button>
                
                <button
                  onClick={handleArchive}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  title={note.isArchived ? 'Unarchive note' : 'Archive note'}
                >
                  {note.isArchived ? (
                    <ArchiveRestore className="w-4 h-4" />
                  ) : (
                    <Archive className="w-4 h-4" />
                  )}
                </button>
                
                <button
                  onClick={handleDelete}
                  className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
                  title="Delete note"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />
              </>
            )}
            
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn-primary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-4">
            <input
              ref={titleInputRef}
              type="text"
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field text-xl font-semibold"
            />
            
            <textarea
              ref={contentTextareaRef}
              placeholder="Start writing your note..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                adjustTextareaHeight();
              }}
              className="textarea-field min-h-[400px] text-lg leading-relaxed"
              style={{ resize: 'none' }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div>
              {note && (
                <span>
                  Last updated: {note.updatedAt.toLocaleDateString()} at {note.updatedAt.toLocaleTimeString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span>Ctrl+S to save • Esc to close</span>
              <span>{content.length} characters</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};