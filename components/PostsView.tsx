import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { RouterProps, withRouter } from 'next/router';
import { Component } from 'react';
import styled from 'styled-components';
import { IStore } from '../lib/store';
import PostProvider from '../providers/Post';
import { Button } from '../ui/Button';
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
  text-align: center;
`;

const LoadMore = styled.div`
  padding: 10px;
  text-align: center;
  cursor: pointer;
`;

interface IProps {
  posts: any;
  loading: boolean;
  hasMore: boolean;
  router: RouterProps;
  store?: IStore;
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
      this.props.loadMore().then(() => {
        this.loadLock = false;
      });
    }
  }

  public render() {
    const { posts, router, store, loading, hasMore, loadMore } = this.props;

    /* tslint:disable */
    store.layoutInLoadArea;

    return (
      <>
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
        </Grid>
        {loading && <Loading>Загрузка...</Loading>}
        {!loading && hasMore && (
          <LoadMore>
            <Button onClick={() => loadMore()}>Загрузить еще</Button>
          </LoadMore>
        )}
      </>
    );
  }
}

export default withRouter(PostsView);
