import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { RouterProps, withRouter } from 'next/router';
import { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import PostView from '../components/PostHelper/View';
import { IStore } from '../lib/store';
import PostProvider from '../providers/Post';
import { Modal } from '../ui/Modal';
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
  padding: 15px 35px 0;
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
  router: RouterProps;
  store: IStore;
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
      router,
      noMore,
      rows,
      store
    } = this.props;

    let postId = null;

    if (typeof router.query.postId === 'string') {
      postId = router.query.postId;
    }

    return (
      <Box gridWidth={store.gridWidth}>
        <Modal minimal isOpen={!!postId} onClose={() => router.back()}>
          <div style={{ width: '1000px' }}>
            <PostProvider id={postId}>
              {({ post }) => <PostView {...post} />}
            </PostProvider>
          </div>
        </Modal>
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
            if (error) {
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
                {title && <SectionTitle>{title}</SectionTitle>}
                <PostsView
                  posts={posts}
                  loading={loading}
                  hasMore={hasMore && !rows && !noMore}
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
