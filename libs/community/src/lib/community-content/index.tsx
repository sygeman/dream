import { useRouter } from 'next/router';
import React from 'react';
import { ChannelModeWaitlist } from '@dream/mode-waitlist';
import { useChannelQuery, ChannelMode } from '../api';

export const CommunityContent = () => {
  const router = useRouter();
  const name =
    typeof router.query?.channel === 'string' && router.query?.channel;

  const communityQuery = useChannelQuery({
    variables: { name },
    skip: !name,
  });

  const channel = communityQuery?.data?.channel;

  switch (channel?.mode) {
    case ChannelMode.Waitlist:
      return <ChannelModeWaitlist />;
    default:
      return null;
  }
};
