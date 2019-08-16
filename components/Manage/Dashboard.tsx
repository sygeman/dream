import gql from 'graphql-tag';
import { FC } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import DashCount from './DashCount';
import { OnlineCount } from './OnlineCount';
import config from '../../config';

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
    postsCount
  }
`;

const MIGRATE_POSTS = gql`
  mutation migratePosts($communityId: ID!) {
    migratePosts(communityId: $communityId)
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

const MigratePosts = () => {
  const [migratePosts] = useMutation(MIGRATE_POSTS);

  return (
    <div>
      <button
        onClick={() =>
          migratePosts({
            variables: { communityId: config.defaultCommunityId }
          })
        }
      >
        MigratePosts
      </button>
    </div>
  );
};

const OnlineStats = () => {
  const { loading, error, data } = useQuery(GET_CONNECTIONS_COUNT, {
    pollInterval: 3000
  });

  if (loading || error || !data) {
    return null;
  }

  const { unique, users } = data.connectionsCount;

  return <OnlineCount unique={unique} users={users} />;
};

const UsersStats = () => {
  const { loading, error, data } = useQuery(GET_USERS_COUNT, {
    pollInterval: 10000
  });
  const count = loading || error ? 0 : data.usersCount;

  return <DashCount title="Пользователи" count={count} />;
};

const ClipsStats = () => {
  const { loading, error, data } = useQuery(GET_CLIPS_COUNT, {
    pollInterval: 10000
  });
  const count = loading || error || !data ? 0 : data.clips.count;
  const count2 = loading || error || !data ? 0 : data.postsCount;

  return <DashCount title="Клипы" count={count} count2={count2} />;
};

const Dashboard: FC = () => (
  <Box>
    <OnlineStats />
    <UsersStats />
    <ClipsStats />
    <MigratePosts />
  </Box>
);

export default Dashboard;
