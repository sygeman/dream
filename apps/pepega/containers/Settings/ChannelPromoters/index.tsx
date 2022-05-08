import { FC } from 'react';
import styled from 'styled-components';
import { TopStreams } from 'src/containers/TopStreams';
import { useAccess } from '../../../utils/useAccess';
import { HowTo } from './HowTo';
import { ChannelPromotersList } from './List';
import { ChannelPromotersWithData } from './WIthData';

const Box = styled.div`
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  max-width: 1200px;
`;

const Left = styled.div`
  flex: 1;
  padding: 0 20px;
`;

const Right = styled.div`
  width: 320px;
  margin-right: 10px;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export const ChannelPromotersManage: FC = () => {
  const [{ allow: isAllow }] = useAccess();

  return (
    <Box>
      <Left>
        <HowTo />
        {!isAllow ? (
          <ChannelPromotersList channelPromoters={[]} />
        ) : (
          <ChannelPromotersWithData />
        )}
      </Left>
      <Right>
        <TopStreams position="column" max={3} noAddStream />
      </Right>
    </Box>
  );
};
