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
  padding: 8px 14px;
  margin: 10px 0;
  background: ${({ theme }) => darken(0.04, theme.dark2Color)};
  border-radius: 8px;
`;

const Amount = styled.div`
  font-size: 13px;
  padding: 0 5px;
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
  100: 0,
  500: 5,
  1000: 10,
  5000: 20,
  10000: 30,
  25000: 50
};

export const BuyCoins = () => (
  <Box>
    <PercentComment>
      * Цены указаны без учета комиссий платежных систем
    </PercentComment>
    {Object.keys(realCoinPacks).map(amount => (
      <CoinPackBox key={amount}>
        <CoinIconGreen />
        <Amount>{humanNumbers(parseInt(amount, 10))}</Amount>
        <Sale>
          {realCoinPacks[amount] > 0 && `Скидка ${realCoinPacks[amount]}%`}
        </Sale>
        <BuyLink
          href={`${config.apiUrl}robokassa/buy/real/${amount}`}
          target="_blank"
        >
          <Button>
            {humanNumbers(
              parseInt(amount, 10) -
                (parseInt(amount, 10) / 100) * realCoinPacks[amount]
            )}{' '}
            ₽
          </Button>
        </BuyLink>
      </CoinPackBox>
    ))}
  </Box>
);
