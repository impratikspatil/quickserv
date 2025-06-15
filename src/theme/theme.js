// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff9900',
      light: '#ffb703',
      dark: '#e68a00',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#757575',
      light: '#9E9E9E',
      dark: '#616161',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f9f9f9',
      paper: '#ffffff',
    },
    text: {
      primary: '#222222',
      secondary: '#555555',
    },
    gradient: {
      primary: 'linear-gradient(135deg, #ff9900, #ffb703)',
      background: 'linear-gradient(135deg, #ffffff, #f9f9f9)',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
      color: '#222',
      lineHeight: 1.3,
      letterSpacing: '0.5px',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#222',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#222',
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#222',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#222',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#222',
    },
    body1: {
      fontSize: '1.2rem',
      lineHeight: 1.5,
      color: '#555',
    },
    body2: {
      fontSize: '1rem',
      lineHeight: 1.43,
      color: '#555',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '1.1rem',
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '0.9rem 1.8rem',
          fontSize: '1.1rem',
          fontWeight: 500,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 5px 15px rgba(255, 153, 0, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #ff9900, #ffb703)',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(135deg, #ffb703, #ff9900)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;
