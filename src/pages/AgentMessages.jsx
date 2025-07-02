import { useEffect, useState } from 'react';
import { getAgentMessages } from '../services/agentService';
import { FaEnvelopeOpenText, FaUser, FaHome } from 'react-icons/fa';

const AgentMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getAgentMessages(); // You must define this in agentService.js
        setMessages(data);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <div className="text-center py-12">Loading messages...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <FaEnvelopeOpenText className="text-blue-500" />
        Property Inquiries
      </h1>

      {messages.length === 0 ? (
        <div className="text-center text-gray-500">No inquiries yet.</div>
      ) : (
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FaUser className="text-gray-500" />
                  {msg.user?.name || 'Unknown User'}
                </h2>
                <p className="text-gray-600 text-sm">{msg.user?.email}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-md font-semibold flex items-center gap-2">
                  <FaHome className="text-green-500" />
                  Regarding: {msg.property?.title || 'Property Info Missing'}
                </h3>
                <p className="text-gray-500 text-sm">
                  Property ID: {msg.property?._id || 'N/A'}
                </p>
              </div>

              <div className="bg-gray-100 p-4 rounded">
                <p className="text-gray-700">{msg.message || 'No message content'}</p>
              </div>

              <div className="text-right mt-2 text-sm text-gray-400">
                {new Date(msg.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentMessages;
