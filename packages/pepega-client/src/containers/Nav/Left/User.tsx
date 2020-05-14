import Link from 'next/link';
import { lighten } from 'polished';
import styled from 'styled-components';
import { CoinIconGold, CoinIconGreen } from 'src/components';
import { useRouter } from 'next/router';
import { useAccess } from 'src/hooks/useAccess';
import { WalletBalance } from './WalletBalance';
import { LeftNavMenuUserBlock } from './UserBlock';
import { AddCircleOutline as AddCircleOutlineIcon } from 'styled-icons/material/AddCircleOutline';

const Box = styled.div`
  background: ${({ theme }) => lighten(0.05, theme.colors.surface)};
  overflow: hidden;
  min-height: 84px;
`;

const GuestBox = styled.div`
  background: ${({ theme }) => lighten(0.05, theme.colors.surface)};
  overflow: hidden;
  min-height: 42px;
`;

const PointsCount = styled.div`
  color: ${({ theme }) => lighten(0.4, theme.colors.primary)};
  font-size: 13px;
  font-weight: 500;
  display: flex;
`;

const PointsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 42px;
  background: ${({ theme }) => theme.colors.surface};
  padding: 1px 0;
`;

const Points = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  height: 100%;
  width: 119.5px;
  background: ${({ theme }) => lighten(0.05, theme.colors.surface)};
`;

const BuyCoinsLink = styled.a`
  margin-left: 10px;
  color: ${({ theme }) => lighten(0.4, theme.colors.surface)};
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
  color: ${({ theme }) => lighten(0.65, theme.colors.surface)};
  font-size: 11.7px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 42px;
  width: 100%;
  text-transform: uppercase;

  :hover {
    color: ${({ theme }) => lighten(0.6, theme.colors.accent)};
  }
`;

export const UserBox = () => {
  const router = useRouter();
  const [{ allow: isUser, loading }] = useAccess();

  if (loading || !isUser) {
    return (
      <GuestBox>
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
      </GuestBox>
    );
  }

  return (
    <Box>
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
                <AddCircleOutlineIcon size="16px" />
              </BuyCoinsLink>
            </Link>
          </PointsCount>
        </Points>
      </PointsBox>
      <LeftNavMenuUserBlock />
    </Box>
  );
};
