import React, { useEffect, useState } from 'react';
import LikedComponent from './likedComponent';
import {useNavigate } from 'react-router-dom';


const Home: React.FC = () => {
     const navigate = useNavigate();
    const [isConnected, setConnected] = useState(false);

  useEffect(() => {
    let connected = localStorage.getItem('isConnected');
    if (!connected) {
        setConnected(false)
        navigate('/login');
    }
    setConnected(true)
    }, [navigate]);

  return (
    <div className="App">
      {isConnected ? (
        <LikedComponent />
      ) : (
        <>
          <header className="App-header">
          </header>
        </>
      )}
    </div>
  );
};





export default Home;
