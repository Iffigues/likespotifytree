import React, { useEffect, useState } from 'react';
import getLikedSongs from './spotify/liked';
import { Navigate, useNavigate } from 'react-router-dom';

const LikedComponent: React.FC = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(0)    
    const [isLoading, setIsLoading] = useState(true);
    const [likedSongs, setLikedSongs] = useState<any[]>([]);

    useEffect(() => {
    const fetchData = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
          const songs = await getLikedSongs(accessToken);
          setLikedSongs(songs);
        } else {
          navigate('/login');
        }
      } catch (error) {
        localStorage.setItem('isConnected', 'false');
        navigate('/login');
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
    return (
    <>
        {isLoading ? (
        <p>is loading...</p>
        ) : (
        <div>
            <img src={likedSongs[selected].track.album.images[0].url}/>
            <ul>
                {likedSongs.map((song) => {
                    return <li key={song.added_at}>
                       <img src={song.track.album.images[0].url} />
                    
                </li>;
                
                })}
            </ul>
        </div>
        )}
    </>
    )
}

export default LikedComponent;
