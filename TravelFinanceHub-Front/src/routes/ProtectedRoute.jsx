import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/UseAuth'; // Asegúrate de importar correctamente el hook useAuth

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
    const isAuthenticated = useAuth();

    if (isAuthenticated === null) {
        return <div>Cargando...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default ProtectedRoute;
