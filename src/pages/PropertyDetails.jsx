import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaShare,
  FaHeart,
} from 'react-icons/fa';
import ContactForm from '../components/ContactForm';
import MapView from '../components/MapView';

const PropertyDetails = () => {
  const { id } = useParams();
  const { fetchPropertyDetails } = useProperty();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const data = await fetchPropertyDetails(id);
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProperty();
  }, [id, fetchPropertyDetails]);

  if (loading)
    return <div className="text-center py-12">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-12 text-red-600">{error}</div>
    );
  if (!property)
    return <div className="text-center py-12">Property not found</div>;

  const images = property.images || [];
  const amenities = property.amenities || [];
  const agent = property.agent || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="lg:w-2/3">
          {/* Title & Info */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <FaMapMarkerAlt className="mr-2" />
              <span>
                {property.address}, {property.city}, {property.state}{' '}
                {property.zipCode}
              </span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-blue-600">
                ${property.price.toLocaleString()}
              </span>
              <div className="flex space-x-4">
                <button className="text-gray-500 hover:text-blue-600">
                  <FaShare size={20} />
                </button>
                <button
                  className={`${
                    isFavorite ? 'text-red-500' : 'text-gray-500'
                  } hover:text-red-500`}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <FaHeart size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-8">
            <div className="h-96 w-full mb-4 rounded-lg overflow-hidden">
              <img
                src={images[activeImage] || '/placeholder-property.jpg'}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`h-20 overflow-hidden rounded ${
                    activeImage === index
                      ? 'ring-2 ring-blue-500'
                      : ''
                  }`}
                >
                  <img
                    src={img}
                    alt={`Property ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Description & Features */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 mb-6">{property.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <FaBed className="mx-auto text-2xl mb-2 text-blue-600" />
                <p className="font-semibold">{property.bedrooms} Bedrooms</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <FaBath className="mx-auto text-2xl mb-2 text-blue-600" />
                <p className="font-semibold">{property.bathrooms} Bathrooms</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <FaRulerCombined className="mx-auto text-2xl mb-2 text-blue-600" />
                <p className="font-semibold">{property.area} sqft</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-2xl mb-2 text-blue-600">
                  {property.yearBuilt}
                </p>
                <p className="font-semibold">Year Built</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Amenities</h3>
              {amenities.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No amenities listed.</p>
              )}
            </div>
          </div>

          {/* Map Section */}
          <div className="h-96 mb-8">
            <h2 className="text-2xl font-bold mb-4">Location</h2>
            <MapView
              properties={[property]}
              center={{ lat: property.latitude, lng: property.longitude }}
              zoom={15}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/3">
          <div className="sticky top-4 space-y-6">
            {/* Agent Info */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Contact Agent</h3>
              <div className="flex items-center mb-4">
                <img
                  src={agent.photo || '/placeholder-agent.jpg'}
                  alt={agent.name || 'Agent'}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">{agent.name || 'Unknown Agent'}</h4>
                  <p className="text-gray-600">{agent.company || 'N/A'}</p>
                  <p className="text-sm text-gray-500">
                    {agent.phone || 'Phone not available'}
                  </p>
                </div>
              </div>
              {agent.id && (
                <Link
                  to={`/agents/${agent.id}`}
                  className="text-blue-600 hover:underline mb-4 inline-block"
                >
                  View agent profile
                </Link>
              )}
            </div>

            {/* Contact Form */}
            <ContactForm propertyId={property._id} agentId={agent.id} />

            {/* Schedule Button */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Schedule a Tour</h3>
              <p className="mb-4">
                Interested in viewing this property? Schedule a tour with the
                agent.
              </p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Schedule Viewing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
