import format from 'date-fns/format';
import gql from 'graphql-tag';
import { lighten } from 'polished';
import { FC } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';

const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      role
      mainProfile {
        id
        name
        avatar
      }
    }
  }
`;

const Box = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`;

const Time = styled.div`
  padding: 0 10px;
  color: ${({ theme }) => lighten(0.3, theme.main1Color)};
`;

const User = styled.div`
  min-width: 200px;
  padding: 0 10px;
`;

const Reward = styled.div`
  min-width: 100px;
  padding: 0 10px;
  display: flex;
  justify-content: flex-end;
  /* background: ${({ theme }) => theme.dark1Color}; */
`;

interface IProps {
  game: any;
}

const GameHistory: FC<IProps> = ({ game }) => (
  <Query query={GET_USER} variables={{ id: game.winnerId }}>
    {({ loading, error, data }) => {
      if (loading || error) {
        return null;
      }

      if (!data || !data.user) {
        return 'user not found';
      }

      const date = parseInt(game.endedAt, 10);

      return (
        <Box>
          <Time>{format(date, 'HH:mm')}</Time>
          <User>{data.user.mainProfile.name} </User>
          <Reward>+{game.betsSum}</Reward>
        </Box>
      );
    }}
  </Query>
);

export default GameHistory;
