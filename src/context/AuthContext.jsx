import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token', token); // Ensure token is in local storage
        try {
          const res = await axios.get(import.meta.env.VITE_API_URL + '/api/auth/user');
          setUser(res.data);
        } catch (err) {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          delete axios.defaults.headers.common['x-auth-token'];
        }
      } else {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
      }
    };
    fetchUser();
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};