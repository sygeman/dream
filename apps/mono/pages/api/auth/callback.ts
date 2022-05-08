import { withIronSession } from 'next-iron-session';

async function handler(req, res) {
  const { token, redirect } = req?.query;
  req.session.set('access_token', token);
  await req.session.save();
  return res.redirect(redirect);
}

export default withIronSession(handler, {
  cookieName: 'ds',
  cookieOptions: { secure: true },
  password: process.env.SESSION_PASSWORD,
});
