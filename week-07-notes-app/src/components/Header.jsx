import React from 'react';

export default function Header({ setSearchTerm }) {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header className="flex items-center justify-between py-4 mb-6 border-b border-slate-800">
      <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-400 to-rose-400 bg-clip-text text-transparent">
        📝 NoteFlow
      </h1>
      <input
        type="text"
        placeholder="Search notes..."
        className="w-40 sm:w-64 px-4 py-2 rounded-lg bg-slate-800/60 border border-slate-700 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all duration-300"
        onChange={handleChange}
        aria-label="Search notes"
      />
    </header>
  );
}
