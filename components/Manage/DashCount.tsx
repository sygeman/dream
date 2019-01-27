import { darken } from 'polished';
import { FC } from 'react';
import { Line } from 'react-chartjs-2';
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
  xData?: any[];
  yData?: any[];
  y2Data?: any[];
}

export const DashCount: FC<IProps> = ({
  title,
  count,
  count2,
  chart,
  xData,
  yData,
  y2Data
}) => (
  <Box>
    <Left>
      <Title>{title}</Title>
      <Value>{humanNumbers(count)}</Value>
      {typeof count2 === 'number' && <Value2>{humanNumbers(count2)}</Value2>}
    </Left>
    {chart && (
      <Right>
        <Line
          data={{
            labels: xData,
            datasets: [
              {
                label: 'All Online',
                data: yData,
                type: 'line',
                pointRadius: 2,
                borderColor: '#fff',
                pointBorderColor: 'transparent',
                backgroundColor: 'transparent',
                borderWidth: 2
              },
              {
                label: 'Users Online',
                data: y2Data,
                pointRadius: 2,
                type: 'line',
                borderColor: '#888',
                pointBorderColor: 'transparent',
                backgroundColor: 'transparent',
                borderWidth: 2
              }
            ]
          }}
          legend={{
            display: false
          }}
          options={{
            elements: {
              backgroundColor: 'transparent'
            },
            responsive: true,
            scales: {
              xAxes: [
                {
                  type: 'time',
                  distribution: 'series',
                  display: false,
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    display: false
                  }
                }
              ],
              yAxes: [
                {
                  display: false,
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
      </Right>
    )}
  </Box>
);

export default DashCount;
