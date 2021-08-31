import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '../ErrorFallback';
import Header from '../Header';
import Footer from '../Footer';
import { RouterProvider, Router } from '../Router';
import ThemeProvider from '../Theme';
import BlogDatabaseProvider from '../Blogs/Database';
import CurrentBlogProvider from '../Blogs/Current';

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
          <BlogDatabaseProvider>
            <Header />
            <CurrentBlogProvider>
              <Router />
            </CurrentBlogProvider>
            <Footer />
          </BlogDatabaseProvider>
        </ThemeProvider>
      </RouterProvider>
    </ErrorBoundary>
  );
}

export default App;
