import React, { useEffect, useRef, useState } from 'react';
import { dateDistanceInWordsToNow } from 'apps/client/helpers/date-distance-in-words-to-now';
import { GifContainer } from './gif';
import { renderMessageText } from './render-message-text';

type Props = {
  authorName: any;
  authorAvatar: any;
  content: any;
  compact: boolean;
  tenorGif: any;
  createdAt: any;
};

export const ChatMessage = ({
  authorName,
  authorAvatar,
  content,
  compact = false,
  tenorGif,
  createdAt,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const rootRef =
      ref.current?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        root: rootRef,
      },
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  });

  return (
    <div ref={ref} className="px-2 w-full relative overflow-hidden text-sm">
      {!compact && (
        <div className="flex items-center w-full pt-1">
          <div className="flex items-center justify-center rounded-full cursor-pointer">
            {authorAvatar ? (
              <img
                className="h-4 w-4 rounded-full"
                src={authorAvatar}
                alt={authorName}
              />
            ) : (
              <div className="h-4 w-4 rounded-full bg-background" />
            )}
          </div>
          <div className="font-medium text-sm text-white ml-2">
            {authorName}
          </div>
          <div className="text-accent text-xs ml-2">
            {dateDistanceInWordsToNow(createdAt)}
          </div>
        </div>
      )}
      <div className="relative">
        <div className="overflow-hidden text-accent break-words ml-6 flex flex-wrap">
          {tenorGif ? (
            <div className="p-1 pr-3 w-full ">
              <GifContainer
                tenorGif={tenorGif}
                isIntersecting={isIntersecting}
              />
            </div>
          ) : (
            renderMessageText(content)
          )}
        </div>
      </div>
    </div>
  );
};
