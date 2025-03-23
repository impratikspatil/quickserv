<<<<<<< Updated upstream
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './assets/styles/main.scss';
import LandingPage from './pages/LandingPage/LandingPage';
import ServerInfoPage from './pages/ServiceListPage/ServerListPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
=======
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./assets/styles/main.scss";
import LandingPage from "./pages/LandingPage/LandingPage";
import ServerInfoPage from "./pages/ServiceListPage/ServerListPage";
import ServiceDetailPage from "./pages/ServiceDetailPage/ServiceDetailPage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme/theme";
>>>>>>> Stashed changes
import PostService from './pages/PostServicePage/PostService';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
<<<<<<< Updated upstream
          <Route path="/" element={<LandingPage />} />
          <Route path="/service" element={<ServerInfoPage />} />
          <Route path="/service_details" element={<ServiceDetailPage />} />
          <Route path="/post_service" element={<PostService />} />


=======
            <Route path="/" element={<LandingPage />} />
            <Route path="/service" element={<ServerInfoPage />} />
            <Route path="/service_details" element={<ServiceDetailPage />} />
            <Route path="/post_service" element={<PostService />} />
>>>>>>> Stashed changes
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
