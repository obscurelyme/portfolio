import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Box, List, ListItem } from '@material-ui/core';

import Breadcrumbs from '../Breadcrumbs';
import Link from '../Link';

export default function Blogs(): React.ReactElement {
  const { path } = useRouteMatch();

  return (
    <Box>
      <Breadcrumbs />
      <Box>Blogs</Box>
      <Switch>
        <Route exact path={path}>
          <Box>Select a blog...</Box>
          <List>
            <ListItem>
              <Link to="/blogs/lorem-ipsum">Lorem Ipsum</Link>
            </ListItem>
            <ListItem>
              <Link to="/blogs/lorem-ipsum">Lorem Ipsum</Link>
            </ListItem>
          </List>
        </Route>
        <Route path={`${path}/:slug`}>
          <Box>Lorem Ipsum</Box>
        </Route>
      </Switch>
    </Box>
  );
}
