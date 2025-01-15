// src/components/myWedding/GuestList.jsx
import React, { useState, useEffect } from 'react';

function GuestList() {
  const LOCAL_KEY = 'myWedding_guests';
  const [guests, setGuests] = useState([]);
  const [search, setSearch] = useState('');

  // nouInvitat
  const [newGuest, setNewGuest] = useState({
    name: '',
    phone: '',
    plusOne: '',
    status: 'Neconfirmat',
  });

  // La montare, încărcăm invitații din localStorage (dacă există)
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      setGuests(JSON.parse(saved));
    }
  }, []);

  // De fiecare dată când guests se schimbă, salvăm în localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(guests));
  }, [guests]);

  // Adaugă un invitat nou
  const handleAddGuest = (e) => {
    e.preventDefault();
    const nextId = guests.length ? Math.max(...guests.map((g) => g.id)) + 1 : 1;
    const newItem = {
      ...newGuest,
      id: nextId,
    };
    setGuests([...guests, newItem]);

    // Reset form
    setNewGuest({
      name: '',
      phone: '',
      plusOne: '',
      status: 'Neconfirmat',
    });
  };

  // Șterge un invitat din listă
  const removeGuest = (id) => {
    setGuests(guests.filter((g) => g.id !== id));
  };

  // Confirmă un invitat (dacă status e Neconfirmat)
  const confirmGuest = (id) => {
    setGuests((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, status: 'Confirmat' } : g
      )
    );
  };

  // Filtrare după name/phone/plusOne
  const filteredGuests = guests.filter((g) => {
    const text = (g.name + g.phone + g.plusOne).toLowerCase();
    return text.includes(search.toLowerCase());
  });

  // Export CSV (fără email)
  const handleExportCSV = () => {
    if (!guests.length) return;
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'ID,Nume,Telefon,PlusOne,Status\n';
    guests.forEach((g) => {
      csvContent += `${g.id},${g.name},${g.phone},${g.plusOne},${g.status}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'guest_list.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Numărătoare invitați
  const totalGuests = guests.length;
  const confirmed = guests.filter((g) => g.status === 'Confirmat').length;
  const percentConfirmed = totalGuests
    ? ((confirmed / totalGuests) * 100).toFixed(0)
    : 0;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Lista Invitaților</h2>

      {/* Mic status: nr invitați */}
      <p className="text-sm text-gray-600 mb-4">
        Total invitați: <strong>{totalGuests}</strong>, Confirmați: <strong>{confirmed}</strong> (
        {percentConfirmed}%)
      </p>

      {/* Bară de progres (confirmări) */}
      <div className="w-full bg-gray-200 h-2 rounded overflow-hidden mb-6">
        <div 
          className="bg-green-500 h-2" 
          style={{ width: `${percentConfirmed}%` }}
        />
      </div>

      {/* Form + Filtru */}
      <div className="flex mb-4 gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Caută după nume/telefon/plusOne..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />

        <form onSubmit={handleAddGuest} className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Nume"
            value={newGuest.name}
            onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Telefon"
            value={newGuest.phone}
            onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="PlusOne"
            value={newGuest.plusOne}
            onChange={(e) => setNewGuest({ ...newGuest, plusOne: e.target.value })}
            className="border p-2 rounded"
          />
          <select
            value={newGuest.status}
            onChange={(e) => setNewGuest({ ...newGuest, status: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="Confirmat">Confirmat</option>
            <option value="Neconfirmat">Neconfirmat</option>
          </select>

          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Adaugă
          </button>
        </form>

        <button
          onClick={handleExportCSV}
          className="bg-blue-400 text-white px-3 py-2 rounded"
        >
          Export CSV
        </button>
      </div>

      {/* Tabel cu invitați */}
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-left">Nume</th>
            <th className="py-2 px-4 text-left">Telefon</th>
            <th className="py-2 px-4 text-left">PlusOne</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {filteredGuests.map((g) => (
            <tr key={g.id} className="hover:bg-gray-50 border-b">
              <td className="py-2 px-4">{g.name}</td>
              <td className="py-2 px-4">{g.phone}</td>
              <td className="py-2 px-4">{g.plusOne}</td>
              <td className="py-2 px-4">{g.status}</td>
              <td className="py-2 px-4 flex gap-2">
                {g.status === 'Neconfirmat' && (
                  <button
                    onClick={() => confirmGuest(g.id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Confirmă
                  </button>
                )}
                <button
                  onClick={() => removeGuest(g.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Șterge
                </button>
              </td>
            </tr>
          ))}

          {/* În cazul în care nu există invitați filtrați */}
          {!filteredGuests.length && (
            <tr>
              <td colSpan={5} className="text-center text-gray-500 py-2">
                Niciun invitat găsit.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GuestList;
