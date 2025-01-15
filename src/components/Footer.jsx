// src/components/Footer.jsx
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-pink-50 border-t border-pink-200 py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-gray-600 mb-4 md:mb-0 animate__animated animate__fadeInLeft">
          © {new Date().getFullYear()} WeddingPlanner. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a href="https://facebook.com"
             className="text-pink-600 hover:text-pink-400 transition transform hover:scale-110"
             aria-label="Facebook"
          >
            <FaFacebookF size={20} />
          </a>
          <a href="https://instagram.com"
             className="text-pink-600 hover:text-pink-400 transition transform hover:scale-110"
             aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a href="https://twitter.com"
             className="text-pink-600 hover:text-pink-400 transition transform hover:scale-110"
             aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
