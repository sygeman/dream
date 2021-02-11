import React from 'react';
import { CurrentPlaying } from '@dream/containers/RavePro/CurrentPlaying';
import ravepro from '@dream/ui/theme/ravepro';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html, body, #__next, #root {
    background: #1e2532;
    height: 100%;
    overflow: hidden;
  }
`;

export function SpotifyNow() {
  return (
    <ThemeProvider theme={ravepro}>
      <GlobalStyle />
      <CurrentPlaying />
    </ThemeProvider>
  );
}

export default SpotifyNow;
