import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { Container } from '@material-ui/core';

import About from '../About';
import Home from '../Home';
import Blogs from '../Blogs';

export function RouterProvider({ children }: React.PropsWithChildren<{}>): React.ReactElement {
  return <BrowserRouter>{children}</BrowserRouter>;
}

export function Router(): React.ReactElement {
  return (
    <Container maxWidth="lg">
      <Switch>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/blogs">
          <Blogs />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="*">
          <Redirect to="/home" exact />
        </Route>
      </Switch>
    </Container>
  );
}
