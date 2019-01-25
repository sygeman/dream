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

const Grid = styled.div`
  width: 100%;
  display: grid;
  padding: 10px 30px;
  grid-template-columns: repeat(auto-fit, 300px);
  overflow-y: hidden;
`;

const SectionTitle = styled.div`
  display: flex;
  width: 100%;
  padding: 15px 35px 0;
`;

interface IProps {
  page?: number;
  sort?: string;
  authorId?: string;
  likedUserId?: string;
  tagId?: string;
  title?: string;
}

const Posts: FC<IProps> = ({
  page = 0,
  sort,
  authorId,
  likedUserId,
  tagId,
  title
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

      if (data.posts.posts.length === 0) {
        return null;
      }

      return (
        <>
          {title && <SectionTitle>{title}</SectionTitle>}
          <Grid>
            {data.posts.posts.map(({ id }) => (
              <PostContainer key={id}>
                <PostProvider id={id}>
                  {({ post }) => <PostGridView post={post} />}
                </PostProvider>
              </PostContainer>
            ))}
          </Grid>
        </>
      );
    }}
  </Query>
);

export default Posts;
