import { parseTwitchChannelName } from './parseTwitchChannelName';

test('only channel name', () => {
  expect(parseTwitchChannelName('sygeman')).toBe('sygeman');
});

test('channel link', () => {
  expect(parseTwitchChannelName('https://www.twitch.tv/sygeman')).toBe(
    'sygeman'
  );
});

test('invalid link', () => {
  expect(parseTwitchChannelName('https://www.youtube.com/feed/trending')).toBe(
    undefined
  );
});
