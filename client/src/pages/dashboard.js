// src/components/Dashboard.js
import React from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import Reports from '../component/report';
import Analytics from '../component/analatic'; // Correct spelling
import Settings from '../component/setting';
import '../css/dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li>
            <Link to="/dashboard/reports">Reports</Link>
          </li>
          <li>
            <Link to="/dashboard/analytics">Analytics</Link>
          </li>
          <li>
            <Link to="/dashboard/settings">Settings</Link>
          </li>
        </ul>
      </aside>
      <main className="main-content">
        <Routes>
          <Route path="/reports" element={<Reports />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Add a redirect if no specific route is matched */}
          <Route path="*" element={<Navigate to="/dashboard/reports" />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
