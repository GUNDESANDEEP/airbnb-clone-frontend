import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault(); // <-- THIS LINE IS VERY IMPORTANT
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + '/api/auth/login', formData);
      setToken(res.data.token);
      navigate('/');
    } catch (err) {
      if (err.response) {
        alert(err.response.data.msg || 'Invalid Credentials');
      } else {
        alert('Could not connect to the server. Please make sure it is running.');
      }
      console.error(err);
    }
  };

  return (
    <form className="w-full max-w-md p-8 space-y-6" onSubmit={onSubmit}>
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={onChange}
          required
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="password"  className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600">
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginPage;