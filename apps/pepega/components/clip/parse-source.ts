interface IPayload {
  cover?: string;
  sourceType?: string;
  sourceId?: string;
}

interface ISource {
  type: string;
  payload: IPayload;
}

const isTwitchClip = (sourceUrl: string) => {
  const regexps = [
    'https:\\/\\/clips\\.twitch\\.tv\\/(?:embed\\?clip\\=|)([^\\/?"]+)',
    'https:\\/\\/clips\\.twitch\\.tv\\/([^/?]+)\\/?',
    'https:\\/\\/www\\.twitch\\.tv\\/[^/]+\\/clip\\/([^\\/?"]+)\\/?',
    'https://www.twitch.tv/[^/]+/clip/([^\\/?"]+)',
  ];

  let result: any = null;

  for (const regexp of regexps) {
    const regexpResult = sourceUrl.match(regexp);

    if (regexpResult && regexpResult[1]) {
      result = {
        type: 'twitchClip',
        payload: {
          sourceId: regexpResult[1],
          sourceType: 'twitchClip',
        },
      };

      break;
    }
  }

  return result;
};

const allMethods: any = {
  isTwitchClip,
};

export const parseSource = (sourceUrl: string): ISource | null => {
  let result = null;

  for (const methodName of Object.keys(allMethods)) {
    const methodResult = allMethods[methodName](sourceUrl);

    if (methodResult) {
      result = methodResult;
      break;
    }
  }

  return result;
};
