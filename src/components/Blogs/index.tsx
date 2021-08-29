import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Box, List, ListItem } from '@material-ui/core';

import Breadcrumbs from '../Breadcrumbs';
import Blog from './Blog';
import { useState } from 'react';
import { useEffect } from 'react';
import BlogThumbnail from './BlogThumbnail';

import './styles.css';

interface BlogDetails {
  slug: string;
  title: string;
  author: string;
  published: string;
  next: Partial<BlogDetails> | null;
  prev: Partial<BlogDetails> | null;
}

interface BlogDatabase {
  latest: BlogDetails[];
  archive: BlogDetails[];
}

function useBlogDatabase(): BlogDatabase | undefined {
  const [state, setState] = useState<BlogDatabase | undefined>();

  useEffect(() => {
    import('../../db.json').then((links) => setState(links.default));
  });

  return state;
}

export default function Blogs(): React.ReactElement {
  const { path } = useRouteMatch();
  const db = useBlogDatabase();

  return (
    <Box>
      <Breadcrumbs />
      <Switch>
        <Route path={path} exact>
          <List className="obc-list">
            {db?.latest.map((link) => (
              <ListItem key={link.title} disableGutters className="obc-item">
                <BlogThumbnail title={link.title} published={link.published} slug={link.slug} description />
              </ListItem>
            ))}
          </List>
        </Route>
        <Route path={`${path}/:slug`}>
          <Blog />
        </Route>
      </Switch>
    </Box>
  );
}
