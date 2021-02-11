import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'resize-observer-polyfill';
import { withApollo } from 'src/lib/apollo';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, themes } from 'src/themes';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface IProps {
  isServer: boolean;
  apolloClient: any;
}

class MyApp extends App<IProps> {
  public render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={themes.dark}>
        <>
          <Head>
            <title>PepegaCom</title>
          </Head>
          <Component {...pageProps} />
          <GlobalStyle />
        </>
      </ThemeProvider>
    );
  }
}

export default withApollo(MyApp);
