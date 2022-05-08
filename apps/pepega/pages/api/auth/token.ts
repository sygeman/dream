import { withIronSession } from 'next-iron-session';

async function handler(req, res) {
  const token = req.session.get('access_token');
  return res.send({ token });
}

export default withIronSession(handler, {
  cookieName: 'ds',
  cookieOptions: { secure: true },
  password: process.env.SESSION_PASSWORD,
});
