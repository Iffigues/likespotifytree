import axios from 'axios';

const getAccessToken = async () => {
  if (!process.env.REACT_APP_SPOTIFY_CLIENT_ID || !process.env.REACT_APP_SPOTIFY_CLIENT_SECRET) {
    throw new Error('Spotify client ID or client secret is not defined in environment variables.');
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', process.env.REACT_APP_SPOTIFY_CLIENT_ID);
  params.append('client_secret', process.env.REACT_APP_SPOTIFY_CLIENT_SECRET);
  params.append('scope', 'user-library-read');
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};

export default getAccessToken;
