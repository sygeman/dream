import { withIronSession } from 'next-iron-session';

async function handler(req, res) {
  const host = req?.headers?.host;
  const provider = req?.query?.provider;

  const params = new URLSearchParams();
  params.set('code_handler', `https://${host}/api/auth/callback?`);
  params.set('redirect_uri', `https://${host}${req.query?.continue}`);
  const authUrl = `https://api.sgmn.dev/auth/${provider}?${params.toString()}`;

  return res.redirect(authUrl);
}

export default withIronSession(handler, {
  cookieName: 'ds',
  cookieOptions: { secure: true },
  password: process.env.SESSION_PASSWORD,
});
