import Head from 'next/head';
import { FC, useEffect } from 'react';
import { darken } from 'polished';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { Icon, TwitchClipPlayer } from '../../ui';
import { ClipComments } from '../Clip/Comments';
import { PostShareButton } from './ShareButton';
import { PostReaction } from './PostReaction';
import { PostMenu } from './Menu';
import { PostAuthor } from './Author';

export const GET_POST = gql`
  query post($id: ID!) {
    post(id: $id) {
      id
      title
      nfws
      spoiler
      sourceId
      cover
      likes
      dislikes
      rating
      deleted
      createdAt
      channelName
      authorId
    }
  }
`;

const UPDATED_POST = gql`
  subscription post($id: ID!) {
    post(id: $id) {
      id
      title
      nfws
      spoiler
      sourceId
      cover
      likes
      dislikes
      rating
      deleted
      createdAt
      channelName
      authorId
    }
  }
`;

const Box = styled.div`
  flex-direction: column;
  display: flex;
  flex: 1;
  background: ${({ theme }) => theme.dark2Color};
  border-radius: 5px;
  overflow: hidden;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
`;

const TitleBox = styled.div`
  padding: 5px 10px;
  font-size: 15px;
  display: flex;
  width: 100%;
  align-items: center;
`;

const Title = styled.div<{ active: boolean }>`
  display: flex;
  flex: 1;
  ${({ active }) => active && `cursor: pointer;`}

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 10px;
    display: inline;
  }
`;

const ContentBox = styled.div`
  background: ${({ theme }) => darken(0.1, theme.dark2Color)};
`;

const EmptyBottom = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
`;

const ChannelLink = styled.a`
  display: flex;
  align-items: center;
  font-size: 13px;
  background: ${({ theme }) => theme.main1Color};
  padding: 5px;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  i {
    font-size: 15px;
    margin-right: 5px;
    padding: 0 5px;
  }
`;

const CommentsBox = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  background: ${({ theme }) => theme.dark2Color};
  border-top: 1px solid #1e1d22;
  border-radius: 0 0 5px 5px;
  overflow: hidden;
`;

const PostDeleted = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: ${({ theme }) => theme.accent2Color};
  text-transform: uppercase;
  font-size: 13px;

  i {
    font-size: 35px;
    padding: 20px 0;
  }
`;

const Bottom = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
`;

interface IProps {
  id: string;
  meta?: boolean;
  header?: boolean;
  autoPlay?: boolean;
}

const PostFeedView: FC<IProps> = ({ id, meta, header, autoPlay }) => {
  const { subscribeToMore, loading, error, data } = useQuery(GET_POST, {
    variables: { id }
  });

  useEffect(() => {
    subscribeToMore({
      document: UPDATED_POST,
      variables: { id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        return {
          ...prev,
          post: {
            ...prev.post,
            ...subscriptionData.data.post
          }
        };
      }
    });
  }, []);

  if (loading || error) {
    return null;
  }

  const {
    title,
    cover,
    likes,
    dislikes,
    channelName,
    sourceId,
    createdAt,
    authorId,
    deleted
  } = data.post;

  if (deleted) {
    return (
      <Box>
        <PostDeleted>
          <div>
            <Icon type="delete" />
          </div>
          <div>Клип был удален</div>
        </PostDeleted>
      </Box>
    );
  }

  return (
    <Box>
      <Head>
        <title>{title}</title>
        {meta && (
          <>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={title} />
            <meta property="og:image" content={cover} />
            <meta
              property="og:url"
              content={`https://pepega.com/post?id=${id}`}
            />
          </>
        )}
      </Head>
      {header && id && (
        <Top>
          <TitleBox>
            <Title active={!meta}>
              <span>{title}</span>
            </Title>
            {channelName && (
              <ChannelLink
                href={`https://twitch.tv/${channelName}`}
                target="_blank"
              >
                <Icon type="twitch" />
                {channelName}
              </ChannelLink>
            )}
          </TitleBox>
        </Top>
      )}
      <ContentBox>
        <TwitchClipPlayer sourceId={sourceId} autoPlay={autoPlay} />
      </ContentBox>
      {id && (
        <Bottom>
          <PostReaction postId={id} likes={likes} dislikes={dislikes} />
          <PostShareButton id={id} />
          <PostMenu id={id} authorId={authorId} />
          <EmptyBottom />
          <PostAuthor createdAt={createdAt} authorId={authorId} />
        </Bottom>
      )}
      {id && (
        <CommentsBox>
          <ClipComments clipId={sourceId} />
        </CommentsBox>
      )}
    </Box>
  );
};

export default PostFeedView;
