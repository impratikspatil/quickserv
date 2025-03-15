import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './assets/styles/main.scss';
import LandingPage from './pages/LandingPage/LandingPage';
import ServerInfoPage from './pages/ServiceListPage/ServerListPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PostService from './pages/PostServicePage/PostService';
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/service" element={<ServerInfoPage />} />
          <Route path="/service_details" element={<ServiceDetailPage />} />
          <Route path="/post_service" element={<PostService />} />


        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
