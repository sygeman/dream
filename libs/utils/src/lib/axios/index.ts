import { gql } from '@apollo/client';
import axios from 'axios';
import { initializeApollo } from '../apollo';

const apolloClient = initializeApollo(
  null,
  'https://ravepro-api.sgmn.dev/graphql'
);

const getAccessToken = async () => {
  const d = await apolloClient.query({
    query: gql`
      query spotifyToken {
        spotifyToken
      }
    `,
  });

  return d?.data?.spotifyToken || '';
};

const refreshAccessToken = async () => {
  const d = await apolloClient.mutate({
    mutation: gql`
      mutation refreshSpotifyToken {
        refreshSpotifyToken
      }
    `,
  });

  return d?.data?.refreshSpotifyToken || '';
};

// request interceptor to add token to request headers
axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('spotifyAccessToken');

    if (token) {
      config.headers = {
        authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor intercepting 401 responses, refreshing token and retrying the request
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    const config = error.config;

    if (error.response.status === 401 && !config._retry) {
      config._retry = true;

      if (error.response?.data?.error?.message === 'No token provided') {
        localStorage.setItem('spotifyAccessToken', await getAccessToken());
      } else {
        localStorage.setItem('spotifyAccessToken', await refreshAccessToken());
      }

      return axios(config);
    }

    return Promise.reject(error);
  }
);
