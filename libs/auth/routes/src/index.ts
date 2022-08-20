import { withIronSessionApiRoute } from 'iron-session/next';

const sessionOptions = {
  cookieName: 'ds',
  password: process.env['SESSION_PASSWORD'] || '',
};

async function provider(req, res) {
  const host = req?.headers?.host;
  const provider = req?.query?.route;

  const params = new URLSearchParams();
  params.set('code_handler', `https://${host}/api/auth/callback?`);
  params.set('redirect_uri', `https://${host}${req.query?.continue}`);
  const authUrl = `https://${
    process.env['NEXT_PUBLIC_API']
  }/auth/${provider}?${params.toString()}`;

  return res.redirect(authUrl);
}

const routes = {
  async callback(req, res) {
    const { token, redirect } = req.query;
    req.session.access_token = token;
    await req.session.save();
    return res.redirect(redirect);
  },
  async logout(req, res) {
    await req.session.destroy();
    return res.redirect('/');
  },
  async token(req, res) {
    const token = req.session.access_token;
    return res.send({ token });
  },
};

async function mainHandler(req, res) {
  const route = req?.query?.route;
  return typeof routes[route] === 'function'
    ? routes[route](req, res)
    : provider(req, res);
}

export const authApiRoutes = withIronSessionApiRoute(
  mainHandler,
  sessionOptions
);
