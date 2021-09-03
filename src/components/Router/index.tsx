import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { Hidden, Box, Container, Grid } from '@material-ui/core';

import About from '../About';
import Blogs from '../Blogs';
import Blog, { GuardedBlogRoute } from '../Blogs/Blog';
import SideContent from '../SideContent';
import SocialMediaBar from '../SocialMediaBar';

export function RouterProvider({ children }: React.PropsWithChildren<{}>): React.ReactElement {
  return <BrowserRouter>{children}</BrowserRouter>;
}

export function Router(): React.ReactElement {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item md={9}>
          <Switch>
            <GuardedBlogRoute exact path="/blogs/:slug">
              <Blog />
            </GuardedBlogRoute>
            <Route path="/home" exact>
              <Blogs />
            </Route>
            <Route path="/about" exact>
              <About />
            </Route>
            <Route path="*">
              <Redirect to="/home" exact />
            </Route>
          </Switch>
        </Grid>
        <Hidden smDown>
          <Grid item md={3}>
            <Box
              style={{
                top: '158px',
                position: 'sticky',
              }}
            >
              <Box px={1}>
                <Grid container alignItems="flex-end">
                  <SocialMediaBar />
                  <Grid item xs={12}>
                    <Box pt={3}>
                      <SideContent />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  );
}
