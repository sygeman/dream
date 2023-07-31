'use client';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';

import { getTwitchModeAction } from './actions';

const Player = dynamic(() => import('./player'), { ssr: false });

export const ChannelTwitchMode = () => {
  const parameters = useParams();
  const [twitchStream, setTwitchStream] = useState<any>(null);

  useEffect(() => {
    getTwitchModeAction(
      parameters.community as string,
      parameters.channel as string
    ).then((data) => {
      setTwitchStream(data);
    });
  }, []);

  const channelKey = twitchStream?.channelKey;

  return (
    <div className="h-full w-full bg-background-light">
      <AspectRatio ratio={16 / 9} className="bg-black flex justify-center">
        {channelKey && <Player channelKey={channelKey} />}
      </AspectRatio>
    </div>
  );
};
