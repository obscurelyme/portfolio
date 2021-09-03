import { createTheme, CssBaseline, ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import React from 'react';

const FONT_SIZE = 18;

// extra comment
export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: ['Lato', 'Arial', 'sans-serif'].join(','),
    fontSize: FONT_SIZE,
  },
  palette: {
    primary: {
      main: '#5BB0BA',
    },
    secondary: {
      main: '#C15B78',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      default: '#EBF5F7',
      paper: '#dec8ff',
    },
    text: {
      primary: '#333',
      secondary: '#5d5d5d',
      disabled: 'blue',
      hint: 'green',
    },
  },
});

theme.typography.h1 = {
  fontSize: '4rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '3rem',
  },
  fontFamily: ['Quicksand', 'Arial', 'sans-serif'].join(','),
};

theme.typography.h2 = {
  fontSize: '3.25rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.85rem',
  },
  fontFamily: ['Quicksand', 'Arial', 'sans-serif'].join(','),
};

theme.typography.h3 = {
  fontSize: '2.75rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
  fontFamily: ['Quicksand', 'Arial', 'sans-serif'].join(','),
};

theme.typography.h4 = {
  fontSize: '2.25rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
  fontFamily: ['Quicksand', 'Arial', 'sans-serif'].join(','),
};

theme.typography.h5 = {
  fontSize: '2rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.75rem',
  },
  fontFamily: ['Quicksand', 'Arial', 'sans-serif'].join(','),
};

theme.typography.h6 = {
  fontSize: '1.75rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem',
  },
  fontFamily: ['Quicksand', 'Arial', 'sans-serif'].join(','),
};

theme.typography.caption = {
  fontFamily: ['Quicksand', 'Arial', 'sans-serif'].join(','),
};

theme.typography.body2 = {
  [theme.breakpoints.up('xs')]: {
    fontSize: '1rem',
  },
};

export default function ThemeProvider({ children }: React.PropsWithChildren<{}>): React.ReactElement {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
