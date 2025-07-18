import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [parcelles, setParcelles] = useState([]);

  useEffect(() => {
    const fetchParcelles = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/parcelles', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setParcelles(response.data);
      } catch (error) {
        console.error(error);
        localStorage.removeItem('token');
        window.location = '/login';
      }
    };

    fetchParcelles();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Parcelles</h3>
      <ul>
        {parcelles.map((parcelle) => (
          <li key={parcelle.id}>{parcelle.name} - {parcelle.area}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;