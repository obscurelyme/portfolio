import React from 'react';
import { Redirect, Route, useParams, RouteProps } from 'react-router-dom';

import { Box } from '@material-ui/core';

import Breadcrumbs from '../Breadcrumbs';

import ReactMarkdown from 'react-markdown';
import { blogExists, getBlog, useBlogDatabase, useBlogMarkdownContent } from './Database';
import { useCurrentBlogDispatch, setCurrent, clearCurrent } from './Current';
import { useEffect } from 'react';
import Link from '../Link';

export function GuardedBlogRoute({ children, ...rest }: RouteProps): React.ReactElement {
  const db = useBlogDatabase();

  return (
    <Route
      {...rest}
      render={({ match }) => {
        const slug = match.params.slug;
        if (slug && blogExists(slug, db)) {
          return children;
        }
        return <Redirect to="/home" />;
      }}
    />
  );
}

export default function Blog(): React.ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const blog = useBlogMarkdownContent(slug);
  const dispatch = useCurrentBlogDispatch();
  const db = useBlogDatabase();

  useEffect(() => {
    setCurrent(getBlog(slug, db), dispatch);
  }, [slug, dispatch, db]);

  useEffect(() => {
    return () => {
      clearCurrent(dispatch);
    };
  }, [dispatch]);

  if (!blog) {
    return (
      <Box>
        <Breadcrumbs />
        <ReactMarkdown>### Loading your content...</ReactMarkdown>
      </Box>
    );
  }

  return (
    <Box>
      <Breadcrumbs />
      <ReactMarkdown skipHtml>{blog}</ReactMarkdown>
      <Link to="/blogs/hello-world">Hello World</Link>
    </Box>
  );
}
