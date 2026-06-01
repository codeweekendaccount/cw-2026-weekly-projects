import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

function SearchBar({ onSearch, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
      <div className="relative flex items-center bg-card rounded-full p-2 border border-slate-700 shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 focus-within:border-primary focus-within:shadow-[0_4px_25px_rgba(255,107,107,0.2)]">
        <Search className="absolute left-5 text-slate-400" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a recipe (e.g., pasta, chicken)..."
          className="flex-1 bg-transparent border-none py-3 pl-12 pr-4 text-lg text-slate-100 outline-none placeholder:text-slate-400"
        />
        <button 
          type="submit" 
          className="bg-primary hover:bg-primary-hover text-white py-3 px-6 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
