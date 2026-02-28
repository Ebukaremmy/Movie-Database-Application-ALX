import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const MovieDetails = () => {
  // Extracts the unique movie ID from the current URL path
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Asynchronously retrieves comprehensive data for a specific title including the full plot
    const fetchDetails = async () => {
      const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=1875e468&plot=full`);
      const data = await response.json();
      setMovie(data);
    };
    fetchDetails();
  }, [id]);

  // Provides a visual cue to the user while the data is being fetched
  if (!movie) return <div className="text-center mt-20 text-white">Loading details...</div>;

  return (
    <div className="min-h-screen bg-blue-900 text-white p-8 flex flex-col items-center">
      {/* Navigation to return the user to the main search interface */}
      <Link to="/" className="mb-8 self-start bg-blue-700 px-4 py-2 rounded">← Back to Search</Link>
      
      <div className="max-w-4xl flex flex-col md:flex-row gap-8 bg-blue-800 p-8 rounded-3xl shadow-2xl">
        {/* Cinematic poster display */}
        <img src={movie.Poster} alt={movie.Title} className="rounded-xl shadow-lg w-full md:w-1/3" />
        
        <div className="flex-1">
          {/* Detailed movie information and critical ratings */}
          <h2 className="text-4xl font-bold mb-4">{movie.Title}</h2>
          <p className="text-yellow-400 font-bold mb-4">⭐ {movie.imdbRating} / 10</p>
          <p className="mb-4 text-blue-100 leading-relaxed">{movie.Plot}</p>
          
          {/* Cast and crew specifics */}
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          
          {/* Metadata including genre and total duration */}
          <p className="mt-4 text-sm text-blue-300 italic">{movie.Genre} • {movie.Runtime}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;