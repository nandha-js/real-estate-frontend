import { useProperty } from '../context/PropertyContext'
import { FaTimes } from 'react-icons/fa'
import PropertyCard from '../components/PropertyCard'
import { Link } from 'react-router-dom'
import React from 'react'

const CompareProperties = () => {
  const { selectedProperties, removeFromCompare } = useProperty()

  if (selectedProperties.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Compare Properties</h1>
        <p className="text-gray-600 mb-6">You haven't selected any properties to compare yet.</p>
        <Link 
          to="/properties"
          className="inline-block bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          Browse Properties
        </Link>
      </div>
    )
  }

  const featuresToCompare = [
    'price', 'type', 'bedrooms', 'bathrooms', 'area', 'yearBuilt', 'location'
  ]

  const formatFeatureName = (feature) => {
    return feature
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Compare Properties</h1>
      
      <div className="overflow-x-auto">
        <div 
          className="grid gap-4" 
          style={{ gridTemplateColumns: `repeat(${selectedProperties.length + 1}, minmax(250px, 1fr))` }}
        >
          {/* Header Row */}
          <div className="border p-4 bg-gray-100 font-semibold">Features</div>
          {selectedProperties.map(property => (
            <div key={`property-${property.id}`} className="border p-4 bg-gray-100 relative">
              <button 
                onClick={() => removeFromCompare(property.id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              >
                <FaTimes />
              </button>
              <PropertyCard property={property} compact />
            </div>
          ))}

          {/* Feature Rows */}
          {featuresToCompare.map(feature => (
            <React.Fragment key={feature}>
              <div className="border p-4 bg-gray-50 font-medium">
                {formatFeatureName(feature)}
              </div>
              {selectedProperties.map(property => (
                <div key={`${property.id}-${feature}`} className="border p-4">
                  {feature === 'price'
                    ? `$${Number(property[feature]).toLocaleString()}`
                    : property[feature] || 'N/A'}
                </div>
              ))}
            </React.Fragment>
          ))}

          {/* Amenities Row */}
          <div className="border p-4 bg-gray-50 font-medium">Amenities</div>
          {selectedProperties.map(property => (
            <div key={`${property.id}-amenities`} className="border p-4">
              {Array.isArray(property.amenities) && property.amenities.length > 0 ? (
                <ul className="list-disc pl-5">
                  {property.amenities.slice(0, 5).map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                  {property.amenities.length > 5 && (
                    <li>+{property.amenities.length - 5} more</li>
                  )}
                </ul>
              ) : (
                <p className="text-gray-500">No amenities listed</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CompareProperties
