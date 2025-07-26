import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard.jsx';
import SearchBar from '../components/SearchBar.jsx';

function HomePage() {
  const [properties, setProperties] = useState([]);

  const fetchAllProperties = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + '/api/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  useEffect(() => {
    fetchAllProperties();
  }, []);

  const handleSearch = async (location) => {
    if (!location) {
      fetchAllProperties();
      return;
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/properties/search?location=${location}`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error searching properties:', error);
      setProperties([]);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-8 text-gray-800">Available Properties</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="flex flex-wrap justify-center p-4">
        {properties.length > 0 ? (
          properties.map(property => (
            <PropertyCard key={property._id} property={property} />
          ))
        ) : (
          <p className="text-gray-500 mt-10">No properties found.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;