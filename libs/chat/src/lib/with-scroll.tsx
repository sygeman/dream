import React, { useEffect, useRef } from 'react';
import SimpleBar from 'simplebar-react';
import { ChatMessage } from '@dream/components/chat-message';

interface ChatMessagesWithScrollProps {
  messages: any[];
  fixBottom: boolean;
  onPositionChanged: (isBottom: boolean) => void;
}

export const ChatMessagesWithScroll: React.FC<ChatMessagesWithScrollProps> = ({
  messages,
  fixBottom,
  onPositionChanged,
}) => {
  const ref = useRef();

  const chatScroll = (e) => {
    const el = ref.current;

    console.log(el);

    // onPositionChanged(values.top >= 0.98);
  };

  useEffect(() => {
    // ref.current.addEventListener('scroll', chatScroll);
    if (ref?.current) {
      ref.current.recalculate();

      // ref.current.el.addEventListener('scroll', chatScroll);
      console.log(ref.current); // <- the root element you applied SimpleBar on

      ref.current.getScrollElement().addEventListener('scroll', chatScroll);

      return () => {
        ref.current
          .getScrollElement()
          .removeEventListener('scroll', chatScroll);
      };
    }
  }, [ref]);

  // public shouldComponentUpdate(prevProps) {
  //   return (
  //     !isEqual(prevProps.messages, this.props.messages) ||
  //     prevProps.fixBottom !== this.props.fixBottom
  //   );
  // }

  // public componentDidUpdate() {
  //   if (this.props.fixBottom) {
  //     this.toBottom();
  //   }
  // }

  // public toBottom = () => {
  //   // @ts-ignore
  //   this.refs.chatscroll.scrollToBottom();
  // };

  return (
    <div className="flex flex-col overflow-hidden flex-1 relative">
      <SimpleBar
        // scrollableNodeProps={{ ref }}
        ref={ref}
        className="h-full"
        // onScroll={chatScroll}
        // ref="chatscroll"
        // onScrollFrame={chatScroll}
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            username={message.author.name}
            content={message.content}
          />
        ))}
      </SimpleBar>
    </div>
  );
};
