import React, { useEffect, useState } from 'react';
import getLikedSongs from './spotify/liked';

const Home: React.FC = () => {
  const [likedSongs, setLikedSongs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
              {likedSongs.map((song) => (
                <li key={song.id}>{song.name}</li>
              ))}
            </ul>
          </header>
        </>
      )}
    </div>
  );
};

export default Home;
