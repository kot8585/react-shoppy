import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

//❗️requireAdmin 전달을 해서 재사용을 쉽게 했당
export default function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useUserContext();

  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
