import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';

const NotFound = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <section className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-6xl font-extrabold text-blue-600 mb-2 animate-bounce">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="space-y-3">
          <Link
            to="/"
            className="block w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <FaHome className="mr-2" />
            Go to Homepage
          </Link>
          <Link
            to="/properties"
            className="block w-full border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-50 transition-colors flex items-center justify-center"
          >
            <FaSearch className="mr-2" />
            Browse Properties
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
