import gql from 'graphql-tag';
import { FC } from 'react';
import { Mutation, Query } from 'react-apollo';
import styled from '../../theme';
import { Button } from '../../ui/Button';
import { GET_PINNED_POSTS } from './PinnedPosts';

export const GET_POST = gql`
  query getPost($id: ID!) {
    post(id: $id) {
      id
      title
      nfws
      spoiler
      sourceId
      cover
      sourceType
      liked
      likesCount
      commentsCount
      createdAt
      channelName
    }
  }
`;

const UNPIN_POST = gql`
  mutation($id: ID!) {
    unpinPost(id: $id)
  }
`;

const Box = styled.div`
  background: ${({ theme }) => theme.dark2Color};
  width: 100%;
  height: 80px;
  margin-bottom: 5px;
  display: flex;
`;

const Preview = styled.div`
  height: 100%;
`;

const PreviewImg = styled.img`
  height: 100%;
`;

const Data = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

const Title = styled.div`
  text-align: left;
`;

const Channel = styled.div`
  text-align: left;
  color: ${({ theme }) => theme.accent2Color};
  font-size: 14px;
`;

const Manage = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0 20px;
`;

interface IProps {
  id: string;
}

const PinnedPost: FC<IProps> = ({ id }) => (
  <Query query={GET_POST} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) {
        return null;
      }

      if (error || !data.post) {
        return null;
      }

      return (
        <Box>
          <Preview>
            <PreviewImg src={data.post.cover} />
          </Preview>
          <Data>
            <a
              href={`https://twitchru.com/?postId=${data.post.id}`}
              target="_blank"
            >
              <Title>{data.post.title}</Title>
            </a>
            <a
              href={`https://twitch.tv/${data.post.channelName}`}
              target="_blank"
            >
              <Channel>{data.post.channelName}</Channel>
            </a>
          </Data>
          <Manage>
            <Mutation
              mutation={UNPIN_POST}
              update={cache => {
                const { pinnedPosts } = cache.readQuery({
                  query: GET_PINNED_POSTS
                });

                cache.writeQuery({
                  query: GET_PINNED_POSTS,
                  data: {
                    pinnedPosts: {
                      ...pinnedPosts,
                      posts: pinnedPosts.posts.filter(
                        p => p.id !== data.post.id
                      )
                    }
                  }
                });
              }}
            >
              {unpinPost => (
                <Button onClick={() => unpinPost({ variables: { id } })}>
                  Открепить
                </Button>
              )}
            </Mutation>
          </Manage>
        </Box>
      );
    }}
  </Query>
);

export default PinnedPost;
