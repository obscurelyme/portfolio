import { createTheme, CssBaseline, ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import React from 'react';

const FONT_SIZE = 18;

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
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
    fontSize: FONT_SIZE,
  },
});

theme.typography.h1 = {
  fontSize: '4rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '3rem',
  },
};

theme.typography.h2 = {
  fontSize: '3.25rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.85rem',
  },
};

theme.typography.h3 = {
  fontSize: '2.75rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
};

theme.typography.h4 = {
  fontSize: '2.25rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
};

theme.typography.h5 = {
  fontSize: '2rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.75rem',
  },
};

theme.typography.h6 = {
  fontSize: '1.75rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem',
  },
};

theme.typography.body2 = {
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.25rem',
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
