import { darken } from 'polished';
import { FC } from 'react';
import { Line, LineChart } from 'recharts';
import styled from 'styled-components';
import { humanNumbers } from '../../utils/count';

const Box = styled.div`
  border-radius: 5px;
  overflow: hidden;
  min-width: 150px;
  height: 100px;
  text-align: left;
  display: flex;
`;

const Left = styled.div`
  background: ${({ theme }) => theme.dark2Color};
  align-items: center;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const Right = styled.div`
  background: ${({ theme }) => darken(0.05, theme.main1Color)};
  display: flex;
  align-items: center;
  padding: 60px 10px;
  position: relative;
`;

const Title = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  color: ${({ theme }) => darken(0.4, theme.text1Color)};
  margin-bottom: 5px;
`;

const Value = styled.div`
  font-size: 18px;
`;

const Value2 = styled.div`
  font-size: 13px;
  margin-bottom: 3px;
  color: ${({ theme }) => darken(0.4, theme.text1Color)};
`;

interface IProps {
  title: string;
  count: number;
  count2?: number;
  chart?: boolean;
  history?: any[];
}

export const DashCount: FC<IProps> = ({
  title,
  count,
  count2,
  chart,
  history
}) => (
  <Box>
    <Left>
      <Title>{title}</Title>
      <Value>{humanNumbers(count)}</Value>
      {typeof count2 === 'number' && <Value2>{humanNumbers(count2)}</Value2>}
    </Left>
    {chart && (
      <Right>
        <LineChart width={150} height={100} data={history}>
          <Line
            type="monotone"
            dataKey="unique"
            stroke="#fff"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#888"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </Right>
    )}
  </Box>
);

export default DashCount;
