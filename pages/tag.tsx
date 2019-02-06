import gql from 'graphql-tag';
import Head from 'next/head';
import * as React from 'react';
import { Query } from 'react-apollo';
import Posts from '../components/Posts';
import Streams from '../components/Stream';
import useRouter from '../hooks/useRouter';
import Layout from '../layouts/Main';

const GET_TAG = gql`
  query tag($id: ID!) {
    tag(id: $id) {
      id
      title
    }
  }
`;

const TagPage = () => {
  const router = useRouter();

  let tagId;

  if (typeof router.query.id === 'string') {
    tagId = router.query.id;
  }

  return (
    <Layout>
      <Query query={GET_TAG} variables={{ id: tagId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return null;
          }

          if (error || !data || !data.tag) {
            return null;
          }

          return (
            <>
              <Head>
                <title>#{data.tag.title}</title>
              </Head>
              <Streams />
              <Posts title={`#${data.tag.title}`} tagId={tagId} sort="new" />
            </>
          );
        }}
      </Query>
    </Layout>
  );
};

export default TagPage;
