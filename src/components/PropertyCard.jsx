import { Link } from 'react-router-dom';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { useProperty } from '../context/PropertyContext';

const PropertyCard = ({ property }) => {
  const { addToCompare } = useProperty();

  const formattedAddress =
    property?.location?.formattedAddress || property?.location || 'N/A';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/properties/${property._id || property.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={property.images?.[0]?.url || property.images?.[0] || '/default-property.jpg'}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm font-semibold">
            {property.type}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/properties/${property._id || property.id}`}>
          <h3 className="text-xl font-bold mb-1 hover:text-blue-600">{property.title}</h3>
        </Link>
        <div className="flex items-center text-gray-600 mb-2">
          <FaMapMarkerAlt className="mr-1" />
          <span>{formattedAddress}</span>
        </div>
        <div className="text-blue-600 font-bold text-xl mb-3">
          ${property.price.toLocaleString()}
        </div>

        <div className="flex justify-between text-gray-600 border-t border-gray-200 pt-3">
          <div className="flex items-center">
            <FaBed className="mr-1" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <FaBath className="mr-1" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <FaRulerCombined className="mr-1" />
            <span>{property.area} sqft</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <Link
            to={`/properties/${property._id || property.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={() => addToCompare(property)}
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition-colors"
          >
            Compare
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
