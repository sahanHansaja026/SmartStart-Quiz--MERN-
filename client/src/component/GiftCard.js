// src/components/GiftCard.js
import React, { useState, useEffect } from "react";
import "../css/giftCard.css";
import Gift from "../images/giftcard.png"; // Make sure you have styling for the modal

const GiftCard = ({ closeModal }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  function calculateTimeLeft() {
    const targetDate = new Date("2024-12-31T00:00:00");
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  return (
    <div className="gift-card-modal">
      <div className="gift-card-content">
        <h1>Congratulations! 🎉</h1>
        <h2>🎁 Get 30% Off Your Next Purchase!</h2>
        <p>
          "Enjoy 30% off on your next purchase at MARK Technologies with this
          exclusive gift card."
        </p>

        {/* Add an image */}
        <div className="gift-card-image">
          <img src={Gift} alt="gift card" />
        </div>

        {timeLeft.days !== undefined ? (
          <div className="countdown-timer">
            <h2>Time left to claim your reward:</h2>
            <center>
              <div className="timingbox">
                {` ${timeLeft.days}Days `}
                <br />
                {` ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
              </div>
            </center>
          </div>
        ) : (
          <p>The offer has expired.</p>
        )}

        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default GiftCard;
