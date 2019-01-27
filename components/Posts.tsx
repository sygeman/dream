import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import Link from 'next/link';
import { RouterProps, withRouter } from 'next/router';
import { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { IStore } from '../lib/store';
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
  width: ${({ gridWidth }) => gridWidth}px;
  margin: 0 auto;
`;

const SectionTitle = styled.div`
  display: flex;
  width: 100%;
  padding: 15px 25px 0;

  a {
    cursor: pointer;
  }
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
  router: RouterProps;
  store?: IStore;
}

@inject('store')
@observer
class Posts extends Component<IProps> {
  public limit: number = 25;
  public page: number = 0;
  public loadLock: boolean = false;

  constructor(props) {
    super(props);
  }

  public render() {
    const {
      sort,
      authorId,
      likedUserId,
      tagId,
      title,
      noMore,
      rows,
      store,
      router,
      titleLink
    } = this.props;

    return (
      <Box gridWidth={store.gridWidth}>
        <Query
          query={GET_POSTS}
          fetchPolicy="cache-and-network"
          variables={{
            sort,
            authorId,
            likedUserId,
            tagId,
            offset: 0,
            limit: this.limit
          }}
        >
          {({ loading, error, data, fetchMore }) => {
            if (error || !data || !data.posts) {
              return null;
            }

            let posts = data.posts.posts;

            if (rows > 0) {
              posts = posts.slice(0, rows * store.gridCountOnRow);
            }

            const currentCount = posts.length;

            if (currentCount === 0) {
              return null;
            }

            const hasMore = data.posts.count - currentCount > 0;

            if (store.gridWidth === 0) {
              return null;
            }

            return (
              <>
                {title && !titleLink && <SectionTitle>{title}</SectionTitle>}
                {title && titleLink && (
                  <SectionTitle>
                    <Link href={titleLink} passHref>
                      <a>{title}</a>
                    </Link>
                  </SectionTitle>
                )}
                <PostsView
                  posts={posts}
                  loading={loading}
                  hasMore={hasMore && !rows && !noMore}
                  onPlay={id => {
                    router.push(
                      {
                        pathname: router.route,
                        query: {
                          postId: id,
                          postAroudSort: sort,
                          postAroudAuthorId: authorId,
                          postAroudLikedUserId: likedUserId,
                          postAroudTagId: tagId,
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
              </>
            );
          }}
        </Query>
      </Box>
    );
  }
}

export default withRouter(Posts);
