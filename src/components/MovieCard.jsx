import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, toggleFavorite, isFavorite }) => {
  return (
    <div className="relative bg-white text-gray-900 rounded-2xl overflow-hidden shadow-2xl transform transition hover:scale-105">
      {/* Favorite Toggle Button */}
      <button 
        onClick={() => toggleFavorite(movie)}
        className="absolute top-2 right-2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition text-xl"
        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <img 
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600?text=No+Poster"} 
        alt={movie.Title} 
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg leading-tight truncate">{movie.Title}</h3>
        <p className="text-gray-500 text-sm mt-1">{movie.Year}</p>
        
        <Link 
          to={`/movie/${movie.imdbID}`} 
          className="mt-4 block text-center w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;