import { ChannelMode } from '@prisma/client';

const youtubeStyle = {
  color: 'text-youtube',
  borderColor: 'border-youtube-light',
  bgColor: 'bg-youtube',
  bgColorLight: 'bg-youtube-light',
};

const twitchStyle = {
  color: 'text-twitch',
  borderColor: 'border-twitch-light',
  bgColor: 'bg-twitch',
  bgColorLight: 'bg-twitch-light',
};

const spotifyStyle = {
  color: 'text-spotify',
  borderColor: 'border-spotify-light',
  bgColor: 'bg-spotify',
  bgColorLight: 'bg-spotify-light',
};

export const channelMods = [
  {
    id: 'twitch',
    value: ChannelMode.TWITCH,
    title: 'Twitch',
    description: 'Awesome mode description',
    ...twitchStyle,
  },
  {
    id: 'youtube',
    value: ChannelMode.YOUTUBE,
    title: 'Youtube',
    description: 'Awesome mode description',
    ...youtubeStyle,
  },
  {
    id: 'spotify',
    value: ChannelMode.SPOTIFY,
    title: 'Spotify',
    description: 'Awesome mode description',
    ...spotifyStyle,
  },
];
