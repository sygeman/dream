export const parseTwitchChannelName = (value: string) => {
  const res = value.match(/(?:^([^.\/]+)|twitch\.tv\/([^\/]+).*)$/);

  if (!res) {
    return;
  }

  return res[1] || res[2];
};
