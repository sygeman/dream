import { WebSocketLink } from '@apollo/client/link/ws';
import { getAccessToken, refreshTokens } from '@dream/auth';
import WebSocket from 'isomorphic-ws';

export const wsLink = new WebSocketLink({
  uri: `wss://api.sgmn.dev/graphql`,
  webSocketImpl: WebSocket,
  options: {
    reconnect: true,
    connectionParams: async () => {
      const accessToken = getAccessToken();
      return { accessToken };
    },
    connectionCallback: (error) => {
      if (error) {
        refreshTokens();
      }
    },
  },
});
