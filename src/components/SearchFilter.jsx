import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaHome, FaBuilding, FaHotel } from 'react-icons/fa'

const SearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: ''
  })
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    const queryParams = new URLSearchParams()
    
    if (searchTerm) queryParams.append('q', searchTerm)
    if (filters.type) queryParams.append('type', filters.type)
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice)
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice)
    if (filters.bedrooms) queryParams.append('bedrooms', filters.bedrooms)
    if (filters.bathrooms) queryParams.append('bathrooms', filters.bathrooms)

    navigate(`/properties?${queryParams.toString()}`)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSearch}>
        <div className="mb-4">
          <label htmlFor="search" className="block text-gray-700 font-medium mb-2">Search</label>
          <div className="relative">
            <input
              type="text"
              id="search"
              placeholder="Enter location, property type, etc."
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="type" className="block text-gray-700 font-medium mb-2">Property Type</label>
            <select
              id="type"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
            >
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
            </select>
          </div>

          <div>
            <label htmlFor="bedrooms" className="block text-gray-700 font-medium mb-2">Bedrooms</label>
            <select
              id="bedrooms"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.bedrooms}
              onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          <div>
            <label htmlFor="bathrooms" className="block text-gray-700 font-medium mb-2">Bathrooms</label>
            <select
              id="bathrooms"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.bathrooms}
              onChange={(e) => setFilters({...filters, bathrooms: e.target.value})}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="minPrice" className="block text-gray-700 font-medium mb-2">Min Price</label>
            <input
              type="number"
              id="minPrice"
              placeholder="$ Min"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.minPrice}
              onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="maxPrice" className="block text-gray-700 font-medium mb-2">Max Price</label>
            <input
              type="number"
              id="maxPrice"
              placeholder="$ Max"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.maxPrice}
              onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <FaSearch className="mr-2" />
          Search Properties
        </button>
      </form>
    </div>
  )
}

export default SearchFilter