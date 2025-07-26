import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditPropertyPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Get the property ID from the URL

  // Fetch the existing property data when the page loads
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/properties/${id}`);
        setFormData({
          title: res.data.title,
          description: res.data.description,
          price: res.data.price,
          location: res.data.location,
        });
      } catch (err) {
        console.error('Error fetching property data', err);
      }
    };
    fetchProperty();
  }, [id]);

  const { title, description, price, location } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/properties/${id}`, formData);
      alert('Property updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert('Error updating property.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Edit Property</h2>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input id="title" type="text" placeholder="Property Title" name="title" value={title} onChange={onChange} required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" placeholder="Property Description" name="description" value={description} onChange={onChange} required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price per night</label>
            <input id="price" type="number" placeholder="Price" name="price" value={price} onChange={onChange} required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input id="location" type="text" placeholder="Location" name="location" value={location} onChange={onChange} required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600">
              Update Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPropertyPage;