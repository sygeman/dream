import gql from 'graphql-tag';
import { omit } from 'lodash';
import { FC } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import useRouter from '../../hooks/useRouter';
import { darken } from 'polished';
import subDays from 'date-fns/sub_days';
import {
  Grid,
  Modal,
  TwitchClipPlayer,
  VideoPreview,
  CardMedia
} from '../../ui';
import { dateDistanceInWordsToNow } from '../../utils/date';

const GET_TWITCH_USER = gql`
  query twitchUser($userId: String!) {
    twitchUser(userId: $userId) {
      id
      login
      display_name
      profile_image_url
    }
  }
`;

const GET_TWITCH_CHANNEL_CLIPS = gql`
  query twitchClips($broadcaster_id: String, $started_at: String, $first: Int) {
    twitchClips(
      broadcaster_id: $broadcaster_id
      started_at: $started_at
      first: $first
    ) {
      pagination {
        cursor
      }
      data {
        id
        broadcaster_name
        title
        created_at
        thumbnail_url
        view_count
      }
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
  height: 40px;
  width: 40px;
  border-radius: 100%;
  overflow: hidden;
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
  userId: string;
}

const ChannelClips = ({ userId }) => {
  const router = useRouter();
  const started_at = new Date(subDays(new Date(), 1)).toISOString();

  if (!userId) {
    return null;
  }

  return (
    <Query
      query={GET_TWITCH_CHANNEL_CLIPS}
      variables={{
        broadcaster_id: userId,
        started_at,
        first: 50
      }}
    >
      {({ loading, error, data }) => {
        if (error || !data || !data.twitchClips) {
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
                <Query query={GET_TWITCH_USER} variables={{ userId }}>
                  {({ loading, error, data }) => {
                    let avatar = null;
                    let title = null;

                    if (!loading && !error && data && data.twitchUser) {
                      const user = data.twitchUser;

                      avatar = user.profile_image_url;
                      title = user.display_name;
                    }

                    return (
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
                    );
                  }}
                </Query>
              }
              items={data.twitchClips.data}
              itemRender={clip => (
                <ClipContainer key={clip.id}>
                  <CardMedia
                    media={
                      <ClipPreviewContent>
                        <VideoPreview
                          key={clip.id}
                          onClick={() => openClip(clip.id)}
                          cover={clip.thumbnail_url}
                          date={dateDistanceInWordsToNow(clip.created_at)}
                          views={clip.view_count}
                        />
                      </ClipPreviewContent>
                    }
                    title={clip.title}
                    description={clip.broadcaster_name}
                    descriptionLink={`https://www.twitch.tv/${clip.broadcaster_name}`}
                  />
                </ClipContainer>
              )}
              elementWidth={320}
              afterRedner={
                <>
                  {!loading && data.twitchClips.data.length === 0 && (
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
      <ChannelClips userId={userId}></ChannelClips>
    </Box>
  );
};

export default Channel;
