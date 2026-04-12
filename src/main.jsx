import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/main.scss';
import App from './App.jsx';
import { AuthProvider } from './components/shared/AuthContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="888172117082-v2d5t74i5vmfbcib7e69ledhlhivalhd.apps.googleusercontent.com">
      <AuthProvider> 
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);