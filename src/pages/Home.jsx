// Home.jsx – Carusel cu Framer Motion + Responsive Avansat

import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const carouselData = [
  {
    id: 1,
    image: 'https://via.placeholder.com/1200x500?text=Oferta+Speciala+1',
    title: 'Oferta Specială 1',
    subtitle: 'Pachete foto-video cu 20% reducere',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/1200x500?text=Oferta+Speciala+2',
    title: 'Oferta Specială 2',
    subtitle: 'Decorațiuni florale la preț de producător',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/1200x500?text=Oferta+Speciala+3',
    title: 'Oferta Specială 3',
    subtitle: 'Trupe live cu discount la rezervare timpurie',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-4xl overflow-hidden rounded shadow">
        {carouselData.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute w-full h-full"
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
            <div className="absolute bottom-4 left-6 text-white drop-shadow-md">
              <h2 className="text-2xl md:text-3xl font-bold">{slide.title}</h2>
              <p className="text-sm md:text-base">{slide.subtitle}</p>
            </div>
          </motion.div>
        ))}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-pink-500 text-white p-2 rounded-full shadow hover:bg-pink-400"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-pink-500 text-white p-2 rounded-full shadow hover:bg-pink-400"
        >
          <FaArrowRight />
        </button>
      </div>

      <div className="max-w-4xl w-full mt-10 px-4 text-center">
        <h1 className="text-4xl font-serif text-pink-700 mb-4">
          Bun venit la Wedding Planner
        </h1>
        <p className="text-gray-600">
          Aici vei găsi tot ce ai nevoie pentru a-ți organiza nunta perfectă: 
          locații de vis, fotografi profesioniști, muzică live, decorațiuni 
          și multe altele. Profită de ofertele noastre și bucură-te de un 
          plan complet și ușor de gestionat.
        </p>
      </div>
    </div>
  );
}
