import React from 'react';

import { Container, Grid } from '@material-ui/core';

export default function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container maxWidth="lg">
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>&copy; {currentYear}, ObscurelyMe</Grid>
        </Grid>
      </Container>
    </footer>
  );
}
