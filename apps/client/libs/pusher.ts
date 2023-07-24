import Pusher from 'pusher';

export const pusher = new Pusher({
  appId: process.env.PUSHER_ID as string,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
  secret: process.env.PUSHER_SECRET as string,
  host: process.env.NEXT_PUBLIC_PUSHER_HOST as string,
  port: process.env.NEXT_PUBLIC_PUSHER_PORT as string,
});
