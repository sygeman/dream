import { useRouter } from 'next/router';
import { useChannelQuery } from '@dream/types';

export const useChannelId = () => {
  const router = useRouter();
  const channelName =
    typeof router.query?.channel === 'string' && router.query?.channel;

  const channelQuery = useChannelQuery({
    variables: { name: channelName },
    skip: !channelName,
  });
  const channel = channelQuery?.data?.channel;
  const channelId = channel?.id;

  return channelId;
};
