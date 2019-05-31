import loadScript from 'load-script';

const SDK_URL = 'https://player.twitch.tv/js/embed/v1.js';
const SDK_GLOBAL = 'Twitch';

const resolves = {};
export function getSDK(
  url = SDK_URL,
  sdkGlobal = SDK_GLOBAL,
  sdkReady = null,
  isLoaded = () => true,
  fetchScript = loadScript
) {
  if (window[sdkGlobal] && isLoaded()) {
    return Promise.resolve(window[sdkGlobal]);
  }
  return new Promise((resolve, reject) => {
    // If we are already loading the SDK, add the resolve
    // function to the existing array of resolve functions
    if (resolves[url]) {
      resolves[url].push(resolve);
      return;
    }
    resolves[url] = [resolve];
    const onLoaded = sdk => {
      // When loaded, resolve all pending promises
      resolves[url].forEach(res => res(sdk));
    };
    if (sdkReady) {
      const previousOnReady = window[sdkReady];
      //@ts-ignore
      window[sdkReady] = () => {
        if (previousOnReady) {
          //@ts-ignore
          previousOnReady();
        }
        onLoaded(window[sdkGlobal]);
      };
    }
    fetchScript(url, err => {
      if (err) {
        reject(err);
      }
      if (!sdkReady) {
        onLoaded(window[sdkGlobal]);
      }
    });
  });
}
