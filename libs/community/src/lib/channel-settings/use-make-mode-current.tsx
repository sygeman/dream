import {
  ChannelMode,
  useMakeTwitchStreamModeCurrentMutation,
  useMakeWaitlistSpotifyModeCurrentMutation,
  useMakeWaitlistYoutubeModeCurrentMutation,
} from '@dream/types';

export const useMakeModeCurrent = () => {
  const [makeTwitchStreamModeCurrentMutation] =
    useMakeTwitchStreamModeCurrentMutation();
  const [makeWaitlistSpotifyModeCurrentMutation] =
    useMakeWaitlistSpotifyModeCurrentMutation();
  const [makeMakeWaitlistYoutubeModeCurrentMutation] =
    useMakeWaitlistYoutubeModeCurrentMutation();

  return {
    makeModeCurrent: (mode: ChannelMode, channelId: string) => {
      console.log('setChannelMode', { mode, channelId });

      switch (mode) {
        case ChannelMode.StreamTwitch:
          return makeTwitchStreamModeCurrentMutation({
            variables: { channelId },
          });
        case ChannelMode.WaitlistSpotify:
          return makeWaitlistSpotifyModeCurrentMutation({
            variables: { channelId },
          });
        case ChannelMode.WaitlistYoutube:
          return makeMakeWaitlistYoutubeModeCurrentMutation({
            variables: { channelId },
          });
      }
    },
  };
};
