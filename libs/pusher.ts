import Pusher from "pusher";
import * as pusherConfig from "@/config/pusher";

export const pusher = new Pusher({
  appId: pusherConfig.appId,
  key: pusherConfig.key,
  secret: pusherConfig.secret,
  host: pusherConfig.host,
  port: pusherConfig.port,
});
