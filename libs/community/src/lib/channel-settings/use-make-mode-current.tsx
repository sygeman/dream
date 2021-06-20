import {
  ChannelMode,
  useMakeTwitchStreamModeCurrentMutation,
  useMakeSpotifyModeModeCurrentMutation,
  useMakeWaitlistYoutubeModeCurrentMutation,
} from '@dream/types';

export const useMakeModeCurrent = () => {
  const [makeTwitchStreamModeCurrentMutation] =
    useMakeTwitchStreamModeCurrentMutation();
  const [makeSpotifyModeModeCurrentMutation] =
    useMakeSpotifyModeModeCurrentMutation();
  const [makeMakeWaitlistYoutubeModeCurrentMutation] =
    useMakeWaitlistYoutubeModeCurrentMutation();

  return {
    makeModeCurrent: (mode: ChannelMode, channelId: string) => {
      console.log('setChannelMode', { mode, channelId });

      switch (mode) {
        case ChannelMode.Twitch:
          return makeTwitchStreamModeCurrentMutation({
            variables: { channelId },
          });
        case ChannelMode.Spotify:
          return makeSpotifyModeModeCurrentMutation({
            variables: { channelId },
          });
        case ChannelMode.Youtube:
          return makeMakeWaitlistYoutubeModeCurrentMutation({
            variables: { channelId },
          });
      }
    },
  };
};
