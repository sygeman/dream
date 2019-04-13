import styled from 'styled-components';

const CoinIcon = styled.div`
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

export const CoinIconGold = styled(CoinIcon)`
  border-color: #a48b3f;
`;

export const CoinIconGreen = styled(CoinIcon)`
  border-color: #3fa447;
`;
