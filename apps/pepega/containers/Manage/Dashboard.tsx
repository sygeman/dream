import gql from 'graphql-tag';
import { FC } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import DashCount from './DashCount';
import { OnlineCount } from './OnlineCount';

const GET_CONNECTIONS_COUNT = gql`
  query connectionsCount {
    connectionsCount {
      unique
      users
    }
  }
`;
const GET_USERS_COUNT = gql`
  query usersCount {
    usersCount
  }
`;

const GET_CLIPS_COUNT = gql`
  query clipsCount {
    clips {
      count
    }
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

const OnlineStats = () => {
  const { loading, error, data } = useQuery(GET_CONNECTIONS_COUNT, {
    pollInterval: 3000,
  });

  if (loading || error || !data) {
    return null;
  }

  const { unique, users } = data.connectionsCount;

  return <OnlineCount unique={unique} users={users} />;
};

const UsersStats = () => {
  const { loading, error, data } = useQuery(GET_USERS_COUNT, {
    pollInterval: 10000,
  });
  const count = loading || error ? 0 : data.usersCount;

  return <DashCount title="Пользователи" count={count} />;
};

const ClipsStats = () => {
  const { loading, error, data } = useQuery(GET_CLIPS_COUNT, {
    pollInterval: 10000,
  });
  const count = loading || error || !data ? 0 : data.clips.count;

  return <DashCount title="Клипы" count={count} />;
};

const Dashboard: FC = () => (
  <Box>
    <OnlineStats />
    <UsersStats />
    <ClipsStats />
  </Box>
);

export default Dashboard;
