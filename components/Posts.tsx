import gql from 'graphql-tag';
import { FC } from 'react';
import { Query } from 'react-apollo';
import styled from '../theme';
import { scrollToTop } from '../utils/scroll';
import { changeURLParams } from '../utils/url';
import Emoji from './Emoji';
import Pagination from './Pagination';
import Post from './Post';

const setPage = (page: number) => {
  if (page === 0) {
    changeURLParams({ remove: ['page'] });
  } else {
    changeURLParams({ set: { page } });
  }

  scrollToTop();
};

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

const PostContainer = styled.div``;

const NoPosts = styled.div`
  padding: 40px 0;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoPostsText = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
  color: ${({ theme }) => theme.text1Color};
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
    fetchPolicy="network-only"
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
          {data.posts.posts.length === 0 && (
            <NoPosts>
              <NoPostsText>Тут пока нет постов</NoPostsText>
              <Emoji name="BibleThump" />
            </NoPosts>
          )}
          {data.posts.posts.map((post, index) => (
            <PostContainer key={post.id}>
              <Post {...post} withPreview orderPlay={page * 10 + index} />
            </PostContainer>
          ))}
          {data.posts.posts.length !== 0 && (
            <Pagination
              page={page}
              rowsCount={data.posts.count}
              setPage={n => setPage(n)}
            />
          )}
        </>
      );
    }}
  </Query>
);

export default Posts;
