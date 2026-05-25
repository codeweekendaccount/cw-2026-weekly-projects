import React from 'react';
import { Trash2 } from 'lucide-react';

export default function NoteCard({ note, onDelete }) {
  const { id, title, content, createdAt } = note;
  const formattedDate = new Date(createdAt).toLocaleDateString();

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="group relative rounded-xl bg-slate-900/60 border border-slate-800 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5">
      <header className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-violet-300 leading-tight pr-6">
          {title}
        </h3>
        <button
          className="absolute top-4 right-4 p-1.5 rounded-md text-slate-600 opacity-0 group-hover:opacity-100 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer transition-all duration-200"
          onClick={handleDelete}
          aria-label="Delete note"
        >
          <Trash2 size={16} />
        </button>
      </header>
      <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-4">
        {content}
      </p>
      <footer className="pt-3 border-t border-slate-800/60">
        <span className="text-xs text-slate-500">{formattedDate}</span>
      </footer>
    </div>
  );
}
