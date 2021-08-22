import React from 'react';

import { Typography } from '@material-ui/core';

export default function Home(): React.ReactElement {
  return (
    <>
      <Typography variant="h1">Heading H1</Typography>
      <Typography variant="h2">Heading H2</Typography>
      <Typography variant="h3">Heading H3</Typography>
      <Typography variant="h4">Heading H4</Typography>
      <Typography variant="h5">Heading H5</Typography>
      <Typography variant="h6">Heading H6</Typography>
      <Typography variant="body1">Body 1</Typography>
      <Typography variant="body2">Body 2</Typography>
      <Typography variant="caption">Caption</Typography>
      <br />
      <Typography variant="button">Button</Typography>
      <Typography variant="subtitle1">Subtitle 1</Typography>
      <Typography variant="subtitle2">Subtitle 2</Typography>
      <Typography variant="overline">Overline</Typography>
    </>
  );
}
