import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaHeart,
  FaMapMarkerAlt,
  FaCamera,
  FaMusic,
  FaPaintBrush,
  FaTheaterMasks,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md z-50 relative">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-pink-600">
          Wedding Planner
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 font-semibold">
          <Link to="/" className="flex items-center gap-1 hover:text-pink-600 transition">
            <FaHome /> Home
          </Link>
          <Link to="/my-wedding" className="flex items-center gap-1 hover:text-pink-600 transition">
            <FaHeart /> My Wedding
          </Link>
          <Link to="/find-location" className="flex items-center gap-1 hover:text-pink-600 transition">
            <FaMapMarkerAlt /> Find Location
          </Link>
          <Link to="/find-photographer" className="flex items-center gap-1 hover:text-pink-600 transition">
            <FaCamera /> Photographer
          </Link>
          <Link to="/find-music-band" className="flex items-center gap-1 hover:text-pink-600 transition">
            <FaMusic /> Music
          </Link>
          <Link to="/find-entertainment" className="flex items-center gap-1 hover:text-pink-600 transition">
            <FaTheaterMasks /> Entertainment
          </Link>
          <Link to="/find-decoration" className="flex items-center gap-1 hover:text-pink-600 transition">
            <FaPaintBrush /> Decoration
          </Link>
          <Link to="/login" className="flex items-center gap-1 hover:text-pink-600 transition">
            <FaSignInAlt /> Login
          </Link>
          <Link to="/register" className="flex items-center gap-1 hover:text-pink-600 transition">
            <FaUserPlus /> Register
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center text-gray-800"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="space-y-4 py-4 px-6 font-semibold">
            <li>
              <Link to="/" className="block hover:text-pink-600 transition">
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/my-wedding" className="block hover:text-pink-600 transition">
                <FaHeart /> My Wedding
              </Link>
            </li>
            <li>
              <Link to="/find-location" className="block hover:text-pink-600 transition">
                <FaMapMarkerAlt /> Find Location
              </Link>
            </li>
            <li>
              <Link to="/find-photographer" className="block hover:text-pink-600 transition">
                <FaCamera /> Photographer
              </Link>
            </li>
            <li>
              <Link to="/find-music-band" className="block hover:text-pink-600 transition">
                <FaMusic /> Music
              </Link>
            </li>
            <li>
              <Link to="/find-entertainment" className="block hover:text-pink-600 transition">
                <FaTheaterMasks /> Entertainment
              </Link>
            </li>
            <li>
              <Link to="/find-decoration" className="block hover:text-pink-600 transition">
                <FaPaintBrush /> Decoration
              </Link>
            </li>
            <li>
              <Link to="/login" className="block hover:text-pink-600 transition">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="block hover:text-pink-600 transition">
                <FaUserPlus /> Register
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
