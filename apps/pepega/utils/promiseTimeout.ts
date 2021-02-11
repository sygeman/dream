export const promiseTimeout = (ms: number, promise) => {
  const timeout = new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject('Timed out in ' + ms + 'ms.');
      resolve();
    }, ms);
  });

  return Promise.race([promise, timeout]);
};
