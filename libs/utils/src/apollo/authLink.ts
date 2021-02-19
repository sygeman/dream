import { ApolloLink } from '@apollo/client';
import { getToken } from '@dream/auth';

type Headers = {
  authorization?: string;
};

export const authLink = new ApolloLink((operation, forward) => {
  const token = getToken();

  if (token) {
    operation.setContext(({ headers }: { headers: Headers }) => ({
      headers: {
        ...headers,
        authorization: token,
      },
    }));
  }

  return forward(operation);
});
