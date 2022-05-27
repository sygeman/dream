import Link from 'next/link';
import { lighten } from 'polished';
import styled from 'styled-components';
import {
  Button,
  CoinIconGold,
  CoinIconGreen,
} from '@dream/pepega/components-old';
import { useRouter } from 'next/router';
import { useAccess } from '@dream/pepega/utils-old';
import { WalletBalance } from './WalletBalance';
import { LeftNavMenuUserBlock } from './UserBlock';
import { AddCircleOutline as AddCircleOutlineIcon } from 'styled-icons/material/AddCircleOutline';

const AddClip = () => {
  const router = useRouter();
  const [{ allow: isUser, loading }] = useAccess();

  if (loading) return null;

  return (
    <div className="flex w-full">
      <Link
        as={isUser ? `/newClip` : `/auth?continue=/newClip`}
        href={{
          pathname: router.route,
          query: {
            ...router.query,
            [isUser ? 'newClip' : 'authModal']: 1,
          },
        }}
        passHref
      >
        <Button className="w-full font-medium">Предложить клип</Button>
      </Link>
    </div>
  );
};

const Box = styled.div`
  background: ${({ theme }) => lighten(0.05, '#262841')};
  overflow: hidden;
  min-height: 84px;
`;

const GuestBox = styled.div`
  background: ${({ theme }) => lighten(0.05, '#262841')};
  overflow: hidden;
  min-height: 42px;
`;

const PointsCount = styled.div`
  color: ${({ theme }) => lighten(0.4, '#6441A4')};
  font-size: 13px;
  font-weight: 500;
  display: flex;
`;

const PointsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 42px;
  background: ${({ theme }) => '#262841'};
  padding: 1px 0;
`;

const Points = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  height: 100%;
  width: 100%;
  background: ${({ theme }) => lighten(0.05, '#262841')};
`;

const BuyCoinsLink = styled.a`
  margin-left: 10px;
  color: ${({ theme }) => lighten(0.4, '#262841')};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  cursor: pointer;

  i {
    font-size: 17px;
  }
`;

const TopLink = styled.a`
  padding: 0 10px;
  color: ${({ theme }) => lighten(0.65, '#262841')};
  font-size: 11.7px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 42px;
  width: 100%;
  text-transform: uppercase;

  :hover {
    color: ${({ theme }) => lighten(0.6, '#968A9D')};
  }
`;

export const UserBox = () => {
  const router = useRouter();
  const [{ allow: isUser, loading }] = useAccess();

  if (loading || !isUser) {
    return (
      <GuestBox>
        <AddClip />
        <a href={`/api/auth/twitch?continue=/`}>
          <TopLink>Войти</TopLink>
        </a>
      </GuestBox>
    );
  }

  return (
    <Box>
      <AddClip />
      <PointsBox>
        <Points>
          <CoinIconGold />
          <PointsCount>
            <WalletBalance currency="coin" />
          </PointsCount>
        </Points>
        {/* <Points>
          <CoinIconGreen />
          <PointsCount>
            <WalletBalance currency="real" />
            <Link
              as={`/buycoins`}
              href={{
                pathname: router.route,
                query: {
                  ...router.query,
                  buyCoinsModal: 1,
                },
              }}
              passHref
            >
              <BuyCoinsLink>
                <AddCircleOutlineIcon size="16px" />
              </BuyCoinsLink>
            </Link>
          </PointsCount>
        </Points> */}
      </PointsBox>
      <LeftNavMenuUserBlock />
    </Box>
  );
};
