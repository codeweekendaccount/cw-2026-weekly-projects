import React from 'react';
import NoteCard from './NoteCard.jsx';

export default function NotesList({ notes, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map(note => (
        <NoteCard key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
}
