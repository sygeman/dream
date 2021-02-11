import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@pepega/utils/apollo';
import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @keyframes fadeIn{
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    min-height: 0;
    min-width: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  html, body {
    height: 100%;
    font-family: 'Roboto', sans-serif;
    overflow-y: hidden;
    background: #1E1D22;
    color: #eee;
  }

  #__next,
  #__layout {
    height: 100%;
    width: 100%;
    overflow-y: hidden;
    outline: none;
  }

  .rc-dropdown {
    position: absolute;
    z-index: 1070;
  }

  .rc-dropdown-hidden {
    display: none;
  }
`;

function CustomApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo({
    uri: 'https://api.sgmn.dev/graphql',
    pageProps,
  });

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider
        theme={{
          colors: {
            primary: '#6441A4',
            surface: '#262841',
            background: '#1D1E31',
            accent: '#968A9D',
            text: '#EEEEEE',
          },
        }}
      >
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css?family=Orbitron:500|Roboto:300,400,500&subset=cyrillic-ext"
            rel="stylesheet"
          />
          <title>RavePro</title>
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default CustomApp;
