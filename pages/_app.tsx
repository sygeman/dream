import { Provider } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import App, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import 'simplebar/dist/simplebar.min.css';
import { initializeStore, IStore } from '../lib/store';
import withApollo from '../lib/withApollo';
import { ThemeProvider } from '../theme';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface IProps {
  isServer: boolean;
  initialState: IStore;
  apolloClient: any;
}

class MyApp extends App<IProps> {
  public static async getInitialProps({ Component, ctx }) {
    //
    // Use getInitialProps as a step in the lifecycle when
    // we can initialize our store
    //
    const isServer = typeof window === 'undefined';
    const store = initializeStore(isServer);

    //
    // Check whether the page being rendered by the App has a
    // static getInitialProps method and if so call it
    //
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      initialState: getSnapshot(store),
      isServer,
      pageProps
    };
  }

  private store: IStore;

  constructor(props) {
    super(props);
    this.store = initializeStore(props.isServer, props.initialState) as IStore;
  }

  public render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider
            theme={{
              dark1Color: '#1D1E31',
              dark2Color: '#262841',
              accent2Color: '#968a9d',
              main1Color: '#6441A4',
              text1Color: '#eee'
            }}
          >
            <Provider store={this.store}>
              <React.Fragment>
                <Head>
                  <link
                    rel="icon"
                    type="image/png"
                    href="https://ravepro.ams3.digitaloceanspaces.com/favicons/twitchru.png"
                  />
                  <title>TwitchRu</title>
                  <meta property="og:locale" content="ru_RU" />
                  <meta property="og:type" content="website" />
                  <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                    key="viewport"
                  />
                </Head>
                <Component {...pageProps} />
              </React.Fragment>
            </Provider>
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
