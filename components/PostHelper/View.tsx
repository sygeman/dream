import Head from 'next/head';
import { FC } from 'react';
import styled from 'styled-components';
import Comments from '../Comments';
import PostHelper from '../PostHelper';
import SourceView from '../SourceView';
import { IPost, PostReactionType } from './interfaces/Post';

const Box = styled.div`
  flex-direction: column;
  display: flex;
  flex: 1;
  background: ${({ theme }) => theme.dark2Color};
  border-radius: 5px;
  overflow: hidden;
`;

const ContentBox = styled.div``;

const EmptyBottom = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
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
  reaction,
  commentsCount,
  sourceType,
  sourceId,
  createdAt,
  authorId,
  pinned
}) => {
  return (
    <Box>
      <Head>
        <title>{title}</title>
      </Head>
      <ContentBox>
        <SourceView
          sourceType={sourceType}
          sourceId={sourceId}
          cover={cover}
          playSourceKey={`${id}full`}
          autoPlay
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
        <EmptyBottom />
        <PostHelper.Author createdAt={createdAt} authorId={authorId} />
      </PostHelper.Bottom>
      <CommentsBox>
        <Comments postId={id} />
      </CommentsBox>
    </Box>
  );
};

export default PostFeedView;
