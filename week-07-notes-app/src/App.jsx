import { loadNotes, saveNotes } from './utils/storage';
import Header from './components/Header.jsx';
import StatsBar from './components/StatsBar.jsx';
import NoteForm from './components/NoteForm.jsx';
import NotesList from './components/NotesList.jsx';
import EmptyState from './components/EmptyState.jsx';
import React from 'react';

export default function App() {
  const [notes, setNotes] = React.useState(() => loadNotes());
  const [searchTerm, setSearchTerm] = React.useState('');
  const isFirstRender = React.useRef(true);

  // Save notes whenever they change (skip initial render)
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    saveNotes(notes);
  }, [notes]);

  const addNote = (note) => {
    setNotes(prev => [{ ...note, id: Date.now(), createdAt: new Date().toISOString() }, ...prev]);
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const notesTodayCount = notes.filter(n => {
    const today = new Date();
    const created = new Date(n.createdAt);
    return created.toDateString() === today.toDateString();
  }).length;

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <Header setSearchTerm={setSearchTerm} />
      <StatsBar total={notes.length} today={notesTodayCount} />
      <NoteForm onAdd={addNote} />
      {filteredNotes.length === 0 ? (
        <EmptyState />
      ) : (
        <NotesList notes={filteredNotes} onDelete={deleteNote} />
      )}
    </div>
  );
}
