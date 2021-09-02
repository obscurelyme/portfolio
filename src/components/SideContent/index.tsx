import React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';

import BlogThumbnailMini from '../Blogs/BlogThumbnailMini';
import { useCurrentBlogDetails } from '../Blogs/Current';

export default function SideContent(): React.ReactElement | null {
  const currentBlogDetails = useCurrentBlogDetails();

  if (!currentBlogDetails) {
    return null;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h6" align="center">
            Other Blogs
          </Typography>
        </Box>
      </Grid>
      {currentBlogDetails?.next && (
        <Grid item xs={12}>
          <Box pb={1}>
            <BlogThumbnailMini title={currentBlogDetails.next.title} slug={currentBlogDetails.next.slug} />
          </Box>
        </Grid>
      )}
      {currentBlogDetails?.prev && (
        <Grid item xs={12}>
          <BlogThumbnailMini title={currentBlogDetails.prev.title} slug={currentBlogDetails.prev.slug} />
        </Grid>
      )}
    </Grid>
  );
}
