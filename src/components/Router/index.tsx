import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { Box, Container, Grid, Button, Typography } from '@material-ui/core';
import { Instagram, Twitter } from '@material-ui/icons';

import About from '../About';
import Blogs from '../Blogs';
import Blog, { GuardedBlogRoute } from '../Blogs/Blog';
import SideContent from '../SideContent';

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
        <Grid item md={3}>
          <Box
            style={{
              top: '158px',
              position: 'sticky',
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <Typography align="right">Follow Me</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1} justifyContent="flex-end">
                  <Grid item>
                    <Button variant="contained" color="secondary" startIcon={<Twitter />}>
                      Twitter
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" startIcon={<Instagram />}>
                      Instagram
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <SideContent />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
