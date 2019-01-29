import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import ruLocale from 'date-fns/locale/ru';
import { lighten, darken } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import { Icon } from '../../ui/Icon';
import { shortNumbers } from '../../utils/count';
import AuthorGrid from './AuthorGrid';
import GridPreview from './GridPreview';
import { IPost } from './interfaces/Post';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const Preview = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  width: 100%;
  background: ${({ theme }) => theme.dark2Color};
`;

const PreviewContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Bottom = styled.div`
  display: flex;
  font-size: 11.5px;
  color: ${({ theme }) => darken(0.4, theme.text1Color)};
  width: 100%;
`;

const BottomLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 4px 8px 4px 0;
  line-height: 16px;
`;

const BottomRight = styled.div``;

const Title = styled.div`
  font-size: 13.5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  text-align: left;
  cursor: pointer;
  color: ${({ theme }) => theme.text1Color};
`;

const Rating = styled.div`
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  font-size: 12px;
  color: ${({ theme }) => lighten(0.5, theme.dark2Color)};
  background: ${({ theme }) => theme.dark2Color};
  font-weight: 500;
`;

const Author = styled.div``;

const IconBox = styled.div`
  margin-right: 8px;
`;

const Date = styled.div`
  display: flex;
`;

interface IProps {
  post: IPost;
  onPlay: () => void;
}

export const GridView: FC<IProps> = ({ post, onPlay }) => {
  const date =
    post &&
    post.createdAt &&
    distanceInWordsToNow(parseInt(post.createdAt, 10), {
      locale: ruLocale
    }) + ' назад';

  return (
    <Box>
      <Preview>
        <PreviewContent>
          {post && (
            <GridPreview
              onClick={() => onPlay()}
              nsfw={post.nfws}
              spoiler={post.spoiler}
              cover={post.cover}
              date={date}
            />
          )}
        </PreviewContent>
      </Preview>
      <Bottom>
        <BottomLeft>
          <Title>{post && post.title}</Title>
          <Author>
            {post &&
              (post.channelName ? (
                <a
                  href={`https://www.twitch.tv/${post.channelName}`}
                  target="_blank"
                >
                  {post.channelName}
                </a>
              ) : (
                <AuthorGrid id={post.authorId} />
              ))}
          </Author>
          <Date />
        </BottomLeft>
        <BottomRight>
          <Rating>
            <IconBox>
              <Icon type="thumb-up" />
            </IconBox>
            {shortNumbers(post ? post.likesCount : 0)}
          </Rating>
        </BottomRight>
      </Bottom>
    </Box>
  );
};

export default GridView;
