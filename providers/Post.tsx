import gql from 'graphql-tag';
import { Component, FC } from 'react';
import { Query } from 'react-apollo';

export const GET_POST = gql`
  query post($id: ID!) {
    post(id: $id) {
      id
      title
      nfws
      spoiler
      sourceId
      cover
      likes
      dislikes
      rating
      deleted
      createdAt
      channelName
      authorId
    }
  }
`;

const UPDATED = gql`
  subscription post($id: ID!) {
    post(id: $id) {
      id
      title
      nfws
      spoiler
      sourceId
      cover
      likes
      dislikes
      rating
      deleted
      createdAt
      channelName
      authorId
    }
  }
`;

interface IPropsInner {
  post: any;
  updated: () => void;
  children: any;
}

class PostProviderInner extends Component<IPropsInner> {
  public componentDidMount() {
    this.props.updated();
  }

  public render() {
    return this.props.children({
      post: this.props.post
    });
  }
}

interface IProps {
  id?: string;
  noRealtime?: boolean;
  children: any;
}

const PostProvider: FC<IProps> = ({ children, id, noRealtime }) => {
  return (
    <Query query={GET_POST} variables={{ id }}>
      {({ subscribeToMore, loading, error, data }) => {
        if (loading) {
          return null;
        }

        if (error) {
          return null;
        }

        if (noRealtime) {
          return children({
            post: data.post
          });
        }

        return (
          <PostProviderInner
            post={data.post}
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
                    post: {
                      ...prev.post,
                      ...subscriptionData.data.post
                    }
                  };
                }
              });
            }}
          >
            {children}
          </PostProviderInner>
        );
      }}
    </Query>
  );
};
export default PostProvider;
