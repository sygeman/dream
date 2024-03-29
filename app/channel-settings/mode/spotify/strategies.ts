import { SpotifyModeStrategy } from '@prisma/client';

export const strategies = [
  {
    id: 'queue',
    name: 'Queue',
    description:
      'Users add tracks to the queue and the tracks are streamed in real time, users can join the stream and listen together',
    value: SpotifyModeStrategy.QUEUE,
  },
  {
    id: 'host',
    name: 'Host',
    description:
      'The stream is synchronized with one user who is currently listening to the spotify, users can join and listen to its stream',
    value: SpotifyModeStrategy.HOST,
  },
];
