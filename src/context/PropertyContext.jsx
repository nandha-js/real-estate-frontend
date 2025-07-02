import React, {
  createContext,
  useState,
  useContext,
  useCallback
} from 'react';
import {
  getProperties,
  getPropertyDetails
} from '../services/propertyService';

const PropertyContext = createContext(null);

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProperties = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const data = await getProperties(filters);
      setProperties(data.data); // ✅ fixed here
      setError(null);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError(err?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPropertyDetails = useCallback(async (id) => {
    setLoading(true);
    try {
      const data = await getPropertyDetails(id);
      setError(null);
      return data;
    } catch (err) {
      console.error('Error fetching property details:', err);
      setError(err?.message || 'Something went wrong.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        loading,
        error,
        fetchProperties,
        fetchPropertyDetails
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};
