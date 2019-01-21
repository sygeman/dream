import Head from 'next/head';
import Router from 'next/router';
import { FC } from 'react';
import styled from '../../theme';
import Comments from '../Comments';
import Icon from '../Icon';
import PostHelper from '../PostHelper';
import SourceView from '../SourceView';
import Tag from '../Tag';
import { IPost } from './interfaces/Post';

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

const Title = styled.div`
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

const TagsBox = styled.div`
  margin-top: 5px;
  font-size: 14px;
`;

const EmptyBottom = styled.div`
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
  liked,
  cover,
  likesCount,
  commentsCount,
  sourceType,
  channelName,
  sourceId,
  createdAt,
  authorId,
  tags,
  nfws,
  spoiler,
  pinned,
  meta
}) => {
  const toPost = no => {
    if (no) {
      return;
    }
    // Router.push();
    window.open(`/post?id=${id}`, '_blank');
    // changeURLParams({ set: { postId: id } });
  };

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
          <Title active={!meta} onClick={() => toPost(meta)}>
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

        {tags.length > 0 && (
          <TagsBox>
            {tags.map(tag => (
              <Tag
                key={tag.id}
                id={tag.id}
                onClick={() => Router.push(`/tag?id=${tag.id}`)}
              />
            ))}
          </TagsBox>
        )}
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
        <PostHelper.LikeButton id={id} liked={liked} likesCount={likesCount} />
        {!meta ? (
          <PostHelper.CommentsButton
            commentsCount={commentsCount}
            onClick={() => toPost(meta)}
          />
        ) : (
          <PostHelper.CommentsButton commentsCount={commentsCount} />
        )}

        <PostHelper.ShareButton id={id} />
        <PostHelper.Menu id={id} pinned={pinned} authorId={authorId} />
        <EmptyBottom active={!meta} onClick={() => toPost(meta)} />
        <PostHelper.Author createdAt={createdAt} authorId={authorId} />
      </PostHelper.Bottom>
      <CommentsBox>
        <Comments postId={id} />
      </CommentsBox>
    </Box>
  );
};

export default PostFeedView;
