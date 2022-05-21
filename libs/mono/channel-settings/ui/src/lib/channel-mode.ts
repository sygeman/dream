import {
  faTwitch,
  faSpotify,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { ChannelMode } from '@dream/mono-types';

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
    id: 'twitch',
    value: ChannelMode.Twitch,
    title: 'Twitch',
    description: 'Awesome mode description',
    ...twitchStyle,
  },
  {
    id: 'youtube',
    value: ChannelMode.Youtube,
    title: 'Youtube',
    description: 'Awesome mode description',
    ...youtubeStyle,
  },
  {
    id: 'spotify',
    value: ChannelMode.Spotify,
    title: 'Spotify',
    description: 'Awesome mode description',
    ...spotifyStyle,
  },
];
