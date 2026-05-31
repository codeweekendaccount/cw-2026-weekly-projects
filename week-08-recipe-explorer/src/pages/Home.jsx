import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { searchRecipes } from '../services/mealApi';

function Home({ addFavorite, removeFavorite, isFavorite }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('chicken');

  useEffect(() => {
    fetchRecipes(searchQuery);
  }, []);

  const fetchRecipes = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await searchRecipes(query);
      setRecipes(data || []);
    } catch (error) {
      console.error('Failed to fetch recipes', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchRecipes(query);
  };

  return (
    <div className="animate-fade-in">
      <header className="text-center mb-12 py-12">
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-br from-white to-indigo-300 bg-clip-text text-transparent">
          Discover Delicious Recipes
        </h2>
        <p className="text-slate-400 text-xl mb-10">
          Find your next favorite meal from our vast collection.
        </p>
        <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
      </header>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center p-16 text-slate-400">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
          <p>Cooking up some results...</p>
        </div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              isFavorite={isFavorite(recipe.idMeal)}
              onToggleFavorite={() => 
                isFavorite(recipe.idMeal) 
                  ? removeFavorite(recipe.idMeal) 
                  : addFavorite(recipe)
              }
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-16 text-slate-400 text-lg bg-card rounded-2xl border border-dashed border-slate-700">
          <p>No recipes found. Try searching for something else!</p>
        </div>
      )}
    </div>
  );
}

export default Home;
