// src/components/myWedding/GuestTable.jsx
import React, { useState } from 'react';

function GuestTable({ guests, setGuests }) {
  const [newGuest, setNewGuest] = useState({ name: '', email: '', status: 'Neconfirmat' });

  const handleAddGuest = (e) => {
    e.preventDefault();
    const nextId = (guests.length ? Math.max(...guests.map((g) => g.id)) : 0) + 1;
    setGuests([...guests, { ...newGuest, id: nextId }]);
    setNewGuest({ name: '', email: '', status: 'Neconfirmat' });
  };

  const removeGuest = (id) => {
    const filtered = guests.filter((g) => g.id !== id);
    setGuests(filtered);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-2xl font-semibold mb-4">Lista Invitaților</h2>

      <form onSubmit={handleAddGuest} className="flex gap-2 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Nume"
          value={newGuest.name}
          onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newGuest.email}
          onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <select
          value={newGuest.status}
          onChange={(e) => setNewGuest({ ...newGuest, status: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="Confirmat">Confirmat</option>
          <option value="Neconfirmat">Neconfirmat</option>
        </select>
        <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded">
          Adaugă
        </button>
      </form>

      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-left">Nume</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((g) => (
            <tr key={g.id} className="hover:bg-gray-50 border-b">
              <td className="py-2 px-4">{g.name}</td>
              <td className="py-2 px-4">{g.email}</td>
              <td className="py-2 px-4">{g.status}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => removeGuest(g.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Șterge
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GuestTable;
