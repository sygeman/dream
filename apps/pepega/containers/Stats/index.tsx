import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { humanNumbers } from '../../utils/count';
import { FC } from 'react';
import { Flex } from '../../components';
import { useRouter } from 'next/router';

const GET_TOP_USERS = gql`
  query usersTopByCoins {
    usersTopByCoins {
      id
      user {
        id
        avatar
        name
      }
      count
    }
  }
`;

const TopUser: FC<{
  position: number;
  avatar: string;
  name: string;
  count: number;
}> = ({ position, avatar, name, count }) => {
  return (
    <Flex p="4px 0" alignItems="center">
      <Flex
        alignItems="center"
        justifyContent="flex-end"
        minWidth="40px"
        p="0 16px"
        color="accent"
        fontSize="14px"
      >
        {position}
      </Flex>
      <Flex p="0 16px">
        <Flex height="40px" width="40px" borderRadius="100%" overflow="hidden">
          <img src={avatar} height="100%" width="100%" />
        </Flex>
      </Flex>
      <Flex flexDirection="column">
        <Flex fontSize="14px">{name}</Flex>
        <Flex fontSize="13px" color="accent">
          {humanNumbers(count)}
        </Flex>
      </Flex>
    </Flex>
  );
};

export const Stats = () => {
  const router = useRouter();
  const { data, loading } = useQuery(GET_TOP_USERS, { pollInterval: 10000 });

  if (loading || !data || !data.usersTopByCoins) {
    return null;
  }

  return (
    <div>
      {data.usersTopByCoins.map(({ id, user, count }, index) => (
        <Flex
          key={id}
          onClick={() => router.push(`/user?id=${user.id}`)}
          style={{ cursor: 'pointer' }}
        >
          <TopUser
            position={index + 1}
            avatar={user.avatar}
            name={user.name}
            count={count}
          />
        </Flex>
      ))}
    </div>
  );
};
