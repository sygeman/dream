import Pusher from "pusher-js";
import * as pusherConfig from "@/config/pusher";

export const pusher = new Pusher(pusherConfig.key, {
  wsHost: pusherConfig.host,
  cluster: pusherConfig.cluster,
  wsPort: parseInt(pusherConfig.port, 10),
  forceTLS: false,
  enabledTransports: ["ws", "wss"],
});
