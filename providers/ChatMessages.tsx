import gql from 'graphql-tag';
import { Component, FC } from 'react';
import { Query } from 'react-apollo';

const GET = gql`
  query chatMessages($chatId: ID!) {
    chatMessages(chatId: $chatId) {
      id
      content
      authorId
      createdAt
      author {
        id
        name
        avatar
        role
      }
    }
  }
`;

const CREATED = gql`
  subscription chatMessageCreated($chatId: ID!) {
    chatMessageCreated(chatId: $chatId) {
      id
      content
      authorId
      createdAt
      author {
        id
        name
        avatar
        role
      }
    }
  }
`;

const DELETED = gql`
  subscription chatMessageDeleted($chatId: ID!) {
    chatMessageDeleted(chatId: $chatId) {
      id
      content
      authorId
      createdAt
      author {
        id
        name
        avatar
        role
      }
    }
  }
`;

interface IPropsInner {
  created: () => void;
  deleted: () => void;
  chatMessages: any;
  children: any;
}

class Inner extends Component<IPropsInner> {
  public componentDidMount() {
    this.props.created();
    this.props.deleted();
  }

  public render() {
    return this.props.children({
      chatMessages: this.props.chatMessages
    });
  }
}

interface IProps {
  chatId: string;
  limit?: number;
  children: any;
}

const Provider: FC<IProps> = ({ children, chatId, limit }) => (
  <Query query={GET} variables={{ chatId }} ssr={false}>
    {({ subscribeToMore, loading, error, data }) => {
      if (loading || error || !data || !data.chatMessages) {
        return null;
      }

      return (
        <Inner
          chatMessages={data.chatMessages}
          created={() => {
            subscribeToMore({
              document: CREATED,
              variables: { chatId },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                  return prev;
                }

                const chatMessage = subscriptionData.data.chatMessageCreated;

                if (
                  prev.chatMessages.findIndex(c => c.id === chatMessage.id) < 0
                ) {
                  return {
                    ...prev,
                    chatMessages: [
                      ...prev.chatMessages.slice(-limit),
                      chatMessage
                    ]
                  };
                }
              }
            });
          }}
          deleted={() => {
            subscribeToMore({
              document: DELETED,
              variables: { chatId },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                  return prev;
                }

                const { id } = subscriptionData.data.chatMessageDeleted;

                return {
                  ...prev,
                  chatMessages: [...prev.chatMessages.filter(c => c.id !== id)]
                };
              }
            });
          }}
        >
          {children}
        </Inner>
      );
    }}
  </Query>
);

Provider.defaultProps = {
  limit: 50
};

export default Provider;
