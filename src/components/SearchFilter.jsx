import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

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

    if (searchTerm.trim()) queryParams.append('q', searchTerm.trim())
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value)
    })

    navigate(`/properties?${queryParams.toString()}`)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSearch}>
        <div className="mb-4">
          <label htmlFor="search" className="block text-gray-700 font-medium mb-2">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              placeholder="Enter location, type, etc."
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <SelectInput
            id="type"
            label="Property Type"
            value={filters.type}
            onChange={(value) => setFilters({ ...filters, type: value })}
            options={[
              { value: '', label: 'All Types' },
              { value: 'house', label: 'House' },
              { value: 'apartment', label: 'Apartment' },
              { value: 'condo', label: 'Condo' },
              { value: 'land', label: 'Land' },
            ]}
          />
          <SelectInput
            id="bedrooms"
            label="Bedrooms"
            value={filters.bedrooms}
            onChange={(value) => setFilters({ ...filters, bedrooms: value })}
            options={[
              { value: '', label: 'Any' },
              { value: '1', label: '1+' },
              { value: '2', label: '2+' },
              { value: '3', label: '3+' },
              { value: '4', label: '4+' },
              { value: '5', label: '5+' },
            ]}
          />
          <SelectInput
            id="bathrooms"
            label="Bathrooms"
            value={filters.bathrooms}
            onChange={(value) => setFilters({ ...filters, bathrooms: value })}
            options={[
              { value: '', label: 'Any' },
              { value: '1', label: '1+' },
              { value: '2', label: '2+' },
              { value: '3', label: '3+' },
              { value: '4', label: '4+' },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <NumberInput
            id="minPrice"
            label="Min Price"
            placeholder="$ Min"
            value={filters.minPrice}
            onChange={(value) => setFilters({ ...filters, minPrice: value })}
          />
          <NumberInput
            id="maxPrice"
            label="Max Price"
            placeholder="$ Max"
            value={filters.maxPrice}
            onChange={(value) => setFilters({ ...filters, maxPrice: value })}
          />
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

// Reusable input components
const SelectInput = ({ id, label, value, onChange, options }) => (
  <div>
    <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
      {label}
    </label>
    <select
      id={id}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
)

const NumberInput = ({ id, label, placeholder, value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
      {label}
    </label>
    <input
      type="number"
      id={id}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
)

export default SearchFilter
