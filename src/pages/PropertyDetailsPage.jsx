import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error('Error fetching property details', err);
      }
    };
    fetchProperty();
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      alert('Please log in to book a property.');
      navigate('/login');
      return;
    }
    try {
      const bookingDetails = {
        property: id,
        startDate: dateRange[0].startDate,
        endDate: dateRange[0].endDate
      };
      await axios.post(import.meta.env.VITE_API_URL + '/api/bookings', bookingDetails);
      alert('Booking successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Booking failed', err);
      alert('Booking failed. Please try again.');
    }
  };

  if (!property) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
        <p className="text-md text-gray-600 mt-1">{property.location}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <img 
            src={property.imageUrl} 
            alt={property.title} 
            className="w-full h-auto object-cover rounded-xl shadow-lg" 
          />
          <div className="mt-6 border-t pt-6">
            <h2 className="text-2xl font-semibold text-gray-800">About this space</h2>
            <p className="text-gray-700 mt-4 whitespace-pre-wrap">{property.description}</p>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="border rounded-xl shadow-lg p-6 sticky top-6">
            <p className="text-xl font-semibold mb-4">
              <span className="font-bold text-2xl">₹{property.price}</span> per night
            </p>
            <DateRange
              editableDateInputs={true}
              onChange={item => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              minDate={new Date()}
              className="w-full"
            />
            <button 
              onClick={handleBooking} 
              className="w-full mt-4 bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Reserve Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetailsPage;