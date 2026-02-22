import React, { useState } from 'react';
import SearchBar from './components/SearchBar';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]); // Stores the list of movies found
  const [loading, setLoading] = useState(false); // Shows a loading message while fetching

  const handleSearch = async () => {
    if (!query) {
      alert("Please enter a movie name");
      return;
    }

    setLoading(true);
    const API_KEY = "1875e468"; // Your activated key
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
      console.error("Error fetching data:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-700 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 drop-shadow-md">Movie Finder</h1>
      
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      
      {/* Loading State */}
      {loading && <p className="mt-10 animate-pulse text-xl font-semibold">Searching...</p>}

      {/* Movie Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12 w-full max-w-6xl">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="bg-white text-gray-900 rounded-2xl overflow-hidden shadow-2xl transform transition hover:scale-105">
            <img 
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600?text=No+Poster"} 
              alt={movie.Title} 
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg leading-tight truncate">{movie.Title}</h3>
              <p className="text-gray-500 text-sm mt-1">{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>

      {!loading && movies.length === 0 && (
        <p className="mt-10 text-blue-200 italic font-medium">
          Type a movie title and click search to see results.
        </p>
      )}
    </div>
  );
}

export default App;