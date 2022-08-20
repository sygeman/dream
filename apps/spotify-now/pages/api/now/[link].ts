import prisma from '../../../prisma';
import axios from 'axios';
import * as querystring from 'querystring';
import { NextApiRequest, NextApiResponse } from 'next';

const refreshToken = async (userId: string) => {
  console.log('refreshToken', userId);

  const account = await prisma.account.findFirst({
    where: { userId },
  });

  const { refresh_token } = account;

  const clientId = process.env.SPOTIFY_ID;
  const clientSecret = process.env.SPOTIFY_SECRET;

  const token = Buffer.from(clientId + ':' + clientSecret).toString('base64');

  const res = await axios.post(
    'https://accounts.spotify.com/api/token',
    querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
    {
      headers: {
        // <base64 encoded client_id:client_secret>
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  const access_token = res?.data?.access_token;

  if (!access_token) {
    throw new Error('fail');
  }

  await prisma.account.update({
    where: { id: account.id },
    data: { access_token },
  });

  return access_token;
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    if (error?.response?.status === 401 && !config._retry) {
      config._retry = true;

      const authorization = config.headers['authorization'] || '';
      const access_token = authorization.split(' ')?.[1];

      const account = await prisma.account.findFirst({
        where: { access_token },
      });

      const newAccessToken = await refreshToken(account.userId);

      return axios({
        ...config,
        headers: {
          ...config.headers,
          authorization: `Bearer ${newAccessToken}`,
        },
      });
    }

    return Promise.reject(error);
  }
);

const now = async (req: NextApiRequest, res: NextApiResponse) => {
  const link = req.query['link'] as string;
  const account = await prisma.account.findFirst({ where: { user: { link } } });

  if (!account) throw 'No data';

  const current = await axios
    .get('https://api.spotify.com/v1/me/player', {
      headers: { authorization: `Bearer ${account?.access_token}` },
    })
    .then(({ data }) => data)
    .catch((error) => console.log(error));

  let progress = 0;

  if (current) {
    progress = current?.progress_ms / current?.item?.duration_ms;
  }

  const id = current?.item?.id;
  const name = current?.item?.name;
  const artist = (current?.item?.artists || [])
    .map((artist) => artist?.name)
    .join(', ');
  const images = current?.item?.album?.images || [];

  return res.send({
    id,
    imageUrl: images[images.length - 1]?.url,
    artist: artist,
    name: name,
    progress: progress,
  });
};

export default now;
