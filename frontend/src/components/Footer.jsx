import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Logo or Brand Name */}
        <div className="text-xl font-semibold text-gray-900 dark:text-white">
          YourBrand
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-gray-600 dark:text-gray-400">
          <Link to="/features" className="hover:text-gray-900 dark:hover:text-white transition">
            Features
          </Link>
          <Link to="/pricing" className="hover:text-gray-900 dark:hover:text-white transition">
            Pricing
          </Link>
          <Link to="/about" className="hover:text-gray-900 dark:hover:text-white transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-900 dark:hover:text-white transition">
            Contact
          </Link>
        </nav>

        {/* Social Icons */}
        <div className="flex space-x-6">
          <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition">
            {/* Twitter SVG... */}
          </a>
          <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
            {/* GitHub SVG... */}
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-700 transition">
            {/* LinkedIn SVG... */}
          </a>
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm py-4 border-t border-gray-200 dark:border-gray-700">
        &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
