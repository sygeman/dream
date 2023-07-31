import Pusher from 'pusher';
import * as pusherConfig from 'apps/client/config/pusher';

export const pusher = new Pusher({
  appId: pusherConfig.appId,
  key: pusherConfig.key,
  secret: pusherConfig.secret,
  host: pusherConfig.host,
  port: pusherConfig.port,
});
