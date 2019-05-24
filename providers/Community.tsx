import gql from 'graphql-tag';
import { Component, FC } from 'react';
import { Query } from 'react-apollo';

const GET = gql`
  query community($id: ID!) {
    community(id: $id) {
      id
      name
      description
      avatar
      mainChatId
    }
  }
`;

const UPDATED = gql`
  subscription community($id: ID!) {
    community(id: $id) {
      id
      name
      avatar
      description
      mainChatId
    }
  }
`;

interface IPropsInner {
  community: any;
  updated: () => void;
  children: any;
}

class ProviderInner extends Component<IPropsInner> {
  public componentDidMount() {
    this.props.updated();
  }

  public render() {
    return this.props.children({
      community: this.props.community
    });
  }
}

interface IProps {
  id: string;
}

const Provider: FC<IProps> = ({ children, id }) => (
  <Query query={GET} variables={{ id }}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading || error) {
        return null;
      }

      return (
        <ProviderInner
          community={data.community}
          updated={() => {
            subscribeToMore({
              document: UPDATED,
              variables: { id },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                  return prev;
                }

                return {
                  ...prev,
                  community: {
                    ...prev.community,
                    ...subscriptionData.data.community
                  }
                };
              }
            });
          }}
        >
          {children}
        </ProviderInner>
      );
    }}
  </Query>
);

export default Provider;
