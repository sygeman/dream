import gql from 'graphql-tag';
import { RouterProps, withRouter } from 'next/router';
import { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import PostView from '../components/PostHelper/View';
import PostProvider from '../providers/Post';
import { Modal } from '../ui/Modal';
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

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  sort?: string;
  authorId?: string;
  likedUserId?: string;
  tagId?: string;
  title?: string;
  router: RouterProps;
}

class Posts extends Component<IProps> {
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
      <Query
        query={GET_POSTS}
        fetchPolicy="cache-and-network"
        variables={{
          page: 0,
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
            <Box>
              <Modal minimal isOpen={!!postId} onClose={() => router.back()}>
                <div style={{ width: '1000px' }}>
                  <PostProvider id={postId}>
                    {({ post }) => <PostView {...post} />}
                  </PostProvider>
                </div>
              </Modal>
              {title && <SectionTitle>{title}</SectionTitle>}
              <Grid>
                {data.posts.posts.map(({ id }) => (
                  <PostContainer key={id}>
                    <PostProvider id={id}>
                      {({ post }) => (
                        <PostGridView
                          post={post}
                          onPlay={() => {
                            router.push(
                              `${router.route}?postId=${post.id}`,
                              `/post?id=${post.id}`,
                              {
                                shallow: true
                              }
                            );
                          }}
                        />
                      )}
                    </PostProvider>
                  </PostContainer>
                ))}
              </Grid>
            </Box>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(Posts);
