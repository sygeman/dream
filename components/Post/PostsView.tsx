import gql from 'graphql-tag';
import Link from 'next/link';
import { darken } from 'polished';
import { PureComponent } from 'react';
import styled from 'styled-components';
import PostProvider from '../../providers/Post';
import { Grid } from '../../ui/Grid';
import PostGridView from './GridView';

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
  padding: 40px 5px 10px;
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

interface IProps {
  posts: any;
  loading: boolean;
  hasMore: boolean;
  title?: string;
  description?: string;
  titleLink?: string;
  rows?: number;
  loadMore: () => Promise<any>;
  onPlay: (id: string) => void;
}

interface IState {
  layoutInLoadArea: boolean;
}

interface IProcess {
  browser: boolean;
}

declare var process: IProcess;

class PostsView extends PureComponent<IProps, IState> {
  public loadLock = false;

  constructor(props) {
    super(props);

    this.state = {
      layoutInLoadArea: false
    };
  }

  scrollHandler = e => {
    const el = e.target;
    const offset = el.scrollHeight - el.scrollTop - el.clientHeight;
    const layoutInLoadArea = offset <= 250;

    if (this.state.layoutInLoadArea !== layoutInLoadArea) {
      this.setState({ layoutInLoadArea });
    }
  };

  componentDidMount() {
    if (process.browser) {
      document
        .getElementById('mainScroll')
        .addEventListener('scroll', this.scrollHandler);
    }
  }

  componentWillUnmount() {
    if (process.browser) {
      document
        .getElementById('mainScroll')
        .removeEventListener('scroll', this.scrollHandler);
    }
  }

  public componentDidUpdate() {
    const { loading, hasMore, loadMore } = this.props;
    const { layoutInLoadArea } = this.state;

    if (!this.loadLock && layoutInLoadArea && !loading && hasMore) {
      this.loadLock = true;

      loadMore().then(() => {
        this.loadLock = false;
      });
    }
  }

  public render() {
    const { posts, onPlay, title, description, rows, titleLink } = this.props;

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
      />
    );
  }
}

export default PostsView;
