const API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;

export const geocodeAddress = async (address) => {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch geocoding data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
};
