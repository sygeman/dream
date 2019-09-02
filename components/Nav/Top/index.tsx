import Link from 'next/link';
import { darken, lighten, rgba } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import { Icon, CoinIconGold, CoinIconGreen } from '../../../ui';
import { TopNavMenuUserBlock } from './UserBlock';
import { useRouter } from '../../../hooks/useRouter';
import { useAccess } from '../../../hooks/useAccess';
import { WalletBalance } from './WalletBalance';

const Box = styled.div`
  height: 42px;
  min-height: 42px;
  display: flex;
  padding: 0 10px;
  background: ${({ theme }) => rgba(darken(0.1, theme.main1Color), 0.9)};
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

const PointsCount = styled.div`
  color: ${({ theme }) => lighten(0.4, theme.main1Color)};
  font-size: 12px;
  font-weight: 500;
  display: flex;
`;

const UserBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const TopLink = styled.a`
  padding: 0 10px;
  color: ${({ theme }) => lighten(0.3, theme.main1Color)};
  font-size: 11.7px;
  display: flex;
  height: 100%;
  align-items: center;
  cursor: pointer;
  height: 100%;
  text-transform: uppercase;

  :hover {
    color: ${({ theme }) => lighten(0.6, theme.main1Color)};
  }
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
  background: ${({ theme }) => theme.dark2Color};
  padding: 0 10px;
  border-radius: 5px;
  height: 30px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const BuyCoinsLink = styled.a`
  margin-left: 10px;
  color: ${({ theme }) => lighten(0.3, theme.main1Color)};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  cursor: pointer;

  i {
    font-size: 15px;
  }
`;

const TopNavUserBox = () => {
  const router = useRouter();
  const [{ allow: isUser, loading }] = useAccess();

  if (loading) {
    return null;
  }

  if (!isUser) {
    return (
      <Links>
        <Link
          as={`/auth?continue=/newClip`}
          href={{
            pathname: router.route,
            query: {
              ...router.query,
              authModal: 1
            }
          }}
          passHref
        >
          <TopLink>Предложить клип</TopLink>
        </Link>
        <Link
          as={`/auth?continue=${router.asPath}`}
          href={{
            pathname: router.route,
            query: {
              ...router.query,
              authModal: 1
            }
          }}
          passHref
        >
          <TopLink>Войти</TopLink>
        </Link>
      </Links>
    );
  }

  return (
    <>
      <Links>
        <Link
          as={`/newClip`}
          href={{
            pathname: router.route,
            query: {
              ...router.query,
              newClip: 1
            }
          }}
          passHref
        >
          <TopLink>Предложить клип</TopLink>
        </Link>
      </Links>
      <PointsBox>
        <Points>
          <CoinIconGold />
          <PointsCount>
            <WalletBalance currency="coin" />
          </PointsCount>
        </Points>
        <Points>
          <CoinIconGreen />
          <PointsCount>
            <WalletBalance currency="real" />
            <Link
              as={`/buycoins`}
              href={{
                pathname: router.route,
                query: {
                  ...router.query,
                  buyCoinsModal: 1
                }
              }}
              passHref
            >
              <BuyCoinsLink>
                <Icon type="plus-circle" />
              </BuyCoinsLink>
            </Link>
          </PointsCount>
        </Points>
      </PointsBox>
      <TopNavMenuUserBlock />
    </>
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
