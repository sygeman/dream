import { ApolloLink } from '@apollo/client';
import { getAccessToken } from '@dream/auth';

type Headers = {
  authorization?: string;
};

export const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    operation.setContext(({ headers }: { headers: Headers }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`,
      },
    }));
  }

  return forward(operation);
});
