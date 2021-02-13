import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import '../styles/globals.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Dream</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
