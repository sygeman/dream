import Head from 'next/head';
import { FC } from 'react';
import styled from 'styled-components';
import { Icon } from '../../ui/Icon';
import Comments from '../Comments';
import PostHelper from '../PostHelper';
import SourceView from '../SourceView';
import { IPost, PostReactionType } from './interfaces/Post';

const Box = styled.div`
  flex-direction: column;
  display: flex;
  flex: 1;
  background: ${({ theme }) => theme.dark2Color};
  margin-bottom: 20px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
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

const ContentBox = styled.div``;

const EmptyBottom = styled.div<{ active: boolean }>`
  height: 100%;
  display: flex;
  flex: 1;
  ${({ active }) => active && `cursor: pointer;`}
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

const PinPostIcon = styled.div`
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.main1Color};
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
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

interface IProps extends IPost {
  meta?: boolean;
}

const PostFeedView: FC<IProps> = ({
  id,
  title,
  cover,
  likes,
  dislikes,
  commentsCount,
  sourceType,
  channelName,
  reaction,
  sourceId,
  createdAt,
  authorId,
  nfws,
  spoiler,
  pinned,
  meta
}) => {
  return (
    <Box>
      {meta && (
        <Head>
          <title>{title}</title>
          <meta property="og:title" content={title} />
          <meta property="og:description" content={title} />
          <meta property="og:image" content={cover} />
          <meta
            property="og:url"
            content={`https://twitchru.com/post?id=${id}`}
          />
        </Head>
      )}
      <Top>
        <TitleBox>
          <Title active={!meta}>
            {pinned && (
              <PinPostIcon>
                <Icon type="money" />
              </PinPostIcon>
            )}
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
      <ContentBox>
        <SourceView
          playSourceKey={`${id}feed`}
          sourceType={sourceType}
          sourceId={sourceId}
          nsfw={nfws}
          spoiler={spoiler}
          cover={cover}
        />
      </ContentBox>
      <PostHelper.Bottom>
        <PostHelper.ReactionButton
          id={id}
          type="like"
          state={reaction === PostReactionType.like}
          count={likes}
          icon="thumb-up"
        />
        <PostHelper.ReactionButton
          id={id}
          type="dislike"
          state={reaction === PostReactionType.dislike}
          count={dislikes}
          icon="thumb-down"
        />
        <PostHelper.CommentsButton commentsCount={commentsCount} />
        <PostHelper.ShareButton id={id} />
        <PostHelper.Menu id={id} pinned={pinned} authorId={authorId} />
        <EmptyBottom active={!meta} />
        <PostHelper.Author createdAt={createdAt} authorId={authorId} />
      </PostHelper.Bottom>
      <CommentsBox>
        <Comments postId={id} />
      </CommentsBox>
    </Box>
  );
};

export default PostFeedView;
