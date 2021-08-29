import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Box } from '@material-ui/core';

import ErrorFallback from '../ErrorFallback';
import Header from '../Header';
import Footer from '../Footer';
import { RouterProvider, Router } from '../Router';
import ThemeProvider from '../Theme';
import Background from '../Background';

function App(): React.ReactElement {
  const [reset, setReset] = useState(0);
  function handleError(error: Error, info: { componentStack: string }) {
    console.error(error.name);
    console.error(error.message);
    console.error(info.componentStack);
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={() => {
        setReset(reset + 1);
      }}
      resetKeys={[reset]}
    >
      <RouterProvider>
        <ThemeProvider>
          <Background />
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 5,
              color: 'white',
            }}
          >
            <Header />
            <Router />
            <Footer />
          </Box>
        </ThemeProvider>
      </RouterProvider>
    </ErrorBoundary>
  );
}

export default App;
