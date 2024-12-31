import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


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
