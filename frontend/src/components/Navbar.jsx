import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation(); // Get the current URL path

  // Function to determine if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white text-gray-700 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="SkillConnect Logo" className="h-8" />
          <div className="px-2">Loconomi</div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className={`relative ${
              isActive('/') ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
            } transition-colors duration-200`}
          >
            Home
            {isActive('/') && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
            )}
          </Link>
          <Link
            to="/about"
            className={`relative ${
              isActive('/about') ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
            } transition-colors duration-200`}
          >
            About
            {isActive('/about') && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
            )}
          </Link>
          <Link
            to="/services"
            className={`relative ${
              isActive('/services') ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
            } transition-colors duration-200`}
          >
            Services
            {isActive('/services') && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
            )}
          </Link>
          <Link
            to="/contact"
            className={`relative ${
              isActive('/contact') ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
            } transition-colors duration-200`}
          >
            Contact
            {isActive('/contact') && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
            )}
          </Link>
        </div>

        {/* Login/Sign Up Buttons */}
        <div className="flex space-x-4">
          <Link to="/login" className="hover:text-blue-600 py-2">
            Login
          </Link>
          <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;