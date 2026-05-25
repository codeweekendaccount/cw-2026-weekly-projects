import React from 'react';

export default function StatsBar({ total, today }) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1 rounded-xl bg-gradient-to-br from-violet-600/20 to-violet-500/5 border border-violet-500/20 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10">
        <span className="block text-3xl font-bold text-violet-400">{total}</span>
        <span className="text-sm text-slate-400 mt-1">Total Notes</span>
      </div>
      <div className="flex-1 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/5 border border-emerald-500/20 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10">
        <span className="block text-3xl font-bold text-emerald-400">{today}</span>
        <span className="text-sm text-slate-400 mt-1">Today</span>
      </div>
    </div>
  );
}
