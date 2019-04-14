import { darken, lighten } from 'polished';
import styled from 'styled-components';
import config from '../config';
import { Button } from '../ui/Button';
import { CoinIconGreen } from '../ui/CoinIcon';
import { humanNumbers } from '../utils/count';

const Box = styled.div`
  max-width: 500px;
  width: 500px;
`;

const PercentComment = styled.div`
  font-size: 12.5px;
  padding: 10px 5px;
  color: ${({ theme }) => lighten(0.5, theme.dark2Color)};
`;

const CoinPackBox = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin: 8px 0;
  background: ${({ theme }) => darken(0.04, theme.dark2Color)};
  border-radius: 8px;
`;

const Amount = styled.div`
  font-size: 13px;
  padding: 0 4px;
  flex: 1;
`;

const Sale = styled.div`
  font-size: 12px;
  padding: 0 16px;
  color: ${({ theme }) => lighten(0.5, theme.dark2Color)};
`;

const BuyLink = styled.a`
  margin-left: auto;
`;

const realCoinPacks = {
  10: 0,
  100: 3,
  500: 5,
  1000: 10,
  5000: 20,
  10000: 30,
  25000: 50
};

const BuyCoinsPack = ({ packKey }) => {
  const amount = parseInt(packKey, 10);
  const sale = realCoinPacks[amount];
  const link = `${config.apiUrl}robokassa/buy/real/${amount}`;
  const sum = amount - (amount / 100) * realCoinPacks[amount];

  return (
    <CoinPackBox key={amount}>
      <CoinIconGreen />
      <Amount>{humanNumbers(amount)}</Amount>
      <Sale>{sale > 0 && `Скидка ${sale}%`}</Sale>
      <BuyLink href={link}>
        <Button>{humanNumbers(sum)} ₽</Button>
      </BuyLink>
    </CoinPackBox>
  );
};

export const BuyCoins = () => (
  <Box>
    <PercentComment>
      * Цены указаны без учета комиссий платежных систем
    </PercentComment>
    {Object.keys(realCoinPacks).map(packKey => (
      <BuyCoinsPack key={packKey} packKey={packKey} />
    ))}
  </Box>
);
