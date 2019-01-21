import Head from 'next/head';
import { FC } from 'react';
import styled from '../../theme';
import Comments from '../Comments';
import PostHelper from '../PostHelper';
import SourceView from '../SourceView';
import { IPost } from './interfaces/Post';

const Box = styled.div`
  display: flex;
  align-items: stretch;
  width: 1500px;

  @media (max-width: 1100px) {
    width: 600px;
  }
`;

const MainBox = styled.div`
  display: flex;
  flex: 1;
  background: ${({ theme }) => theme.dark2Color};
  overflow: hidden;
  border-radius: 5px;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex-direction: column;
  display: flex;
  flex: 1;
  background: ${({ theme }) => theme.dark1Color};
`;

const Right = styled.div`
  width: 360px;
  min-width: 260px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1100px) {
    min-height: 400px;
    width: 100%;
    flex-direction: column-reverse;
  }
`;

const CommentsBox = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

const CommentsBoxInner = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const ContentBox = styled.div``;

const PostFullView: FC<IPost> = ({
  id,
  title,
  liked,
  cover,
  likesCount,
  sourceType,
  sourceId,
  createdAt,
  authorId
}) => (
  <Box>
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={title} />
      <meta property="og:image" content={cover} />
      <meta property="og:url" content={`https://twitchru.com/?postId=${id}`} />
    </Head>
    <MainBox>
      <Left>
        <ContentBox>
          <SourceView
            sourceType={sourceType}
            sourceId={sourceId}
            cover={cover}
            playSourceKey={`${id}full`}
            autoPlay
          />
        </ContentBox>
      </Left>
      <Right>
        <CommentsBox>
          <CommentsBoxInner>
            <Comments postId={id} />
          </CommentsBoxInner>
        </CommentsBox>
        <PostHelper.Bottom>
          <PostHelper.LikeButton
            id={id}
            liked={liked}
            likesCount={likesCount}
          />
          <PostHelper.ShareButton id={id} />
          {/* <PostHelper.Menu id={id} /> */}
          <PostHelper.Author
            createdAt={createdAt}
            authorId={authorId}
            metaDescription
          />
        </PostHelper.Bottom>
      </Right>
    </MainBox>
  </Box>
);

export default PostFullView;
