import { useChannelQuery, useCommunityQuery } from './community-channel.api';
import { useRouter } from 'next/router';

export const useCommunityChannel = () => {
  const router = useRouter();

  const communityName =
    typeof router.query?.community === 'string' && router.query?.community;
  const channelName =
    typeof router.query?.channel === 'string' && router.query?.channel;

  const communityQuery = useCommunityQuery({
    variables: { name: communityName },
    skip: !communityName,
  });
  const community = communityQuery?.data?.community;
  const communityId = community?.id || '';

  const channelQuery = useChannelQuery({
    variables: { name: channelName, communityId },
    skip: !channelName,
  });
  const channel = channelQuery?.data?.channel;
  const channelId = channel?.id || '';

  return { community, channel, communityId, channelId };
};
