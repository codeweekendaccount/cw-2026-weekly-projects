import { Utensils, Heart } from 'lucide-react';

function Navbar({ navigate, currentPage, favoritesCount }) {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-slate-800/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
      <div 
        className="flex items-center gap-3 cursor-pointer text-primary hover:scale-105 transition-transform duration-300"
        onClick={() => navigate('home')}
      >
        <Utensils className="w-7 h-7" />
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Recipe Explorer</h1>
      </div>
      <div className="flex gap-4">
        <button 
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
            currentPage === 'home' 
              ? 'text-slate-100 bg-white/10' 
              : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
          }`}
          onClick={() => navigate('home')}
        >
          Home
        </button>
        <button 
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
            currentPage === 'favorites' 
              ? 'text-primary bg-primary/15' 
              : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
          }`}
          onClick={() => navigate('favorites')}
        >
          <Heart 
            className="w-5 h-5" 
            fill={favoritesCount > 0 ? "currentColor" : "none"} 
          />
          <span>Favorites ({favoritesCount})</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
