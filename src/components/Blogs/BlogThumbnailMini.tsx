import React from 'react';

import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';

interface BlogThumbnailMiniProps {
  title?: string;
  slug?: string;
  next?: boolean;
  prev?: boolean;
  onClick: () => void;
}

export default function BlogThumbnailMini({ title, next, onClick }: BlogThumbnailMiniProps): React.ReactElement {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography variant="body2" component="span">
            {next ? 'Next:' : 'Previous:'}
          </Typography>
          <Typography variant="h6">{title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
