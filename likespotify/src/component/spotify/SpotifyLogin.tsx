import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpotifyLogin: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      const isConnected = localStorage.getItem('isConnected') === 'true';
      console.log("ello", isConnected)
      if (isConnected) {
        navigate('/');
      } else {
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const redirectUri = 'http://localhost:3000/callback';
        const scopes = ['user-read-private', 'user-read-email', 'user-library-read', 'user-library-modify'];
        const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}&response_type=token`;
        window.location.href = authorizationUrl;
      }
    };
    handleLogin();
  }, [navigate]);
  return null;
};

export default SpotifyLogin;


