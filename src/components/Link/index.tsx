import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button as MuiButton, Link as MuiLink } from '@material-ui/core';

interface LinkProps {
  type?: 'button' | 'link';
  to: string;
}

export default function Link<T>({
  type,
  children,
  to,
  ...props
}: React.PropsWithChildren<LinkProps & T>): React.ReactElement {
  if (type === 'button') {
    return (
      <MuiButton component={RouterLink} to={to} {...props}>
        {children}
      </MuiButton>
    );
  }

  return (
    <MuiLink component={RouterLink} to={to} {...props}>
      {children}
    </MuiLink>
  );
}
