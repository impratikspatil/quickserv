import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/main.scss';
import App from './App.jsx';
import { AuthProvider } from './components/shared/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 
      <App />
    </AuthProvider>
  </StrictMode>
);
