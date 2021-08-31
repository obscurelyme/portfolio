import React from 'react';

import { Box, List, ListItem } from '@material-ui/core';

import Breadcrumbs from '../Breadcrumbs';
import BlogThumbnail from './BlogThumbnail';
import { useBlogDatabase } from './Database';

import './styles.css';

export default function Blogs(): React.ReactElement {
  const db = useBlogDatabase();

  return (
    <Box>
      <Breadcrumbs />
      <List className="obc-list">
        {db.latest?.map((link) => (
          <ListItem key={link.title} disableGutters className="obc-item">
            <BlogThumbnail {...link} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
