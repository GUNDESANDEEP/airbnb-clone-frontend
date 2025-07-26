import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // If there is no user, redirect to the /login page
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;