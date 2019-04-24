import { shortNumbers } from './count';

test('[shortNumbers] positive < 1000', () => {
  expect(shortNumbers(123)).toBe('123');
});

test('[shortNumbers] positive > 1000', () => {
  expect(shortNumbers(1102)).toBe('1.1K');
});

test('[shortNumbers] negative > -1000', () => {
  expect(shortNumbers(-141)).toBe('-141');
});

test('[shortNumbers] negative < -1000', () => {
  expect(shortNumbers(-1102)).toBe('-1.1K');
});
