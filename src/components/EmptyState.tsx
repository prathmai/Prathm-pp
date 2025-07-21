import React from 'react';
import { FileText, Search, Archive, Pin } from 'lucide-react';
import { FilterType } from '../types/note';

interface EmptyStateProps {
  filter: FilterType;
  searchTerm: string;
  onNewNote: () => void;
  onClearSearch?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  filter,
  searchTerm,
  onNewNote,
  onClearSearch,
}) => {
  const getEmptyStateContent = () => {
    if (searchTerm) {
      return {
        icon: Search,
        title: 'No notes found',
        description: `No notes match your search for "${searchTerm}". Try searching with different keywords.`,
        action: {
          label: 'Clear Search',
          onClick: onClearSearch,
        },
      };
    }

    switch (filter) {
      case 'pinned':
        return {
          icon: Pin,
          title: 'No pinned notes',
          description: 'Pin your important notes to keep them easily accessible at the top of your list.',
          action: {
            label: 'Create New Note',
            onClick: onNewNote,
          },
        };
      
      case 'archived':
        return {
          icon: Archive,
          title: 'No archived notes',
          description: 'Archive notes you want to keep but don\'t need to see regularly. They\'ll be stored here.',
          action: {
            label: 'Create New Note',
            onClick: onNewNote,
          },
        };
      
      case 'active':
        return {
          icon: FileText,
          title: 'No active notes',
          description: 'Your active notes will appear here. Start by creating your first note.',
          action: {
            label: 'Create First Note',
            onClick: onNewNote,
          },
        };
      
      default:
        return {
          icon: FileText,
          title: 'Welcome to Notes',
          description: 'Start organizing your thoughts and ideas. Create your first note to get started.',
          action: {
            label: 'Create First Note',
            onClick: onNewNote,
          },
        };
    }
  };

  const { icon: Icon, title, description, action } = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-6 py-12 text-center">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      {action && (
        <button
          onClick={action.onClick}
          className="btn-primary"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};