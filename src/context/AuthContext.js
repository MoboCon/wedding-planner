import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // La montare, încercăm să încărcăm userul din localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mock_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setIsAuthenticated(true);
    }
  }, []);

  // Metodă login (mock)
  const login = (email, password) => {
    // Ex: validăm la modul minim
    if (email && password) {
      const userData = { email, role: 'couple' };
      localStorage.setItem('mock_user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      return true; // success
    }
    return false;
  };

  // Metodă register (mock)
  const register = (email, password, name) => {
    // Simplu: salvăm direct
    const newUser = { email, name, role: 'couple' };
    localStorage.setItem('mock_user', JSON.stringify(newUser));
    setUser(newUser);
    setIsAuthenticated(true);
  };

  // Metodă logout
  const logout = () => {
    localStorage.removeItem('mock_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
