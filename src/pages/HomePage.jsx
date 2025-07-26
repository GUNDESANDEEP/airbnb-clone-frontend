import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard.jsx';
import SearchBar from '../components/SearchBar.jsx'; // Import the new component

function HomePage() {
  const [properties, setProperties] = useState([]);

  const fetchAllProperties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  // Fetch all properties when the component first loads
  useEffect(() => {
    fetchAllProperties();
  }, []);

  // This function will be called when a user searches
  const handleSearch = async (location) => {
    if (!location) {
      fetchAllProperties(); // If search is empty, show all properties
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/properties/search?location=${location}`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error searching properties:', error);
      setProperties([]); // Clear properties if search fails or finds none
    }
  };

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Available Properties</h1>
      <SearchBar onSearch={handleSearch} /> {/* Add the SearchBar here */}
      <div style={containerStyle}>
        {properties.length > 0 ? (
          properties.map(property => (
            <PropertyCard key={property._id} property={property} />
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;