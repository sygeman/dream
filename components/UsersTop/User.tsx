import gql from 'graphql-tag';
import Link from 'next/link';
import { darken, lighten } from 'polished';
import { FC } from 'react';
import { Query } from 'react-apollo';
import styled from '../../theme';
import { humanNumbers } from '../../utils/count';

const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      mainProfile {
        id
        name
        avatar
      }
    }
  }
`;

const Box = styled.div`
  margin: 14px 0;
  padding: 0 5px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => lighten(0.05, theme.dark2Color)};
`;

const Order = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 100%;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.accent2Color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -3px 5px;
  border: 3px solid ${({ theme }) => lighten(0.2, theme.dark2Color)};
  border-radius: 100%;
`;

const AvatarImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  cursor: pointer;
`;

const Name = styled.div`
  font-size: 12px;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ theme }) => darken(0.1, theme.text1Color)};
  margin: 0 5px;
  flex: 1;
  text-align: left;
  cursor: pointer;
`;

const Points = styled.div`
  font-size: 12px;
  margin: 0 5px;
  font-weight: 500;
  color: ${({ theme }) => theme.accent2Color};
`;

interface IProps {
  id: string;
  order: number;
  points: number;
}

const User: FC<IProps> = ({ id, order, points }) => (
  <Query query={GET_USER} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading || error || !data || !data.user || !data.user.mainProfile) {
        return null;
      }

      return (
        <Box>
          <Order>{order}</Order>
          <Avatar>
            <Link href={`user?id=${data.user.id}`}>
              <AvatarImg src={data.user.mainProfile.avatar} />
            </Link>
          </Avatar>
          <Link href={`user?id=${data.user.id}`}>
            <Name>{data.user.mainProfile.name}</Name>
          </Link>
          <Points>{humanNumbers(points)}</Points>
        </Box>
      );
    }}
  </Query>
);

export default User;
