import axios, { AxiosError } from 'axios';

const LikeSong = async (accessToken: string | null, ids: string) => {
  try {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/tracks?ids=${ids}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Song liked successfully:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      console.error('Access token expired. Refreshing...');
    }
    console.error('Error liking the song:', error);
    throw error;
  }
};

export default LikeSong;