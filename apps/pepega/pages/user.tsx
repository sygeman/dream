import gql from 'graphql-tag';
import Head from 'next/head';
import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Clips } from '../containers/Clips';
import UserPanelProfile from '../containers/User/UserPanelProfile';
import { useRouter } from 'next/router';
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
  padding: 20px 0;
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
          <Clips
            orderBy={{ name: 'communityClipCreatedAt', type: 'DESC' }}
            communityClipAuthorId={data.user.id}
          />
        </PostsBox>
      </Box>
    </Layout>
  );
};

export default UserPage;
