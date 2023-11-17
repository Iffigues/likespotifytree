import axios, { AxiosError } from 'axios';

const GetAlbum = async (accessToken: string|null, album: string) => {
   try {
    console.log(`https://api.spotify.com/v1/albums/${album}`)
    const response = await axios.get(`https://api.spotify.com/v1/albums/${album}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const savedTracks = response.data.tracks.items;

    if (savedTracks.length === 0) {
      console.log("L'utilisateur n'a pas de morceaux enregistrés dans sa bibliothèque.");
    } else {
      console.log("title:",savedTracks);
    }
    console.log(savedTracks)
    return savedTracks;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      console.error('Aaaaaa', error);
    }

    console.error('mmmm', error);
    throw error;
  }
};

export default GetAlbum;