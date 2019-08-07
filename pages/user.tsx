import gql from 'graphql-tag';
import Head from 'next/head';
import * as React from 'react';
import { useQuery } from 'react-apollo';
import Posts from '../components/Post/Posts';
import UserPanelProfile from '../components/User/UserPanelProfile';
import { useRouter } from '../hooks/useRouter';
import Layout from '../layouts/Main';
import styled from 'styled-components';

const GET_USER = gql`
  query getUser($id: ID) {
    user(id: $id) {
      id
      role
      name
      avatar
    }
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

const PostsBox = styled.div`
  margin: 0 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
`;

const UserPage = () => {
  const router = useRouter();

  let userId;

  if (typeof router.query.id === 'string') {
    userId = router.query.id;
  }

  const { loading, data } = useQuery(GET_USER, { variables: { id: userId } });

  if (loading) {
    return null;
  }

  return (
    <Layout fixedTopContent={<UserPanelProfile user={data.user} />}>
      <Box>
        <Head>
          <title>{data.user.name}</title>
        </Head>

        <PostsBox>
          <Posts title="Клипы" authorId={data.user.id} sort="new" />
        </PostsBox>
      </Box>
    </Layout>
  );
};

export default UserPage;
