import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import '../styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SGMN.DEV</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
