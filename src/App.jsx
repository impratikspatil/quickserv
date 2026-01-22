import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './assets/styles/main.scss';
import LandingPage from './pages/LandingPage/LandingPage';
import ServerInfoPage from './pages/ServiceListPage/ServerListPage';
import ServiceDetailPage from './pages/ServiceDetailPage/ServiceDetailPage';
import PostService from './pages/PostServicePage/PostService';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from "./theme/theme";
import Login from './pages/AuthenticationPage/Login';
import SignUpPage from './pages/AuthenticationPage/SignUpPage';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './components/shared/AuthContext';
import ProtectedRoute from './components/shared/ProtectedRoute';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import ProfilePage from './pages/Profile/ProfilePage';



function App() {
  const { user } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/service" element={<ServerInfoPage />} />
          <Route path="/service_details" element={<ServiceDetailPage />} />
          <Route path="/post_service" element={<PostService />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage   />} />
        </Routes>
        <ToastContainer />  
      </Router>
    </ThemeProvider>
  );
}

export default App;
