import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Composant pour protéger les routes privées
export const PrivateRoute = ({ element }) => {
  const { user } = useAuth();

  return user ? element : <Navigate to="/" />;
};
