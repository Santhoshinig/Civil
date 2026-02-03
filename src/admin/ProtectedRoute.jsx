import { useAuth } from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="admin-loading"><div className="loading-spinner"></div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/admin" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
