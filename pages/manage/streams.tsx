import * as React from 'react';
import Streams from '../../components/Manage/Streams';
import Layout from '../../layouts/Manage';

export default class extends React.Component {
  public render() {
    return (
      <Layout>
        <Streams />
      </Layout>
    );
  }
}
