import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { RouterProps, withRouter } from 'next/router';
import { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import PostView from '../components/PostHelper/View';
import PostProvider from '../providers/Post';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import PostGridView from './PostHelper/GridView';

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

const Grid = styled.div`
  width: 100%;
  display: grid;
  padding: 10px 30px;
  grid-template-columns: repeat(auto-fit, 300px);
  overflow-y: hidden;
`;

const Loading = styled.div`
  padding: 10px;
`;

const LoadMore = styled.div`
  padding: 10px;
`;

interface IProps {
  posts: any;
  count: number;
  loading: boolean;
  hasMore: boolean;
  router: RouterProps;
  loadMore: () => Promise<void>;
}

@inject('store')
@observer
class PostsView extends Component<IProps> {
  public loadLock = false;

  constructor(props) {
    super(props);
  }

  public componentDidUpdate() {
    if (
      !this.loadLock &&
      this.props.store.layoutInLoadArea &&
      !this.props.loading &&
      this.props.hasMore
    ) {
      this.loadLock = true;
      console.log('loadMore');
      this.props.loadMore().then(() => {
        console.log('loaded');
        this.loadLock = false;
      });
    }
  }

  public render() {
    const { posts, count, router, store, loading, hasMore } = this.props;

    store.layoutInLoadArea;

    return (
      <Grid>
        {posts.map(({ id }) => (
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
        {loading && <Loading>Загрузка...</Loading>}
        {!loading && hasMore && <LoadMore>Загрузить еще</LoadMore>}
      </Grid>
    );
  }
}

export default withRouter(PostsView);
