import { RouterProps, withRouter } from 'next/router';
import { darken, lighten } from 'polished';
import { Component } from 'react';
import styled from 'styled-components';
import { Avatar } from '../../../ui/Avatar';
import { Button } from '../../../ui/Button';
import { Icon } from '../../../ui/Icon';
import { Modal } from '../../../ui/Modal';
import { humanNumbers } from '../../../utils/count';
import { changeURLParams } from '../../../utils/url';
import CreatePost from '../../CreatePost';
import Menu from './Menu';

const Box = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const UserDataBox = styled.div`
  padding: 0 5px;
  display: flex;
  cursor: pointer;
  align-items: center;
  height: 100%;
`;

const AvatarBox = styled.div`
  padding-left: 14px;
`;

const PointsBox = styled.div`
  display: flex;
  margin: 0 10px;
`;

const Points = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px;
  font-size: 13px;
  background: radial-gradient(
    ${({ theme }) => lighten(0.02, theme.dark2Color)},
    ${({ theme }) => darken(0.02, theme.dark2Color)}
  );
  padding: 0 10px;
  border-radius: 5px;
  height: 32px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const PointsIcon = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 100%;
  background: transparent;
  border: 2px solid;
  margin: 0 10px 0 0;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PointsIconGold = styled(PointsIcon)`
  border-color: #a48b3f;
`;

const PointsIconPepega = styled(PointsIcon)`
  border-color: #3fa447;
`;

const PointsCount = styled.div`
  color: ${({ theme }) => lighten(0.4, theme.main1Color)};
  font-size: 12px;
  font-weight: 500;
`;

const UserNameBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: ${({ theme }) => lighten(0.4, theme.main1Color)};

  @media (max-width: 700px) {
    display: none;
  }
`;

const UserCaratBox = styled.div`
  height: 100%;
  padding: 0 6px;
  display: flex;
  align-items: center;
  font-size: 17px;
`;

interface IProps {
  router: RouterProps;
  user: any;
}

class UserBlockWithoutRouter extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { user, router } = this.props;

    return (
      <Box>
        <Button onClick={() => changeURLParams({ set: { newPost: 1 } })}>
          Закинуть клип
        </Button>
        <Modal
          title="Новый пост"
          isOpen={router.query.newPost === '1'}
          onClose={() => changeURLParams({ remove: ['newPost'] })}
        >
          <CreatePost />
        </Modal>
        <PointsBox>
          <Points>
            <PointsIconGold />
            <PointsCount>{humanNumbers(user.points)}</PointsCount>
          </Points>
          <Points>
            <PointsIconPepega />
            <PointsCount>{humanNumbers(0)}</PointsCount>
          </Points>
        </PointsBox>
        <Menu user={user}>
          <UserDataBox>
            <UserNameBox>{user.mainProfile.name}</UserNameBox>
            <AvatarBox>
              <Avatar avatar={user.mainProfile.avatar} />
            </AvatarBox>
            <UserCaratBox>
              <Icon type="caret-down" />
            </UserCaratBox>
          </UserDataBox>
        </Menu>
      </Box>
    );
  }
}

export default withRouter(UserBlockWithoutRouter);
