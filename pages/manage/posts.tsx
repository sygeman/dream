import * as React from 'react';
import Posts from '../../components/Manage/Posts';
import Layout from '../../layouts/Manage';

export default class extends React.Component {
  public render() {
    return (
      <Layout>
        <Posts />
      </Layout>
    );
  }
}
