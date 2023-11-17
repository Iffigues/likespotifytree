import axios, { AxiosError } from 'axios';

const UnLikeSong = async (accessToken: string|null, id: string) => {
   try {
    console.log(accessToken);
    const response = await axios.delete(`https://api.spotify.com/v1/me/tracks?ids=${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      console.error('Access token expired. Refreshing...');
    }
    console.error('Error fetching saved tracks:', error);
    throw error;
  }
};

export default  UnLikeSong;