export const useCurrent = () => {
  const current: any = undefined;

  // const currentQuery = useWaitlistYoutubeCurrentQuery({
  //   variables: { channelId },
  //   skip: !channelId,
  //   fetchPolicy: 'network-only',
  // });
  // useWaitlistYoutubeCurrentUpdatedSubscription({
  //   variables: { channelId },
  //   skip: !channelId,
  //   onData: () => {
  //     currentQuery.refetch();
  //   },
  // });
  // const current = currentQuery?.data?.waitlistYoutubeCurrent?.item;

  return current;
};
