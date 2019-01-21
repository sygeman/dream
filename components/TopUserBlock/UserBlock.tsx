import { RouterProps, withRouter } from 'next/router';
import { darken, lighten } from 'polished';
import { Component } from 'react';
import CreatePost from '../../components/CreatePost';
import Profile from '../../components/Profile';
import styled from '../../theme';
import { Button } from '../../ui/Button';
import { Icon } from '../../ui/Icon';
import { Modal, ModalFull } from '../../ui/Modal';
import { humanNumbers } from '../../utils/count';
import { changeURLParams } from '../../utils/url';
import Avatar from '../Avatar';
import Menu from './Menu';

const Box = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const UserDataBox = styled.div`
  padding: 0 10px;
  display: flex;
  cursor: pointer;
  align-items: center;
  height: 100%;
`;

const AvatarBox = styled.div`
  padding-left: 14px;
`;

const UserPoints = styled.div`
  display: flex;
  align-items: center;
  margin: 0 20px;
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

const UserPointsIcon = styled.div`
  height: 18px;
  width: 18px;
  border-radius: 100%;
  background: transparent;
  border: 2px solid #a48b3f;
  margin: 0 10px 0 5px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${() => lighten(0.3, '#a48b3f')};
`;

const UserPointsCount = styled.div`
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
        <UserPoints>
          <UserPointsIcon>$</UserPointsIcon>
          <UserPointsCount>{humanNumbers(user.points)}</UserPointsCount>
        </UserPoints>
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
        <ModalFull isOpen={router.query.profile === '1'}>
          <Profile onClose={() => changeURLParams({ remove: ['profile'] })} />
        </ModalFull>
      </Box>
    );
  }
}

export default withRouter(UserBlockWithoutRouter);
