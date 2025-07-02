import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getAdminStats, getAllUsers } from '../services/adminService'
import { FaUsers, FaHome, FaChartBar, FaUserShield } from 'react-icons/fa'

const AdminDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const [statsData, usersData] = await Promise.all([
          getAdminStats(),
          getAllUsers()
        ])
        setStats(statsData)
        setUsers(usersData)
      } catch (error) {
        console.error('Failed to load admin data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    if (user && user.role === 'admin') {
      loadAdminData()
    }
  }, [user])

  if (loading) {
    return <div className="text-center py-12">Loading admin dashboard...</div>
  }

  if (!stats) {
    return <div className="text-center py-12">Failed to load dashboard data</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
            </div>
            <FaUsers className="text-blue-500 text-2xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Properties</p>
              <h3 className="text-2xl font-bold">{stats.totalProperties}</h3>
            </div>
            <FaHome className="text-green-500 text-2xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Active Agents</p>
              <h3 className="text-2xl font-bold">{stats.activeAgents}</h3>
            </div>
            <FaUserShield className="text-yellow-500 text-2xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Monthly Visits</p>
              <h3 className="text-2xl font-bold">{stats.monthlyVisits}</h3>
            </div>
            <FaChartBar className="text-purple-500 text-2xl" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.slice(0, 5).map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={user.photo || '/placeholder-user.jpg'} alt={user.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'agent' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Properties by Type</h3>
          {/* In a real app, this would be a chart component */}
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Property Type Distribution Chart</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Recent Activities</h3>
          {/* In a real app, this would be populated with actual data */}
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between">
                  <h4 className="font-medium">New {i === 1 ? 'Property' : i === 2 ? 'User' : 'Inquiry'} Added</h4>
                  <span className="text-sm text-gray-500">{i} hour{i !== 1 ? 's' : ''} ago</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  {i === 1 ? 'New property listed at 123 Main St' : 
                   i === 2 ? 'New user registered: john@example.com' : 
                   'New inquiry about property #456'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard