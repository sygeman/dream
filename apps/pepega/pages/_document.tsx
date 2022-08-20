import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" type="image/png" href={`/favicon.png`} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css?family=Orbitron:500|Roboto:300,400,500&subset=cyrillic-ext&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <div id="root-modal" />
        <NextScript />
      </body>
    </Html>
  );
}
