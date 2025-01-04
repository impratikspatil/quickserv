import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './assets/styles/main.scss'; 
import LandingPage from './pages/LandingPage/LandingPage';
import ServerInfoPage from './pages/ServiceListPage/ServerListPage';
import ServiceDetailPage from './pages/ServiceDetailPage';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/service" element={<ServerInfoPage />} />
            <Route path="/service_details" element={<ServiceDetailPage />} />
        </Routes>
    </Router>
  );
}

export default App;
