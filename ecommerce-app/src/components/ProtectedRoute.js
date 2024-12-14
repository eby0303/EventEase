// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { auth } = useContext(AuthContext);

  // Check if the user is authenticated and has the correct role
  if (!auth.isAuthenticated || auth.role !== role) {
    return <Navigate to="/login" />;
  }

  return children; // Render the children if the user is authenticated and has the correct role
};

export default ProtectedRoute;
