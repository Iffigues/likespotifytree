import axios, { AxiosError } from 'axios';

const getAlbum = async (accessToken: string|null, album: string) => {
   try {
    const response = await axios.get(album, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const savedTracks = response.data.items;
    if (savedTracks.length === 0) {
      console.log("L'utilisateur n'a pas de morceaux enregistrés dans sa bibliothèque.");
    } else {
      console.log(savedTracks);
    }

    return savedTracks;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      console.error('Access token expired. Refreshing...');
    }

    console.error('Error fetching saved tracks:', error);
    throw error;
  }
};

export default getAlbum;