import axios, { AxiosError } from 'axios';

const UnLikeSong = async (accessToken: string | null, trackId: string) => {
  try {
    const response = await axios.delete(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        ids: [trackId],
      },
    });
    console.log('Song unliked successfully:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      console.error('Access token expired. Refreshing...');
    }
    console.error('Error unliking the song:', error);
    throw error;
  }
};

export default UnLikeSong;