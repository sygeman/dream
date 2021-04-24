import { ChannelMode } from '@dream/types';
import {
  faTwitch,
  faSpotify,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

export const channelMods = [
  // {
  //   id: 'youtube-waitlist',
  //   value: ChannelMode.WaitlistYoutube,
  //   color: 'youtube',
  //   icon: faYoutube,
  //   title: 'Youtube Waitlist',
  // },
  {
    id: 'spotify-waitlist',
    value: ChannelMode.WaitlistSpotify,
    color: 'text-spotify',
    borderColor: 'border-spotify-light',
    bgColor: 'bg-spotify',
    icon: faSpotify,
    title: 'Spotify Waitlist',
  },
  {
    id: 'twitch-stream',
    value: ChannelMode.StreamTwitch,
    color: 'text-twitch',
    borderColor: 'border-twitch-light',
    bgColor: 'bg-twitch',
    icon: faTwitch,
    title: 'Twitch Stream',
  },
  // {
  //   id: 'youtube-stream',
  //   value: ChannelMode.StreamYoutube,
  //   color: 'youtube',
  //   icon: faYoutube,
  //   title: 'Youtube Stream',
  // },
  // {
  //   id: 'youtube-collection',
  //   value: ChannelMode.CollectionYoutube,
  //   color: 'youtube',
  //   icon: faYoutube,
  //   title: 'Youtube Collection',
  // },
  // {
  //   id: 'spotify-collection',
  //   value: ChannelMode.CollectionSpotify,
  //   color: 'spotify',
  //   icon: faSpotify,
  //   title: 'Spotify Collection',
  // },
];
