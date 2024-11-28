import React, { useState } from 'react';
import { 
  Search, 
  Home, 
  MapPin, 
  DollarSign, 
  Phone, 
  Mail, 
  Check,
  ArrowRight,
  Star,
  Building,
  Bed,
  Bath,
  Square
} from 'lucide-react';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredProperties = [
    {
      id: 1,
      title: 'Modern Villa with Ocean View',
      price: '$1,250,000',
      location: 'Miami Beach, FL',
      beds: 4,
      baths: 3,
      sqft: 2800,
      image: '/api/placeholder/800/600'
    },
    {
      id: 2,
      title: 'Luxury Downtown Apartment',
      price: '$850,000',
      location: 'Manhattan, NY',
      beds: 3,
      baths: 2,
      sqft: 1800,
      image: '/api/placeholder/800/600'
    },
    {
      id: 3,
      title: 'Contemporary Family Home',
      price: '$750,000',
      location: 'Los Angeles, CA',
      beds: 5,
      baths: 4,
      sqft: 3200,
      image: '/api/placeholder/800/600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
     

      {/* Hero Section */}
      <div className="relative bg-gray-900 h-[600px]">
        <img 
          src="../../public/main.jpg" 
          alt="Hero" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-6xl text-white font-bold text-center mb-6">
            Find Your Dream Home Today
          </h1>
          <p className="text-xl text-white text-center mb-8">
            Discover the perfect property in your favorite location
          </p>
         
        </div>
      </div>

     
      {/* Features Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl text-center">
              <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Wide Range of Properties</h3>
              <p className="text-gray-600">Explore our extensive collection of properties to find your perfect match</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center">
              <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Top Rated Agents</h3>
              <p className="text-gray-600">Work with experienced professionals who understand your needs</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center">
              <Check className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Easy Process</h3>
              <p className="text-gray-600">Streamlined buying and selling process with expert guidance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-blue-600 rounded-xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-white mb-6">
                Contact us today and let our experts help you find the perfect property
              </p>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center text-white">
                  <Phone className="h-6 w-6 mr-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-white">
                  <Mail className="h-6 w-6 mr-3" />
                  <span>contact@dreamhome.com</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border rounded-lg"
                />
                <textarea
                  placeholder="Message"
                  rows="4"
                  className="w-full p-3 border rounded-lg"
                ></textarea>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Home className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold">DreamHome</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner in finding the perfect property
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Properties</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Agents</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Properties</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Houses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Apartments</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Villas</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Commercial</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">123 Real Estate Ave</li>
                <li className="text-gray-400">New York, NY 10001</li>
                <li className="text-gray-400">+1 (555) 123-4567</li>
                <li className="text-gray-400">contact@dreamhome.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DreamHome. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;