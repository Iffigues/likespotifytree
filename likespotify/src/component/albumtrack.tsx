import React, { useEffect, useState } from 'react';
import GetAlbum from './spotify/album';
import { Navigate, useNavigate } from 'react-router-dom';
import { List, ListItem, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '300px', // Set the maximum height for the scrollbar
    overflowY: 'auto',
  },
  listItem: {
    borderBottom: `1px solid ${theme.palette.divider}`,
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
    <>
      {isLoading ? (
        <p>is loading...</p>
      ) : (
        <Paper className={classes.root}>
          <List>
            {albumSongs.map((song, index) => (
              <ListItem key={index} className={classes.listItem}>
                {song.name}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </>
  );
};

export default AlbumTrack;
