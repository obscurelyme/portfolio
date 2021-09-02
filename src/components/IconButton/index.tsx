import React from 'react';

import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  withTheme,
  Theme,
} from '@material-ui/core';

import './styles.css';

type IconButtonProps = MuiIconButtonProps & { theme: Theme };

export function IconButton(props: IconButtonProps): React.ReactElement {
  const { children, color, ...rest } = props;

  function calcColor(): string {
    if (props.color === 'primary') {
      return props.theme.palette.primary.main;
    }
    return props.theme.palette.secondary.main;
  }

  return (
    <MuiIconButton
      style={{
        backgroundColor: calcColor(),
      }}
      className={`ObscurelyMe-IconButton`}
      {...rest}
    >
      {children}
    </MuiIconButton>
  );
}

export default withTheme(IconButton);
