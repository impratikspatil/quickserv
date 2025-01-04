import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './assets/styles/main.scss'; 
import LandingPage from './pages/LandingPage/LandingPage';
import ServerInfoPage from './pages/ServiceListPage/ServerListPage';

function App() {

  return (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/service" element={<ServerInfoPage />} />
        </Routes>
    </Router>
  );

}

export default App
