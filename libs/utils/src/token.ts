export const getAccessToken = () => {
  return typeof localStorage !== 'undefined'
    ? localStorage.getItem('accessToken')
    : undefined;
};

export const getRefreshToken = () => {
  return typeof localStorage !== 'undefined'
    ? localStorage.getItem('refreshToken')
    : undefined;
};

export const setAccessToken = (accessToken: string) => {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('accessToken', accessToken);
};

export const setTokens = ({ accessToken, refreshToken }) => {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const removeTokens = () => {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
