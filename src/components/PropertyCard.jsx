import React from 'react';
import { Link } from 'react-router-dom';

function PropertyCard({ property }) {
  return (
    // Link makes the whole card clickable
    <Link to={`/property/${property._id}`} className="block">
      <div className="border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 m-4 w-80">
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="w-full h-56 object-cover" 
        />
        <div className="p-4 bg-white">
          <h3 className="text-lg font-bold truncate">{property.title}</h3>
          <p className="text-gray-600 mt-1">{property.location}</p>
          <p className="mt-2 font-semibold text-gray-800">
            <span className="font-bold">₹{property.price}</span> per night
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;