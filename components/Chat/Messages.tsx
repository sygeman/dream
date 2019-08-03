import * as React from 'react';
import styled from 'styled-components';
import MessagesWithScroll from './MessagesWithScroll';

const Messages = styled.div`
  position: relative;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ToBottom = styled.div`
  background: ${({ theme }) => theme.dark2Color};
  font-size: 13px;
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  cursor: pointer;
  position: absolute;
  bottom: 0;
`;

interface IProps {
  messages: any;
}

interface IState {
  isBottom: boolean;
  fixBottom: boolean;
}

export class ChatMessages extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isBottom: false,
      fixBottom: false
    };
  }

  public componentDidMount() {
    setTimeout(() => {
      this.setState({
        isBottom: true,
        fixBottom: true
      });
    }, 10);
  }

  public compactMessages = messages => {
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
        compact
      };
    });
  };

  public setBottom = isBottom => {
    this.setState({ isBottom, fixBottom: isBottom });
  };

  public render() {
    const { messages } = this.props;

    return (
      <Messages>
        <MessagesWithScroll
          fixBottom={this.state.fixBottom}
          messages={this.compactMessages(messages)}
          onPositionChanged={this.setBottom}
        />
        {!this.state.isBottom && (
          <ToBottom onClick={() => this.setState({ fixBottom: true })}>
            К новым сообщениям
          </ToBottom>
        )}
      </Messages>
    );
  }
}
