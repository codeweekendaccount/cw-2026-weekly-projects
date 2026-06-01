import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { searchRecipes } from '../services/mealApi';
import { useSearchParams } from 'react-router';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || 'chicken';
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // The ignore variable is used to prevent a common React bug called a "race condition",
    // which happens when network requests resolve out of order.
    let ignore = false;

    const fetchRecipes = async () => {
      if (!queryParam.trim()) {
        setLoading(false);
        return;
      }
      try {
        const data = await searchRecipes(queryParam);
        if (!ignore) {
          setRecipes(data || []);
        }
      } catch (error) {
        if (!ignore) {
          console.error('Failed to fetch recipes', error);
          setRecipes([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchRecipes();

    return () => {
      ignore = true;
    };
  }, [queryParam]);

  const handleSearch = (query) => {
    if (query !== queryParam) {
      setLoading(true);
      setSearchParams({ q: query });
    }
  };

  return (
    <div className="animate-fade-in">
      <header className="text-center mb-12 py-12">
        <h2 className="text-5xl font-bold mb-4 bg-linear-to-br from-white to-indigo-300 bg-clip-text text-transparent">
          Discover Delicious Recipes
        </h2>
        <p className="text-slate-400 text-xl mb-10">
          Find your next favorite meal from our vast collection.
        </p>
        <SearchBar onSearch={handleSearch} initialQuery={queryParam} />
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
