import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Box, List, ListItem, Typography } from '@material-ui/core';

import Breadcrumbs from '../Breadcrumbs';
import Link from '../Link';
import { useState } from 'react';
import { useEffect } from 'react';

interface Blog {
  slug: string;
  title: string;
  author: string;
  published: string;
  next: Partial<Blog> | null;
  prev: Partial<Blog> | null;
}

interface BlogDatabase {
  latest: Blog[];
  archive: Blog[];
}

function useDatabase(): BlogDatabase | undefined {
  const [state, setState] = useState<BlogDatabase | undefined>();

  useEffect(() => {
    import('../../db.json').then((links) => setState(links.default));
  });

  return state;
}

export default function Blogs(): React.ReactElement {
  const { path } = useRouteMatch();
  const db = useDatabase();

  return (
    <Box>
      <Breadcrumbs />
      <Box>Blogs</Box>
      <Switch>
        <Route exact path={path}>
          <Box>Select a blog...</Box>
          <List>
            {db?.latest.map((link, index) => (
              <ListItem key={link.title}>
                <Link to={`/blogs/${link.slug}`}>
                  <Typography variant="h6">{link.title}</Typography>
                  <Typography variant="caption">Published: {new Date(link.published).toDateString()}</Typography>
                </Link>
              </ListItem>
            ))}
          </List>
        </Route>
        <Route path={`${path}/:slug`}>
          <Box>Lorem Ipsum</Box>
        </Route>
      </Switch>
    </Box>
  );
}
