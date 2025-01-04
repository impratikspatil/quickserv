// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    color: 'black',
    h1: {
      fontFamily: 'Poppins, sans-serif',
      color: 'black',
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
      color: 'black',
    },
    h5: {
      fontFamily: 'Poppins, sans-serif',
      color: 'black',
    },
    body1: {
      fontFamily: 'Poppins, sans-serif',
      color: 'black',
    },
    body2: {
      fontFamily: 'Poppins, sans-serif',
      color: 'black',
    },
    textcolor:
    {
      color: 'black',
    },
  },
  palette: {
    primary: {
      main: '#1976d2', // Example primary color
    },
    secondary: {
      main: '#dc004e', // Example secondary color
    },
  },
});

export default theme;
