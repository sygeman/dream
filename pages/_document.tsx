import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

const GlobalStyle = `
@import url('https://fonts.googleapis.com/css?family=Orbitron:500|Roboto:300,400,500&subset=cyrillic-ext');
@import url('https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css');

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

#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: #6441A4;
  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
}

#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px #fff, 0 0 5px #fff;
  opacity: 1.0;
  transform: rotate(3deg) translate(0px, -4px);
}
`;

interface IProps {
  styleTags: any;
}

export default class MyDocument extends Document<IProps> {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  public render() {
    return (
      <html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: GlobalStyle }} />
          <meta
            name="description"
            content="Топ Моменты с Twitch | Топ Моменты Твича | Топ Клипы Твич Twitchru | Топ Твича, Клипы со Стрима и Моменты с Твича"
          />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <div id="root-modal" />
          <NextScript />
        </body>
      </html>
    );
  }
}
