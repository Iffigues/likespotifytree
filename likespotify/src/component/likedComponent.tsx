import React, { useEffect, useState } from 'react';
import getLikedSongs from './spotify/liked';
import { useNavigate } from 'react-router-dom';
import AlbumTrack from './albumtrack';
import Grid from '@material-ui/core/Grid';
import LikeSong from './spotify/likeSong';
import UnLikeSong from './spotify/unlikeSong';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from '@mui/material/Tooltip';


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
        <p>Chargement en cours</p>
      ) : (
        
        <div >
  
          <Grid container spacing={1}   style={{'height': "610px", 'maxHeight': "610px",'backgroundColor': "black"}}>
            <Grid item xs={10} style={{'height': "600px", 'maxHeight': "600px",'backgroundColor': "black"}}>
              <center style={{'height': "600px", 'maxHeight': "600px",'backgroundColor': "black"}}>
                {likedSongs.length === 0 ? (<p>no album found</p>) : (
                    <img
                        style={{'height': "600px", 'maxHeight': "600px",'backgroundColor': "black"}}
                        src={likedSongs[selected]?.track?.album?.images[0]?.url || ''}
                        alt="Album Cover"
                    />)
                }
              </center>
            </Grid>
            <Grid item xs={2} style={{'height': "600px", 'maxHeight': "600px",'backgroundColor': "black"}}>
              <AlbumTrack album={likedSongs[selected]?.track?.album?.id || ''} />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid container spacing={1}>
                <Grid item xs={2} style={{"paddingLeft": "20px"}}>
                    <p>Les musiques Spotify ont été chargées</p>
                </Grid>
                <Grid item xs={3} style={{"paddingLeft": "20px"}}>
                    <p>les {likedSongs.length} musique(s) Spotify ont été chargées</p>
                </Grid>
            </Grid>
            {likedSongs.map((song, index) => (
              <Grid container item key={index} xs={12} spacing={1} style={{"paddingLeft": "20px"}}>
                <Grid item xs={2}>
                  <p key={index} onClick={() => setSelected(index)}>
                    {song.track.name}
                  </p>
                </Grid>
                <Grid item xs={2}>
                  {song.liked ? (
                    <Tooltip title="Enlever de Titres likés" arrow>
                    <FavoriteIcon  color="action" fontSize="large" onClick={() => handleLikeToggle(index)} /></Tooltip>
                    ) : (
                     <Tooltip title="Ajouter aux Titres likés" arrow><FavoriteBorderIcon  color="action" fontSize="large" onClick={() => handleLikeToggle(index)} /></Tooltip>
                 )}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};

export default LikedComponent;
