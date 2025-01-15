// FindLocation.jsx – Versiune mai dezvoltată, cu city filter, rating filter, recenzii (rating la recenzie), slideshow, favorite și contact

import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';

// Mock Data (exemplu)
const mockLocations = [
  {
    id: 1,
    name: 'Restaurant Elegant',
    city: 'București',
    baseRating: 4.5, // rating inițial
    price: '$$$',
    images: [
      'https://via.placeholder.com/600x300?text=Loc+1.1',
      'https://via.placeholder.com/600x300?text=Loc+1.2',
    ],
    reviews: [], // { text, date, userRating }
  },
  {
    id: 2,
    name: 'Grădină Rustică',
    city: 'Cluj',
    baseRating: 4.2,
    price: '$$',
    images: [
      'https://via.placeholder.com/600x300?text=Loc+2.1',
      'https://via.placeholder.com/600x300?text=Loc+2.2',
    ],
    reviews: [],
  },
  {
    id: 3,
    name: 'Conac Boieresc',
    city: 'București',
    baseRating: 4.7,
    price: '$$$',
    images: [
      'https://via.placeholder.com/600x300?text=Loc+3.1',
      'https://via.placeholder.com/600x300?text=Loc+3.2',
    ],
    reviews: [],
  },
];

export default function FindLocation() {
  const [locations, setLocations] = useState([]);
  const [slideIndex, setSlideIndex] = useState({}); 
  const [reviewText, setReviewText] = useState('');
  const [reviewUserRating, setReviewUserRating] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('fav_locations_adv');
    return saved ? JSON.parse(saved) : [];
  });
  const [contactOpen, setContactOpen] = useState(null);
  const [messageText, setMessageText] = useState('');

  // Filtre
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('Orice oraș');
  const [sortBy, setSortBy] = useState('ratingDesc'); // ratingDesc, ratingAsc, nameAsc, nameDesc

  // Citi mock data + recenzii salvate
  useEffect(() => {
    const savedReviews = localStorage.getItem('loc_adv_reviews');
    let initData = JSON.parse(JSON.stringify(mockLocations));
    if (savedReviews) {
      const parsed = JSON.parse(savedReviews);
      initData.forEach((loc) => {
        if (parsed[loc.id]) {
          loc.reviews = parsed[loc.id];
        }
      });
    }
    setLocations(initData);
  }, []);

  // Salvezi recenziile
  const saveReviews = (updated) => {
    const obj = {};
    updated.forEach((loc) => {
      obj[loc.id] = loc.reviews;
    });
    localStorage.setItem('loc_adv_reviews', JSON.stringify(obj));
  };

  // Slideshow
  const handleNextSlide = (id) => {
    setSlideIndex((prev) => ({
      ...prev,
      [id]: prev[id] !== undefined ? prev[id] + 1 : 1,
    }));
  };
  const handlePrevSlide = (id) => {
    setSlideIndex((prev) => ({
      ...prev,
      [id]: prev[id] !== undefined ? prev[id] - 1 : 0,
    }));
  };

  // Adaugi recenzie cu rating
  const handleAddReview = (locId) => {
    if (!reviewText.trim() || !reviewUserRating) return;
    const newRev = {
      text: reviewText,
      date: new Date().toLocaleString(),
      userRating: reviewUserRating,
    };
    const updated = locations.map((l) => {
      if (l.id === locId) {
        return {
          ...l,
          reviews: [...l.reviews, newRev],
        };
      }
      return l;
    });
    setLocations(updated);
    saveReviews(updated);
    setReviewText('');
    setReviewUserRating(0);
  };

  // Favorite
  const toggleFavorite = (locId) => {
    let newFav;
    if (favorites.includes(locId)) {
      newFav = favorites.filter((x) => x !== locId);
    } else {
      newFav = [...favorites, locId];
    }
    setFavorites(newFav);
    localStorage.setItem('fav_locations_adv', JSON.stringify(newFav));
  };

  // Contact
  const handleOpenContact = (id) => {
    setContactOpen(id);
    setMessageText('');
  };

  // Filtrare + sort
  const cityList = ['Orice oraș', 'București', 'Cluj', 'Timișoara', 'Oradea', 'Iași'];
  let filtered = [...locations].filter((loc) =>
    loc.name.toLowerCase().includes(search.toLowerCase())
  );
  if (cityFilter !== 'Orice oraș') {
    filtered = filtered.filter((loc) => loc.city === cityFilter);
  }
  if (sortBy === 'ratingDesc') {
    filtered.sort((a, b) => getLocRating(b) - getLocRating(a));
  } else if (sortBy === 'ratingAsc') {
    filtered.sort((a, b) => getLocRating(a) - getLocRating(b));
  } else if (sortBy === 'nameAsc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'nameDesc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  function getLocRating(loc) {
    if (!loc.reviews.length) return loc.baseRating;
    const sumUserRatings = loc.reviews.reduce((acc, r) => acc + (r.userRating || 0), 0);
    const total = loc.reviews.length;
    // Combinarea ratingului de bază cu media userRating, după cum dorești
    return (loc.baseRating + sumUserRatings / total) / 2;
  }

  return (
    <div className="min-h-screen p-6 bg-pink-50">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">Find Location Avansat</h1>

      {/* Filtre */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Caută..."
          className="border rounded px-3 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
        >
          {cityList.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <select
          className="border rounded px-3 py-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="ratingDesc">Sortează după Rating desc</option>
          <option value="ratingAsc">Sortează după Rating asc</option>
          <option value="nameAsc">Nume A-Z</option>
          <option value="nameDesc">Nume Z-A</option>
        </select>
      </div>

      {/* Grid Locații */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((loc) => {
          const idx = slideIndex[loc.id] || 0;
          const currentImg = loc.images[idx % loc.images.length];
          const isFav = favorites.includes(loc.id);
          const finalRating = getLocRating(loc).toFixed(1);

          return (
            <div key={loc.id} className="bg-white rounded shadow p-4">
              <div className="relative overflow-hidden mb-2">
                <img
                  src={currentImg}
                  alt={loc.name}
                  className="w-full h-40 object-cover rounded"
                />
                <button
                  onClick={() => handlePrevSlide(loc.id)}
                  className="absolute left-2 top-1/2 bg-pink-300 text-white rounded-full p-1 transform -translate-y-1/2 hover:bg-pink-400"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={() => handleNextSlide(loc.id)}
                  className="absolute right-2 top-1/2 bg-pink-300 text-white rounded-full p-1 transform -translate-y-1/2 hover:bg-pink-400"
                >
                  <FaArrowRight />
                </button>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{loc.name}</h2>
              <p className="text-gray-600">{loc.city}</p>
              <div className="flex items-center gap-1 text-gray-600">
                <FaStar className="text-yellow-500" />
                {finalRating}
              </div>
              <p className="text-gray-600">Preț: {loc.price}</p>
              {/* Butoane */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => toggleFavorite(loc.id)}
                  className={`flex-1 py-2 rounded text-white ${
                    isFav ? 'bg-red-400' : 'bg-red-600'
                  }`}
                >
                  {isFav ? 'Remove Favorite' : 'Add Favorite'}
                </button>
                <button
                  onClick={() => setContactOpen(loc.id)}
                  className="flex-1 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Contactează
                </button>
              </div>
              {/* Recenzii */}
              <div className="mt-4">
                <h3 className="text-sm font-bold text-pink-600">Recenzii:</h3>
                <ul className="max-h-16 overflow-auto text-sm text-gray-700 border p-2 rounded">
                  {loc.reviews.map((r, i) => (
                    <li key={i} className="border-b border-gray-200 py-1">
                      <span className="font-bold">{r.userRating}★</span> - {r.text}{' '}
                      <span className="text-xs text-gray-400">({r.date})</span>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Scrie o recenzie..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="border p-1 rounded flex-1"
                  />
                  <select
                    value={reviewUserRating}
                    onChange={(e) => setReviewUserRating(Number(e.target.value))}
                    className="border p-1 rounded"
                  >
                    <option value={0}>Rating</option>
                    <option value={1}>★ 1</option>
                    <option value={2}>★ 2</option>
                    <option value={3}>★ 3</option>
                    <option value={4}>★ 4</option>
                    <option value={5}>★ 5</option>
                  </select>
                  <button
                    onClick={() => handleAddReview(loc.id)}
                    className="bg-green-500 text-white px-3 rounded"
                  >
                    Adaugă
                  </button>
                </div>
              </div>

              {/* Contact Popup */}
              {contactOpen === loc.id && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-4 rounded shadow w-full max-w-md">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Trimite mesaj către {loc.name}
                    </h3>
                    <textarea
                      rows={4}
                      className="w-full border p-2 rounded"
                      placeholder="Mesajul tău..."
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                    <div className="flex gap-2 mt-4 justify-end">
                      <button
                        onClick={() => setContactOpen(null)}
                        className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        Anulează
                      </button>
                      <button
                        onClick={() => {
                          alert(`Mesaj trimis către ${loc.name}: ${messageText}`);
                          setContactOpen(null);
                        }}
                        className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Trimite
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
