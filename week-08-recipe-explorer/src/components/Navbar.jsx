import { Utensils, Heart } from 'lucide-react';
import { NavLink, Link } from 'react-router';
import { useFavorites } from '../context/FavoritesContext';

function Navbar() {
  const { favorites } = useFavorites();
  const favoritesCount = favorites.length;

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-slate-800/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
      <Link 
        to="/"
        className="flex items-center gap-3 cursor-pointer text-primary hover:scale-105 transition-transform duration-300"
      >
        <Utensils className="w-7 h-7" />
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Recipe Explorer</h1>
      </Link>
      <div className="flex gap-4">
        <NavLink 
          to="/"
          className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
            isActive 
              ? 'text-slate-100 bg-white/10' 
              : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
          }`}
        >
          Home
        </NavLink>
        <NavLink 
          to="/favorites"
          className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
            isActive 
              ? 'text-primary bg-primary/15' 
              : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
          }`}
        >
          <Heart 
            className="w-5 h-5" 
            fill={favoritesCount > 0 ? "currentColor" : "none"} 
          />
          <span>Favorites ({favoritesCount})</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
