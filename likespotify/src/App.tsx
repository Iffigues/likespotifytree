import React, { useState, useEffect}  from 'react';
import getAccessToken from './component/spotify/spotifyTokenAccess'
import getLikedSongs from './component/spotify/SpotifyService'

import './App.css';

function App() {
   const [likedSongs, setLikedSongs] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
     const songs = await getLikedSongs(accessToken);
         setLikedSongs(songs);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
            {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <p>Les musiques Spotify ont été chargées</p>
        // Vous pouvez également afficher la liste des titres likés ici en utilisant la variable likedSongs
      )}
    </>
  );
}

export default App;
