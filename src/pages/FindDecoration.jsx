// FindDecoration.jsx – Similar
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';

const mockDecorations = [
  {
    id: 1,
    name: 'Aranjamente Florale Deluxe',
    category: 'Flori',
    baseRating: 4.9,
    price: '$$$',
    images: [
      'https://via.placeholder.com/600x300?text=Deco+1.1',
      'https://via.placeholder.com/600x300?text=Deco+1.2',
    ],
    reviews: [],
  },
  {
    id: 2,
    name: 'Light & Sound Effects',
    category: 'Lumini',
    baseRating: 4.6,
    price: '$$',
    images: [
      'https://via.placeholder.com/600x300?text=Deco+2.1',
      'https://via.placeholder.com/600x300?text=Deco+2.2',
    ],
    reviews: [],
  },
];

export default function FindDecoration() {
  const [decorations, setDecorations] = useState([]);
  const [slideIndex, setSlideIndex] = useState({});
  const [reviewText, setReviewText] = useState('');
  const [reviewUserRating, setReviewUserRating] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('fav_decor_adv');
    return saved ? JSON.parse(saved) : [];
  });
  const [contactOpen, setContactOpen] = useState(null);
  const [messageText, setMessageText] = useState('');

  // Filtre
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('Toate');
  const [sortBy, setSortBy] = useState('ratingDesc');

  useEffect(() => {
    const savedReviews = localStorage.getItem('decor_adv_reviews');
    let init = JSON.parse(JSON.stringify(mockDecorations));
    if (savedReviews) {
      const parsed = JSON.parse(savedReviews);
      init.forEach((d) => {
        if (parsed[d.id]) {
          d.reviews = parsed[d.id];
        }
      });
    }
    setDecorations(init);
  }, []);

  const saveReviews = (updated) => {
    const obj = {};
    updated.forEach((dec) => {
      obj[dec.id] = dec.reviews;
    });
    localStorage.setItem('decor_adv_reviews', JSON.stringify(obj));
  };

  const getDecoRating = (d) => {
    if (!d.reviews.length) return d.baseRating;
    const sumUserRatings = d.reviews.reduce((acc, r) => acc + (r.userRating || 0), 0);
    const total = d.reviews.length;
    return ((d.baseRating + sumUserRatings / total) / 2).toFixed(1);
  };

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

  const handleAddReview = (dId) => {
    if (!reviewText.trim() || !reviewUserRating) return;
    const newRev = {
      text: reviewText,
      date: new Date().toLocaleString(),
      userRating: reviewUserRating,
    };
    const updated = decorations.map((d) => {
      if (d.id === dId) {
        return { ...d, reviews: [...d.reviews, newRev] };
      }
      return d;
    });
    setDecorations(updated);
    saveReviews(updated);
    setReviewText('');
    setReviewUserRating(0);
  };

  const toggleFavorite = (id) => {
    let newFav;
    if (favorites.includes(id)) {
      newFav = favorites.filter((x) => x !== id);
    } else {
      newFav = [...favorites, id];
    }
    setFavorites(newFav);
    localStorage.setItem('fav_decor_adv', JSON.stringify(newFav));
  };

  const handleOpenContact = (id) => {
    setContactOpen(id);
    setMessageText('');
  };

  // Filtrare + Sort
  const catList = ['Toate', 'Flori', 'Lumini', 'Mobilier'];
  let filtered = [...decorations].filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );
  if (catFilter !== 'Toate') {
    filtered = filtered.filter((d) => d.category === catFilter);
  }
  if (sortBy === 'ratingDesc') {
    filtered.sort((a, b) => getDecoRating(b) - getDecoRating(a));
  } else if (sortBy === 'ratingAsc') {
    filtered.sort((a, b) => getDecoRating(a) - getDecoRating(b));
  } else if (sortBy === 'nameAsc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'nameDesc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <div className="min-h-screen p-6 bg-pink-50">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">Find Decoration</h1>
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
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
        >
          {catList.map((c) => (
            <option key={c} value={c}>
              {c}
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
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((dec) => {
          const idx = slideIndex[dec.id] || 0;
          const currentImg = dec.images[idx % dec.images.length];
          const isFav = favorites.includes(dec.id);
          const finalRating = getDecoRating(dec);

          return (
            <div key={dec.id} className="bg-white rounded shadow p-4">
              <div className="relative overflow-hidden mb-2">
                <img
                  src={currentImg}
                  alt={dec.name}
                  className="w-full h-40 object-cover rounded"
                />
                <button
                  onClick={() => setSlideIndex((prev) => ({
                    ...prev,
                    [dec.id]: idx - 1,
                  }))}
                  className="absolute left-2 top-1/2 bg-pink-300 text-white rounded-full p-1 transform -translate-y-1/2 hover:bg-pink-400"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={() => setSlideIndex((prev) => ({
                    ...prev,
                    [dec.id]: idx + 1,
                  }))}
                  className="absolute right-2 top-1/2 bg-pink-300 text-white rounded-full p-1 transform -translate-y-1/2 hover:bg-pink-400"
                >
                  <FaArrowRight />
                </button>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{dec.name}</h2>
              <p className="text-gray-600">{dec.category}</p>
              <div className="flex items-center gap-1 text-gray-600">
                <FaStar className="text-yellow-500" />
                {finalRating}
              </div>
              <p className="text-gray-600">Preț: {dec.price}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => toggleFavorite(dec.id)}
                  className={`flex-1 py-2 rounded text-white ${
                    isFav ? 'bg-red-400' : 'bg-red-600'
                  }`}
                >
                  {isFav ? 'Remove Favorite' : 'Add Favorite'}
                </button>
                <button
                  onClick={() => setContactOpen(dec.id)}
                  className="flex-1 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Contactează
                </button>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-bold text-pink-600">Recenzii:</h3>
                <ul className="max-h-16 overflow-auto text-sm text-gray-700 border p-2 rounded">
                  {dec.reviews.map((r, i) => (
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
                    onClick={() => handleAddReview(dec.id)}
                    className="bg-green-500 text-white px-3 rounded"
                  >
                    Adaugă
                  </button>
                </div>
              </div>
              {contactOpen === dec.id && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-4 rounded shadow w-full max-w-md">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Trimite mesaj către {dec.name}
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
                          alert(`Mesaj trimis către ${dec.name}: ${messageText}`);
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
