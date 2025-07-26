import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function DashboardPage() {
  const [properties, setProperties] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + '/api/properties/my-properties');
        setProperties(res.data);
      } catch (err) {
        console.error('Error fetching properties', err);
      }
    };
    if (user) {
      fetchMyProperties();
    }
  }, [user]);

  const handleDelete = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/properties/${propertyId}`);
        setProperties(properties.filter(p => p._id !== propertyId));
      } catch (err) {
        console.error('Error deleting property', err);
        alert('Could not delete property.');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
        <p className="text-md text-gray-600 mt-1">Manage your property listings.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4">My Properties</h2>
        
        {properties.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(prop => (
              <div key={prop._id} className="border rounded-lg p-4 flex flex-col justify-between">
                <div>
                  <img src={prop.imageUrl} alt={prop.title} className="w-full h-48 object-cover rounded-md mb-4" />
                  <h3 className="text-lg font-bold">{prop.title}</h3>
                  <p className="text-gray-600">{prop.location}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link to={`/edit-property/${prop._id}`} className="w-full text-center bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(prop._id)} className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">You have not created any properties yet.</p>
            <Link to="/create-property" className="mt-4 inline-block bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600">
              Create one now!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;