import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute component for role-based access control.
 *
 * @param {JSX.Element} children - The component to render if access is allowed.
 * @param {Array<string>} roles - Optional array of roles that are allowed to access the route.
 */
const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-12 text-gray-600">Checking access...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
