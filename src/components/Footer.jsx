import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">DreamHome</h3>
            <p className="text-gray-400">
              Finding your dream home has never been easier. Browse thousands of properties across the country.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick Links">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/properties" className="text-gray-400 hover:text-white">Properties</Link></li>
              <li><Link to="/agents" className="text-gray-400 hover:text-white">Agents</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services/buy" className="text-gray-400 hover:text-white">Buy Property</Link></li>
              <li><Link to="/services/sell" className="text-gray-400 hover:text-white">Sell Property</Link></li>
              <li><Link to="/services/rent" className="text-gray-400 hover:text-white">Rent Property</Link></li>
              <li><Link to="/services/valuation" className="text-gray-400 hover:text-white">Property Valuation</Link></li>
            </ul>
          </nav>

          {/* Socials */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaFacebook size={20} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaLinkedin size={20} /></a>
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
