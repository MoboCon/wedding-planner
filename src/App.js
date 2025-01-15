// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pagini
import Home from './pages/Home';
import MyWedding from './pages/MyWedding';
import FindLocation from './pages/FindLocation';
import FindPhotographer from './pages/FindPhotographer';
import FindMusicBand from './pages/FindMusicBand';
import FindEntertainment from './pages/FindEntertainment';
import FindDecoration from './pages/FindDecoration';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-pastel-pattern">
        {/* Navbar */}
        <Navbar />

        {/* Conținut */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-wedding" element={<MyWedding />} />
            <Route path="/find-location" element={<FindLocation />} />
            <Route path="/find-photographer" element={<FindPhotographer />} />
            <Route path="/find-music-band" element={<FindMusicBand />} />
            <Route path="/find-entertainment" element={<FindEntertainment />} />
            <Route path="/find-decoration" element={<FindDecoration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
