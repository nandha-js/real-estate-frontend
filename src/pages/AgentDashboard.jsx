import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAgentProperties } from '../services/agentService';
import PropertyCard from '../components/PropertyCard';
import {
  FaPlus,
  FaChartLine,
  FaEnvelope,
  FaCalendarAlt,
  FaHome
} from 'react-icons/fa';

const AgentDashboard = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListings: 0,
    pendingInquiries: 0,
    scheduledViewings: 0
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const agentProperties = await getAgentProperties(user.id);
        setProperties(agentProperties);

        setStats({
          totalProperties: agentProperties.length,
          activeListings: agentProperties.filter(p => p.status === 'active').length,
          pendingInquiries: 12, // Replace with real API later
          scheduledViewings: 5   // Replace with real API later
        });
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadDashboardData();
    }
  }, [user]);

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Agent Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}!</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Properties"
          value={stats.totalProperties}
          icon={<FaHome className="text-blue-500 text-2xl" />}
          border="border-blue-500"
        />
        <DashboardCard
          title="Active Listings"
          value={stats.activeListings}
          icon={<FaChartLine className="text-green-500 text-2xl" />}
          border="border-green-500"
        />
        <DashboardCard
          title="Pending Inquiries"
          value={stats.pendingInquiries}
          icon={<FaEnvelope className="text-yellow-500 text-2xl" />}
          border="border-yellow-500"
        />
        <DashboardCard
          title="Scheduled Viewings"
          value={stats.scheduledViewings}
          icon={<FaCalendarAlt className="text-purple-500 text-2xl" />}
          border="border-purple-500"
        />
      </div>

      {/* Properties List */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Properties</h2>
          <Link
            to="/agent/properties/add"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
          >
            <FaPlus className="mr-2" />
            Add New Property
          </Link>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(property => (
              <PropertyCard key={property._id || property.id} property={property} editable />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600 mb-4">You haven't listed any properties yet.</p>
            <Link
              to="/agent/properties/add"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Add Your First Property
            </Link>
          </div>
        )}
      </div>

      {/* Inquiries & Viewings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Recent Inquiries</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between">
                  <h4 className="font-medium">Property Inquiry #{i}</h4>
                  <span className="text-sm text-gray-500">2 days ago</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">From: user{i}@example.com</p>
                <p className="text-gray-600 text-sm mt-1 line-clamp-1">
                  "I'm interested in this property. Can you tell me more about..."
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Viewings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Upcoming Viewings</h3>
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between">
                  <h4 className="font-medium">Viewing Appointment #{i}</h4>
                  <span className="text-sm text-gray-500">
                    {i === 1 ? 'Tomorrow at 2:00 PM' : 'In 3 days at 10:00 AM'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">Property: {i === 1 ? '123 Main St' : '456 Oak Ave'}</p>
                <p className="text-gray-600 text-sm mt-1">Client: John Doe</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 📦 Reusable Dashboard Card
const DashboardCard = ({ title, value, icon, border }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${border}`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      {icon}
    </div>
  </div>
);

export default AgentDashboard;
