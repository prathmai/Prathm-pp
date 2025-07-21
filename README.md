# Notes App

A modern, feature-rich note-taking application built with React, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- ✅ **Create Notes** - Add new notes with title and content
- ✅ **Edit Notes** - Modify existing notes with real-time updates
- ✅ **Delete Notes** - Remove notes with confirmation
- ✅ **Update Notes** - Save changes automatically

### Advanced Features
- 📌 **Pin Notes** - Keep important notes at the top
- 🗂️ **Archive & Unarchive** - Organize notes by moving them to archive
- 🔍 **Search** - Find notes by title, content, or tags
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

### View Options
- 🔲 **Grid View** - Visual card layout for browsing
- 📄 **List View** - Detailed list with more content preview
- 📋 **Compact View** - Dense layout for quick scanning

### Organization
- 🔍 **Filter by Status** - View all, active, pinned, or archived notes
- 🔤 **Sort Options** - Sort by date created, last modified, title, or pinned status
- ⬆️⬇️ **Sort Order** - Ascending or descending order

## Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icons
- **date-fns** - Date formatting utilities

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Usage

### Creating Notes
1. Click the "New Note" button in the toolbar
2. Enter a title and content for your note
3. Press Ctrl+S to save or click the Save button

### Organizing Notes
- **Pin important notes**: Click the pin icon to keep notes at the top
- **Archive old notes**: Use the archive button to move notes out of the main view
- **Search**: Use the search bar to find specific notes
- **Filter**: Click filter buttons to view notes by category

### Keyboard Shortcuts
- `Ctrl+S` - Save note
- `Esc` - Close editor
- `Ctrl+N` - New note (when implemented)

### View Modes
- **Grid View**: Best for visual browsing with note previews
- **List View**: Detailed view with more content visible
- **Compact View**: Maximum density for quick scanning

## Data Storage

Notes are stored locally in your browser's localStorage. Your data persists between sessions but stays on your device for privacy.

## Features in Detail

### Dark Mode
Toggle between light and dark themes using the moon/sun icon in the toolbar. Your preference is automatically saved.

### Pinning System
Pinned notes always appear at the top of your list, regardless of sort order. Perfect for keeping important information accessible.

### Archive System
Archive notes you want to keep but don't need to see regularly. Archived notes:
- Don't appear in the main "All Notes" or "Active" views
- Can be accessed via the "Archived" filter
- Can be unarchived to return to active status

### Search Functionality
Search across:
- Note titles
- Note content
- Tags (when added)

### Smart Sorting
- **Pinned notes always appear first** regardless of sort criteria
- Multiple sort options: date created, last modified, title, pinned status
- Ascending or descending order for each sort type

## Browser Support

This app works in all modern browsers that support:
- ES2020 features
- CSS Grid and Flexbox
- localStorage API

## Development

### Project Structure
```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
├── App.tsx        # Main application component
└── main.tsx       # Application entry point
```

### Key Components
- `App.tsx` - Main application logic and state management
- `NoteEditor.tsx` - Modal for creating/editing notes
- `NoteCard.tsx` - Individual note display component
- `Toolbar.tsx` - Search, filters, and controls
- `NotesList.tsx` - Grid/list layout for notes

### Custom Hooks
- `useNotes()` - Note CRUD operations and state
- `useSettings()` - App settings and preferences

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for any purpose.

## Future Enhancements

Potential features for future versions:
- [ ] Tags and categories
- [ ] Rich text editing
- [ ] Export to various formats
- [ ] Cloud synchronization
- [ ] Collaboration features
- [ ] Note templates
- [ ] Advanced search with filters
- [ ] Keyboard shortcuts
- [ ] Note linking
- [ ] Markdown support