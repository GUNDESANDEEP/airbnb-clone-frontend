import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        // Set the token in axios headers for all subsequent requests
        axios.defaults.headers.common['x-auth-token'] = token;
        try {
          const res = await axios.get('http://localhost:5000/api/auth/user');
          setUser(res.data);
        } catch (err) {
          // If token is invalid, remove it
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      } else {
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