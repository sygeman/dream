import gql from 'graphql-tag';
import { FC } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import useRouter from '../../hooks/useRouter';
import PostsView from './PostsView';

export const GET_POSTS = gql`
  query getPosts(
    $where: PostWhereInput
    $order: PostOrderInput
    $skip: Int
    $first: Int
  ) {
    posts(where: $where, order: $order, skip: $skip, first: $first) {
      count
      posts {
        id
        nfws
        spoiler
        cover
        title
        channelName
        rating
        sourceId
        deleted
        createdAt
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
  title?: string;
  description?: string;
  rows?: number;
  limit?: number;
  noMore?: boolean;
  titleLink?: string;
}

const Posts: FC<IProps> = ({
  sort,
  authorId,
  likedUserId,
  title,
  description,
  noMore,
  rows,
  titleLink
}) => {
  const limit: number = 25;
  const router = useRouter();

  let variables: any = {
    where: {},
    order: {},
    skip: 0,
    first: rows ? rows * 6 : limit
  };

  if (authorId) {
    variables.where.authorId = authorId;
  }

  if (likedUserId) {
    variables.where.reactions = {
      userId: likedUserId,
      type: 'like'
    };
  }

  const sorts = {
    new: {
      order: {
        createdAt: 'DESC'
      }
    },
    hot: {
      where: {
        createdAt: {
          limit: '24h'
        },
        rating: {
          more: 5
        }
      },
      order: {
        createdAt: 'DESC'
      }
    },
    topDay: {
      where: {
        createdAt: {
          limit: '1d'
        }
      },
      order: {
        rating: 'DESC',
        createdAt: 'DESC'
      }
    },
    topWeek: {
      where: {
        createdAt: {
          limit: '7d'
        }
      },
      order: {
        rating: 'DESC',
        createdAt: 'DESC'
      }
    },
    topMonth: {
      where: {
        createdAt: {
          limit: '30d'
        }
      },
      order: {
        rating: 'DESC',
        createdAt: 'DESC'
      }
    },
    topAll: {
      order: {
        rating: 'DESC',
        createdAt: 'DESC'
      }
    }
  };

  if (sort) {
    variables = {
      ...variables,
      ...sorts[sort]
    };
  }

  return (
    <Box style={{ padding: '0 20px' }}>
      <Query
        query={GET_POSTS}
        fetchPolicy="cache-and-network"
        variables={variables}
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
              description={description}
              titleLink={titleLink}
              posts={posts}
              loading={loading}
              rows={rows}
              hasMore={hasMore && !rows && !noMore}
              onPlay={post => {
                router.push(
                  {
                    pathname: router.route,
                    query: {
                      clipId: post.sourceId,
                      backPath: router.asPath,
                      ...router.query
                    }
                  },
                  `/clip/${post.sourceId}`,
                  {
                    shallow: true
                  }
                );
              }}
              loadMore={() =>
                fetchMore({
                  variables: {
                    skip: currentCount
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
