import { getRefreshToken, setAccessToken } from './token';

export const refreshTokens = async () => {
  const newAccessToken = await fetch('https://api.sgmn.dev/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query refresh($refreshToken: String!) {
          refresh(refreshToken:$refreshToken)
        }`,
      variables: {
        refreshToken: getRefreshToken(),
      },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data.refresh);

  setAccessToken(newAccessToken);

  console.log('Token refreshed');

  return newAccessToken;
};
