import { Heart, Clock, Tag } from 'lucide-react';

function RecipeCard({ recipe, isFavorite, onToggleFavorite }) {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5),0_4px_6px_-2px_rgba(0,0,0,0.25)] hover:border-primary/30 relative group">
      <div className="relative w-full pt-[75%] overflow-hidden">
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal} 
          loading="lazy" 
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <button 
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 z-10 hover:scale-110 ${
            isFavorite 
              ? 'bg-primary/15 border-primary/30 text-primary' 
              : 'bg-slate-900/60 backdrop-blur-sm border-white/10 text-white hover:bg-slate-900/90'
          }`}
          onClick={onToggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart fill={isFavorite ? "#ff4b4b" : "none"} color={isFavorite ? "#ff4b4b" : "currentColor"} />
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4 whitespace-nowrap overflow-hidden text-ellipsis">
          {recipe.strMeal}
        </h3>
        <div className="flex gap-3 mb-6">
          {recipe.strCategory && (
            <span className="flex items-center gap-1 text-sm text-slate-400 bg-white/5 px-2 py-1 rounded-md">
              <Tag size={14} /> {recipe.strCategory}
            </span>
          )}
          {recipe.strArea && (
            <span className="flex items-center gap-1 text-sm text-slate-400 bg-white/5 px-2 py-1 rounded-md">
              <Clock size={14} /> {recipe.strArea}
            </span>
          )}
        </div>
        <button className="w-full bg-transparent text-slate-100 border border-slate-700 py-3 rounded-lg font-medium transition-colors duration-300 hover:bg-primary hover:border-primary">
          View Details
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
