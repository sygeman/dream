import gql from 'graphql-tag';
import { FC } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import useRouter from '../../lib/useRouter';
import { darken } from 'polished';
import { Grid, VideoPreview, CardMedia } from '../../ui';
import { dateDistanceInWordsToNow } from '../../utils/date';

const GET_TWITCH_GAME = gql`
  query twitchGame($id: String) {
    twitchGame(id: $id) {
      id
      name
      box_art_url
    }
  }
`;

const GET_TWITCH_CHANNEL_TOP_CLIPS = gql`
  query twitchTopClips($game: String, $limit: Int) {
    twitchTopClips(game: $game, limit: $limit) {
      id
      channel
      title
      createdAt
      thumbnails {
        medium
      }
      broadcaster {
        display_name
        logo
      }
      viewsCount
    }
  }
`;

const Box = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  padding: 10px 20px;
`;

const ClipContainer = styled.div`
  margin: 6px;
`;

const ClipPreviewContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const SectionBox = styled.div`
  padding: 0 5px;
  display: flex;
  min-height: 80px;
`;

const SectionAvatar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChannelAvatar = styled.div`
  height: 60px;
  width: 45px;
  background: ${({ theme }) => theme.dark2Color};
`;

const ChannelAvatarImg = styled.img`
  height: 100%;
  width: 100%;
`;

const SectionData = styled.div`
  padding: 0 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.div`
  display: flex;
  width: 100%;
  font-size: 16px;
  text-transform: uppercase;

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

const NoClips = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 100px;
  font-size: 14px;
  color: ${({ theme }) => darken(0.4, theme.text1Color)};
`;

interface IProps {
  gameId?: string;
}

const TwitchGameClips = ({ game }) => {
  const router = useRouter();

  const title = game ? game.name : 'ВСЕ КАТЕГОРИИ И КАНАЛЫ';
  const avatar = game
    ? game.box_art_url.replace('{width}', '45').replace('{height}', '60')
    : '';

  return (
    <Query
      query={GET_TWITCH_CHANNEL_TOP_CLIPS}
      variables={{
        game: game ? title : undefined,
        limit: 50
      }}
    >
      {({ loading, error, data }) => {
        if (error || !data || !data.twitchTopClips) {
          return null;
        }

        const openClip = (clipId: string) => {
          router.push(
            {
              pathname: router.route,
              query: {
                clipId,
                backPath: router.asPath,
                ...router.query
              }
            },
            `/clip/${clipId}`,
            { shallow: true }
          );
        };

        return (
          <Grid
            beforeRender={
              <SectionBox>
                <SectionAvatar>
                  <ChannelAvatar>
                    {avatar && <ChannelAvatarImg src={avatar} />}
                  </ChannelAvatar>
                </SectionAvatar>
                {title && (
                  <SectionData>
                    <SectionTitle>{title}</SectionTitle>
                    <SectionDescription>
                      Клипы за 24 часа по количеству просмотров
                    </SectionDescription>
                  </SectionData>
                )}
              </SectionBox>
            }
            items={data.twitchTopClips}
            itemRender={clip => (
              <ClipContainer key={clip.id}>
                <CardMedia
                  media={
                    <ClipPreviewContent>
                      <VideoPreview
                        key={clip.id}
                        onClick={() => openClip(clip.id)}
                        cover={clip.thumbnails.medium}
                        date={dateDistanceInWordsToNow(clip.createdAt)}
                        views={clip.viewsCount}
                      />
                    </ClipPreviewContent>
                  }
                  avatar={clip.broadcaster.logo}
                  title={clip.title}
                  description={clip.broadcaster.display_name}
                  descriptionLink={`https://www.twitch.tv/${clip.channel}`}
                />
              </ClipContainer>
            )}
            elementWidth={320}
            afterRedner={
              <>
                {!loading && data.twitchTopClips.length === 0 && (
                  <NoClips>Клипы не найдены :(</NoClips>
                )}
              </>
            }
          />
        );
      }}
    </Query>
  );
};

const TwitchGame: FC<IProps> = ({ gameId }) => {
  if (!gameId) {
    return (
      <Box>
        <TwitchGameClips game={null} />
      </Box>
    );
  }

  return (
    <Box>
      <Query
        query={GET_TWITCH_GAME}
        variables={{
          id: gameId
        }}
      >
        {({ error, data }) => {
          if (error || !data) {
            return null;
          }

          const game = data.twitchGame ? data.twitchGame[0] : null;

          return <TwitchGameClips game={game} />;
        }}
      </Query>
    </Box>
  );
};

export default TwitchGame;
