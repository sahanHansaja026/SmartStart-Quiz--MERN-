// src/components/Dashboard.js
import React from 'react';
import BarChart from './chart';
import PieChart from './piechart';
import { Link } from 'react-router-dom';
import '../css/dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="#">Reports</Link></li>
          <li><Link to="#">Analytics</Link></li>
          <li><Link to="#">Settings</Link></li>
        </ul>
      </aside>
      <main className="main-content">
        <h1>Analytics Overview</h1>
        <div className="charts">
          <BarChart />
          <PieChart />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
