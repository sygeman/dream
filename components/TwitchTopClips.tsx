import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import ruLocale from 'date-fns/locale/ru';
import gql from 'graphql-tag';
import { omit } from 'lodash';
import { FC } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import useRouter from '../hooks/useRouter';
import { darken } from 'polished';
import { Grid } from '../ui/Grid';
import { Modal } from '../ui/Modal';
import { TwitchClipPlayer } from '../ui/TwitchClipPlayer';
import { VideoPreview } from '../ui/VideoPreview';
import { CardMedia } from '../ui/CardMedia';

const GET_TWITCH_CHANNEL_TOP_CLIPS = gql`
  query twitchTopClips($channel: String, $game: String, $limit: Int) {
    twitchTopClips(channel: $channel, game: $game, limit: $limit) {
      id
      channel
      title
      createdAt
      thumbnails {
        small
        tiny
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
  padding: 20px 5px 10px;
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
  limit?: number;
}

const TwitchFollows: FC<IProps> = ({ limit }) => {
  const router = useRouter();

  return (
    <Box>
      <Query
        query={GET_TWITCH_CHANNEL_TOP_CLIPS}
        variables={{
          channel: router.query.channel,
          game: router.query.game,
          limit
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
                  ...router.query,
                  clip: clipId
                }
              },
              {
                pathname: router.route,
                query: {
                  ...router.query,
                  clip: clipId
                }
              },
              { shallow: true }
            );
          };

          const closeClip = () => {
            router.push(
              {
                pathname: router.route,
                query: {
                  ...omit(router.query, 'clip')
                }
              },
              {
                pathname: router.route,
                query: {
                  ...omit(router.query, 'clip')
                }
              },
              { shallow: true }
            );
          };

          const sourceId = router.query.clip
            ? router.query.clip.toString()
            : null;

          return (
            <>
              <Modal visible={!!router.query.clip} minimal onClose={closeClip}>
                <div style={{ width: 1100 }}>
                  <TwitchClipPlayer sourceId={sourceId} autoPlay />
                </div>
              </Modal>

              <Grid
                beforeRender={
                  <>
                    <SectionBox>
                      <SectionTitle>
                        {router.query.channel ||
                          router.query.game ||
                          'Все категории и каналы'}
                      </SectionTitle>
                      <SectionDescription>
                        Клипы за 24 часа по количеству просмотров
                      </SectionDescription>
                    </SectionBox>
                  </>
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
                            cover={clip.thumbnails.small}
                            date={
                              distanceInWordsToNow(+new Date(clip.createdAt), {
                                locale: ruLocale
                              }) + ' назад'
                            }
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
                elementWidth={300}
                afterRedner={
                  <>
                    {!loading && data.twitchTopClips.length === 0 && (
                      <NoClips>Клипы не найдены :(</NoClips>
                    )}
                  </>
                }
              />
            </>
          );
        }}
      </Query>
    </Box>
  );
};

export default TwitchFollows;
