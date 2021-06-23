import React from 'react';
import { useCommunityChannel } from '../use-community-channel';

export const CommunityWelcome = () => {
  const { community } = useCommunityChannel();

  return (
    <div className="w-full flex justify-center items-center">
      <div className="text-2xl text-white ">Welcome to {community?.title}</div>
    </div>
  );
};
