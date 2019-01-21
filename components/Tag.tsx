import gql from 'graphql-tag';
import { rgba } from 'polished';
import { FC } from 'react';
import { Query } from 'react-apollo';
import styled from '../theme';
import { Icon } from '../ui/Icon';

const GET_TAG = gql`
  query tag($id: ID!) {
    tag(id: $id) {
      id
      title
    }
  }
`;

const Box = styled.div`
  padding: 3px 6px;
  margin: 5px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  background: ${({ theme }) => theme.dark2Color};
  cursor: pointer;
`;

const Dot = styled.div`
  height: 14px;
  width: 14px;
  border-radius: 100%;
  margin: 0 10px 0 5px;
  background: ${({ theme }) => rgba(theme.text1Color, 0.8)};

  i {
    align-items: center;
    justify-content: center;
    display: none;
    font-size: 14px;
    color: ${({ theme }) => theme.dark1Color};
  }

  &:hover {
    i {
      display: flex;
    }
  }
`;

interface IProps {
  id: string;
  onClick?: () => void;
  onClickRemoved?: () => void;
}

const Tag: FC<IProps> = ({ id, onClick, onClickRemoved }) => (
  <Query query={GET_TAG} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) {
        return null;
      }

      if (error || !data || !data.tag) {
        return null;
      }

      return (
        <Box onClick={() => onClick && onClick()}>
          <Dot onClick={() => onClickRemoved && onClickRemoved()}>
            {onClickRemoved && <Icon type="close" />}
          </Dot>
          {data.tag.title}
        </Box>
      );
    }}
  </Query>
);

export default Tag;
