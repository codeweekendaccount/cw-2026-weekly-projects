import { CATEGORIES } from "../data";

export default function CategoryBar({ selected, onSelect }) {
  return (
    <div className="flex gap-3 py-3 overflow-x-auto sticky top-0 bg-neutral-950 z-40 scrollbar-hide">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selected === cat ? "bg-white text-black" : "bg-neutral-800 text-white hover:bg-neutral-700"}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
