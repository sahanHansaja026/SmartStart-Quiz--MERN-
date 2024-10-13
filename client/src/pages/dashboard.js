// src/components/Dashboard.js
import React, { useState } from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import Reports from "../component/report";
import Analytics from "../component/analatic"; // Correct spelling
import Privacy from "../component/privacy";
import Count from "../component/count";
import GiftCard from "../component/GiftCard";
import Aiservice from "../component/AITextGenerator"; // Import GiftCard component
import "../css/dashboard.css";

const Dashboard = () => {
  const [isGiftCardOpen, setIsGiftCardOpen] = useState(false);

  const openGiftCardModal = () => {
    setIsGiftCardOpen(true);
  };

  const closeGiftCardModal = () => {
    setIsGiftCardOpen(false);
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li>
            <Link to="/dashboard/analytics">Analytics</Link>
          </li>
          <li>
            <Link to="/dashboard/reports">Reports</Link>
          </li>
          <li>
            <Link to="/dashboard/count">count</Link>
          </li>
          <li>
            <Link to="/dashboard/privacy">Privacy</Link>
          </li>
          <li>
            <Link to="/dashboard/aiservice">Use Ai</Link>
          </li>
        </ul>
        {/* Button to open the gift card modal */}
        <button className="open-modal-btn" onClick={openGiftCardModal}>
          Open Gift Card
        </button>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/count" element={<Count />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/aiservice" element={<Aiservice />} />
          <Route path="*" element={<Navigate to="/dashboard/analytics" />} />
        </Routes>
      </main>

      {/* Render the GiftCard modal when the state is true */}
      {isGiftCardOpen && <GiftCard closeModal={closeGiftCardModal} />}
    </div>
  );
};

export default Dashboard;
