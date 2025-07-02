import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaHome, FaSearch, FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <FaHome className="text-2xl" />
          <span className="text-xl font-bold">DreamHome</span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link to="/properties" className="hover:text-blue-200 flex items-center space-x-1">
            <FaSearch />
            <span>Browse Properties</span>
          </Link>
          <Link to="/agents" className="hover:text-blue-200 flex items-center space-x-1">
            <FaUser />
            <span>Agents</span>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {user.role === 'agent' && (
                <Link to="/agent/dashboard" className="hover:text-blue-200">
                  Dashboard
                </Link>
              )}
              {user.role === 'admin' && (
                <Link to="/admin/dashboard" className="hover:text-blue-200">
                  Admin
                </Link>
              )}
              <button onClick={handleLogout} className="flex items-center space-x-1 hover:text-blue-200">
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="flex items-center space-x-1 hover:text-blue-200">
              <FaSignInAlt />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header