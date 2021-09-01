import React from 'react';

import { Container, Grid, Typography } from '@material-ui/core';

export default function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container maxWidth="lg">
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Typography variant="caption">&copy; {currentYear}, ObscurelyMe</Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
