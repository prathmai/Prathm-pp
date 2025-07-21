export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
  isArchived: boolean;
  tags?: string[];
  color?: string;
}

export type ViewMode = 'grid' | 'list' | 'compact';

export type SortBy = 'createdAt' | 'updatedAt' | 'title' | 'pinned';

export type FilterType = 'all' | 'pinned' | 'archived' | 'active';

export interface AppSettings {
  darkMode: boolean;
  viewMode: ViewMode;
  sortBy: SortBy;
  sortOrder: 'asc' | 'desc';
}