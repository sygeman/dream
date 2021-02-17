import React from 'react';
import { dateDistanceInWordsToNow } from '@dream/utils/date';
import { splitTextToEmojiArray } from '@dream/utils/emoji';

// const EmojiImg = styled.img`
//   height: 1rem;
//   margin: 0 0.05em 0 0.1em !important;
//   min-height: 28px;
//   min-width: 28px;
//   object-fit: contain;
//   vertical-align: -0.4em;
//   width: 1rem;
// `;

interface IProps {
  id?: string;
  name: string;
}

export const Emoji: React.FC<IProps> = ({ name, id }) => (
  <img
    className="object-contain h-6 w-6"
    alt={`${name} `}
    src={`/emojis/${id ? id : name}.gif`}
  />
);

const renderMessageText = (text: string) => {
  return splitTextToEmojiArray(text).map((elm, index) => {
    if (elm.type === 'text') {
      return <React.Fragment key={index}>{elm.value}</React.Fragment>;
    }

    if (elm.type === 'emoji' && elm.name) {
      return <Emoji key={index} name={elm.name} />;
    }
  });
};

export const ChatMessage = ({
  authorName,
  authorAvatar,
  content,
  compact = false,
  createdAt,
}) => {
  return (
    <div className="px-2 w-full relative overflow-hidden text-sm">
      {!compact && (
        <div className="flex items-center w-full pt-1">
          <div className="flex items-center  justify-center rounded-full cursor-pointer">
            {authorAvatar ? (
              <img
                className="h-6 w-6 rounded-full"
                src={authorAvatar}
                alt={authorName}
              />
            ) : (
              <div className="h-6 w-6 rounded-full bg-background" />
            )}
          </div>
          <div className="font-medium text-white ml-2">{authorName}</div>
          <div className="text-accent text-xs ml-2">
            {dateDistanceInWordsToNow(createdAt)}
          </div>
        </div>
      )}
      <div className="relative">
        <div className="overflow-hidden text-accent break-words ml-8 flex flex-wrap">
          {renderMessageText(content)}
        </div>
      </div>
    </div>
  );
};
