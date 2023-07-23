'use client';
import dynamic from 'next/dynamic';

const Player = dynamic(() => import('./player'), { ssr: false });

// import { useTwitchStreamQuery } from './twitch-stream.api';
// import { useCommunityChannel } from '@dream/mono-use-community-channel';

export const ChannelTwitchMode = () => {
  //   const { channelId } = useCommunityChannel();

  //   const twitchStreamQuery = useTwitchStreamQuery({
  //     variables: { channelId },
  //     skip: !channelId,
  //   });

  const channelKey = 'sygeman'; //twitchStreamQuery?.data?.twitchStream?.channelKey;

  return (
    <div className="h-full w-full bg-background-light">
      <div className="bg-black flex justify-center aspect-w-16 aspect-h-9">
        {channelKey && <Player channelKey={channelKey} />}
      </div>
    </div>
  );
};
