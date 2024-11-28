import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, LogIn, UserPlus, Menu, X, Home } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" />, type: 'user' },
    { name: 'Login', path: '/login', icon: <LogIn className="w-4 h-4" />, type: 'user' },
    { name: 'Agent Login', path: '/agent/login', icon: <UserPlus className="w-4 h-4" />, type: 'agent' },
  ];

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <Building2 className="h-8 w-8" />
              <span className="text-xl font-bold">Real Estate Platform</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <div className="flex space-x-2">
              {/* User Authentication */}
              <div className="flex items-center space-x-2">
                {navLinks.filter(link => link.type === 'user').map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center space-x-1 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="w-px bg-blue-400 mx-2"></div>

              {/* Agent Authentication */}
              <div className="flex items-center space-x-2">
                {navLinks.filter(link => link.type === 'agent').map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center space-x-1 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-blue-600`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* User Authentication Mobile */}
          <div className="border-b border-blue-500 pb-2 mb-2">
            {navLinks.filter(link => link.type === 'user').map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center space-x-2 text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Agent Authentication Mobile */}
          <div>
            {navLinks.filter(link => link.type === 'agent').map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center space-x-2 text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;