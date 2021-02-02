import { ApolloError, gql, useQuery } from '@apollo/client';

type Tokens = { accessToken: string; refreshToken: string };

export const Auth: React.FC<{
  code: string;
  onSuccess?: (tokens: Tokens) => void;
  onError?: (error: ApolloError) => void;
}> = ({ code, onSuccess, onError }) => {
  useQuery(
    gql`
      query getTokens($authCode: String!) {
        tokens(authCode: $authCode) {
          accessToken
          refreshToken
        }
      }
    `,
    {
      variables: {
        authCode: code,
      },
      onCompleted: (data) => {
        const { accessToken, refreshToken } = data.tokens;

        typeof onSuccess === 'function' &&
          onSuccess({ accessToken, refreshToken });
      },
      onError: (error) => {
        typeof onError === 'function' && onError(error);
      },
      skip: typeof window === 'undefined' || !code,
    }
  );

  return null;
};
