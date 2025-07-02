import { Link } from 'react-router-dom'
import { FaTachometerAlt, FaUsers, FaHome, FaCog, FaChartBar } from 'react-icons/fa'

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <div className="mb-8 p-4">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
        </div>
        
        <nav className="space-y-2">
          <Link 
            to="/admin/dashboard" 
            className="flex items-center space-x-2 p-3 rounded hover:bg-gray-700"
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/admin/users" 
            className="flex items-center space-x-2 p-3 rounded hover:bg-gray-700"
          >
            <FaUsers />
            <span>Users</span>
          </Link>
          
          <Link 
            to="/admin/properties" 
            className="flex items-center space-x-2 p-3 rounded hover:bg-gray-700"
          >
            <FaHome />
            <span>Properties</span>
          </Link>
          
          <Link 
            to="/admin/reports" 
            className="flex items-center space-x-2 p-3 rounded hover:bg-gray-700"
          >
            <FaChartBar />
            <span>Reports</span>
          </Link>
          
          <Link 
            to="/admin/settings" 
            className="flex items-center space-x-2 p-3 rounded hover:bg-gray-700"
          >
            <FaCog />
            <span>Settings</span>
          </Link>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  )
}

export default AdminLayout