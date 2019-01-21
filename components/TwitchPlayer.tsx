import loadScript from 'load-script';
import nanoid from 'nanoid';
import { Component } from 'react';

const resolves = {};
export function getSDK(
  url,
  sdkGlobal,
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
      resolves[url].forEach(resolve => resolve(sdk));
    };
    if (sdkReady) {
      const previousOnReady = window[sdkReady];
      window[sdkReady] = function() {
        if (previousOnReady) {
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

const SDK_URL = 'https://player.twitch.tv/js/embed/v1.js';
const SDK_GLOBAL = 'Twitch';

interface IProps {
  playing: boolean;
  muted: boolean;
  channel: string;
}

class TwitchPlayer extends Component<IProps> {
  public playerID = nanoid();
  public player = null;

  constructor(props) {
    super(props);
  }

  public componentDidMount() {
    setTimeout(() => {
      getSDK(SDK_URL, SDK_GLOBAL).then(Twitch => {
        this.player = new Twitch.Player(this.playerID, {
          channel: this.props.channel,
          height: '100%',
          width: '100%',
          autoplay: this.props.playing,
          muted: this.props.muted,
          controls: false
        });

        this.player.setQuality('160p30');
      });
    }, 500);
  }

  public render() {
    const style = {
      width: '100%',
      height: '100%'
    };

    return <div style={style} id={this.playerID} />;
  }
}

export default TwitchPlayer;
