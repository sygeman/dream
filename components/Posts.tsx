import gql from 'graphql-tag';
import { FC } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import useRouter from '../hooks/useRouter';
import PostsView from './PostsView';

export const GET_POSTS = gql`
  query getPosts(
    $authorId: ID
    $likedUserId: ID
    $tagId: ID
    $sort: SortType
    $offset: Int
    $limit: Int
  ) {
    posts(
      authorId: $authorId
      likedUserId: $likedUserId
      tagId: $tagId
      sort: $sort
      offset: $offset
      limit: $limit
    ) {
      count
      posts {
        id
      }
    }
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface IProps {
  sort?: string;
  authorId?: string;
  likedUserId?: string;
  tagId?: string;
  title?: string;
  rows?: number;
  limit?: number;
  noMore?: boolean;
  titleLink?: string;
}

const Posts: FC<IProps> = ({
  sort,
  authorId,
  likedUserId,
  tagId,
  title,
  noMore,
  rows,
  titleLink
}) => {
  const limit: number = 25;
  const router = useRouter();

  return (
    <Box style={{ padding: '0 20px' }}>
      <Query
        query={GET_POSTS}
        fetchPolicy="cache-and-network"
        variables={{
          sort,
          authorId,
          likedUserId,
          tagId,
          offset: 0,
          limit: rows ? rows * 6 : limit
        }}
      >
        {({ loading, error, data, fetchMore }) => {
          if (error || !data || !data.posts) {
            return null;
          }

          let posts = data.posts.posts;

          if (rows > 0) {
            posts = posts.slice(0, rows * 6);
          }

          const currentCount = posts.length;

          if (currentCount === 0) {
            return null;
          }

          const hasMore = data.posts.count - currentCount > 0;

          return (
            <PostsView
              title={title}
              titleLink={titleLink}
              posts={posts}
              loading={loading}
              hasMore={hasMore && !rows && !noMore}
              onPlay={id => {
                router.push(
                  {
                    pathname: router.route,
                    query: {
                      postId: id,
                      backPath: router.asPath,
                      ...router.query
                    }
                  },
                  {
                    pathname: '/post',
                    query: { id }
                  },
                  {
                    shallow: true
                  }
                );
              }}
              loadMore={() =>
                fetchMore({
                  variables: {
                    offset: currentCount
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) {
                      return prev;
                    }

                    return {
                      ...prev,
                      posts: {
                        ...prev.posts,
                        posts: [
                          ...prev.posts.posts,
                          ...fetchMoreResult.posts.posts
                        ]
                      }
                    };
                  }
                })
              }
            />
          );
        }}
      </Query>
    </Box>
  );
};

export default Posts;
