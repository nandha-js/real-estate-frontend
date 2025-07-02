import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import UserLayout from '../layouts/UserLayout';
import AgentLayout from '../layouts/AgentLayout';
import AdminLayout from '../layouts/AdminLayout';

// Lazy load all pages
const Home = lazy(() => import('../pages/Home'));
const PropertyList = lazy(() => import('../pages/PropertyList'));
const PropertyDetails = lazy(() => import('../pages/PropertyDetails'));
const AgentList = lazy(() => import('../pages/AgentList'));
const AgentProfile = lazy(() => import('../pages/AgentProfile'));
const CompareProperties = lazy(() => import('../pages/CompareProperties'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const AgentDashboard = lazy(() => import('../pages/AgentDashboard'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'));
const NotFound = lazy(() => import('../pages/NotFound'));

/**
 * Role-protected route
 */
const PrivateRoute = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<UserLayout><Home /></UserLayout>} />
        <Route path="/properties" element={<UserLayout><PropertyList /></UserLayout>} />
        <Route path="/properties/:id" element={<UserLayout><PropertyDetails /></UserLayout>} />
        <Route path="/agents" element={<UserLayout><AgentList /></UserLayout>} />
        <Route path="/agents/:id" element={<UserLayout><AgentProfile /></UserLayout>} />
        <Route path="/compare" element={<UserLayout><CompareProperties /></UserLayout>} />

        {/* Auth Routes */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

        {/* Protected Routes */}
        <Route
          path="/agent/dashboard"
          element={
            <PrivateRoute roles={['agent']}>
              <AgentLayout><AgentDashboard /></AgentLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute roles={['admin']}>
              <AdminLayout><AdminDashboard /></AdminLayout>
            </PrivateRoute>
          }
        />

        {/* Catch-all for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
