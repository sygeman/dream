import React from 'react';
import { dateDistanceInWordsToNow } from '@dream/utils/date';

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
        <div className="overflow-hidden text-accent break-words ml-8">
          {content}
        </div>
      </div>
    </div>
  );
};
