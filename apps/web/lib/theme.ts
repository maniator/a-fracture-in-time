import { createTheme } from '@mui/material/styles';

/** Opaque surface colour used for modal dialogs (Paper surfaces are near-transparent by default). */
const DIALOG_SURFACE = '#1c1628';

export const fracturelineTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8b5cf6',
    },
    secondary: {
      main: '#f59e0b',
    },
    background: {
      default: '#08070b',
      paper: 'rgba(255, 255, 255, 0.06)',
    },
    text: {
      primary: '#f6efe4',
      secondary: 'rgba(246, 239, 228, 0.72)',
    },
  },
  typography: {
    fontFamily: 'Georgia, serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.04em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 24,
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: DIALOG_SURFACE,
          border: '1px solid rgba(255,255,255,0.12)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(12px)',
        },
      },
    },
  },
});
