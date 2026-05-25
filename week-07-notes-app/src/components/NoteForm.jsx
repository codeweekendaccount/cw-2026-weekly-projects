import React, { useState } from 'react';

export default function NoteForm({ onAdd }) {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content } = formData;
    if (!title.trim() || !content.trim()) {
      setError('Both title and content are required.');
      return;
    }
    onAdd(formData);
    setFormData({ title: '', content: '' });
  };

  return (
    <form
      className="flex flex-col gap-3 rounded-xl bg-slate-900/70 border border-slate-800 p-5 mb-8 backdrop-blur-md"
      onSubmit={handleSubmit}
    >
      {error && (
        <p className="text-rose-400 text-sm font-medium animate-pulse" role="alert">
          {error}
        </p>
      )}
      <input
        type="text"
        name="title"
        placeholder="Note title"
        value={formData.title}
        onChange={handleChange}
        className="w-full px-4 py-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all duration-200"
        aria-label="Note title"
      />
      <textarea
        name="content"
        placeholder="Note content"
        value={formData.content}
        onChange={handleChange}
        className="w-full px-4 py-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 placeholder-slate-500 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all duration-200"
        aria-label="Note content"
        rows={4}
      />
      <button
        type="submit"
        className="self-end px-6 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-violet-500 text-white font-semibold text-sm cursor-pointer hover:from-violet-500 hover:to-rose-500 hover:shadow-lg hover:shadow-violet-500/25 active:scale-95 transition-all duration-300"
      >
        Add Note
      </button>
    </form>
  );
}
