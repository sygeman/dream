import React from 'react';
import Head from 'next/head';
import { IntlProvider } from 'react-intl';
import { AppProps } from 'next/app';
import { lang } from '../lang';
import '../styles.css';
import MainLayout from '../layouts/main';

function CustomApp({ Component, pageProps }: AppProps) {
  const locale = 'en-US';

  return (
    <IntlProvider locale={locale} messages={lang[locale]}>
      <Head>
        <title>SGMN.DEV</title>
      </Head>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </IntlProvider>
  );
}

export default CustomApp;
