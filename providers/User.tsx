import gql from 'graphql-tag';
import { Component, FC } from 'react';
import { Query } from 'react-apollo';

const GET_USER = gql`
  query getUser($id: ID) {
    user(id: $id) {
      id
      points
      mainProfile {
        id
        name
        avatar
      }
      profiles {
        id
        name
        avatar
        visible
      }
    }
  }
`;

const USER_PROFILE_VISIBLE_CHANGED = gql`
  subscription userProfileVisibleChanged {
    userProfileVisibleChanged {
      id
      visible
    }
  }
`;

const USER_POINTS_CHANGED = gql`
  subscription userPointsChanged {
    userPointsChanged
  }
`;

interface IPropsInner {
  user: any;
  userProfileVisibleChanged: () => void;
  userPointsChanged: () => void;
  children: any;
}

class UserProviderInner extends Component<IPropsInner> {
  public componentDidMount() {
    this.props.userProfileVisibleChanged();
    this.props.userPointsChanged();
  }

  public render() {
    return this.props.children({
      user: this.props.user
    });
  }
}

interface IProps {
  id?: string;
}

const UserProvider: FC<IProps> = ({ children, id }) => (
  <Query query={GET_USER} variables={{ id }}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) {
        return null;
      }

      if (error) {
        return null;
      }

      return (
        <UserProviderInner
          user={data.user}
          userProfileVisibleChanged={() =>
            subscribeToMore({
              document: USER_PROFILE_VISIBLE_CHANGED,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                  return prev;
                }

                const profileVisibleData =
                  subscriptionData.data.userProfileVisibleChanged;

                return {
                  ...prev,
                  user: {
                    ...prev.user,
                    profiles: prev.user.profiles.map(profile => {
                      if (profile.id === profileVisibleData.id) {
                        return {
                          ...profile,
                          visible: profileVisibleData.visible
                        };
                      }

                      return profile;
                    })
                  }
                };
              }
            })
          }
          userPointsChanged={() =>
            subscribeToMore({
              document: USER_POINTS_CHANGED,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                  return prev;
                }

                const newCount = subscriptionData.data.userPointsChanged;

                return {
                  ...prev,
                  user: { ...prev.user, points: newCount }
                };
              }
            })
          }
        >
          {children}
        </UserProviderInner>
      );
    }}
  </Query>
);

export default UserProvider;
