import React, { useState } from 'react';

import { Box, Button, Grid, Card, CardActions, CardActionArea, CardContent, Typography } from '@material-ui/core';

import { BlogDetails } from './Database';
import { Redirect } from 'react-router-dom';

export default function BlogThumbnail(details: React.PropsWithChildren<BlogDetails>): React.ReactElement {
  const [redirect, setRedirect] = useState<string | undefined>();

  if (redirect) {
    return <Redirect to={redirect} push />;
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="h4">{details.title}</Typography>
            {details.published && (
              <Typography variant="caption">Published: {new Date(details.published).toDateString()}</Typography>
            )}
            {details.description && (
              <Box pt={2}>
                <Typography variant="body2">{details.description}</Typography>
              </Box>
            )}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            onClick={() => {
              setRedirect(`/blogs/${details.slug}`);
            }}
          >
            Read
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
