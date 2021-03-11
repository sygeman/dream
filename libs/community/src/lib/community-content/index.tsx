import { useRouter } from 'next/router';
import React from 'react';
import { ChannelModeWaitlist } from '@dream/mode-waitlist';
import { useChannelQuery, ChannelMode } from '@dream/types';

export const CommunityContent = () => {
  const router = useRouter();
  const name =
    typeof router.query?.channel === 'string' && router.query?.channel;

  const communityQuery = useChannelQuery({
    variables: { name },
    skip: !name,
  });

  const channel = communityQuery?.data?.channel;

  const getContentView = () => {
    switch (channel?.mode) {
      case ChannelMode.Waitlist:
        return <ChannelModeWaitlist />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-full flex flex-1 flex-col">
      {getContentView()}
    </div>
  );
};
