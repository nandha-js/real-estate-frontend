import { Link } from 'react-router-dom'
import { FaHome, FaPlus, FaList, FaEnvelope, FaCog } from 'react-icons/fa'

const AgentLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <div className="mb-8 p-4">
          <h2 className="text-xl font-bold">Agent Dashboard</h2>
        </div>
        
        <nav className="space-y-2">
          <Link 
            to="/agent/dashboard" 
            className="flex items-center space-x-2 p-3 rounded hover:bg-gray-700"
          >
            <FaHome />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/agent/properties" 
            className="flex items-center space-x-2 p-3 rounded hover:bg-gray-700"
          >
            <FaList />
            <span>My Properties</span>
          </Link>
          
          <Link 
            to="/agent/properties/add" 
            className="flex items-center space-x-2 p-3 rounded hover:bg-gray-700"
          >
            <FaPlus />
            <span>Add Property</span>
          </Link>
          
          <Link 
            to="/agent/inquiries" 
            className="flex items-center space-x-2 p-3 rounded hover:bg-gray-700"
          >
            <FaEnvelope />
            <span>Inquiries</span>
          </Link>
          
          <Link 
            to="/agent/settings" 
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

export default AgentLayout