import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (recipe) => {
    setFavorites((prev) => [...prev, recipe]);
  };

  const removeFavorite = (idMeal) => {
    setFavorites((prev) => prev.filter((fav) => fav.idMeal !== idMeal));
  };

  const isFavorite = (idMeal) => {
    return favorites.some((fav) => fav.idMeal === idMeal);
  };

  const navigate = (page) => setCurrentPage(page);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navigate={navigate} currentPage={currentPage} favoritesCount={favorites.length} />
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        {currentPage === 'home' && (
          <Home
            favorites={favorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            isFavorite={isFavorite}
          />
        )}
        {currentPage === 'favorites' && (
          <Favorites
            favorites={favorites}
            removeFavorite={removeFavorite}
          />
        )}
      </main>
    </div>
  );
}

export default App;
