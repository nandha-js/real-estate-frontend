import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    images: [],
    // lat and lng will be added dynamically after geocoding
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setFormData((prev) => ({
        ...prev,
        images: files,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const geocodeAddress = async (address) => {
    const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${apiKey}`;

    const response = await axios.get(url);
    if (
      response.data &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      const { lat, lng } = response.data.results[0].geometry;
      return { lat, lng };
    }
    throw new Error('Unable to get coordinates for this address');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const fullAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`;
      const { lat, lng } = await geocodeAddress(fullAddress);

      // Prepare form data with coordinates
      const payload = new FormData();
      for (const key in formData) {
        if (key === 'images') {
          for (let i = 0; i < formData.images.length; i++) {
            payload.append('images', formData.images[i]);
          }
        } else {
          payload.append(key, formData[key]);
        }
      }
      payload.append('latitude', lat);
      payload.append('longitude', lng);

      // Send to your backend API
      await axios.post(`${API_BASE_URL}/properties`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/properties');
    } catch (err) {
      setError(err.message || 'Failed to add property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Property</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Address fields */}
        <input
          type="text"
          name="address"
          placeholder="Address"
          required
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          required
          value={formData.city}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          required
          value={formData.state}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          required
          value={formData.zipCode}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Other property details */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          required
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          required
          value={formData.bedrooms}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="bathrooms"
          placeholder="Bathrooms"
          required
          value={formData.bathrooms}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="area"
          placeholder="Area (sqft)"
          required
          value={formData.area}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          required
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Images */}
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Adding...' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
