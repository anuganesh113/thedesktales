import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    if (!isLoggedIn) {
        // Redirect to home if not logged in
        return <Navigate to="/" state={{ from: location, openAuth: true }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
