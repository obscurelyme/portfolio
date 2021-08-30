import React, { useState } from 'react';

import { Button, Grid, Card, CardActions, CardActionArea, CardContent, Typography } from '@material-ui/core';

import { BlogDetails } from './BlogProvider';
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
            {details.published && <Typography variant="caption">{details.published}</Typography>}
            {details.description && (
              <Typography variant="body2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe iste quibusdam, earum odit nobis
                officiis pariatur praesentium quis cumque, architecto repellendus quaerat.
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            color="primary"
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
