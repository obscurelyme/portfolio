import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { Box, Button, Grid } from '@material-ui/core';
import { Description as DescriptionIcon } from '@material-ui/icons';

import './styles.css';

function useAboutMarkdown() {
  const [state, setState] = useState<string>('');

  useEffect(() => {
    fetch('/pages/about.md')
      .then((res) => {
        res
          .text()
          .then((markdown) => {
            setState(markdown);
          })
          .catch((err) => {
            throw new Error(err);
          });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  return state;
}

export default function About(): React.ReactElement {
  const content = useAboutMarkdown();

  function downloadResume(): void {
    window.open('/resources/resume.pdf', '_blank noreferrer');
  }

  return (
    <>
      <Box pt={10} pb={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box className="About-ProfileContainer">
              <img
                className="About-ProfilePicture"
                src="https://via.placeholder.com/400x300"
                alt="profile"
                title="profile image"
              />
            </Box>

            <Box mt={1}>
              <Button
                aria-label="Download my Resume"
                onClick={downloadResume}
                startIcon={<DescriptionIcon />}
                color="secondary"
              >
                Resume
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
