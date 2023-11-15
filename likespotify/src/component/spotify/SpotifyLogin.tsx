// SpotifyLogin.tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpotifyLogin: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      // Check if the user is already logged in
      const isConnected = localStorage.getItem('isConnected') === 'truez';

      if (isConnected) {
        alert("connected")
        // User is already logged in, navigate to the home page or another authorized route
        navigate('/');
      } else {
        // If not logged in, initiate the login process
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const redirectUri = 'http://localhost:3000/callback';
        const scopes = ['user-read-private', 'user-read-email', 'user-library-read'];
const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}&response_type=token`;

        // Redirect to Spotify login
        window.location.href = authorizationUrl;
      }
    };

    // Call the login function when the component mounts
    handleLogin();
  }, [navigate]);

  // This component doesn't render anything since it may immediately redirect to Spotify login

  return null;
};

export default SpotifyLogin;


