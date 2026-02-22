import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routing components
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails'; // We'll use the file you created

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]); 
  const [loading, setLoading] = useState(false); 

  const handleSearch = async () => {
    if (!query) {
      alert("Please enter a movie name");
      return;
    }
    setLoading(true);
    const API_KEY = "1875e468"; 
    const url = `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        alert(data.Error || "No movies found!");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-700 text-white">
      <Routes>
        {/* Main Search Page Route */}
        <Route path="/" element={
          <div className="flex flex-col items-center p-8">
            <h1 className="text-4xl font-bold mb-8 drop-shadow-md">Movie Finder</h1>
            <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
            
            {loading && <p className="mt-10 animate-pulse text-xl font-semibold">Searching...</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12 w-full max-w-6xl">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>

            {!loading && movies.length === 0 && (
              <p className="mt-10 text-blue-200 italic font-medium">
                Type a movie title and click search to see results.
              </p>
            )}
          </div>
        } />

        {/* Dynamic Movie Details Route */}
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;