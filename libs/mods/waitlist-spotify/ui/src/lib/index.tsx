import React from 'react';
import { useRouter } from 'next/router';
import { dateDistanceInWordsToNow } from '@dream/utils/date';
import {
  DotsVerticalIcon,
  ClockIcon,
  ViewListIcon,
} from '@heroicons/react/solid';
import {
  useWaitlistSpotifyQuery,
  useWaitlistSpotifyUpdatedSubscription,
} from '@dream/types';
import { Backgroud } from './components/background';
import { ChannelModeWaitlistProgress } from './progress';

const TrackFromList = ({ cover, artists, title, avatar, createdAt = null }) => (
  <div className="flex px-4 py-1 items-center opacity-70 hover:opacity-100 group">
    <div>
      <img src={cover} className="h-8 w-8" alt="" />
    </div>
    <div className="flex flex-col text-xs px-2">
      <div className="text-xs">{artists}</div>
      <div className="text-xs text-accent">{title}</div>
    </div>
    <div className="flex items-center h-full ml-auto">
      <div className="text-xs px-2 text-accent">
        {dateDistanceInWordsToNow(createdAt)}
      </div>
      <div className="flex rounded-full overflow-hidden h-6 w-6">
        <img src={avatar} className="" alt="" />
      </div>
      <div className="ml-2">
        <button className="h-6 w-6 flex btn p-0 items-center justify-center opacity-0 group-hover:opacity-100">
          <DotsVerticalIcon className="h-4 text-accent" />
        </button>
      </div>
    </div>
  </div>
);

export const ChannelModeWaitlistSpotify = () => {
  const { query } = useRouter();
  const channelName = typeof query?.channel === 'string' && query?.channel;

  const modeWaitlistQuery = useWaitlistSpotifyQuery({
    variables: { channelName },
    skip: !channelName,
    pollInterval: 5000,
  });

  useWaitlistSpotifyUpdatedSubscription({
    variables: { channelName },
    skip: !channelName,
    onSubscriptionData: () => {
      modeWaitlistQuery.refetch();
    },
  });

  const modeWaitlist = modeWaitlistQuery?.data?.waitlistSpotify;

  if (!modeWaitlist) {
    return null;
  }

  // console.log(modeWaitlist);

  return (
    <div className="h-screen w-full flex flex-1 flex-col relative overflow-hidden">
      <Backgroud imageUrl={modeWaitlist?.current?.item?.cover} />

      <div className="absolute left-0 top-0 w-full h-full flex flex-col">
        <div className="flex flex-1 flex-col flex-shrink-0 justify-end py-2 overflow-hidden">
          {modeWaitlist.history.items.map((item) => (
            <div key={item.data.id}>
              <TrackFromList
                cover={item.data.cover}
                artists={item.data.artists}
                title={item.data.title}
                avatar={item.data.author.avatar}
                createdAt={item.data.endedAt}
              />
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="absolute top-0 left-0 h-full w-full opacity-40 bg-background" />
          <div className="relative">
            <div className="flex text-xs text-accent font-medium px-4 py-2">
              <ClockIcon className="h-4 text-accent mr-2 opacity-50" />
              <span>Previous Plays</span>
            </div>
            <div className="relative">
              <ChannelModeWaitlistProgress
                start={modeWaitlist.current.item.startedAt}
                duration={modeWaitlist.current.item.duration}
                imageUrl={modeWaitlist.current.item.cover}
                artist={modeWaitlist.current.item.artists}
                name={modeWaitlist.current.item.title}
              />
              <div className="absolute right-4 top-0 h-full flex items-center">
                <div className="flex flex-col text-xs font-medium px-2 opacity-70 text-right">
                  <div className="text-accent">from</div>
                  <div className="text-white">
                    {modeWaitlist.current.item.author.name}
                  </div>
                </div>
                <div className="flex rounded-full overflow-hidden h-8 w-8 mr-2">
                  <img
                    src={modeWaitlist.current.item.author.avatar}
                    className=""
                    alt=""
                  />
                </div>
                <button className="h-6 w-6 flex btn p-0 items-center justify-center">
                  <DotsVerticalIcon className="h-4 text-accent" />
                </button>
              </div>
            </div>
            <div className="flex text-xs text-accent font-medium px-4 py-2 items-center">
              <ViewListIcon className="h-4 text-accent mr-2 opacity-50" />
              <span>Waitlist</span>
              <span className="opacity-50 ml-2">1/50</span>
              <button className="btn btn-primary text-xs h-6 ml-auto">
                Add Track
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col flex-shrink-0 justify-start py-2 overflow-hidden">
          {modeWaitlist.queue.items.map((item) => (
            <div key={item.data.id}>
              <TrackFromList
                cover={item.data.cover}
                artists={item.data.artists}
                title={item.data.title}
                avatar={item.data.author.avatar}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
