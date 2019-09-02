import Link from 'next/link';
import { lighten, rgba } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import { Icon, Button } from '../../../ui';
import { useRouter } from '../../../hooks/useRouter';
import { useAccess } from '../../../hooks/useAccess';

const Box = styled.div`
  height: 42px;
  min-height: 42px;
  display: flex;
  padding: 0 10px;
  background: ${({ theme }) => rgba(theme.dark2Color, 0.9)};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const LeftMenu = styled.div`
  height: 100%;

  @media (max-width: 700px) {
    display: none;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  padding: 0 5px;
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const MenuButton = styled.div`
  height: 100%;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${({ theme }) => lighten(0.3, theme.main1Color)};
  cursor: pointer;

  @media (min-width: 700px) {
    display: none;
  }
`;

const UserBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const NewClipButton = styled(Button)`
  height: 30px;
`;

const TopNavUserBox = () => {
  const router = useRouter();
  const [{ allow: isUser, loading }] = useAccess();

  if (loading) {
    return null;
  }

  return (
    <Links>
      <Link
        as={isUser ? `/newClip` : `/auth?continue=/newClip`}
        href={{
          pathname: router.route,
          query: {
            ...router.query,
            [isUser ? 'newClip' : 'authModal']: 1
          }
        }}
        passHref
      >
        <NewClipButton>Предложить клип</NewClipButton>
      </Link>
    </Links>
  );
};

interface IProps {
  leftMenuTrigger: () => void;
}

const TopNav: FC<IProps> = ({ leftMenuTrigger }) => {
  return (
    <Box>
      <Left>
        <MenuButton onClick={() => leftMenuTrigger()}>
          <Icon type="menu" />
        </MenuButton>
        <LeftMenu></LeftMenu>
      </Left>
      <Right>
        <UserBox>
          <TopNavUserBox />
        </UserBox>
      </Right>
    </Box>
  );
};

export default TopNav;
