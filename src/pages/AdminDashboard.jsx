import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAdminStats, getAllUsers } from '../services/adminService';
import {
  FaUsers,
  FaHome,
  FaChartBar,
  FaUserShield
} from 'react-icons/fa';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const [statsData, usersData] = await Promise.all([
          getAdminStats(),
          getAllUsers()
        ]);
        setStats(statsData);
        setUsers(usersData);
      } catch (error) {
        console.error('Failed to load admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'admin') {
      loadAdminData();
    }
  }, [user]);

  if (loading) {
    return <div className="text-center py-12">Loading admin dashboard...</div>;
  }

  if (!stats) {
    return <div className="text-center py-12 text-red-600">Failed to load dashboard data</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Users"
          value={stats?.totalUsers}
          icon={<FaUsers className="text-blue-500 text-2xl" />}
          border="border-blue-500"
        />
        <DashboardCard
          title="Total Properties"
          value={stats?.totalProperties}
          icon={<FaHome className="text-green-500 text-2xl" />}
          border="border-green-500"
        />
        <DashboardCard
          title="Active Agents"
          value={stats?.activeAgents}
          icon={<FaUserShield className="text-yellow-500 text-2xl" />}
          border="border-yellow-500"
        />
        <DashboardCard
          title="Monthly Visits"
          value={stats?.monthlyVisits}
          icon={<FaChartBar className="text-purple-500 text-2xl" />}
          border="border-purple-500"
        />
      </div>

      {/* Recent Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <TableHead title="Name" />
                  <TableHead title="Email" />
                  <TableHead title="Role" />
                  <TableHead title="Joined" />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.slice(0, 5).map((user) => (
                  <tr key={user._id || user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.photo || '/placeholder-user.jpg'}
                          alt={user.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'agent' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Charts & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Properties by Type</h3>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-500">
            Property Type Distribution Chart (Coming Soon)
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {[
              { title: 'New Property Added', time: '1 hour ago', desc: 'New property listed at 123 Main St' },
              { title: 'New User Registered', time: '2 hours ago', desc: 'john@example.com just joined' },
              { title: 'New Inquiry Received', time: '3 hours ago', desc: 'Inquiry about property #456' }
            ].map((activity, i) => (
              <div key={i} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between">
                  <h4 className="font-medium">{activity.title}</h4>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{activity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 📦 Reusable components
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

const TableHead = ({ title }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</th>
);

export default AdminDashboard;
