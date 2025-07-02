import { useState } from 'react'
import { FaPaperPlane, FaUser, FaEnvelope, FaPhone, FaComment } from 'react-icons/fa'

const ContactForm = ({ propertyId, agentId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', { ...formData, propertyId, agentId })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
        <p>Thank you for your inquiry! We'll get back to you soon.</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Contact Agent</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
            />
            <FaUser className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
            />
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 mb-2">Phone (optional)</label>
          <div className="relative">
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.phone}
              onChange={handleChange}
            />
            <FaPhone className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              required
              rows="4"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.message}
              onChange={handleChange}
            />
            <FaComment className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <FaPaperPlane className="mr-2" />
          Send Message
        </button>
      </form>
    </div>
  )
}

export default ContactForm