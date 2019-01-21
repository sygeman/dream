import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { profilesToObject } from '../../../utils/profile';
import Integration from './Integration';

const GET_USER = gql`
  query {
    user {
      id
      profiles {
        id
        name
        avatar
        serviceName
        serviceId
        visible
      }
    }
  }
`;

export default class Integrations extends React.Component {
  public render() {
    return (
      <Query query={GET_USER}>
        {({ loading, error, data }) => {
          if (loading) {
            return null;
          }

          if (error) {
            return null;
          }

          const user = data.user;
          const profiles: any = profilesToObject(user.profiles);
          const profilesCount = user.profiles.length;

          return (
            <div>
              <Integration
                serviceName="google"
                bgColor="#DB4437"
                icon="google"
                denyDisconnect={profilesCount === 1}
                profile={profiles.google}
              />
              <Integration
                serviceName="vkontakte"
                bgColor="#507299"
                icon="vk"
                denyDisconnect={profilesCount === 1}
                profile={profiles.vkontakte}
              />
              <Integration
                serviceName="twitch"
                bgColor="#6542a6"
                icon="twitch"
                denyDisconnect={profilesCount === 1}
                profile={profiles.twitch}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}
