import { Link } from 'react-router-dom'
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa'
import { useProperty } from '../context/PropertyContext'

const PropertyCard = ({ property }) => {
  const { addToCompare } = useProperty()

  const formattedAddress =
    property?.location?.formattedAddress || property?.location || 'N/A'

  const imageUrl =
    property.images?.[0]?.url || property.images?.[0] || '/default-property.jpg'

  const price = property?.price?.toLocaleString?.() || 'N/A'

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/properties/${property._id || property.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={property.title || 'Property Image'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm font-semibold capitalize">
            {property?.type || 'Unknown'}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/properties/${property._id || property.id}`}>
          <h3 className="text-xl font-bold mb-1 hover:text-blue-600 line-clamp-1">
            {property.title || 'Untitled Property'}
          </h3>
        </Link>

        <div className="flex items-center text-gray-600 mb-2 text-sm">
          <FaMapMarkerAlt className="mr-1" />
          <span className="line-clamp-1">{formattedAddress}</span>
        </div>

        <div className="text-blue-600 font-bold text-xl mb-3">${price}</div>

        <div className="flex justify-between text-gray-600 border-t border-gray-200 pt-3 text-sm">
          <div className="flex items-center gap-1">
            <FaBed />
            <span>{property.bedrooms || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaBath />
            <span>{property.bathrooms || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRulerCombined />
            <span>{property.area || 0} sqft</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <Link
            to={`/properties/${property._id || property.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
          >
            View Details
          </Link>
          <button
            onClick={() => addToCompare(property)}
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition-colors text-sm"
          >
            Compare
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
