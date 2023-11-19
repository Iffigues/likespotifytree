import React, { useEffect, useState } from 'react';
import GetAlbum from './spotify/album';
import { List, ListItem, Paper, makeStyles } from '@material-ui/core';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '300px',
    overflowY: 'auto',
  },
  listItem: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
      title: {
    marginBottom: theme.spacing(2),
    fontSize: 18,
    fontWeight: 'bold',
  },
}));

const AlbumTrack: React.FC<{ album: string }> = ({ album }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [albumSongs, setAlbumSongs] = useState<any[]>([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          const songs = await GetAlbum(accessToken, album);
          setAlbumSongs(songs);
        }
      } catch (error) {
        localStorage.setItem('isConnected', 'false');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [album]); // Include album in the dependency array

  return (
    <div style={{'height': "600px", 'maxHeight': "600px",'backgroundColor': "black"}}>
      {isLoading ? (
        <p>is loading...</p>
      ) : (
        <Paper className={classes.root} style={{'height': "600px", 'maxHeight': "600px", 'backgroundColor': "grey"}}>
        <Typography variant="h6" className={classes.title}>
            <p>Morceaux de l'album</p>
        </Typography>
          <List style={{'height': "600px", 'maxHeight': "600px"}}>
            {albumSongs.map((song, index) => (
              <ListItem key={index} className={classes.listItem}>
                {song.name}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default AlbumTrack;
