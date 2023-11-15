// Callback.tsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Callback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const queryParams = new URLSearchParams(location.hash.slice(1)); // Use location.hash to get the fragment
      const accessToken = queryParams.get('access_token');
      console.log(queryParams)
       alert("")
      console.log('Access Token:', accessToken);

      // Store the access token in localStorage
      localStorage.setItem('accessToken', accessToken || ''); // Use empty string if accessToken is null

      // Set a flag indicating that the user is connected
      localStorage.setItem('isConnected', 'true');

      // Redirect to a different route after processing the code
      navigate('/');
    };

    handleCallback();
  }, [location.hash, navigate]);

  return (
    <div>
      <h1>Callback Page</h1>
    </div>
  );
};

export default Callback;
