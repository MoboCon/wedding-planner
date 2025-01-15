import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import VendorManagement from './VendorManagement';
import UserStatistics from './UserStatistics';
import MessageMonitoring from './MessageMonitoring';
import PackagesManagement from './PackagesManagement';
import AdminSettings from './AdminSettings';

const AdminDashboard = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <AdminNavbar />
        <div className="flex-grow p-6 bg-gray-100">
          <Routes>
            <Route path="/vendors" element={<VendorManagement />} />
            <Route path="/statistics" element={<UserStatistics />} />
            <Route path="/messages" element={<MessageMonitoring />} />
            <Route path="/packages" element={<PackagesManagement />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="/" element={<Navigate to="/vendors" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AdminDashboard;
