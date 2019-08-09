import Head from 'next/head';
import React from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import initApollo from './initApollo';

interface IProcess {
  browser: boolean;
}
declare var process: IProcess;

export default App => {
  return class WithData extends React.Component {
    public static displayName = `WithData(${App.displayName})`;

    public static async getInitialProps(ctx) {
      const {
        Component,
        router,
        ctx: { res }
      } = ctx;

      const apollo = initApollo({});

      ctx.ctx.apolloClient = apollo;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      // Run all graphql queries in the component tree
      // and extract the resulting data
      try {
        // Run all GraphQL queries
        await getDataFromTree(
          <App
            {...appProps}
            Component={Component}
            router={router}
            apolloClient={apollo}
          />
        );
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
        console.log('Error while running `getDataFromTree`', error);
      }

      if (!process.browser) {
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo's store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState
      };
    }
    public apolloClient: any;

    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState);
    }

    public render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
