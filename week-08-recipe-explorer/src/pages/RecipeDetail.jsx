import { useState, useEffect } from 'react';
import { getRecipeById } from '../services/mealApi';

function RecipeDetail({ id }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (error) {
        console.error('Failed to fetch recipe details', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-slate-400">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
        <p>Loading recipe details...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center p-16 text-slate-400 text-lg bg-card rounded-2xl border border-dashed border-slate-700">
        <p>Recipe not found.</p>
      </div>
    );
  }

  // Extract ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="animate-fade-in bg-card border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="md:flex">
        <div className="md:w-1/2">
          <img 
            src={recipe.strMealThumb} 
            alt={recipe.strMeal} 
            className="w-full h-full object-cover min-h-[300px]"
          />
        </div>
        <div className="md:w-1/2 p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
              {recipe.strCategory}
            </span>
            <span className="px-3 py-1 bg-slate-800 text-slate-300 text-sm font-medium rounded-full">
              {recipe.strArea}
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-br from-white to-indigo-300 bg-clip-text text-transparent">
            {recipe.strMeal}
          </h2>

          {recipe.strTags && (
            <div className="flex flex-wrap gap-2 mb-6">
              {recipe.strTags.split(',').map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs font-medium rounded-md">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
          
          <h3 className="text-xl font-semibold mb-3 text-white border-b border-slate-700 pb-2">
            Ingredients
          </h3>
          <ul className="flex flex-col gap-2 mb-8">
            {ingredients.map((item, index) => (
              <li key={index} className="flex justify-between items-center text-slate-300 bg-slate-800/50 p-2 rounded-lg">
                <span className="font-medium text-white">{item.ingredient}</span>
                <span className="text-indigo-300 font-semibold">{item.measure}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="p-8 border-t border-slate-800">
        <h3 className="text-2xl font-semibold mb-4 text-white">Instructions</h3>
        <div className="text-slate-300 space-y-4 whitespace-pre-line leading-relaxed">
          {recipe.strInstructions}
        </div>
        
        {recipe.strYoutube && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-white">Video Tutorial</h3>
            <a 
              href={recipe.strYoutube} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors duration-200"
            >
              Watch on YouTube
            </a>
          </div>
        )}
        
        {recipe.strSource && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-white">Original Source</h3>
            <a 
              href={recipe.strSource} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
            >
              View original recipe details ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetail;
