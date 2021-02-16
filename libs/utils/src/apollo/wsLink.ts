import { WebSocketLink } from '@apollo/client/link/ws';
import { getAccessToken, refreshTokens } from '@dream/auth';

export const getWsLink = () =>
  new WebSocketLink({
    uri: `wss://api.sgmn.dev/graphql`,
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
