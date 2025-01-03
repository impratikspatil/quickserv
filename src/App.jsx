import { useState } from 'react'
import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './assets/styles/main.scss'; 

function App() {

  return (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
        </Routes>
    </Router>
  );

}

export default App
