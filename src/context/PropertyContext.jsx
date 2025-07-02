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

/**
 * Provider component to manage property-related global state
 */
export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch all properties based on filter criteria
   * @param {Object} filters - Filtering options
   */
  const fetchProperties = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const data = await getProperties(filters);
      setProperties(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError(err?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch individual property details
   * @param {string} id - Property ID
   * @returns {Object} - Property details
   */
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

  /**
   * Add property to comparison list (max 3)
   * @param {Object} property - Property to add
   */
  const addToCompare = useCallback((property) => {
    setSelectedProperties((prev) => {
      if (
        prev.length < 3 &&
        !prev.some((p) => p.id === property.id)
      ) {
        return [...prev, property];
      }
      return prev;
    });
  }, []);

  /**
   * Remove property from comparison list
   * @param {string} propertyId - Property ID to remove
   */
  const removeFromCompare = useCallback((propertyId) => {
    setSelectedProperties((prev) =>
      prev.filter((p) => p.id !== propertyId)
    );
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        selectedProperties,
        loading,
        error,
        fetchProperties,
        fetchPropertyDetails,
        addToCompare,
        removeFromCompare
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

/**
 * Custom hook to access property context
 */
export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};
