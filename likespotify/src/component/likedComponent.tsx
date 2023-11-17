import React, { useEffect, useState } from 'react';
import getLikedSongs from './spotify/liked';
import { useNavigate } from 'react-router-dom';
import AlbumTrack from './albumtrack';
import Grid from '@material-ui/core/Grid';
import LikeSong from './spotify/likeSong';
import UnLikeSong from './spotify/unlikeSong';

const LikedComponent: React.FC = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [selected, setSelected] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [likedSongs, setLikedSongs] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        setToken(accessToken);
        if (accessToken) {
          const songs = await getLikedSongs(accessToken);
          const newArray = songs.map((song: any) => ({
            ...song,
            liked: true,
          }));
          console.log("ez", newArray);
          setLikedSongs(newArray);
        } else {
          navigate('/login');
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
  }, [navigate]);

  const handleLikeToggle = (index: number) => {
    const updatedLikedSongs = likedSongs.map((song, i) =>
      i === index ? { ...song, liked: !song.liked } : song
    );

    const trackId = updatedLikedSongs[index]?.track?.id;

    if (trackId) {
      if (updatedLikedSongs[index].liked) {
        LikeSong(token, trackId);
      } else {
        UnLikeSong(token, trackId);
      }
    }

    setLikedSongs(updatedLikedSongs);
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        
        <div>
         {likedSongs.length === 0 ? (
            <p>no liked songs</p>):(<>
          <Grid container spacing={1}>
            <Grid item xs={10}>
              <center>
                <img
                  src={likedSongs[selected]?.track?.album?.images[0]?.url || ''}
                  alt="Album Cover"
                />
              </center>
            </Grid>
            <Grid item xs={2}>
              <AlbumTrack album={likedSongs[selected]?.track?.album?.id || ''} />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            {likedSongs.map((song, index) => (
              <Grid container item key={song.id} xs={12} spacing={1}>
                <Grid item xs={2}>
                  <p key={index} onClick={() => setSelected(index)}>
                    {song.track.name}
                  </p>
                </Grid>
                <Grid item xs={2}>
                  {song.liked ? (
                    <button onClick={() => handleLikeToggle(index)}>Unlike</button>
                  ) : (
                    <button onClick={() => handleLikeToggle(index)}>Like</button>
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid></>)}
        </div>
      )}
    </>
  );
};

export default LikedComponent;
