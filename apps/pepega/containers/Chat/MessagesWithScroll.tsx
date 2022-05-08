import { isEqual } from 'lodash';
import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import styled from 'styled-components';
import { ChatMessage } from './Message';

const Messages = styled.div`
  position: relative;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

interface IProps {
  messages: any;
  fixBottom: boolean;
  onPositionChanged: (isBottom: boolean) => void;
}

export default class extends React.Component<IProps> {
  public shouldComponentUpdate(prevProps) {
    return (
      !isEqual(prevProps.messages, this.props.messages) ||
      prevProps.fixBottom !== this.props.fixBottom
    );
  }

  public componentDidUpdate() {
    if (this.props.fixBottom) {
      this.toBottom();
    }
  }

  public chatScroll = values => {
    this.props.onPositionChanged(values.top >= 0.98);
  };

  public toBottom = () => {
    // @ts-ignore
    this.refs.chatscroll.scrollToBottom();
  };

  public render() {
    const { messages } = this.props;

    return (
      <Messages>
        <Scrollbars
          ref="chatscroll"
          autoHide={false}
          onScrollFrame={this.chatScroll}
        >
          {messages.map(message => (
            <ChatMessage key={message.id} {...message} />
          ))}
        </Scrollbars>
      </Messages>
    );
  }
}
