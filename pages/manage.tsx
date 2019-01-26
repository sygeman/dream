import * as React from 'react';
import Dashboard from '../components/Manage/Dashboard';
import Layout from '../layouts/Manage';

export default class extends React.Component {
  public render() {
    return (
      <Layout>
        <Dashboard />
      </Layout>
    );
  }
}
