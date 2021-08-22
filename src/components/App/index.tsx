import React from 'react';

import Header from '../Header';
import Footer from '../Footer';
import { RouterProvider, Router } from '../Router';
import ThemeProvider from '../Theme';

import './styles.css';

function App(): React.ReactElement {
  return (
    <RouterProvider>
      <ThemeProvider>
        <Header />
        <Router />
        <Footer />
      </ThemeProvider>
    </RouterProvider>
  );
}

export default App;
