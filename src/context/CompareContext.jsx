import { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext();

/**
 * CompareProvider manages the global state for property comparison
 */
export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('compareList');
    if (saved) {
      setCompareList(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (property) => {
    if (compareList.find((item) => item._id === property._id || item.id === property.id)) return;
    if (compareList.length >= 3) {
      alert('You can compare up to 3 properties only.');
      return;
    }
    setCompareList((prev) => [...prev, property]);
  };

  const removeFromCompare = (propertyId) => {
    setCompareList((prev) =>
      prev.filter((p) => p._id !== propertyId && p.id !== propertyId)
    );
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};

/**
 * useCompare - Custom hook to access comparison context
 */
export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
