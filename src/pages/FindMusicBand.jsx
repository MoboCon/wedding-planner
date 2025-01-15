// FindMusicBand.jsx – Cod Complet (Slideshow, Recenzii cu rating, Favorite, Contact, Filtre)
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';

// Mock data exemplu
const mockBands = [
  {
    id: 1,
    name: 'Trupa AllStars',
    genre: 'Pop',
    baseRating: 4.8,
    price: '$$$',
    images: [
      'https://via.placeholder.com/600x300?text=Band+1.1',
      'https://via.placeholder.com/600x300?text=Band+1.2',
    ],
    reviews: [],
  },
  {
    id: 2,
    name: 'Rockers United',
    genre: 'Rock',
    baseRating: 4.5,
    price: '$$',
    images: [
      'https://via.placeholder.com/600x300?text=Band+2.1',
      'https://via.placeholder.com/600x300?text=Band+2.2',
    ],
    reviews: [],
  },
  {
    id: 3,
    name: 'Smooth Jazz Trio',
    genre: 'Jazz',
    baseRating: 4.9,
    price: '$$',
    images: [
      'https://via.placeholder.com/600x300?text=Band+3.1',
      'https://via.placeholder.com/600x300?text=Band+3.2',
    ],
    reviews: [],
  },
];

export default function FindMusicBand() {
  const [bands, setBands] = useState([]);
  const [slideIndex, setSlideIndex] = useState({});
  const [reviewText, setReviewText] = useState('');
  const [reviewUserRating, setReviewUserRating] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('fav_bands_adv');
    return saved ? JSON.parse(saved) : [];
  });
  const [contactOpen, setContactOpen] = useState(null);
  const [messageText, setMessageText] = useState('');

  // Filtre
  const [search, setSearch] = useState('');
  const [genreFilter, setGenreFilter] = useState('Orice gen');
  const [sortBy, setSortBy] = useState('ratingDesc');

  useEffect(() => {
    const savedReviews = localStorage.getItem('bands_adv_reviews');
    let initData = JSON.parse(JSON.stringify(mockBands));
    if (savedReviews) {
      const parsed = JSON.parse(savedReviews);
      initData.forEach((b) => {
        if (parsed[b.id]) {
          b.reviews = parsed[b.id];
        }
      });
    }
    setBands(initData);
  }, []);

  const saveReviews = (updated) => {
    const obj = {};
    updated.forEach((b) => {
      obj[b.id] = b.reviews;
    });
    localStorage.setItem('bands_adv_reviews', JSON.stringify(obj));
  };

  // Calculează rating final (media user + baseRating)
  const getBandRating = (band) => {
    if (!band.reviews.length) return band.baseRating;
    const sumUserRatings = band.reviews.reduce((acc, r) => acc + (r.userRating || 0), 0);
    const total = band.reviews.length;
    return ((band.baseRating + sumUserRatings / total) / 2).toFixed(1);
  };

  // Slide
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

  // Recenzii
  const handleAddReview = (bandId) => {
    if (!reviewText.trim() || !reviewUserRating) return;
    const newRev = {
      text: reviewText,
      date: new Date().toLocaleString(),
      userRating: reviewUserRating,
    };
    const updated = bands.map((b) => {
      if (b.id === bandId) {
        return { ...b, reviews: [...b.reviews, newRev] };
      }
      return b;
    });
    setBands(updated);
    saveReviews(updated);
    setReviewText('');
    setReviewUserRating(0);
  };

  // Favorite
  const toggleFavorite = (id) => {
    let newFav;
    if (favorites.includes(id)) {
      newFav = favorites.filter((x) => x !== id);
    } else {
      newFav = [...favorites, id];
    }
    setFavorites(newFav);
    localStorage.setItem('fav_bands_adv', JSON.stringify(newFav));
  };

  // Contact
  const handleOpenContact = (id) => {
    setContactOpen(id);
    setMessageText('');
  };

  // Filtrare + sort
  const allGenres = ['Orice gen', 'Pop', 'Rock', 'Jazz', 'Folk'];
  let filtered = [...bands].filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );
  if (genreFilter !== 'Orice gen') {
    filtered = filtered.filter((b) => b.genre === genreFilter);
  }
  if (sortBy === 'ratingDesc') {
    filtered.sort((a, b) => getBandRating(b) - getBandRating(a));
  } else if (sortBy === 'ratingAsc') {
    filtered.sort((a, b) => getBandRating(a) - getBandRating(b));
  } else if (sortBy === 'nameAsc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'nameDesc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <div className="min-h-screen p-6 bg-pink-50">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">Find Music Band</h1>
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
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
        >
          {allGenres.map((g) => (
            <option key={g} value={g}>
              {g}
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
      {/* Grid Band */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((band) => {
          const idx = slideIndex[band.id] || 0;
          const currentImg = band.images[idx % band.images.length];
          const isFav = favorites.includes(band.id);
          const finalRating = getBandRating(band);

          return (
            <div key={band.id} className="bg-white rounded shadow p-4">
              <div className="relative overflow-hidden mb-2">
                <img
                  src={currentImg}
                  alt={band.name}
                  className="w-full h-40 object-cover rounded"
                />
                <button
                  onClick={() => handlePrevSlide(band.id)}
                  className="absolute left-2 top-1/2 bg-pink-300 text-white rounded-full p-1 transform -translate-y-1/2 hover:bg-pink-400"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={() => handleNextSlide(band.id)}
                  className="absolute right-2 top-1/2 bg-pink-300 text-white rounded-full p-1 transform -translate-y-1/2 hover:bg-pink-400"
                >
                  <FaArrowRight />
                </button>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{band.name}</h2>
              <p className="text-gray-600">Gen: {band.genre}</p>
              <div className="flex items-center gap-1 text-gray-600">
                <FaStar className="text-yellow-500" />
                {finalRating}
              </div>
              <p className="text-gray-600">Preț: {band.price}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => toggleFavorite(band.id)}
                  className={`flex-1 py-2 rounded text-white ${
                    isFav ? 'bg-red-400' : 'bg-red-600'
                  }`}
                >
                  {isFav ? 'Remove Favorite' : 'Add Favorite'}
                </button>
                <button
                  onClick={() => handleOpenContact(band.id)}
                  className="flex-1 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Contactează
                </button>
              </div>
              {/* Recenzii */}
              <div className="mt-4">
                <h3 className="text-sm font-bold text-pink-600">Recenzii:</h3>
                <ul className="max-h-16 overflow-auto text-sm text-gray-700 border p-2 rounded">
                  {band.reviews.map((r, i) => (
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
                    onClick={() => handleAddReview(band.id)}
                    className="bg-green-500 text-white px-3 rounded"
                  >
                    Adaugă
                  </button>
                </div>
              </div>
              {/* Contact Popup */}
              {contactOpen === band.id && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-4 rounded shadow w-full max-w-md">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Trimite mesaj către {band.name}
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
                          alert(`Mesaj trimis către ${band.name}: ${messageText}`);
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
