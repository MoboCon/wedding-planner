// src/components/myWedding/SeatPlanner.jsx
import React, { useState, useEffect } from 'react';

function SeatPlanner() {
  const LOCAL_KEY = 'myWedding_seatPlanner';
  const [tables, setTables] = useState([]);

  const [draggingId, setDraggingId] = useState(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  // Load + init
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      setTables(JSON.parse(saved));
    } else {
      setTables([
        { id: 1, label: 'Masa 1', x: 50,  y: 50,  guestIds: [], capacity: 4 },
        { id: 2, label: 'Masa 2', x: 200, y: 120, guestIds: [], capacity: 4 },
      ]);
    }
  }, []);

  // Save
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(tables));
  }, [tables]);

  const handleMouseDown = (e, table) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const dx = mouseX - table.x;
    const dy = mouseY - table.y;
    setDraggingId(table.id);
    setOffsetX(dx);
    setOffsetY(dy);
  };

  const handleMouseMove = (e) => {
    if (draggingId !== null) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const newX = mouseX - offsetX;
      const newY = mouseY - offsetY;
      setTables((prev) =>
        prev.map((t) =>
          t.id === draggingId ? { ...t, x: newX, y: newY } : t
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingId, offsetX, offsetY]);

  // Mese
  const addTable = () => {
    const nextId = tables.length ? Math.max(...tables.map((t) => t.id)) + 1 : 1;
    setTables([
      ...tables,
      { id: nextId, label: `Masa ${nextId}`, x: 100, y: 100, guestIds: [], capacity: 4 },
    ]);
  };

  const removeTable = (tableId) => {
    setTables((prev) => prev.filter((t) => t.id !== tableId));
  };

  const handleAddGuestToTable = (tableId, guestId) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id === tableId) {
          if (t.guestIds.length >= t.capacity) {
            alert(`Masa ${t.label} e plină (max ${t.capacity} persoane)!`);
            return t;
          }
          return { ...t, guestIds: [...t.guestIds, guestId] };
        }
        return t;
      })
    );
  };

  const handleRemoveGuestFromTable = (tableId, guestId) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId
          ? { ...t, guestIds: t.guestIds.filter((id) => id !== guestId) }
          : t
      )
    );
  };

  // Invitați (din localStorage-ul GuestList)
  const [guests, setGuests] = useState([]);
  useEffect(() => {
    const g = localStorage.getItem('myWedding_guests');
    if (g) {
      setGuests(JSON.parse(g));
    }
  }, []);

  // ID-urile invitaților deja așezați la mese
  const assignedGuestIds = new Set();
  tables.forEach((tbl) => {
    tbl.guestIds.forEach((gid) => assignedGuestIds.add(gid));
  });

  // Schimbare capacitate
  const handleChangeCapacity = (tableId, newCap) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId
          ? { ...t, capacity: Number(newCap) }
          : t
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Planificare Mese</h2>
      <button
        onClick={addTable}
        className="bg-green-500 text-white px-3 py-2 rounded mb-4"
      >
        Adaugă Masă
      </button>

      <div className="relative border h-80 overflow-hidden bg-gray-50 mb-4">
        {tables.map((table) => (
          <div
            key={table.id}
            onMouseDown={(e) => handleMouseDown(e, table)}
            style={{
              position: 'absolute',
              top: table.y,
              left: table.x,
              width: '80px',
              height: '80px',
              transform: 'translate(-50%, -50%)',
            }}
            className="flex items-center justify-center 
                       bg-pink-200 border rounded-full
                       shadow-md cursor-pointer
                       hover:scale-105 transition-transform
                       select-none"
          >
            <span className="font-bold">{table.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {tables.map((table) => (
          <div key={table.id} className="border p-4 rounded w-64 bg-white shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">{table.label}</h3>
              <button
                onClick={() => removeTable(table.id)}
                className="text-red-500 hover:text-red-700"
              >
                Șterge
              </button>
            </div>

            {/* Capacitate */}
            <div className="mb-2 flex items-center gap-2">
              <label className="text-sm">Capacitate: </label>
              <input
                type="number"
                min="1"
                value={table.capacity}
                onChange={(e) => handleChangeCapacity(table.id, e.target.value)}
                className="w-16 border p-1 rounded"
              />
            </div>

            <ul className="mb-2">
              {table.guestIds.map((gid) => {
                const guest = guests.find((gg) => gg.id === gid);
                return (
                  <li
                    key={gid}
                    className="flex justify-between items-center bg-gray-50 mb-1 px-2 py-1 rounded"
                  >
                    {guest ? guest.name : `Invitat #${gid}`}
                    <button
                      onClick={() => handleRemoveGuestFromTable(table.id, gid)}
                      className="text-red-500 hover:text-red-700"
                    >
                      x
                    </button>
                  </li>
                );
              })}
              {!table.guestIds.length && (
                <li className="text-gray-400">Niciun invitat alocat.</li>
              )}
            </ul>

            <div>
              <select
                className="border p-1 rounded w-full"
                onChange={(e) => {
                  const val = e.target.value;
                  if (val !== 'none') {
                    handleAddGuestToTable(table.id, parseInt(val));
                  }
                  e.target.value = 'none'; // reset
                }}
                defaultValue="none"
              >
                <option value="none">Alege invitat...</option>
                {guests
                  .filter((g) => !assignedGuestIds.has(g.id)) // un invitat doar la o masă
                  .map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name} (#{g.id})
                    </option>
                  ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeatPlanner;
