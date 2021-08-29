import React from 'react';
import { useLocation } from 'react-router-dom';

import { Box, Breadcrumbs as MuiBreadcrumbs, Grid } from '@material-ui/core';

import Link from '../Link';

interface Breadcrumb {
  link: string;
  title: string;
  isCurrentPage: boolean;
}

function toWhitespace(str: string): string {
  return str
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ')
    .trim();
}

export function useBreadcrumbs(pathname: string): (Breadcrumb | null)[] {
  const pathRegister = pathname.split('/');
  pathRegister.shift();
  if (pathRegister[0] === '') {
    return [];
  }
  let p = '';
  return pathRegister.map((path) => {
    if (path !== '') {
      p += `/${path}`;
      return {
        title: toWhitespace(path),
        link: p,
        isCurrentPage: p === pathname || p + '/' === pathname,
      };
    }
    return null;
  });
}

export default function Breadcrumbs(): React.ReactElement {
  const { pathname } = useLocation();
  const crumbs = useBreadcrumbs(pathname);

  return (
    <Box py={3}>
      <Grid container justifyContent="center">
        <Grid item>
          <MuiBreadcrumbs>
            <Link color="inherit" to="/home">
              Obscurely Me
            </Link>
            {crumbs.map((crumb) => {
              if (crumb) {
                return (
                  <Link key={crumb.title} color={crumb.isCurrentPage ? 'textPrimary' : 'inherit'} to={crumb.link}>
                    {crumb.title}
                  </Link>
                );
              }
              return null;
            })}
          </MuiBreadcrumbs>
        </Grid>
      </Grid>
    </Box>
  );
}
