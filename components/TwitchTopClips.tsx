import gql from 'graphql-tag';
import { omit } from 'lodash';
import { FC } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import useRouter from '../hooks/useRouter';
import { darken } from 'polished';
import { Grid, Modal, TwitchClipPlayer, VideoPreview, CardMedia } from '../ui';
import { dateDistanceInWordsToNow } from '../utils/date';
import queryString from 'query-string';

const GET_TWITCH_CHANNEL_TOP_CLIPS = gql`
  query twitchTopClips(
    $game: String
    $limit: Int
    $language: String
    $period: String
    $pathBuilder: any
  ) {
    twitchTopClips(
      game: $game
      limit: $limit
      language: $language
      period: $period
    )
      @rest(
        type: "TwitchClipsOld"
        endpoint: "kraken"
        pathBuilder: $pathBuilder
      ) {
      clips @type(name: "TwitchClipOld") {
        slug
        title
        views
        created_at
        broadcaster @type(name: "TwitchClipBroadcasterOld") {
          display_name
          logo
          channel_url
        }
        thumbnails @type(name: "TwitchClipThumbnailsOld") {
          small
        }
      }
      _cursor
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
          game: router.query.game || '',
          language: 'ru',
          period: 'day',
          limit,
          pathBuilder: ({ args }) => {
            const params: any = {
              limit: args.limit,
              language: args.language,
              period: args.period
            };

            if (args.game) {
              params.game = args.game;
            }

            return `clips/top?${queryString.stringify(params)}`;
          }
        }}
      >
        {({ loading, error, data }) => {
          if (error || !data || !data.twitchTopClips) {
            return null;
          }

          const { clips } = data.twitchTopClips;

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
                        {router.query.game || 'Все категории и каналы'}
                      </SectionTitle>
                      <SectionDescription>
                        Клипы за 24 часа по количеству просмотров
                      </SectionDescription>
                    </SectionBox>
                  </>
                }
                items={clips}
                itemRender={clip => (
                  <ClipContainer key={clip.slug}>
                    <CardMedia
                      media={
                        <ClipPreviewContent>
                          <VideoPreview
                            key={clip.slug}
                            onClick={() => openClip(clip.slug)}
                            cover={clip.thumbnails.small}
                            date={dateDistanceInWordsToNow(clip.created_at)}
                            views={clip.views}
                          />
                        </ClipPreviewContent>
                      }
                      avatar={clip.broadcaster.logo}
                      title={clip.title}
                      description={clip.broadcaster.display_name}
                      descriptionLink={clip.broadcaster.channel_url}
                    />
                  </ClipContainer>
                )}
                elementWidth={320}
                afterRedner={
                  <>
                    {!loading && clips.length === 0 && (
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
