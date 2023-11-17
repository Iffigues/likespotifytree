import React, { useEffect, useState } from 'react';
import LikedComponent from './likedComponent';
import { Navigate, useNavigate } from 'react-router-dom';


const Home: React.FC = () => {
     const navigate = useNavigate();
    const [isConnected, setConnected] = useState(false);
  const [likedSongs, setLikedSongs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let connected = localStorage.getItem('isConnected');
    if (!connected) {
        setConnected(false)
        navigate('/login');
    }
    setConnected(true)
    }, []);

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
