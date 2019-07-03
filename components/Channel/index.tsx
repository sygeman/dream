import gql from 'graphql-tag';
import { omit } from 'lodash';
import { FC } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import useRouter from '../../hooks/useRouter';
import { darken } from 'polished';
import {
  Grid,
  Modal,
  TwitchClipPlayer,
  VideoPreview,
  CardMedia
} from '../../ui';
import { dateDistanceInWordsToNow } from '../../utils/date';

const GET_TWITCH_USER = gql`
  query($userId: String!) {
    twitchUser(userId: $userId) {
      id
      login
      display_name
      profile_image_url
    }
  }
`;

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
  padding: 20px 5px 20px;
  display: flex;
`;

const SectionAvatar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChannelAvatar = styled.img`
  height: 40px;
  border-radius: 100%;
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
  userId: string;
}

const ChannelClips = ({ channel }) => {
  const router = useRouter();

  return (
    <Query
      query={GET_TWITCH_CHANNEL_TOP_CLIPS}
      variables={{
        channel: channel.login,
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
                    <SectionAvatar>
                      <ChannelAvatar src={channel.profile_image_url} />
                    </SectionAvatar>
                    <SectionData>
                      <SectionTitle>{channel.display_name}</SectionTitle>
                      <SectionDescription>
                        Клипы за 24 часа по количеству просмотров
                      </SectionDescription>
                    </SectionData>
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
                          date={dateDistanceInWordsToNow(clip.createdAt)}
                          views={clip.viewsCount}
                        />
                      </ClipPreviewContent>
                    }
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
          </>
        );
      }}
    </Query>
  );
};

const Channel: FC<IProps> = ({ userId }) => {
  return (
    <Box>
      <Query query={GET_TWITCH_USER} variables={{ userId }}>
        {({ loading, error, data }) => {
          if (loading || error || !data) {
            return null;
          }

          return <ChannelClips channel={data.twitchUser} />;
        }}
      </Query>
    </Box>
  );
};

export default Channel;
