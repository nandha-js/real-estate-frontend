import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAgentDetails, getAgentProperties } from '../services/agentService'
import PropertyCard from '../components/PropertyCard'
import { FaStar, FaPhone, FaEnvelope, FaUser, FaHome, FaChartLine } from 'react-icons/fa'

const AgentProfile = () => {
  const { id } = useParams()
  const [agent, setAgent] = useState(null)
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        setLoading(true)
        const [agentData, agentProperties] = await Promise.all([
          getAgentDetails(id),
          getAgentProperties(id)
        ])
        setAgent(agentData)
        setProperties(agentProperties)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }
    fetchAgentData()
  }, [id])

  if (loading) return <div className="text-center py-12">Loading agent profile...</div>
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>
  if (!agent) return <div className="text-center py-12">Agent not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Agent Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <div className="flex flex-col items-center mb-6">
              <img 
                src={agent.photo || '/placeholder-agent.jpg'} 
                alt={agent.name} 
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <h1 className="text-2xl font-bold text-center">{agent.name}</h1>
              <p className="text-gray-600 text-sm text-center">{agent.title}</p>
              <p className="text-gray-600 text-sm text-center">{agent.company}</p>
            </div>
            
            <div className="mb-6 space-y-2">
              <div className="flex items-center justify-center">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="font-semibold">{agent.rating}</span>
                <span className="text-gray-500 ml-1">({agent.reviews} reviews)</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FaUser className="mr-2" />
                <span>{agent.experience} years experience</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FaHome className="mr-2" />
                <span>{properties.length} properties listed</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FaChartLine className="mr-2" />
                <span>
                  {(agent.specializations || []).join(', ') || 'Not specified'}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center">
                <FaPhone className="text-gray-500 mr-2" />
                <span>{agent.phone}</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-gray-500 mr-2" />
                <span>{agent.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Main Content */}
        <div className="lg:w-2/3">
          {/* About Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">About {agent.name}</h2>
            <p className="text-gray-700 leading-relaxed">{agent.bio || 'No biography available.'}</p>
          </div>

          {/* Areas Served */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Areas Served</h2>
            {agent.areasServed && agent.areasServed.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {agent.areasServed.map((area, idx) => (
                  <span key={idx} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                    {area}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No areas specified.</p>
            )}
          </div>

          {/* Property Listings */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Listings ({properties.length})</h2>
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map(property => (
                  <PropertyCard key={property._id || property.id} property={property} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No properties currently listed by this agent.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentProfile
