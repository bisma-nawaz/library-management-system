import React, { useState } from 'react';
import axios from 'axios';

const SearchBooks = ({ onResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault(); 
    setError('');
    setIsSearching(true);

    try {
      const response = await axios.get(`http://localhost:3000/api/books/search?isbn=${searchTerm}`);
      setIsSearching(false);
      if (response.data) {
        // single book in an array:
        onResults([response.data]); 
      } else {
        onResults([]); 
      }
    } catch (error) {
      // search cbook in the list complete: set to false: 
      setIsSearching(false);
      setError('Error searching books: ' + (error.response?.data.message || error.message));
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input style={{ marginBottom: '10px', marginLeft: '100px'}}
          type="text"
          placeholder="Enter book ISBN..."
          value={searchTerm}
          // update the search term when the inpit filed changes: 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button style={{ marginBottom: '10px', marginLeft: '100px'}} type="submit" disabled={isSearching}>
          Search
        </button>
      </form>
      {isSearching && <p>Searching...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SearchBooks;
