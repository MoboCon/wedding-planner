import React, { useState } from 'react';

const VendorManagement = () => {
  const [vendors, setVendors] = useState([
    { id: 1, name: 'Elegant Venue', category: 'Location', rating: 4.8, active: true },
    { id: 2, name: 'Perfect Photographer', category: 'Photographer', rating: 4.9, active: true },
    { id: 3, name: 'Dream Band', category: 'Music', rating: 4.7, active: false },
  ]);

  const toggleVendorStatus = (id) => {
    setVendors(
      vendors.map((vendor) =>
        vendor.id === id ? { ...vendor, active: !vendor.active } : vendor
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Vendor Management</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Rating</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td className="border border-gray-300 p-2">{vendor.name}</td>
              <td className="border border-gray-300 p-2">{vendor.category}</td>
              <td className="border border-gray-300 p-2">{vendor.rating}</td>
              <td className="border border-gray-300 p-2">
                {vendor.active ? 'Active' : 'Inactive'}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  onClick={() => toggleVendorStatus(vendor.id)}
                >
                  {vendor.active ? 'Deactivate' : 'Activate'}
                </button>
                <button className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorManagement;
