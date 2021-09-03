import React, { useState, useEffect } from 'react';

import { Box, Grid, Typography } from '@material-ui/core';

import BlogThumbnailMini from '../Blogs/BlogThumbnailMini';
import { setCurrentBlog, useCurrentBlogDetails, useCurrentBlogDispatch } from '../Blogs/Current';
import { Redirect, useLocation } from 'react-router-dom';
import { useBlogDatabase } from '../Blogs/Database';

export default function SideContent(): React.ReactElement | null {
  const location = useLocation();
  const [redirect, setRedirect] = useState<string | undefined>();
  const redirecting = !!redirect && location.pathname !== redirect;
  const currentBlogDetails = useCurrentBlogDetails();
  const dispatch = useCurrentBlogDispatch();
  const db = useBlogDatabase();

  useEffect(() => {
    setRedirect(undefined);
  }, [redirecting]);

  if (!currentBlogDetails) {
    return null;
  }

  if (redirecting) {
    return <Redirect to={redirect} push />;
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
        <>
          <Grid item xs={12}>
            <Box pb={1}>
              <BlogThumbnailMini
                title={currentBlogDetails.next.title}
                slug={currentBlogDetails.next.slug}
                next
                onClick={() => {
                  setCurrentBlog(currentBlogDetails?.next?.slug ?? '', db, dispatch);
                  setRedirect(`/blogs/${currentBlogDetails.next?.slug}`);
                }}
              />
            </Box>
          </Grid>
        </>
      )}
      {currentBlogDetails?.prev && (
        <Grid item xs={12}>
          <BlogThumbnailMini
            title={currentBlogDetails.prev.title}
            slug={currentBlogDetails.prev.slug}
            onClick={() => {
              setCurrentBlog(currentBlogDetails?.prev?.slug ?? '', db, dispatch);
              setRedirect(`/blogs/${currentBlogDetails.prev?.slug}`);
            }}
          />
        </Grid>
      )}
    </Grid>
  );
}
