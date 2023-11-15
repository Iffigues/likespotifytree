import axios from 'axios';

const getLikedSongs = async (accessToken: string) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/tracks', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.items; // Assurez-vous que la structure des données est correcte
  } catch (error) {
    console.error('Erreur lors du chargement des titres likés:', error);
    throw error;
  }
};

export default getLikedSongs;
