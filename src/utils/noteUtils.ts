import { Note, SortBy, FilterType } from '../types/note';

export const sortNotes = (notes: Note[], sortBy: SortBy, sortOrder: 'asc' | 'desc'): Note[] => {
  const sorted = [...notes].sort((a, b) => {
    // Always prioritize pinned notes first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    let comparison = 0;
    
    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'createdAt':
        comparison = a.createdAt.getTime() - b.createdAt.getTime();
        break;
      case 'updatedAt':
        comparison = a.updatedAt.getTime() - b.updatedAt.getTime();
        break;
      case 'pinned':
        comparison = Number(b.isPinned) - Number(a.isPinned);
        break;
      default:
        comparison = b.updatedAt.getTime() - a.updatedAt.getTime();
    }
    
    return sortOrder === 'desc' ? -comparison : comparison;
  });
  
  return sorted;
};

export const filterNotes = (notes: Note[], filter: FilterType): Note[] => {
  switch (filter) {
    case 'pinned':
      return notes.filter(note => note.isPinned && !note.isArchived);
    case 'archived':
      return notes.filter(note => note.isArchived);
    case 'active':
      return notes.filter(note => !note.isArchived);
    default:
      return notes;
  }
};

export const searchNotes = (notes: Note[], searchTerm: string): Note[] => {
  if (!searchTerm.trim()) return notes;
  
  const term = searchTerm.toLowerCase();
  return notes.filter(note => 
    note.title.toLowerCase().includes(term) ||
    note.content.toLowerCase().includes(term) ||
    (note.tags && note.tags.some(tag => tag.toLowerCase().includes(term)))
  );
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getPreviewText = (content: string, maxLength: number = 100): string => {
  const plainText = content.replace(/\n/g, ' ').trim();
  return truncateText(plainText, maxLength);
};