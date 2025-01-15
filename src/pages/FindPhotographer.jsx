import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";

const mockPhotographers = [
  {
    id: 1,
    name: "John Doe Photography",
    location: "București",
    baseRating: 4.8,
    specialization: "Nunți",
    price: 1500,
    images: [
      "https://via.placeholder.com/600x300?text=Photo+1.1",
      "https://via.placeholder.com/600x300?text=Photo+1.2",
    ],
    reviews: [],
  },
  {
    id: 2,
    name: "Dream Lens Studio",
    location: "Cluj-Napoca",
    baseRating: 4.6,
    specialization: "Portrete",
    price: 1800,
    images: [
      "https://via.placeholder.com/600x300?text=Photo+2.1",
      "https://via.placeholder.com/600x300?text=Photo+2.2",
    ],
    reviews: [],
  },
  {
    id: 3,
    name: "Cinematic Frames",
    location: "Timișoara",
    baseRating: 4.9,
    specialization: "Evenimente",
    price: 2000,
    images: [
      "https://via.placeholder.com/600x300?text=Photo+3.1",
      "https://via.placeholder.com/600x300?text=Photo+3.2",
    ],
    reviews: [],
  },
];

export default function FindPhotographer() {
  const [photographers, setPhotographers] = useState([]);
  const [slideIndex, setSlideIndex] = useState({});
  const [reviewText, setReviewText] = useState("");
  const [reviewUserRating, setReviewUserRating] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("fav_photographers_advanced");
    return saved ? JSON.parse(saved) : [];
  });
  const [contactOpen, setContactOpen] = useState(null);
  const [messageText, setMessageText] = useState("");

  // Filtre
  const [search, setSearch] = useState("");
  const [specFilter, setSpecFilter] = useState("Orice specializare");
  const [sortBy, setSortBy] = useState("ratingDesc");

  useEffect(() => {
    const savedReviews = localStorage.getItem("photog_adv_reviews");
    let initData = JSON.parse(JSON.stringify(mockPhotographers));
    if (savedReviews) {
      const parsed = JSON.parse(savedReviews);
      initData.forEach((ph) => {
        if (parsed[ph.id]) {
          ph.reviews = parsed[ph.id];
        }
      });
    }
    setPhotographers(initData);
  }, []);

  const saveReviews = (updated) => {
    const obj = {};
    updated.forEach((ph) => {
      obj[ph.id] = ph.reviews;
    });
    localStorage.setItem("photog_adv_reviews", JSON.stringify(obj));
  };

  const handleNextSlide = (phId) => {
    setSlideIndex((prev) => ({
      ...prev,
      [phId]: (prev[phId] || 0) + 1,
    }));
  };

  const handlePrevSlide = (phId) => {
    setSlideIndex((prev) => ({
      ...prev,
      [phId]: (prev[phId] || 0) - 1,
    }));
  };

  const handleOpenContact = (phId) => {
    setContactOpen(phId);
  };

  const handleAddReview = (phId) => {
    if (!reviewText.trim() || !reviewUserRating) return;
    const newRev = {
      text: reviewText,
      date: new Date().toLocaleString(),
      userRating: reviewUserRating,
    };
    const updated = photographers.map((p) => {
      if (p.id === phId) {
        return { ...p, reviews: [...p.reviews, newRev] };
      }
      return p;
    });
    setPhotographers(updated);
    saveReviews(updated);
    setReviewText("");
    setReviewUserRating(0);
  };

  const toggleFavorite = (phId) => {
    let newFav;
    if (favorites.includes(phId)) {
      newFav = favorites.filter((x) => x !== phId);
    } else {
      newFav = [...favorites, phId];
    }
    setFavorites(newFav);
    localStorage.setItem("fav_photographers_advanced", JSON.stringify(newFav));
  };

  const getPhotographerRating = (ph) => {
    if (!ph.reviews.length) return ph.baseRating;
    const sumUserRatings = ph.reviews.reduce((acc, r) => acc + (r.userRating || 0), 0);
    const total = ph.reviews.length;
    return ((ph.baseRating + sumUserRatings / total) / 2).toFixed(1);
  };

  // Filtrare + sort
  const specs = ["Orice specializare", "Nunți", "Portrete", "Evenimente"];
  let filtered = [...photographers].filter((ph) =>
    ph.name.toLowerCase().includes(search.toLowerCase())
  );
  if (specFilter !== "Orice specializare") {
    filtered = filtered.filter((ph) => ph.specialization === specFilter);
  }
  if (sortBy === "ratingDesc") {
    filtered.sort((a, b) => getPhotographerRating(b) - getPhotographerRating(a));
  } else if (sortBy === "ratingAsc") {
    filtered.sort((a, b) => getPhotographerRating(a) - getPhotographerRating(b));
  } else if (sortBy === "nameAsc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "nameDesc") {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <div className="min-h-screen p-6 bg-pink-50">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">Find Photographer</h1>
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
          value={specFilter}
          onChange={(e) => setSpecFilter(e.target.value)}
        >
          {specs.map((s) => (
            <option key={s} value={s}>
              {s}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((ph) => {
          const idx = slideIndex[ph.id] || 0;
          const currentImg = ph.images[idx % ph.images.length];
          const isFav = favorites.includes(ph.id);
          const finalRating = getPhotographerRating(ph);

          return (
            <div key={ph.id} className="bg-white rounded shadow p-4">
              <div className="relative overflow-hidden mb-2">
                <img
                  src={currentImg}
                  alt={ph.name}
                  className="w-full h-40 object-cover rounded"
                />
                <button
                  onClick={() => handlePrevSlide(ph.id)}
                  className="absolute left-2 top-1/2 bg-pink-300 text-white rounded-full p-1 transform -translate-y-1/2 hover:bg-pink-400"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={() => handleNextSlide(ph.id)}
                  className="absolute right-2 top-1/2 bg-pink-300 text-white rounded-full p-1 transform -translate-y-1/2 hover:bg-pink-400"
                >
                  <FaArrowRight />
                </button>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{ph.name}</h2>
              <p className="text-gray-600">{ph.location}</p>
              <div className="flex items-center gap-1 text-gray-600">
                <FaStar className="text-yellow-500" />
                {finalRating}
              </div>
              <p className="text-gray-600">Preț: {ph.price} RON</p>
              <p className="text-gray-600">Specializare: {ph.specialization}</p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => toggleFavorite(ph.id)}
                  className={`flex-1 py-2 rounded text-white ${
                    isFav ? "bg-red-400" : "bg-red-600"
                  }`}
                >
                  {isFav ? "Remove Favorite" : "Add Favorite"}
                </button>
                <button
                  onClick={() => handleOpenContact(ph.id)}
                  className="flex-1 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Contactează
                </button>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-bold text-pink-600">Recenzii:</h3>
                <ul className="max-h-16 overflow-auto text-sm text-gray-700 border p-2 rounded">
                  {ph.reviews.map((r, i) => (
                    <li key={i} className="border-b border-gray-200 py-1">
                      <span className="font-bold">{r.userRating}★</span> - {r.text}{" "}
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
                    onClick={() => handleAddReview(ph.id)}
                    className="bg-green-500 text-white px-3 rounded"
                  >
                    Adaugă
                  </button>
                </div>
              </div>

              {contactOpen === ph.id && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-4 rounded shadow w-full max-w-md">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Trimite mesaj către {ph.name}
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
                          alert(`Mesaj trimis către ${ph.name}: ${messageText}`);
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
