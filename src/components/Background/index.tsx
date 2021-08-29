import React from 'react';

import { Box } from '@material-ui/core';

export default function Background(): React.ReactElement {
  return (
    <>
      <Box
        style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 0, overflow: 'hidden' }}
      >
        <video
          loop
          preload="auto"
          playsInline
          autoPlay
          muted
          style={{
            position: 'absolute',
            minHeight: '100vh',
            minWidth: '135vw',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        >
          <source src="/assets/seattle-flyover.mp4" type="video/mp4" />
        </video>
      </Box>
      <Box
        style={{
          position: 'absolute',
          zIndex: 1,
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          top: 0,
          left: 0,
          width: '100%',
        }}
      ></Box>
    </>
  );
}
