// Login.jsx
import React, { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login with', email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md" data-aos="zoom-in">
        <h1 className="text-3xl font-serif text-pink-700 mb-4 flex items-center gap-2">
          <FaSignInAlt /> Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="border rounded w-full p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Parola</label>
            <input
              type="password"
              className="border rounded w-full p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="bg-pink-500 hover:bg-pink-400 text-white w-full py-2 rounded flex items-center justify-center gap-1">
            <FaSignInAlt /> Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
