import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import axios from 'axios';
import '../css/navbar.css'; // Ensure this file exists for styling

function Navbar() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getUserData();
        setUser(userData); // Set user data if available
        if (userData && userData.email) {
          fetchUserProfile(userData.email); // Fetch user profile if email exists
        } else {
          setUserProfile(null); // If no user data, show default image
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        setUserProfile(null); // On error, set profile to null to show default image
      }
    };

    fetchUserData();
  }, []);

  const fetchUserProfile = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/profiles?email=${email}`
      );
      if (response.data.success && response.data.userProfile) {
        setUserProfile(response.data.userProfile); // Update state with user profile data
      } else {
        setUserProfile(null); // No profile found, set to null
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setUserProfile(null); // On error, set profile to null
    }
  };
  

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {user && userProfile && (
          <div className="user-info">
            <div className="user-profile">
              <Link to="/profile"> {/* Wrap the profile image in a Link component */}
          
                  <img
                  src={
                    userProfile && userProfile.image
                      ? `http://localhost:9000/Profileimge/${userProfile.image}` // Profile image from backend
                      : `http://localhost:9000/Profileimge/default.png` // Default image
                  }
                  alt="Profile"
                  className="profile-image"
                />
                
              </Link>
              <br/>
            </div>
          </div>
        )}
        <div className="navbar-links">
          {user ? (
            <>
              <Link to="/home">Home</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/about">About Us</Link>
              <Link to="/search">Search</Link>
              <Link to="/profile">profile</Link>
              <Link to="/">Logout</Link>
            </>
          ) : (
            <>
              <Link to="/">Login</Link>
              <Link to="/register">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
