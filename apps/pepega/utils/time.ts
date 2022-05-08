/**
 * s => (hh:)(mm:)ss
 */
export const timeFormat = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds - h * 3600) / 60);
  const s = seconds - h * 3600 - m * 60;

  const hs = h ? `${h}:` : '';
  const ms = h || m ? `${m < 10 && h > 0 ? '0' + m : m}:` : '';
  const ss = h || m || s ? `${s < 10 && (m > 0 || h > 0) ? '0' + s : s}` : '';

  return `${hs}${ms}${ss}`;
};

/**
 * timeCorrectMask('12', '1:45') -> 0:12
 */
export const timeCorrectMask = (time: string, target: string): string => {
  const m = '00:00:00';
  const dl = target.length;
  const cl = time.length;
  return m.substr(-1 * dl, dl).substr(0, dl - cl) + time;
};
