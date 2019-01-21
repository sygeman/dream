import * as React from 'react';
import styled from '../../theme';
import Comment from './Comment';

const Messages = styled.div`
  position: relative;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

interface IProps {
  subscribeNewChatMessages: () => void;
  subscribeRemoveChatMessages: () => void;
  subscribeRemoveChatMessagesByUserId: () => void;
  messages: any;
}

interface IState {
  isBottom: boolean;
  fixBottom: boolean;
}

export default class extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isBottom: false,
      fixBottom: false
    };
  }

  public componentDidMount() {
    this.props.subscribeNewChatMessages();
    this.props.subscribeRemoveChatMessages();
    this.props.subscribeRemoveChatMessagesByUserId();

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
    const messages = this.compactMessages(this.props.messages);

    return (
      <Messages>
        {messages.map(message => (
          <Comment key={message.id} {...message} />
        ))}
      </Messages>
    );
  }
}
