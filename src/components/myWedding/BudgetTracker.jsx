// src/components/myWedding/BudgetTracker.jsx
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BudgetTracker() {
  const LOCAL_KEY = 'myWedding_budget';
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', estimated: '', actual: '' });

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems([
        { id: 1, name: 'Rochie de mireasă', estimated: 2000, actual: 0 },
        { id: 2, name: 'Flori', estimated: 500, actual: 0 },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
  }, [items]);

  const handleAddItem = (e) => {
    e.preventDefault();
    const nextId = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    setItems((prev) => [
      ...prev,
      {
        id: nextId,
        name: newItem.name,
        estimated: Number(newItem.estimated || 0),
        actual: Number(newItem.actual || 0),
      },
    ]);
    setNewItem({ name: '', estimated: '', actual: '' });
  };

  const totalEstimated = items.reduce((acc, i) => acc + i.estimated, 0);
  const totalActual = items.reduce((acc, i) => acc + i.actual, 0);

  const labels = items.map((i) => i.name);
  const data = {
    labels,
    datasets: [
      {
        label: 'Estimare',
        data: items.map((i) => i.estimated),
        backgroundColor: 'rgba(54, 162, 235, 0.5)', 
      },
      {
        label: 'Cheltuit',
        data: items.map((i) => i.actual),
        backgroundColor: 'rgba(255, 99, 132, 0.5)', 
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Bugetul Nunții</h2>
      <form onSubmit={handleAddItem} className="flex gap-2 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Cheltuială"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Estimare (lei)"
          value={newItem.estimated}
          onChange={(e) => setNewItem({ ...newItem, estimated: e.target.value })}
          className="border p-2 rounded w-32"
        />
        <input
          type="number"
          placeholder="Real (lei)"
          value={newItem.actual}
          onChange={(e) => setNewItem({ ...newItem, actual: e.target.value })}
          className="border p-2 rounded w-32"
        />
        <button type="submit" className="bg-green-500 text-white px-3 py-2 rounded">
          Adaugă
        </button>
      </form>

      <table className="min-w-full text-sm mb-4">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-left">Cheltuială</th>
            <th className="py-2 px-4 text-left">Estimare</th>
            <th className="py-2 px-4 text-left">Cheltuit</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id} className="hover:bg-gray-50 border-b">
              <td className="py-2 px-4">{i.name}</td>
              <td className="py-2 px-4">{i.estimated} lei</td>
              <td className="py-2 px-4">{i.actual} lei</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-4">
        <p className="font-bold">Total Estimat: {totalEstimated} lei</p>
        <p className="font-bold">Total Real: {totalActual} lei</p>
        {totalActual > totalEstimated && (
          <p className="text-red-500">Atenție, ai depășit bugetul estimat!</p>
        )}
      </div>

      <div className="max-w-xl">
        <Bar data={data} />
      </div>
    </div>
  );
}

export default BudgetTracker;
