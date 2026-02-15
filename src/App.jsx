import React, { useState } from 'react';
import SearchBar from './components/SearchBar';

function App() {
  // 1. Create a state variable 'query' to hold the text the user types
  const [query, setQuery] = useState('');

  // 2. Define what happens when the button is clicked
  const handleSearch = () => {
    if (!query) {
      alert("Please enter a movie name");
      return;
    }
    alert(`Searching for: ${query}`);
    // Next step: Fetching data from OMDb API goes here!
  };

  return (
    // 3. The UI Layout
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-700 text-white p-4">
      <h1 className="text-4xl font-bold mb-8 drop-shadow-md">Movie Finder</h1>
      
      {/* 4. Using your custom SearchBar component */}
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      
      <p className="mt-6 text-blue-200 text-sm italic">
        Type a movie name and click search
      </p>
    </div>
  );
}

export default App;