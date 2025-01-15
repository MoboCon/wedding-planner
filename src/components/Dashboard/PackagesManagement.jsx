import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PackagesManagement = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const response = await axios.get('/api/packages');
      setPackages(response.data);
    };
    fetchPackages();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/api/packages/${id}`);
    setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Packages Management</h2>
      <ul>
        {packages.map((pkg) => (
          <li key={pkg.id} className="flex justify-between items-center mb-2">
            <span>{pkg.name}</span>
            <button
              onClick={() => handleDelete(pkg.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackagesManagement;
