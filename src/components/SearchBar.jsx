import React from 'react';

const SearchBar = ({ query, setQuery, onSearch }) => {
  // Listener to trigger the search action when the user presses the "Enter" key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      {/* Primary text input for capturing movie titles from the user */}
      <input 
        type="text"
        placeholder="Search for a movie..."
        className="w-full p-4 rounded-lg text-black border-none focus:ring-4 focus:ring-yellow-400 outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown} 
      />
      
      {/* Submission button to manually initiate the API data fetch */}
      <button 
        onClick={onSearch}
        className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-lg transition-all"
      >
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;