
import { createTheme } from '@mui/material/styles';

// Define the color palette
const palette = {
  primary: {
    main: '#4A7C59', // Sage Green
  },
  secondary: {
    main: '#E67E50', // Warm Orange
  },
  background: {
    default: '#FAF8F5', // Cream/Beige
    paper: '#FFFFFF', // White
  },
  text: {
    primary: '#333333',
    secondary: '#555555',
  },
};

// Create the theme
const theme = createTheme({
  palette,
  typography: {
    fontFamily: 'Inter, sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          textTransform: 'none',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#3B6347',
          },
        },
        outlined: {
          borderColor: '#DDDDDD',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: palette.primary.main,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: palette.primary.main,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#DDDDDD',
        },
      },
    },
  },
});

export default theme;
