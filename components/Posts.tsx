import gql from 'graphql-tag';
import { RouterProps, withRouter } from 'next/router';
import { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import PostView from '../components/PostHelper/View';
import PostProvider from '../providers/Post';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import PostGridView from './PostHelper/GridView';
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

const PostContainer = styled.div`
  padding: 5px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
}

class Posts extends Component<IProps> {
  public limit: number = 25;
  public page: number = 0;
  public loadLock: boolean = false;

  constructor(props) {
    super(props);
  }

  public render() {
    const { sort, authorId, likedUserId, tagId, title, router } = this.props;

    let postId = null;

    if (typeof router.query.postId === 'string') {
      postId = router.query.postId;
    }

    return (
      <Box>
        <Modal minimal isOpen={!!postId} onClose={() => router.back()}>
          <div style={{ width: '1000px' }}>
            <PostProvider id={postId}>
              {({ post }) => <PostView {...post} />}
            </PostProvider>
          </div>
        </Modal>
        {title && <SectionTitle>{title}</SectionTitle>}

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

            const currentCount = data.posts.posts.length;

            if (currentCount === 0) {
              return null;
            }

            const hasMore = data.posts.count - currentCount > 0;

            return (
              <PostsView
                posts={data.posts.posts}
                count={data.posts.count}
                loading={loading}
                hasMore={hasMore}
                loadMore={() =>
                  fetchMore({
                    variables: {
                      offset: data.posts.posts.length
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
  }
}

export default withRouter(Posts);
