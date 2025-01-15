// FindEntertainment.jsx – La fel, ex. type: "Magician", "Dansatori", "Stand-up"
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';

const mockEntertainers = [
  {
    id: 1,
    name: 'Magic Show X',
    type: 'Magician',
    baseRating: 4.7,
    price: '$$',
    images: [
      'https://via.placeholder.com/600x300?text=Ent+1.1',
      'https://via.placeholder.com/600x300?text=Ent+1.2',
    ],
    reviews: [],
  },
  {
    id: 2,
    name: 'Duo Dancers',
    type: 'Dansatori',
    baseRating: 4.5,
    price: '$$',
    images: [
      'https://via.placeholder.com/600x300?text=Ent+2.1',
      'https://via.placeholder.com/600x300?text=Ent+2.2',
    ],
    reviews: [],
  },
];

export default function FindEntertainment() {
  const [entertainers, setEntertainers] = useState([]);
  const [slideIndex, setSlideIndex] = useState({});
  const [reviewText, setReviewText] = useState('');
  const [reviewUserRating, setReviewUserRating] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('fav_entertain_adv');
    return saved ? JSON.parse(saved) : [];
  });
  const [contactOpen, setContactOpen] = useState(null);
  const [messageText, setMessageText] = useState('');

  // Filtre
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('Orice tip');
  const [sortBy, setSortBy] = useState('ratingDesc');

  useEffect(() => {
    const savedReviews = localStorage.getItem('ent_adv_reviews');
    let init = JSON.parse(JSON.stringify(mockEntertainers));
    if (savedReviews) {
      const parsed = JSON.parse(savedReviews);
      init.forEach((ent) => {
        if (parsed[ent.id]) {
          ent.reviews = parsed[ent.id];
        }
      });
    }
    setEntertainers(init);
  }, []);

  const saveReviews = (updated) => {
    const obj = {};
    updated.forEach((ent) => {
      obj[ent.id] = ent.reviews;
    });
    localStorage.setItem('ent_adv_reviews', JSON.stringify(obj));
  };

  const getEntRating = (ent) => {
    if (!ent.reviews.length) return ent.baseRating;
    const sumUserRatings = ent.reviews.reduce((acc, r) => acc + (r.userRating || 0), 0);
    const total = ent.reviews.length;
    return ((ent.baseRating + sumUserRatings / total) / 2).toFixed(1);
  };

  
  

  const handleAddReview = (entId) => {
    if (!reviewText.trim() || !reviewUserRating) return;
    const newRev = {
      text: reviewText,
      date: new Date().toLocaleString(),
      userRating: reviewUserRating,
    };
    const updated = entertainers.map((e) => {
      if (e.id === entId) {
        return { ...e, reviews: [...e.reviews, newRev] };
      }
      return e;
    });
    setEntertainers(updated);
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
    localStorage.setItem('fav_entertain_adv', JSON.stringify(newFav));
  };

  

  // Filtrare + sort
  const types = ['Orice tip', 'Magician', 'Dansatori', 'Stand-up', 'Comedie'];
  let filtered = [...entertainers].filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );
  if (typeFilter !== 'Orice tip') {
    filtered = filtered.filter((e) => e.type === typeFilter);
  }
  if (sortBy === 'ratingDesc') {
    filtered.sort((a, b) => getEntRating(b) - getEntRating(a));
  } else if (sortBy === 'ratingAsc') {
    filtered.sort((a, b) => getEntRating(a) - getEntRating(b));
  } else if (sortBy === 'nameAsc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'nameDesc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <div className="min-h-screen p-6 bg-pink-50">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">Find Entertainment</h1>
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
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
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
        {filtered.map((ent) => {
          const idx = slideIndex[ent.id] || 0;
          const currentImg = ent.images[idx % ent.images.length];
          const isFav = favorites.includes(ent.id);
          const finalRating = getEntRating(ent);

          return (
            <div key={ent.id} className="bg-white rounded shadow p-4">
              <div className="relative overflow-hidden mb-2">
                <img
                  src={currentImg}
                  alt={ent.name}
                  className="w-full h-40 object-cover rounded"
                />
                <button
                  onClick={() => setSlideIndex((prev) => ({
                    ...prev,
                    [ent.id]: idx - 1,
                  }))}
                  className="absolute left-2 top-1/2 bg-pink-300 text-white rounded-full p-1 transform -translate-y-1/2 hover:bg-pink-400"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={() => setSlideIndex((prev) => ({
                    ...prev,
                    [ent.id]: idx + 1,
                  }))}
                  className="absolute right-2 top-1/2 bg-pink-300 text-white rounded-full p-1 transform -translate-y-1/2 hover:bg-pink-400"
                >
                  <FaArrowRight />
                </button>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{ent.name}</h2>
              <p className="text-gray-600">Tip: {ent.type}</p>
              <div className="flex items-center gap-1 text-gray-600">
                <FaStar className="text-yellow-500" />
                {finalRating}
              </div>
              <p className="text-gray-600">Preț: {ent.price}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => toggleFavorite(ent.id)}
                  className={`flex-1 py-2 rounded text-white ${
                    isFav ? 'bg-red-400' : 'bg-red-600'
                  }`}
                >
                  {isFav ? 'Remove Favorite' : 'Add Favorite'}
                </button>
                
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-bold text-pink-600">Recenzii:</h3>
                <ul className="max-h-16 overflow-auto text-sm text-gray-700 border p-2 rounded">
                  {ent.reviews.map((r, i) => (
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
                    onClick={() => handleAddReview(ent.id)}
                    className="bg-green-500 text-white px-3 rounded"
                  >
                    Adaugă
                  </button>
                </div>
              </div>

              {contactOpen === ent.id && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-4 rounded shadow w-full max-w-md">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Trimite mesaj către {ent.name}
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
                          alert(`Mesaj trimis către ${ent.name}: ${messageText}`);
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
