import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    onSearch(location);
  };

  const searchContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
    gap: '10px'
  };

  return (
    <div style={searchContainerStyle}>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter a location (e.g., Hyderabad)"
        style={{ padding: '10px', width: '300px' }}
      />
      <button onClick={handleSearch} style={{ padding: '10px 20px' }}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;