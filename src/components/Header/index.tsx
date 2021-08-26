import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Card, Container, Grid, Link, Toolbar, Typography } from '@material-ui/core';

export default function Header(): React.ReactElement {
  return (
    <>
      <Card>
        <img src="http://placehold.it/3000x200" />
      </Card>
      <AppBar position="sticky">
        <Toolbar variant="regular" disableGutters>
          <Container maxWidth="lg">
            <Grid container spacing={0} justifyContent="space-between" alignItems="center">
              <Grid item>
                <RouterLink to="/home">
                  <Typography variant="h5">Obscurely Me</Typography>
                </RouterLink>
              </Grid>
              <Grid item xs={2}>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Link color="inherit" component={RouterLink} to="/blogs">
                    Blogs
                  </Link>
                  <Link color="inherit" component={RouterLink} to="/about">
                    About
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
