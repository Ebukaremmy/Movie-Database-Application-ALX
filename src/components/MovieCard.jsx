import React from 'react';
import { Link } from 'react-router-dom'; // Import Link to enable navigation

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white text-gray-900 rounded-2xl overflow-hidden shadow-2xl transform transition hover:scale-105">
      <img 
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600?text=No+Poster"} 
        alt={movie.Title} 
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg leading-tight truncate">{movie.Title}</h3>
        <p className="text-gray-500 text-sm mt-1">{movie.Year}</p>
        
        {/* The Link uses the unique imdbID to create a dynamic URL path */}
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