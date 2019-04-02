import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import Link from 'next/link';
import { darken } from 'polished';
import { Component } from 'react';
import styled from 'styled-components';
import { IStore } from '../lib/store';
import PostProvider from '../providers/Post';
import { Button } from '../ui/Button';
import { Grid } from '../ui/Grid';
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

const SectionBox = styled.div`
  padding: 30px 5px 10px;
`;

const SectionTitle = styled.div`
  display: flex;
  width: 100%;
  font-size: 16px;

  a {
    cursor: pointer;
  }
`;

const SectionDescription = styled.div`
  display: flex;
  width: 100%;
  font-size: 12px;
  color: ${({ theme }) => darken(0.4, theme.text1Color)};
`;

const PostContainer = styled.div`
  padding: 5px;
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

const Divider = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.dark2Color};
  margin: 10px;
`;

interface IProps {
  posts: any;
  loading: boolean;
  hasMore: boolean;
  title?: string;
  description?: string;
  titleLink?: string;
  rows?: number;
  store?: IStore;
  loadMore: () => Promise<any>;
  onPlay: (id: string) => void;
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
    const {
      posts,
      store,
      loading,
      hasMore,
      loadMore,
      onPlay,
      title,
      description,
      rows,
      titleLink
    } = this.props;

    /* tslint:disable */
    store.layoutInLoadArea;

    return (
      <Grid
        beforeRender={
          <>
            {title && !titleLink && (
              <SectionBox>
                <SectionTitle>{title}</SectionTitle>
                {description && (
                  <SectionDescription>{description}</SectionDescription>
                )}
              </SectionBox>
            )}
            {title && titleLink && (
              <SectionBox>
                <SectionTitle>
                  <Link href={titleLink} passHref>
                    <a>{title}</a>
                  </Link>
                </SectionTitle>
                {description && (
                  <SectionDescription>{description}</SectionDescription>
                )}
              </SectionBox>
            )}
          </>
        }
        maxRows={rows}
        items={posts}
        elementWidth={300}
        itemRender={({ id }) => (
          <PostContainer key={id}>
            <PostProvider id={id} noRealtime>
              {({ post }) => (
                <PostGridView post={post} onPlay={() => onPlay(post.id)} />
              )}
            </PostProvider>
          </PostContainer>
        )}
        afterRedner={
          <>
            {loading && <Loading />}
            {!loading && hasMore && (
              <LoadMore>
                <Button onClick={() => loadMore()}>Загрузить еще</Button>
              </LoadMore>
            )}
            <Divider />
          </>
        }
      />
    );
  }
}

export default PostsView;
