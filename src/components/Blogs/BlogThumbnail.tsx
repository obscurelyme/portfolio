import React from 'react';

import { Box, Card, CardActions, CardActionArea, CardContent, Typography } from '@material-ui/core';

import Link from '../Link';

interface BlogThumbnailProps {
  title: string;
  description?: boolean;
  slug: string;
  published: string;
}

export default function BlogThumbnail({
  title,
  description,
  slug,
  published,
}: React.PropsWithChildren<BlogThumbnailProps>): React.ReactElement {
  return (
    <Box width={1}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="h4">{title}</Typography>
            {published && <Typography variant="caption">{published}</Typography>}
            {description && (
              <Typography variant="body2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe iste quibusdam, earum odit nobis
                officiis pariatur praesentium quis cumque, architecto repellendus quaerat.
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link type="button" to={`/blogs/${slug}`}>
            Read
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
}
