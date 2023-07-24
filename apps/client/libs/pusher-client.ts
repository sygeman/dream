import Pusher from 'pusher-js';

export const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
  wsHost: process.env.NEXT_PUBLIC_PUSHER_HOST as string,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
  wsPort: parseInt(process.env.NEXT_PUBLIC_PUSHER_PORT as string, 10),
  forceTLS: false,
  enabledTransports: ['ws', 'wss'],
});
