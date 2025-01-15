// src/components/myWedding/ToDoList.jsx
import React, { useState, useEffect } from 'react';

function ToDoList() {
  const LOCAL_KEY = 'myWedding_tasks';
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Load
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    const nextId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    setTasks([...tasks, { id: nextId, text: newTask, done: false }]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Statistici
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.done).length;
  const percentDone = totalTasks ? ((doneTasks / totalTasks) * 100).toFixed(0) : 0;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Lista de Sarcini</h2>

      {/* Progres */}
      <p className="text-sm text-gray-600 mb-2">
        Finalizate: {doneTasks}/{totalTasks} ({percentDone}%)
      </p>
      <div className="w-full bg-gray-200 h-2 rounded overflow-hidden mb-4">
        <div 
          className="bg-blue-500 h-2" 
          style={{ width: `${percentDone}%` }}
        />
      </div>

      {/* Adăugare task */}
      <div className="flex mb-4 gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Adaugă sarcină..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 rounded flex-grow"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Adaugă
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`
              flex items-center gap-2 p-2 rounded 
              ${task.done ? 'bg-green-50 line-through text-gray-500' : 'bg-gray-50'}
            `}
          >
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            <span className="flex-grow">{task.text}</span>
            <button
              onClick={() => removeTask(task.id)}
              className="bg-red-400 text-white px-2 py-1 rounded"
            >
              Șterge
            </button>
          </li>
        ))}
      </ul>

      {!tasks.length && (
        <div className="mt-2 text-gray-500">Nicio sarcină.</div>
      )}
    </div>
  );
}

export default ToDoList;
