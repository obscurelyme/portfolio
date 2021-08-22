import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { Breadcrumbs, Container, Link } from '@material-ui/core';

import Home from '../Home';

export function RouterProvider({ children }: React.PropsWithChildren<{}>): React.ReactElement {
  return <BrowserRouter>{children}</BrowserRouter>;
}

export function Router(): React.ReactElement {
  return (
    <Container maxWidth="lg">
      <Breadcrumbs>
        <Link color="inherit" href="/">
          Obscurely Me
        </Link>
        <Link color="inherit" href="/">
          Blogs
        </Link>
        <Link color="textPrimary" href="/" aria-current="page">
          Lorem Ipsum
        </Link>
      </Breadcrumbs>
      <Switch>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="*">
          <Redirect to="/home" exact />
        </Route>
      </Switch>
    </Container>
  );
}
