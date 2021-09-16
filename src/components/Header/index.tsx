import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Grid,
  Link,
  Hidden,
  Toolbar,
  Typography,
  withWidth,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import SocialMediaBar from '../SocialMediaBar';

import './styles.css';

export function Header(props: any): React.ReactElement {
  const [open, setOpen] = useState(false);

  function handleOpen(): void {
    setOpen(true);
  }

  function handleClose(): void {
    setOpen(false);
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar variant="regular" disableGutters>
          <Container maxWidth="lg">
            <Grid container spacing={0} justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography style={{ color: 'white' }} variant="h5">
                  Obscurely Me
                </Typography>
              </Grid>
              <Hidden smDown>
                <Grid item xs={2}>
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Link color="inherit" component={RouterLink} to="/home">
                      Home
                    </Link>
                    <Link color="inherit" component={RouterLink} to="/about">
                      About
                    </Link>
                  </Grid>
                </Grid>
              </Hidden>
              <Hidden only={['md', 'lg', 'xl']}>
                <Grid item xs={2}>
                  <IconButton onClick={handleOpen}>
                    <MenuIcon />
                  </IconButton>
                  <Drawer anchor="right" open={open} onClose={handleClose}>
                    <Box
                      style={{
                        width: '350px',
                        height: '100vh',
                      }}
                    >
                      <Box
                        mt={15}
                        style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-end',
                          paddingRight: '2rem',
                        }}
                      >
                        <Link className="Header-Link" component={RouterLink} to="/home" onClick={handleClose}>
                          Home
                        </Link>
                        <Link className="Header-Link" component={RouterLink} to="/about" onClick={handleClose}>
                          About
                        </Link>
                      </Box>
                      <SocialMediaBar vertical />
                    </Box>
                  </Drawer>
                </Grid>
              </Hidden>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default withWidth()(Header);
