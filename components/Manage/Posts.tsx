import gql from 'graphql-tag';
import { FC } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import PinnedPost from './PinnedPost';

export const GET_PINNED_POSTS = gql`
  query pinnedPosts {
    pinnedPosts {
      count
      posts {
        id
      }
    }
  }
`;

const Box = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 70px;
  padding: 40px 0;
`;

const PinnedPosts: FC = () => {
  return (
    <Query fetchPolicy="network-only" query={GET_PINNED_POSTS}>
      {({ loading, error, data }) => {
        if (loading) {
          return null;
        }

        if (error) {
          return error;
        }

        return (
          <Box>
            {data.pinnedPosts.posts.length === 0 && 'No posts'}
            {data.pinnedPosts.posts.map(post => (
              <PinnedPost key={post.id} id={post.id} />
            ))}
          </Box>
        );
      }}
    </Query>
  );
};

export default PinnedPosts;
