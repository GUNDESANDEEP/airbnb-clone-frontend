import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePropertyPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    image: null,
  });
  const navigate = useNavigate();

  const { title, description, price, location } = formData;

  const onChange = e => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    const propertyData = new FormData();
    propertyData.append('title', title);
    propertyData.append('description', description);
    propertyData.append('price', price);
    propertyData.append('location', location);
    propertyData.append('image', formData.image);

    try {
      await axios.post(import.meta.env.VITE_API_URL + '/api/properties', propertyData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Property created successfully!');
      navigate('/');
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert('Error creating property.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Create New Property Listing</h2>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input id="title" type="text" placeholder="Property Title" name="title" onChange={onChange} required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" placeholder="Property Description" name="description" onChange={onChange} required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price per night</label>
            <input id="price" type="number" placeholder="Price" name="price" onChange={onChange} required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input id="location" type="text" placeholder="Location" name="location" onChange={onChange} required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
            <input id="image" type="file" name="image" onChange={onChange} required className="w-full px-3 py-2 mt-1 text-sm text-gray-500 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100" />
          </div>
          <div>
            <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Create Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePropertyPage;