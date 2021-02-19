import { WebSocketLink } from '@apollo/client/link/ws';
import { getToken } from '@dream/auth';
import WebSocket from 'isomorphic-ws';

export const wsLink = new WebSocketLink({
  uri: `wss://api.sgmn.dev/graphql`,
  webSocketImpl: WebSocket,
  options: {
    reconnect: true,
    connectionParams: async () => {
      const token = getToken();
      return { token };
    },
  },
});
