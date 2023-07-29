'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { getTwitchModeAction } from './actions';
import { useParams } from 'next/navigation';

const Player = dynamic(() => import('./player'), { ssr: false });

export const ChannelTwitchMode = () => {
  const params = useParams();
  const [twitchStream, setTwitchStream] = useState<any>(null);

  useEffect(() => {
    getTwitchModeAction(
      params.community as string,
      params.channel as string,
    ).then((data) => {
      setTwitchStream(data);
    });
  }, []);

  const channelKey = twitchStream?.channelKey;

  return (
    <div className="h-full w-full bg-background-light">
      <div className="bg-black flex justify-center aspect-w-16 aspect-h-9">
        {channelKey && <Player channelKey={channelKey} />}
      </div>
    </div>
  );
};
