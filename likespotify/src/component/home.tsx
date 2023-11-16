import React, { useEffect, useState } from 'react';
import getLikedSongs from './spotify/liked';
import { Navigate, useNavigate } from 'react-router-dom';


const Home: React.FC = () => {
     const navigate = useNavigate();
  const [likedSongs, setLikedSongs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    

      let connected = localStorage.getItem('isConnected');
    if (!connected) {
        navigate('/login');
    }    
  const fetchData = async () => {
    

      try {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
          const songs = await getLikedSongs(accessToken);
          setLikedSongs(songs);
        } else {
          console.error('Access token not found.');
        }
      } catch (error) {
        console.error('Error fetching liked songs:', error);
        localStorage.setItem('isConnected', 'false');
        navigate('/login');
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <header className="App-header">
            <h1>Hello, World!</h1>
            <h2>Liked Songs</h2>
            <ul>
              {likedSongs.map((song) => {
  console.log(song);
  return <li key={song.added_at}>{song.added_at}</li>;
})}
            </ul>
          </header>
        </>
      )}
    </div>
  );
};





export default Home;
