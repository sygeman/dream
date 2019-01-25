import gql from 'graphql-tag';
import { FC } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import DashCount from './DashCount';
import OnlineCount from './OnlineCount';

const GET_CONNECTIONS_COUNT = gql`
  query connectionsCount {
    connectionsCount {
      uniq
      usersCount
      history {
        date
        usersCount
        count
      }
    }
  }
`;

const ONLINE_COUNT_SUBSCRIPTION = gql`
  subscription onlineCountChanged {
    onlineCountChanged {
      uniq
      usersCount
    }
  }
`;

const GET_USERS_COUNT = gql`
  query usersCount {
    usersCount
  }
`;

const GET_CLIPS_COUNT = gql`
  query postsCount {
    postsCount
  }
`;

const Box = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  display: grid;
  grid-gap: 20px;
  padding: 20px;
  grid-template-columns: repeat(auto-fit, 300px);
  overflow-y: hidden;
`;

const Dashboard: FC = () => {
  return (
    <Box>
      <Query query={GET_CONNECTIONS_COUNT}>
        {({ subscribeToMore, loading, error, data }) => {
          const count = loading || error ? 0 : data.connectionsCount.uniq;
          const usersCount =
            loading || error ? 0 : data.connectionsCount.usersCount;
          const history = loading || error ? [] : data.connectionsCount.history;

          return (
            <OnlineCount
              subscribeToOnlineCount={() =>
                subscribeToMore({
                  document: ONLINE_COUNT_SUBSCRIPTION,
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) {
                      return prev;
                    }

                    const newStats = subscriptionData.data.onlineCountChanged;

                    return {
                      ...prev,
                      connectionsCount: {
                        ...prev.connectionsCount,
                        uniq: newStats.uniq,
                        usersCount: newStats.usersCount,
                        history: [
                          ...prev.connectionsCount.history.slice(-20),
                          {
                            __typename: 'ConnectionsCount',
                            date: Date.now(),
                            usersCount: newStats.usersCount,
                            count: newStats.uniq
                          }
                        ]
                      }
                    };
                  }
                })
              }
              count={count}
              count2={usersCount}
              history={history}
            />
          );
        }}
      </Query>
      <Query query={GET_USERS_COUNT} pollInterval={10000}>
        {({ loading, error, data }) => {
          const count = loading || error ? 0 : data.usersCount;

          return <DashCount title="Пользователи" count={count} />;
        }}
      </Query>
      <Query query={GET_CLIPS_COUNT} pollInterval={10000}>
        {({ loading, error, data }) => {
          const count = loading || error ? 0 : data.postsCount;

          return <DashCount title="Клипы" count={count} />;
        }}
      </Query>
    </Box>
  );
};

export default Dashboard;
