import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '../ErrorFallback';
import Header from '../Header';
import Footer from '../Footer';
import { RouterProvider, Router } from '../Router';
import ThemeProvider from '../Theme';
import BlogProvider from '../Blogs/BlogProvider';

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
          <BlogProvider>
            <Header />
            <Router />
            <Footer />
          </BlogProvider>
        </ThemeProvider>
      </RouterProvider>
    </ErrorBoundary>
  );
}

export default App;
