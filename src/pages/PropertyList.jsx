import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';
import SearchFilter from '../components/SearchFilter';
import MapView from '../components/MapView';

const PropertyList = () => {
  const location = useLocation();
  const { properties, fetchProperties, loading } = useProperty();
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filters = {
      q: queryParams.get('q') || '',
      type: queryParams.get('type') || '',
      minPrice: queryParams.get('minPrice') || '',
      maxPrice: queryParams.get('maxPrice') || '',
      bedrooms: queryParams.get('bedrooms') || '',
      bathrooms: queryParams.get('bathrooms') || '',
    };
    fetchProperties(filters);
  }, [location.search, fetchProperties]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filter */}
        <div className="md:w-1/3 lg:w-1/4">
          <SearchFilter />
        </div>

        {/* Property Display Section */}
        <div className="md:w-2/3 lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {properties.length} Properties Found
            </h2>
            <button
              onClick={() => setShowMap(!showMap)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {showMap ? 'Show List' : 'Show Map'}
            </button>
          </div>

          {loading ? (
            <div>Loading properties...</div>
          ) : showMap ? (
            <div className="h-[600px] mb-8">
              <MapView
                properties={properties}
                center={{
                  lat: properties[0]?.latitude || 0,
                  lng: properties[0]?.longitude || 0,
                }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
