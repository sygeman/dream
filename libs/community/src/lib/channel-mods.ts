import { ChannelMode } from '@dream/types';
import {
  faTwitch,
  faSpotify,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const youtubeStyle = {
  color: 'text-youtube',
  borderColor: 'border-youtube-light',
  bgColor: 'bg-youtube',
  bgColorLight: 'bg-youtube-light',
  icon: faYoutube,
};

const twitchStyle = {
  color: 'text-twitch',
  borderColor: 'border-twitch-light',
  bgColor: 'bg-twitch',
  bgColorLight: 'bg-twitch-light',
  icon: faTwitch,
};

const spotifyStyle = {
  color: 'text-spotify',
  borderColor: 'border-spotify-light',
  bgColor: 'bg-spotify',
  bgColorLight: 'bg-spotify-light',
  icon: faSpotify,
};

export const channelMods = [
  {
    id: 'twitch-stream',
    value: ChannelMode.StreamTwitch,
    title: 'Twitch Stream',
    description: 'Awesome mode description',
    ...twitchStyle,
  },
  {
    id: 'youtube-waitlist',
    value: ChannelMode.WaitlistYoutube,
    title: 'Youtube Waitlist',
    description: 'Awesome mode description',
    ...youtubeStyle,
  },
  // {
  //   id: 'youtube-stream',
  //   value: ChannelMode.StreamYoutube,
  //   title: 'Youtube Stream',
  //   ...youtubeStyle,
  // },
  // {
  //   id: 'youtube-collection',
  //   value: ChannelMode.CollectionYoutube,
  //   title: 'Youtube Collection',
  //   ...youtubeStyle,
  // },
  // {
  //   id: 'spotify-collection',
  //   value: ChannelMode.CollectionSpotify,
  //   title: 'Spotify Collection',
  //   ...spotifyStyle,
  // },
  {
    id: 'spotify-waitlist',
    value: ChannelMode.WaitlistSpotify,
    title: 'Spotify Waitlist',
    description: 'Awesome mode description',
    ...spotifyStyle,
  },
];
