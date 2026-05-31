import RecipeCard from '../components/RecipeCard';

function Favorites({ favorites, removeFavorite }) {
  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <h2 className="text-4xl font-bold mb-2">Your Favorite Recipes</h2>
        <p className="text-slate-400">A collection of your most loved meals.</p>
      </header>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              isFavorite={true}
              onToggleFavorite={() => removeFavorite(recipe.idMeal)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-16 text-slate-400 text-lg bg-card rounded-2xl border border-dashed border-slate-700">
          <p>You haven't saved any favorites yet.</p>
          <p>Go to the Home page to discover new recipes!</p>
        </div>
      )}
    </div>
  );
}

export default Favorites;
