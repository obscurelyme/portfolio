import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link as MuiLink, LinkProps as MuiLinkProps } from '@material-ui/core';

interface LinkProps {
  to: string;
}

export default function Link({
  children,
  to,
  ...props
}: React.PropsWithChildren<LinkProps & MuiLinkProps>): React.ReactElement {
  return (
    <MuiLink component={RouterLink} to={to} {...props}>
      {children}
    </MuiLink>
  );
}
