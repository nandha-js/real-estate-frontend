import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DreamHome</h3>
            <p className="text-gray-400">
              Finding your dream home has never been easier. Browse thousands of properties across the country.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/properties" className="text-gray-400 hover:text-white">Properties</a></li>
              <li><a href="/agents" className="text-gray-400 hover:text-white">Agents</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Buy Property</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Sell Property</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Rent Property</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Property Valuation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><FaFacebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaLinkedin size={20} /></a>
            </div>
            <p className="mt-4 text-gray-400">
              © {new Date().getFullYear()} DreamHome. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer