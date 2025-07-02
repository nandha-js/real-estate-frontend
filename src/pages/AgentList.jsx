import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAgents } from '../services/agentService';
import { FaUser, FaPhone, FaEnvelope, FaStar } from 'react-icons/fa';

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await getAgents();
        setAgents(data);
      } catch (err) {
        setError(err.message || 'Failed to load agents.');
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  if (loading) return <div className="text-center py-12">Loading agents...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Agents</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map(agent => (
          <div
            key={agent._id || agent.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              {/* Agent Header */}
              <div className="flex items-center mb-4">
                <img
                  src={agent.photo || '/placeholder-agent.jpg'}
                  alt={agent.name || 'Agent'}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h2 className="text-xl font-bold">{agent.name || 'Unnamed Agent'}</h2>
                  <p className="text-gray-600 text-sm">{agent.title || 'Real Estate Expert'}</p>
                </div>
              </div>

              {/* Ratings */}
              <div className="flex items-center mb-2">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="font-semibold">{agent.rating || 'N/A'}</span>
                <span className="text-gray-500 ml-1">
                  ({agent.reviews ?? 0} reviews)
                </span>
              </div>

              {/* Experience */}
              <div className="flex items-center mb-2">
                <FaUser className="text-gray-500 mr-2" />
                <span>{agent.experience ?? '0'} years experience</span>
              </div>

              {/* Phone */}
              <div className="flex items-center mb-2">
                <FaPhone className="text-gray-500 mr-2" />
                <span>{agent.phone || 'N/A'}</span>
              </div>

              {/* Email */}
              <div className="flex items-center mb-4">
                <FaEnvelope className="text-gray-500 mr-2" />
                <span>{agent.email || 'Not available'}</span>
              </div>

              {/* Bio */}
              <div className="mb-4">
                <p className="text-gray-700 line-clamp-3">
                  {agent.bio || 'No bio provided.'}
                </p>
              </div>

              {/* View Profile Button */}
              <Link
                to={`/agents/${agent._id || agent.id}`}
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                aria-label={`View profile of ${agent.name}`}
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentList;
