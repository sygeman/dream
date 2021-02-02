import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { normalize } from 'styled-normalize';
import ravepro from '../theme/ravepro';
import { Box } from '../base/Box';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html, body, #__next, #root {
    background: #1e2532;
    height: 100%;
    overflow: hidden;
  }
`;

export const RaveProLayout: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={ravepro}>
      <GlobalStyle />
      <Box width="100%" height="100%" bg="dark1" color="text1">
        {children}
      </Box>
    </ThemeProvider>
  );
};
