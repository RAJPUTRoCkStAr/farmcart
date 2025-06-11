import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-green-500 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-green-400">FarmCart</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Connecting farmers directly with consumers, bringing fresh, organic produce and handmade goods from rural communities to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/products" className="block text-gray-300 hover:text-green-400 transition-colors text-sm">
                All Products
              </Link>
              <Link to="/products/vegetables" className="block text-gray-300 hover:text-green-400 transition-colors text-sm">
                Vegetables
              </Link>
              <Link to="/products/fruits" className="block text-gray-300 hover:text-green-400 transition-colors text-sm">
                Fruits
              </Link>
              <Link to="/products/dairy" className="block text-gray-300 hover:text-green-400 transition-colors text-sm">
                Dairy Products
              </Link>
              <Link to="/products/handmade" className="block text-gray-300 hover:text-green-400 transition-colors text-sm">
                Handmade Goods
              </Link>
            </div>
          </div>

          {/* For Sellers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Sellers</h3>
            <div className="space-y-2">
              <Link to="/register" className="block text-gray-300 hover:text-green-400 transition-colors text-sm">
                Become a Seller
              </Link>
              <Link to="/seller-dashboard" className="block text-gray-300 hover:text-green-400 transition-colors text-sm">
                Seller Dashboard
              </Link>
              <a href="#" className="block text-gray-300 hover:text-green-400 transition-colors text-sm">
                Seller Guidelines
              </a>
              <a href="#" className="block text-gray-300 hover:text-green-400 transition-colors text-sm">
                Marketing Support
              </a>
              <a href="#" className="block text-gray-300 hover:text-green-400 transition-colors text-sm">
                Success Stories
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Farm Street, Agriculture City, AC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">support@farmcart.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 FarmCart. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                Return Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;