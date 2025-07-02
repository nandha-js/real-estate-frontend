import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome } from 'react-icons/fa';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'user', // Default role
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(userData);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create a new account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              sign in to your existing account
            </Link>
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="mt-1 relative">
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
                className="pl-10 w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={userData.name}
                onChange={handleChange}
              />
              <FaUser className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1 relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="pl-10 w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={userData.email}
                onChange={handleChange}
              />
              <FaEnvelope className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength="6"
                placeholder="At least 6 characters"
                className="pl-10 w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={userData.password}
                onChange={handleChange}
              />
              <FaLock className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="mt-1 relative">
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="e.g., 9876543210"
                pattern="[0-9]{10,15}"
                className="pl-10 w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={userData.phone}
                onChange={handleChange}
              />
              <FaPhone className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Registering as
            </label>
            <div className="mt-1 relative">
              <select
                id="role"
                name="role"
                value={userData.role}
                onChange={handleChange}
                className="pl-10 w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="user">Home Buyer / Renter</option>
                <option value="agent">Real Estate Agent</option>
              </select>
              <FaHome className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
            >
              {loading ? (
                <span className="animate-pulse">Registering...</span>
              ) : (
                'Register'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
