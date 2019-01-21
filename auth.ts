import * as Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import config from './config';
import { changeURLParams } from './utils/url';

export const auth = (serviceName: string) => {
  changeURLParams({ remove: ['auth'] });

  setTimeout(() => {
    location.href = `${config.apiUrl}auth/${serviceName}`;
  }, 100);
};

export const connect = (serviceName: string) => {
  location.href = `${config.apiUrl}auth/connect/${serviceName}`;
};

export const disconnect = (serviceName: string) => {
  location.href = `${config.apiUrl}disconnect/${serviceName}`;
};

export const logout = () => {
  changeURLParams({ remove: ['profile'] });
  setTimeout(() => {
    location.href = `${config.apiUrl}logout`;
  }, 100);
};

export const getAccessToken = (ctx = null) => {
  if (ctx) {
    if (typeof ctx.ssrAccessTokenHook === 'string') {
      return ctx.ssrAccessTokenHook;
    }

    const cookieParsed = parseCookies(ctx);
    return cookieParsed.accessToken;
  }

  return Cookies.get('accessToken') || '';
};

export const getRefreshToken = (ctx = null) => {
  if (ctx) {
    if (typeof ctx.ssrRefreshTokenHook === 'string') {
      return ctx.ssrRefreshTokenHook;
    }

    const cookieParsed = parseCookies(ctx);
    return cookieParsed.refreshToken;
  }

  return Cookies.get('refreshToken') || '';
};

export const getTokens = (ctx = null) => {
  return {
    accessToken: getAccessToken(ctx),
    refreshToken: getRefreshToken(ctx)
  };
};

export const setAccessToken = (accessToken: string, ctx = null) => {
  if (ctx) {
    setCookie(ctx, 'accessToken', accessToken, config.cookieOptions);
    ctx.ssrAccessTokenHook = accessToken;
  } else {
    Cookies.set('accessToken', accessToken, config.cookieOptions);
  }
};

export const setRefreshToken = (refreshToken: string, ctx = null) => {
  if (ctx) {
    setCookie(ctx, 'refreshToken', refreshToken, config.cookieOptions);
    ctx.ssrRefreshTokenHook = refreshToken;
  } else {
    Cookies.set('refreshToken', refreshToken, config.cookieOptions);
  }
};

export const setTokens = (
  accessToken: string,
  refreshToken: string,
  ctx = null
) => {
  setAccessToken(accessToken, ctx);
  setRefreshToken(refreshToken, ctx);
};

export const removeTokens = (ctx = null) => {
  console.log('removeTokens', !!ctx);

  destroyCookie(ctx, 'accessToken', config.cookieOptions);
  destroyCookie(ctx, 'refreshToken', config.cookieOptions);

  if (ctx) {
    ctx.ssrAccessTokenHook = '';
    ctx.ssrRefreshTokenHook = '';
  } else {
    Cookies.remove('accessToken', config.cookieOptions);
    Cookies.remove('refreshToken', config.cookieOptions);
  }
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
  const qId = +new Date();
  console.log('start refreshQuery', qId);

  const query = await gqlQuery(REFRESH_QUERY, {
    refreshToken
  });

  if (query.errors) {
    console.error(query.errors);
  }

  console.log('end refreshQuery', qId, refreshToken);

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
      console.log('start refresh', refreshToken);
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

const refresh = async (refreshToken, ctx) => {
  const refreshData: any = await tokenRefresh.refresh(refreshToken);

  if (refreshData) {
    setTokens(refreshData.accessToken, refreshData.refreshToken, ctx);
    console.log('tokens refreshed');
    return refreshData.accessToken;
  }

  removeTokens(ctx);

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

export const getAccessTokenAsync = async ctx => {
  const { accessToken, refreshToken } = getTokens(ctx);

  if (!accessToken || accessTokenIsValid(accessToken)) {
    return accessToken;
  }

  if (!refreshToken) {
    removeTokens(ctx);
    return '';
  }

  console.log('need refresh token', refreshToken);

  return promiseTimeout(3000, refresh(refreshToken, ctx))
    .then(newToken => {
      return newToken;
    })
    .catch(() => {
      console.log('refresh token timeout', refreshToken);
      removeTokens(ctx);
      return '';
    });
};
