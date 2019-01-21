import gql from 'graphql-tag';
import { darken, lighten } from 'polished';
import { FC } from 'react';
import { Query } from 'react-apollo';
import styled from '../../theme';
import User from './User';

const GET_USERS_TOP = gql`
  query usersTopDay {
    usersTopDay {
      userId
      count
    }
  }
`;

const Box = styled.div`
  background: radial-gradient(
    ${({ theme }) => lighten(0.02, theme.dark2Color)},
    ${({ theme }) => darken(0.02, theme.dark2Color)}
  );
  border-radius: 5px;
  overflow: hidden;
  min-width: 150px;
  min-height: 100px;
`;

const Header = styled.div`
  background: ${({ theme }) => theme.main1Color};
  font-size: 12px;
  padding: 12px 0;
  text-align: center;
  text-transform: uppercase;
`;

const Users = styled.div`
  padding: 4px 12px;
`;

const UsersTop: FC = () => (
  <Query query={GET_USERS_TOP} pollInterval={60000}>
    {({ loading, error, data }) => {
      if (loading || error || !data) {
        return null;
      }

      return (
        <Box>
          <Header>Топ Пользователей за 24 часа</Header>
          <Users>
            {data.usersTopDay.map((user, i) => (
              <User
                key={user.userId}
                order={i + 1}
                id={user.userId}
                points={user.count}
              />
            ))}
          </Users>
        </Box>
      );
    }}
  </Query>
);

export default UsersTop;
