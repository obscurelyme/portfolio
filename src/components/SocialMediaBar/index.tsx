import React from 'react';

import { Grid, Typography, Box } from '@material-ui/core';
import { Twitter, Instagram, GitHub } from '@material-ui/icons';

import IconButton from '../IconButton';

interface SocialMedia {
  url: string;
  Icon: typeof Twitter;
}

const SOCIAL_MEDIA: SocialMedia[] = [
  {
    url: 'https://twitter.com/ObscurelyMe',
    Icon: Twitter,
  },
  {
    url: 'https://www.instagram.com/obscurelycoffee/',
    Icon: Instagram,
  },
  {
    url: 'https://github.com/obscurelyme',
    Icon: GitHub,
  },
];

interface SocialMediaBarProps {
  vertical?: boolean;
}

export default function SocialMediaBar({ vertical }: SocialMediaBarProps): React.ReactElement {
  function handleSocialMediaClick(url: string): void {
    window.open(url, '_blank');
  }

  if (vertical) {
    return (
      <Box display="flex" flexDirection="column" alignItems="flex-end" pr={8} pt={2}>
        {SOCIAL_MEDIA.map((social) => (
          <Box py={2}>
            <IconButton
              key={social.url}
              color="secondary"
              onClick={() => {
                handleSocialMediaClick(social.url);
              }}
            >
              <social.Icon htmlColor="white" />
            </IconButton>
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h6" align="center">
            Follow Me
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="space-around">
          {SOCIAL_MEDIA.map((social) => (
            <IconButton
              key={social.url}
              color="secondary"
              onClick={() => {
                handleSocialMediaClick(social.url);
              }}
            >
              <social.Icon htmlColor="white" />
            </IconButton>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
