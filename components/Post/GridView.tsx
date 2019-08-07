import { FC, memo } from 'react';
import styled from 'styled-components';
import { VideoPreview, CardMedia, Icon } from '../../ui';
import { isEqual } from 'lodash';
import { dateDistanceInWordsToNow } from '../../utils/date';

const PreviewContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const PostDeleted = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: ${({ theme }) => theme.accent2Color};
  text-transform: uppercase;
  font-size: 12px;

  i {
    font-size: 25px;
    padding: 20px 0;
  }
`;

interface IProps {
  post: any;
  onPlay: () => void;
}

export const GridView: FC<IProps> = memo(
  ({ post, onPlay }) => {
    const date =
      post && post.createdAt && dateDistanceInWordsToNow(post.createdAt);

    return (
      <CardMedia
        media={
          <PreviewContent>
            {post && (
              <VideoPreview
                onClick={() => onPlay()}
                nsfw={post.nfws}
                spoiler={post.spoiler}
                cover={post.cover}
                date={date}
              />
            )}
          </PreviewContent>
        }
        overlay={
          post.deleted && (
            <PostDeleted>
              <div>
                <Icon type="delete" />
              </div>
              <div>Клип был удален</div>
            </PostDeleted>
          )
        }
        title={post && post.title}
        description={post.channelName}
        descriptionLink={`https://www.twitch.tv/${post.channelName}`}
        count={post ? post.rating : 0}
        countIcon={post && post.rating < 0 ? 'thumb-down' : 'thumb-up'}
      />
    );
  },
  (prevProps, nextProps) => {
    return isEqual(prevProps.post, nextProps.post);
  }
);

export default GridView;
