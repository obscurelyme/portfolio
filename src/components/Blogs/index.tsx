import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Box, List, ListItem, Typography } from '@material-ui/core';

import Breadcrumbs from '../Breadcrumbs';
import Link from '../Link';
import { useState } from 'react';
import { useEffect } from 'react';

function useLinks(): any[] {
  const [state, setState] = useState<any>();

  useEffect(() => {
    import('../../links.json').then((links) => setState(links.default));
  });

  return state;
}

export default function Blogs(): React.ReactElement {
  const { path } = useRouteMatch();
  const links = useLinks();

  return (
    <Box>
      <Breadcrumbs />
      <Box>Blogs</Box>
      <Switch>
        <Route exact path={path}>
          <Box>Select a blog...</Box>
          <List>
            {links?.map((link, index) => (
              <ListItem key={index}>
                <Link to={link.slug}>
                  <Typography variant="h6">Lorem Ipsum</Typography>
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
