import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [showFavorites, setShowFavorites] = useState(false); 

  // Initialize favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('movie-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('movie-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // NEW: Initial Feed - Load popular movies on first visit
  useEffect(() => {
    const fetchInitialMovies = async () => {
      setLoading(true);
      const API_KEY = "1875e468";
      // We search for "Marvel" to show high-quality posters on load
      const url = `https://www.omdbapi.com/?s=Marvel&apikey=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === "True") {
          setMovies(data.Search);
        }
      } catch (error) {
        console.error("Error fetching initial movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialMovies();
  }, []); // Empty array means this runs only once

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const isFav = prev.find((fav) => fav.imdbID === movie.imdbID);
      if (isFav) {
        return prev.filter((fav) => fav.imdbID !== movie.imdbID);
      } else {
        return [...prev, movie];
      }
    });
  };

  const handleSearch = async () => {
    if (!query) return;
    
    setLoading(true);
    setShowFavorites(false); 
    
    const API_KEY = "1875e468"; 
    const url = `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-700 text-white pb-20">
      <Routes>
        <Route path="/" element={
          <div className="flex flex-col items-center p-8">
            <h1 className="text-4xl font-bold mb-8 drop-shadow-md">Movie Finder</h1>
            
            <div className="flex flex-col items-center gap-4 w-full mb-10">
              <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
              
              <button 
                onClick={() => setShowFavorites(!showFavorites)}
                className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-2 px-6 rounded-full transition-all shadow-lg text-sm"
              >
                {showFavorites ? "⬅️ Back to Search" : `❤️ View Favorites (${favorites.length})`}
              </button>
            </div>
            
            {loading && <p className="mt-10 animate-pulse text-xl font-semibold">Searching...</p>}

            {showFavorites ? (
              <div className="w-full max-w-6xl mt-12 animate-fadeIn">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-yellow-500 inline-block">My Favorites ❤️</h2>
                {favorites.length === 0 ? (
                  <p className="mt-10 text-blue-200 italic text-center text-lg">Your favorites list is empty.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {favorites.map((movie) => (
                      <MovieCard 
                        key={movie.imdbID} 
                        movie={movie} 
                        toggleFavorite={toggleFavorite}
                        isFavorite={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full max-w-6xl mt-12 animate-fadeIn">
                {movies.length > 0 ? (
                  <>
                    <h2 className="text-2xl font-bold mb-6">
                      {query ? `Search Results for "${query}"` : "Featured Movies"}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
                      {movies.map((movie) => (
                        <MovieCard 
                          key={movie.imdbID} 
                          movie={movie} 
                          toggleFavorite={toggleFavorite}
                          isFavorite={favorites.some(fav => fav.imdbID === movie.imdbID)}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  !loading && query && (
                    <p className="mt-10 text-blue-200 italic text-center text-lg">
                      No movies found for "{query}". Try a different title!
                    </p>
                  )
                )}
              </div>
            )}
          </div>
        } />

        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;