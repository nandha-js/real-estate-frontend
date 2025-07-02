import { useEffect } from 'react'
import { useProperty } from '../context/PropertyContext'
import PropertyCard from '../components/PropertyCard'
import SearchFilter from '../components/SearchFilter'
import { FaSearch, FaHome, FaMapMarkerAlt, FaStar, FaHeart } from 'react-icons/fa'

const Home = () => {
  const { properties, fetchProperties } = useProperty()

  useEffect(() => {
    fetchProperties({ limit: 6 })
  }, [fetchProperties])

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-95"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Find Your <span className="text-blue-300">Dream Home</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-blue-100">
              Discover thousands of properties, from cozy apartments to luxurious villas
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105">
                <FaSearch className="mr-2" />
                Browse Properties
              </button>
              <button className="flex items-center justify-center px-8 py-4 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:bg-opacity-10 md:py-4 md:text-lg md:px-10 transition-all duration-300">
                <FaMapMarkerAlt className="mr-2" />
                Explore Areas
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Properties
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Carefully selected properties that match your preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.slice(0, 6).map(property => (
            <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={property.images[0] || '/placeholder-property.jpg'} 
                  alt={property.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                  <FaHeart className="text-gray-400 hover:text-red-500 cursor-pointer" />
                </div>
                <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                  {property.type}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-blue-600 mb-1">
                  <FaStar className="mr-1" />
                  <span className="font-medium">{property.rating || 'New'}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
                  {property.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="mr-2 text-blue-500" />
                  <span>{property.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-800">
                    ${property.price.toLocaleString()}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors">
            View All Properties
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Find Your Perfect Home
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
              Use our advanced filters to narrow down your search
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
            <SearchFilter />
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose Us
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
              <FaHome className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Wide Selection</h3>
            <p className="text-gray-600">
              Thousands of properties across all price ranges and locations
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
              <FaStar className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Trusted Agents</h3>
            <p className="text-gray-600">
              Professional and experienced agents to guide you
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
              <FaSearch className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Search</h3>
            <p className="text-gray-600">
              Powerful tools to find exactly what you're looking for
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home