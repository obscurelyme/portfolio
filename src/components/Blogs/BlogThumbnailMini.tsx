import React from 'react';

import { Card, CardActionArea, CardContent, CardActions, Typography } from '@material-ui/core';

import Link from '../Link';
import { BlogDetails } from './BlogProvider';

export default function BlogThumbnailMini({ title, slug, published }: Partial<BlogDetails>): React.ReactElement {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5">{title}</Typography>
          {published && <Typography variant="caption">{published}</Typography>}
          {/* {details.description && (
            <Typography variant="body2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe iste quibusdam, earum odit nobis officiis
              pariatur praesentium quis cumque, architecto repellendus quaerat.
            </Typography>
          )} */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/blogs/${slug}`}>Read</Link>
      </CardActions>
    </Card>
  );
}