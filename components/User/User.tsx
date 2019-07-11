import gql from 'graphql-tag';
import Head from 'next/head';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Posts from '../../components/Post/Posts';
import UserPanelProfile from '../../components/User/UserPanelProfile';

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

export const User = ({ id }) => {
  return (
    <Query query={GET_USER} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading || error) {
          return null;
        }

        if (!data || !data.user) {
          return 'User not found';
        }

        const user = data.user;

        return (
          <Box>
            <Head>
              <title>{user.name}</title>
            </Head>
            <UserPanelProfile user={user} />
            <PostsBox>
              <Posts title="Клипы" authorId={user.id} sort="new" />
            </PostsBox>
          </Box>
        );
      }}
    </Query>
  );
};
