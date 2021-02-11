import { registerAs } from '@nestjs/config';

export default registerAs('authSpotify', () => ({
  clientID: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
  callbackURL: process.env.SPOTIFY_URL,
  scope: ['user-read-email', 'user-read-playback-state'],
}));
