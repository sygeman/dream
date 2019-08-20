import * as Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { interval } from 'rxjs';
import { promiseTimeout } from '../utils/promiseTimeout';
import { gqlQuery } from '../utils/gqlQuery';
import config from '../config';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

export const connect = (serviceName: string) => {
  location.href = `${config.apiUrl}auth/connect/${serviceName}`;
};

export const disconnect = (serviceName: string) => {
  location.href = `${config.apiUrl}disconnect/${serviceName}`;
};

export const getTokens = () => ({
  accessToken: Cookies.get(ACCESS_TOKEN) || '',
  refreshToken: Cookies.get(REFRESH_TOKEN) || ''
});

export const setAccessToken = (accessToken: string) => {
  Cookies.set(ACCESS_TOKEN, accessToken, config.cookieOptions);
};

export const setRefreshToken = (refreshToken: string) => {
  Cookies.set(REFRESH_TOKEN, refreshToken, config.cookieOptions);
};

export const setTokens = ({
  accessToken,
  refreshToken
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
};

export const removeTokens = () => {
  Cookies.remove(ACCESS_TOKEN, config.cookieOptions);
  Cookies.remove(REFRESH_TOKEN, config.cookieOptions);
};

export const accessTokenIsValid = (token: string) => {
  const payload: any = jwt.decode(token);
  const expUnix = payload.exp * 1000;
  const nowUnix = new Date().getTime();
  return expUnix - nowUnix > 0;
};

const REFRESH_QUERY = `
  query refresh($refreshToken: String!) {
    refresh(refreshToken: $refreshToken) {
      refreshToken
      accessToken
    }
  }
`;

const refreshQuery = async (refreshToken: string) => {
  const query = await gqlQuery(config.gqlUrl, REFRESH_QUERY, { refreshToken });

  if (query.errors) {
    console.error(query.errors);
    return;
  }

  return query.data.refresh;
};

class TokenRefresh {
  private fetching: boolean = false;
  private fetchStart: boolean = false;
  private refreshToken: string = '';
  private queue = [];

  constructor() {
    this.runFetchInterval();
  }

  public async refresh(refreshToken: string) {
    if (!this.fetching) {
      this.fetching = true;
      this.refreshToken = refreshToken;
    }

    return new Promise(resolve => this.queue.push(resolve));
  }

  private async runFetchInterval() {
    interval(500).subscribe(async () => {
      if (!this.fetchStart && this.fetching && this.refreshToken) {
        this.fetchStart = true;

        const refreshData = await refreshQuery(this.refreshToken);

        this.queue.forEach(resolve => resolve(refreshData));
        this.fetchStart = false;
        this.fetching = false;
        this.refreshToken = '';
      }
    });
  }
}

const tokenRefresh = new TokenRefresh();

const refresh = async (refreshToken: string) => {
  const refreshData: any = await tokenRefresh.refresh(refreshToken);

  if (refreshData) {
    setTokens(refreshData);
    console.log('tokens refreshed');
    return refreshData.accessToken;
  }

  removeTokens();
  return '';
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

  return promiseTimeout(3000, refresh(refreshToken))
    .then(newToken => newToken)
    .catch(() => {
      console.log('refresh token timeout', refreshToken);
      removeTokens();
      return '';
    });
};
