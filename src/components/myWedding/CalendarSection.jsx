// CalendarSection.jsx
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarSection() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ date: '', title: '' });

  useEffect(() => {
    const saved = localStorage.getItem('my_adv_calendar_events');
    if (saved) {
      setEvents(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('my_adv_calendar_events', JSON.stringify(events));
  }, [events]);

  const handleSelectDate = (value) => {
    setDate(value);
    const isoDate = value.toISOString().split('T')[0];
    setNewEvent((prev) => ({ ...prev, date: isoDate }));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.date || !newEvent.title.trim()) return;
    const nextId = events.length ? Math.max(...events.map((ev) => ev.id)) + 1 : 1;
    const updated = [...events, { id: nextId, date: newEvent.date, title: newEvent.title }];
    setEvents(updated);
    setNewEvent({ date: '', title: '' });
  };

  const currentDateStr = date.toISOString().split('T')[0];
  const dayEvents = events.filter((ev) => ev.date === currentDateStr);

  return (
    <div className="min-h-screen p-6 bg-pink-50">
      <h2 className="text-3xl font-bold text-pink-700 mb-4">Calendar Avansat</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div>
          <Calendar
            onChange={handleSelectDate}
            value={date}
          />
        </div>

        <div className="flex-grow bg-white shadow p-4 rounded">
          <h3 className="text-xl font-semibold text-pink-700 mb-2">
            Evenimente pentru {currentDateStr}:
          </h3>
          {!dayEvents.length && (
            <p className="text-gray-600 mb-2">Nu există evenimente pentru această dată.</p>
          )}
          <ul className="mb-4 max-h-40 overflow-auto">
            {dayEvents.map((ev) => (
              <li key={ev.id} className="bg-pink-100 p-2 mb-2 rounded shadow">
                {ev.title}
              </li>
            ))}
          </ul>
          <form onSubmit={handleAddEvent} className="flex flex-col gap-2">
            <input
              type="date"
              className="border p-2 rounded"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Titlu Eveniment"
              className="border p-2 rounded"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
              Adaugă Eveniment
            </button>
          </form>

          <div className="mt-6">
            <h4 className="text-lg font-bold text-pink-700 mb-2">Toate Evenimentele</h4>
            <div className="max-h-32 overflow-auto text-sm">
              {events.map((ev) => (
                <div key={ev.id} className="bg-pink-50 border border-pink-200 rounded p-2 mb-1">
                  {ev.date}: {ev.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
