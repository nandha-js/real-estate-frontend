import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPropertyById, updateProperty } from '../services/propertyService'
import PropertyForm from '../components/PropertyForm'
import { FaArrowLeft } from 'react-icons/fa'

const EditProperty = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id)
        setProperty(data)
      } catch (err) {
        setError('Failed to load property details.')
      } finally {
        setLoading(false)
      }
    }
    fetchProperty()
  }, [id])

  const handleSubmit = async (updatedData) => {
    try {
      await updateProperty(id, updatedData)
      navigate(`/properties/${id}`)
    } catch (err) {
      alert('Failed to update property. Please try again.')
    }
  }

  if (loading) return <div className="text-center py-12">Loading property...</div>
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>
  if (!property) return <div className="text-center py-12">Property not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Edit Property</h1>

      <PropertyForm 
        initialData={property} 
        onSubmit={handleSubmit} 
        submitLabel="Update Property"
      />
    </div>
  )
}

export default EditProperty
