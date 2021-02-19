export const getToken = () => {
  return typeof localStorage !== 'undefined'
    ? localStorage.getItem('token')
    : undefined;
};

export const removeToken = () => {
  return typeof localStorage !== 'undefined'
    ? localStorage.removeItem('token')
    : undefined;
};

export const setToken = (token: string) => {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('token', token);
};
