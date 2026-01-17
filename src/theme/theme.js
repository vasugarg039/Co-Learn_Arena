import { createTheme } from '@mui/material/styles';

// Premium Color Palettes (Purple Gradient & Cyberpunk)
const darkPalette = {
  mode: 'dark',
  primary: {
    main: '#d946ef', // Fuchsia 500
    light: '#f0abfc',
    dark: '#a21caf',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#8b5cf6', // Violet 500
    light: '#a78bfa',
    dark: '#7c3aed',
  },
  background: {
    default: '#0f172a', // Fallback for gradient
    paper: '#1e1b4b',   // Indigo 950 (Deep Purple tint)
    glass: 'rgba(30, 27, 75, 0.7)', // Deep purple glass
    card: '#1e1b4b'
  },
  text: {
    primary: '#f8fafc',
    secondary: '#cbd5e1',
  },
  action: {
    hover: 'rgba(217, 70, 239, 0.08)', // Fuchsia tint on hover
  }
};

const lightPalette = {
  mode: 'light',
  primary: {
    main: '#9333ea', // Purple 600
    light: '#a855f7',
    dark: '#7e22ce',
  },
  secondary: {
    main: '#ec4899', // Pink 500
    light: '#f472b6',
    dark: '#db2777',
  },
  background: {
    default: '#fdf4ff', // Light purple tint
    paper: '#ffffff',
    glass: 'rgba(255, 255, 255, 0.8)',
  },
  text: {
    primary: '#111827',
    secondary: '#4b5563',
  },
};

const getThemeBase = (mode) => ({
  palette: mode === 'dark' ? darkPalette : lightPalette,
  typography: {
    fontFamily: '"Outfit", "Google Sans", "Inter", sans-serif',
    h1: { fontSize: '4rem', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.1 },
    h2: { fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.2 },
    h3: { fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em' },
    h4: { fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontSize: '1.25rem', fontWeight: 600 },
    h6: { fontSize: '1.1rem', fontWeight: 600 },
    body1: { fontSize: '1.05rem', lineHeight: 1.6 },
    button: { textTransform: 'none', fontWeight: 700, fontSize: '1rem' },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        body {
          transition: background 0.3s ease;
          overflow-x: hidden;
          background: ${mode === 'dark' ? 'linear-gradient(135deg, #2e1065 0%, #0f172a 100%)' : 'linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%)'};
          background-attachment: fixed;
          background-repeat: no-repeat;
          min-height: 100vh;
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb {
          background: ${mode === 'dark' ? '#4c1d95' : '#e9d5ff'}; /* Violet thumb */
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${mode === 'dark' ? '#6d28d9' : '#d8b4fe'};
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 700,
          boxShadow: 'none',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(217, 70, 239, 0.3)', // Fuchsia glow
            transform: 'translateY(-2px)',
          },
          '&:active': { transform: 'translateY(0)' },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #d946ef 0%, #8b5cf6 100%)', // Fuchsia to Violet
          '&:hover': {
            background: 'linear-gradient(135deg, #c026d3 0%, #7c3aed 100%)',
          }
        },
        outlinedPrimary: {
          borderColor: '#d946ef',
          color: '#d946ef',
          '&:hover': {
            borderColor: '#c026d3',
            background: 'rgba(217, 70, 239, 0.08)',
          }
        }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
          boxShadow: mode === 'dark' ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.05)',
        },
        elevation0: { boxShadow: 'none', border: 'none' }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: mode === 'dark' ? '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(217, 70, 239, 0.15)' : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  },
});

export const lightTheme = createTheme(getThemeBase('light'));
export const darkTheme = createTheme(getThemeBase('dark'));

export default lightTheme;
