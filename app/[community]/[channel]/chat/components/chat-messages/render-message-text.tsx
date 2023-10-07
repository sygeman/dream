import { Fragment } from 'react';

import { Emoji } from './emoji';

const splitTextToEmojiArray = (text: string) => {
  return text.split(/(<:[^:]+:[\dA-Za-z]+>)/g).map((txt) => {
    const findEmoji = txt.match(/<:([^:]+):([\dA-Za-z]+)>/);

    if (findEmoji) {
      return { type: 'emoji', name: findEmoji[1], id: findEmoji[2] };
    }

    return { type: 'text', value: txt };
  });
};

export const renderMessageText = (text: string) => {
  return splitTextToEmojiArray(text).map((elm, index) => {
    if (elm.type === 'text') {
      return <Fragment key={index}>{elm.value}</Fragment>;
    }

    if (elm.type === 'emoji' && elm.name) {
      return <Emoji key={index} emojiId={elm.id} />;
    }
  });
};
