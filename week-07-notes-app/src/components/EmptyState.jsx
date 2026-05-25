import React from 'react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-7xl mb-6 animate-bounce">📋</div>
      <h2 className="text-2xl font-bold text-slate-300 mb-2">No notes yet</h2>
      <p className="text-slate-500 text-sm max-w-xs">
        Start creating notes to see them here. Your notes are saved automatically.
      </p>
    </div>
  );
}
