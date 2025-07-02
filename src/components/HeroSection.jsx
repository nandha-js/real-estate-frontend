// src/components/HeroSection.jsx
import { FaSearch, FaHome, FaMapMarkerAlt } from 'react-icons/fa'

const HeroSection = () => {
  return (
    <div className="relative bg-blue-800 text-white py-20">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Home</h1>
          <p className="text-xl mb-8">
            Discover the perfect property that matches your lifestyle and budget
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-800 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
              <FaSearch />
              Browse Properties
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-white hover:text-blue-800 transition-colors">
              <FaMapMarkerAlt />
              Explore Locations
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection