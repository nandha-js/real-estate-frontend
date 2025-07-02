import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAgentDetails } from '../services/agentService'
import ContactForm from '../components/ContactForm'
import { FaArrowLeft, FaUser, FaPhone, FaEnvelope, FaHome, FaStar } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const ContactAgent = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [agent, setAgent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const agentData = await getAgentDetails(id)
        setAgent(agentData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAgent()
  }, [id])

  if (loading) return <div className="text-center py-12">Loading agent information...</div>
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>
  if (!agent) return <div className="text-center py-12">Agent not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back to Agent Profile
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <div className="flex flex-col items-center mb-6">
              <img 
                src={agent.photo || '/placeholder-agent.jpg'} 
                alt={agent.name} 
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-100"
              />
              <h1 className="text-2xl font-bold text-center">{agent.name}</h1>
              <p className="text-gray-600 text-center">{agent.title}</p>
              <p className="text-gray-600 text-center">{agent.company}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-center mb-3">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="font-semibold">{agent.rating}</span>
                <span className="text-gray-500 ml-1">({agent.reviews} reviews)</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <FaUser className="text-gray-500 mr-3" />
                  <span>{agent.experience} years experience</span>
                </div>
                
                <div className="flex items-center">
                  <FaHome className="text-gray-500 mr-3" />
                  <span>Specializes in: {agent.specializations.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <FaPhone className="text-gray-500 mr-3" />
                <span>{agent.phone}</span>
              </div>
              
              <div className="flex items-center">
                <FaEnvelope className="text-gray-500 mr-3" />
                <span>{agent.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Contact {agent.name}</h2>
            <p className="text-gray-600 mb-6">
              Fill out the form below to send a message to {agent.name}. They will get back to you as soon as possible.
            </p>

            <ContactForm agentId={agent.id} />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">About {agent.name}</h3>
            <p className="text-gray-700 mb-4">{agent.bio}</p>
            
            <h4 className="font-bold mb-2">Areas Served:</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {agent.areasServed.map((area, index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {area}
                </span>
              ))}
            </div>

            {user && user.role === 'agent' && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-2">Agent Notes</h4>
                <p className="text-blue-700">
                  Since you're also an agent, you might want to discuss partnership opportunities or property referrals.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactAgent