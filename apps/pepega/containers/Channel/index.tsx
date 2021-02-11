import gql from 'graphql-tag';
import { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { darken } from 'polished';
import subDays from 'date-fns/subDays';
import { Grid, VideoPreview, CardMedia } from '@pepega/pepega-ui';
import { dateDistanceInWordsToNow } from '@pepega/utils/date';

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

const ChannelAvatarMock = styled.div`
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
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
  align-items: center;
  width: 100%;
  font-size: 16px;
  height: 21px;
  text-transform: uppercase;

  a {
    cursor: pointer;
  }
`;

const SectionTitleMock = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  width: 100px;
  height: 16px;
`;

const SectionDescription = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 12px;
  height: 16px;
  color: ${({ theme }) => darken(0.4, theme.colors.text)};
`;

const SectionDescriptionMock = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  width: 150px;
  height: 11px;
`;

const NoClips = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 100px;
  font-size: 14px;
  color: ${({ theme }) => darken(0.4, theme.colors.text)};
`;

interface IProps {
  userId: string;
}

const ChannelUser = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_TWITCH_USER, {
    variables: { userId },
    ssr: false,
  });

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
          {avatar ? <ChannelAvatarImg src={avatar} /> : <ChannelAvatarMock />}
        </ChannelAvatar>
      </SectionAvatar>
      <SectionData>
        <SectionTitle>{title ? title : <SectionTitleMock />}</SectionTitle>
        <SectionDescription>
          {title ? (
            'Клипы за 24 часа по количеству просмотров'
          ) : (
            <SectionDescriptionMock />
          )}
        </SectionDescription>
      </SectionData>
    </SectionBox>
  );
};

const Channel: FC<IProps> = ({ userId }) => {
  const router = useRouter();
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const started_at = new Date(subDays(now, 1)).toISOString();

  if (!userId) {
    return null;
  }

  const { loading, data } = useQuery(GET_TWITCH_CHANNEL_CLIPS, {
    variables: {
      broadcaster_id: userId,
      started_at,
      first: 50,
    },
    ssr: false,
  });

  if (!data || !data.twitchClips) {
    return null;
  }

  const openClip = (clipId: string) => {
    router.push(
      {
        pathname: router.route,
        query: {
          clipId,
          backPath: router.asPath,
          ...router.query,
        },
      },
      `/clip?id=${clipId}`,
      { shallow: true }
    );
  };

  return (
    <Box>
      <Grid
        beforeRender={<ChannelUser userId={userId} />}
        items={data.twitchClips.data}
        itemRender={(clip) => (
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
    </Box>
  );
};

export default Channel;
