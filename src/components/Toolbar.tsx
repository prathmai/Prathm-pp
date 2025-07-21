import React, { useState } from 'react';
import { ViewMode, FilterType, SortBy } from '../types/note';
import {
  Search,
  Plus,
  Grid3X3,
  List,
  LayoutList,
  Filter,
  SortAsc,
  SortDesc,
  Moon,
  Sun,
  Settings,
  Archive,
  Pin,
  FileText,
  X,
} from 'lucide-react';

interface ToolbarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortBy: SortBy;
  onSortByChange: (sortBy: SortBy) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onNewNote: () => void;
  noteCount: number;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  darkMode,
  onToggleDarkMode,
  onNewNote,
  noteCount,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const filterOptions = [
    { key: 'all' as FilterType, label: 'All Notes', icon: FileText, count: noteCount },
    { key: 'active' as FilterType, label: 'Active', icon: FileText },
    { key: 'pinned' as FilterType, label: 'Pinned', icon: Pin },
    { key: 'archived' as FilterType, label: 'Archived', icon: Archive },
  ];

  const viewModeOptions = [
    { key: 'grid' as ViewMode, label: 'Grid', icon: Grid3X3 },
    { key: 'list' as ViewMode, label: 'List', icon: List },
    { key: 'compact' as ViewMode, label: 'Compact', icon: LayoutList },
  ];

  const sortOptions = [
    { key: 'updatedAt' as SortBy, label: 'Last Modified' },
    { key: 'createdAt' as SortBy, label: 'Date Created' },
    { key: 'title' as SortBy, label: 'Title' },
    { key: 'pinned' as SortBy, label: 'Pinned First' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left section - Search and filters */}
        <div className="flex items-center gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="input-field pl-10 pr-10"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter buttons */}
          <div className="flex items-center gap-2">
            {filterOptions.map((option) => {
              const Icon = option.icon;
              const isActive = filter === option.key;
              
              return (
                <button
                  key={option.key}
                  onClick={() => onFilterChange(option.key)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{option.label}</span>
                  {option.count !== undefined && (
                    <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs">
                      {option.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right section - Controls */}
        <div className="flex items-center gap-2">
          {/* Sort controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Sort and view options"
            >
              <Settings className="w-4 h-4" />
            </button>

            {showFilters && (
              <div className="absolute right-6 top-16 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 p-4">
                <div className="space-y-4">
                  {/* Sort by */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sort by
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => onSortByChange(e.target.value as SortBy)}
                      className="input-field text-sm"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.key} value={option.key}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort order */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Order
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onSortOrderChange('desc')}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          sortOrder === 'desc'
                            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <SortDesc className="w-4 h-4" />
                        Newest First
                      </button>
                      <button
                        onClick={() => onSortOrderChange('asc')}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          sortOrder === 'asc'
                            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <SortAsc className="w-4 h-4" />
                        Oldest First
                      </button>
                    </div>
                  </div>

                  {/* View mode */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      View
                    </label>
                    <div className="flex gap-1">
                      {viewModeOptions.map((option) => {
                        const Icon = option.icon;
                        const isActive = viewMode === option.key;
                        
                        return (
                          <button
                            key={option.key}
                            onClick={() => onViewModeChange(option.key)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                              isActive
                                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            title={option.label}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* New note button */}
          <button
            onClick={onNewNote}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Note</span>
          </button>
        </div>
      </div>

      {/* Click overlay to close filters */}
      {showFilters && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};