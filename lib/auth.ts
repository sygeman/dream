import * as Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import config from '../config';

export const connect = (serviceName: string) => {
  location.href = `${config.apiUrl}auth/connect/${serviceName}`;
};

export const disconnect = (serviceName: string) => {
  location.href = `${config.apiUrl}disconnect/${serviceName}`;
};

export const getAccessToken = () => {
  return Cookies.get('accessToken') || '';
};

export const getRefreshToken = () => {
  return Cookies.get('refreshToken') || '';
};

export const getTokens = () => {
  return {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken()
  };
};

export const setAccessToken = (accessToken: string) => {
  Cookies.set('accessToken', accessToken, config.cookieOptions);
};

export const setRefreshToken = (refreshToken: string) => {
  Cookies.set('refreshToken', refreshToken, config.cookieOptions);
};

export const setTokens = (accessToken: string, refreshToken: string) => {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
};

export const removeTokens = () => {
  // console.log('removeTokens');
  Cookies.remove('accessToken', config.cookieOptions);
  Cookies.remove('refreshToken', config.cookieOptions);
};

export const accessTokenIsValid = token => {
  const expUnix = jwt.decode(token).exp * 1000;
  const nowUnix = new Date().getTime();
  return expUnix - nowUnix > 0;
};

const REFRESH_QUERY = `
  query($refreshToken: String!) {
    refresh(refreshToken: $refreshToken) {
      refreshToken
      accessToken
    }
  }
`;

const gqlQuery = async (query, variables) => {
  const res = await fetch(config.gqlUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  return res.json();
};

const refreshQuery = async refreshToken => {
  // const qId = +new Date();
  // console.log('start refreshQuery', qId);

  const query = await gqlQuery(REFRESH_QUERY, {
    refreshToken
  });

  if (query.errors) {
    console.error(query.errors);
  }

  // console.log('end refreshQuery', qId, refreshToken);

  return query.data.refresh;
};

class TokenRefresh {
  private fetching: boolean = false;
  private fetchStart: boolean = false;
  private refreshToken: string = '';
  private queue = [];

  constructor() {
    setTimeout(() => {
      this.runFetchInterval();
    }, 200);
  }

  public async refresh(refreshToken) {
    if (!this.fetching) {
      // console.log('start refresh', refreshToken);
      this.fetching = true;
      this.refreshToken = refreshToken;
    }

    return new Promise(resolve => {
      this.queue.push(resolve);
    });
  }

  private async runFetchInterval() {
    setInterval(async () => {
      if (!this.fetchStart && this.fetching && this.refreshToken) {
        this.fetchStart = true;

        const refreshData = await refreshQuery(this.refreshToken);

        this.queue.forEach(resolve => {
          resolve(refreshData);
        });

        this.fetchStart = false;
        this.fetching = false;
        this.refreshToken = '';
      }
    }, 500);
  }
}

const tokenRefresh = new TokenRefresh();

const refresh = async refreshToken => {
  const refreshData: any = await tokenRefresh.refresh(refreshToken);

  if (refreshData) {
    setTokens(refreshData.accessToken, refreshData.refreshToken);
    console.log('tokens refreshed');
    return refreshData.accessToken;
  }

  removeTokens();

  return '';
};

const promiseTimeout = (ms: number, promise) => {
  // Create a promise that rejects in <ms> milliseconds
  const timeout = new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject('Timed out in ' + ms + 'ms.');
      resolve();
    }, ms);
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race([promise, timeout]);
};

export const getAccessTokenAsync = async () => {
  const { accessToken, refreshToken } = getTokens();

  if (!accessToken || accessTokenIsValid(accessToken)) {
    return accessToken;
  }

  if (!refreshToken) {
    removeTokens();
    return '';
  }

  // console.log('need refresh token', refreshToken);

  return promiseTimeout(3000, refresh(refreshToken))
    .then(newToken => {
      return newToken;
    })
    .catch(() => {
      console.log('refresh token timeout', refreshToken);
      removeTokens();
      return '';
    });
};
