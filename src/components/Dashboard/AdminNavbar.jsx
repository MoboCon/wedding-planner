import React from 'react';

const AdminNavbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <ul className="flex space-x-4">
          <li>Home</li>
          <li>Vendors</li>
          <li>Users</li>
          <li>Messages</li>
          <li>Packages</li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
