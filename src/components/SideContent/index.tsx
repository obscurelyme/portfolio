import React from 'react';

import { Grid } from '@material-ui/core';

import BlogThumbnailMini from '../Blogs/BlogThumbnailMini';
import { useCurrentBlogDetails } from '../Blogs/Current';

export default function SideContent(): React.ReactElement | null {
  const currentBlogDetails = useCurrentBlogDetails();

  if (!currentBlogDetails) {
    return null;
  }

  return (
    <Grid container>
      {currentBlogDetails?.next && (
        <Grid item xs={12}>
          <BlogThumbnailMini title={currentBlogDetails.next.title} slug={currentBlogDetails.next.slug} />
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
