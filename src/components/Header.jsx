import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  FaHome,
  FaSearch,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaTachometerAlt
} from 'react-icons/fa'

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const getDashboardLink = () => {
    if (user?.role === 'agent') return '/agent/dashboard'
    if (user?.role === 'admin') return '/admin/dashboard'
    return null
  }

  return (
    <header className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2" aria-label="DreamHome Home">
          <FaHome className="text-2xl" />
          <span className="text-xl font-bold">DreamHome</span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {getDashboardLink() && (
                <Link to={getDashboardLink()} className="flex items-center space-x-1 hover:text-blue-200">
                  <FaTachometerAlt />
                  <span>Dashboard</span>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 hover:text-blue-200"
                aria-label="Logout"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="flex items-center space-x-1 hover:text-blue-200" aria-label="Login">
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
