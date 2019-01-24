import gql from 'graphql-tag';
import { FC } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import PostProvider from '../providers/Post';
import PostGridView from './PostHelper/GridView';

export const GET_POSTS = gql`
  query getPosts(
    $authorId: ID
    $likedUserId: ID
    $tagId: ID
    $sort: SortType
    $page: Int
  ) {
    posts(
      authorId: $authorId
      likedUserId: $likedUserId
      tagId: $tagId
      sort: $sort
      page: $page
    ) {
      count
      posts {
        id
      }
    }
  }
`;

const PostContainer = styled.div`
  padding: 5px;
`;

interface IProps {
  page?: number;
  sort?: string;
  authorId?: string;
  likedUserId?: string;
  tagId?: string;
}

const Posts: FC<IProps> = ({
  page = 0,
  sort,
  authorId,
  likedUserId,
  tagId
}) => (
  <Query
    query={GET_POSTS}
    fetchPolicy="cache-and-network"
    variables={{
      page,
      sort,
      authorId,
      likedUserId,
      tagId
    }}
  >
    {({ loading, error, data }) => {
      if (loading) {
        return null;
      }

      if (error) {
        return error;
      }

      return (
        <>
          {data.posts.posts.map(({ id }) => (
            <PostContainer key={id}>
              <PostProvider id={id}>
                {({ post }) => <PostGridView post={post} />}
              </PostProvider>
            </PostContainer>
          ))}
        </>
      );
    }}
  </Query>
);

export default Posts;
