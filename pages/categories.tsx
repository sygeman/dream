import * as React from 'react';
import TwitchTopClips from '../components/TwitchTopClips';
import Layout from '../layouts/Main';

export default class extends React.Component {
  public render() {
    return (
      <Layout>
        <TwitchTopClips limit={50} />
      </Layout>
    );
  }
}
