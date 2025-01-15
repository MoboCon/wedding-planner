import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserStatistics = () => {
  const [stats, setStats] = useState({ users: 0, reviews: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const response = await axios.get('/api/admin/stats');
      setStats(response.data);
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">User Statistics</h2>
      <p>Total Users: {stats.users}</p>
      <p>Total Reviews: {stats.reviews}</p>
    </div>
  );
};

export default UserStatistics;
