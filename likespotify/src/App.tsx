import React, { useState, useEffect}  from 'react';
import getAccessToken from './component/spotifyTokenAccess'

import './App.css';

function App() {
  const [listText, setListText] = useState("Chargement en cours")   

   useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
        console.log('Access Token:', accessToken);

        // Now you can use the access token to make further requests to the Spotify API
        // For example, you can fetch data using axios with the access token in the headers
        // axios.get('https://api.spotify.com/v1/your-endpoint', {
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
        <p>{listText}</p>
    </>
  );
}

export default App;
