import { withIronSession } from 'next-iron-session';

async function handler(req, res) {
  await req.session.destroy();
  return res.redirect('/');
}

export default withIronSession(handler, {
  cookieName: 'ds',
  cookieOptions: { secure: true },
  password: process.env.SESSION_PASSWORD,
});
