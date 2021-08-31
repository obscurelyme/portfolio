import React from 'react';
import { Redirect, Route, useParams, RouteProps } from 'react-router-dom';

import { Box } from '@material-ui/core';

import Breadcrumbs from '../Breadcrumbs';

import ReactMarkdown from 'react-markdown';
import { blogExists, useBlogDatabase, useBlogDetails, useBlogMarkdownContent } from './Database';
import { useSetCurrentBlogDetails } from './Current';

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
  const details = useBlogDetails(slug);
  // NOTE: This is a safe assertion because of the route guard
  useSetCurrentBlogDetails(details!);

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
    </Box>
  );
}
