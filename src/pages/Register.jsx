// Register.jsx
import React, { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Register with', form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md" data-aos="zoom-in">
        <h1 className="text-3xl font-serif text-pink-700 mb-4 flex items-center gap-2">
          <FaUserPlus /> Register
        </h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nume</label>
            <input
              type="text"
              className="border rounded w-full p-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="border rounded w-full p-2"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Parola</label>
            <input
              type="password"
              className="border rounded w-full p-2"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button className="bg-green-500 hover:bg-green-400 text-white w-full py-2 rounded flex items-center justify-center gap-1">
            <FaUserPlus /> Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
