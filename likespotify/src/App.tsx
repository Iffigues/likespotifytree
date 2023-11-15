// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './component/home'
import SpotifyLogin from './component/spotify/SpotifyLogin';
import Callback from './component/spotify/Callback';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/callback" element={<Callback />} />
        <Route path="/login" element={<SpotifyLogin />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
