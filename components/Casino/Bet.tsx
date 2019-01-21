import gql from 'graphql-tag';
import { lighten } from 'polished';
import { FC } from 'react';
import { Query } from 'react-apollo';
import styled from '../../theme';

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
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 10px 0;
  width: 100%;
  font-size: 15px;
`;

const Name = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  padding: 0 10px;
  color: ${({ theme }) => lighten(0.3, theme.main1Color)};
`;

const Count = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  padding: 0 10px;
`;

interface IProps {
  bet: any;
}

const Bet: FC<IProps> = ({ bet }) => (
  <Query query={GET_USER} variables={{ id: bet.userId }}>
    {({ loading, error, data }) => {
      if (loading || error) {
        return null;
      }

      if (!data || !data.user) {
        return 'user not found';
      }

      const user = data.user;

      return (
        <Box>
          <Name>{user.mainProfile.name}</Name>
          <Count>{bet.count}</Count>
        </Box>
      );
    }}
  </Query>
);

export default Bet;
