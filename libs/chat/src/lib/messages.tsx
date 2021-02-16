import React, { useEffect, useState } from 'react';
import { ChatMessagesWithScroll } from './with-scroll';

export const ChatMessages: React.FC<{ messages: any[] }> = ({ messages }) => {
  const [isBottom, setIsBottom] = useState(false);
  const [fixBottom, setFixBottom] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsBottom(true);
      setFixBottom(true);
    }, 10);
  }, []);

  const compactMessages = (messages) => {
    const compactInterval = 90e3; // 1,5 min

    return messages.map((message, index, array) => {
      let compact = false;

      if (index > 0) {
        const diff =
          parseInt(message.createdAt, 10) -
          parseInt(array[index - 1].createdAt, 10);

        if (
          diff < compactInterval &&
          message.authorId === array[index - 1].authorId
        ) {
          compact = true;
        }
      }

      return {
        ...message,
        compact,
      };
    });
  };

  const setBottom = (isBottom) => {
    setIsBottom(isBottom);
    setFixBottom(isBottom);
  };

  return (
    <div className="flex flex-col overflow-hidden flex-1 relative">
      <ChatMessagesWithScroll
        fixBottom={fixBottom}
        messages={compactMessages(messages)}
        onPositionChanged={setBottom}
      />
      {!isBottom && (
        <div
          className="bg-surface flex w-full items-center justify-center opacity-90 absolute bottom-0 cursor-pointer"
          onClick={() => setFixBottom(true)}
        >
          К новым сообщениям
        </div>
      )}
    </div>
  );
};
