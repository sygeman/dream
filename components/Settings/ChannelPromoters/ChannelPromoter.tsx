import gql from 'graphql-tag';
import { darken, lighten } from 'polished';
import { FC } from 'react';
import { Mutation } from 'react-apollo';
import styled, { keyframes } from 'styled-components';
import ChannelProvider from '../../../providers/Channel';
import { Button } from '../../../ui/Button';
import { Input } from '../../../ui/Input';
import { SWRow } from '../../../ui/SWRow';

const SET_CHANNEL_PROMOTER_ACTIVE = gql`
  mutation setChannelPromoterActive($id: ID!, $active: Boolean!) {
    setChannelPromoterActive(id: $id, active: $active)
  }
`;

const DELETE_CHANNEL_PROMOTER = gql`
  mutation deleteChannelPromoter($id: ID!) {
    deleteChannelPromoter(where: { id: $id }) {
      id
    }
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
`;

const LiveBox = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 100%;
  background: ${({ theme }) => theme.dark1Color};
  margin: 0 10px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
`;

const LiveDot = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 100%;
  background: #d54141;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: 0.7s ${fadeIn} infinite alternate;
`;

const PointsIcon = styled.div`
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
  margin: 0 10px;
`;

const PointsIconReal = styled(PointsIcon)`
  border-color: #3fa447;
`;

const ChannelHeaderInfo = styled('div')`
  font-size: 13px;
  padding: 0 8px;
  display: flex;
  align-items: center;
`;

const ChannelName = styled.div``;

const ChannelCost = styled.div`
  padding: 0 10px;
  color: ${({ theme }) => lighten(0.5, theme.dark2Color)};
`;

const CostBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: ${({ theme }) => lighten(0.5, theme.dark2Color)};
`;

const CostInputBox = styled.div`
  width: 50px;

  input {
    text-align: center;
    padding: 8px;
    font-size: 12px;
  }
`;

const ChannelPromoterBox = styled('div')``;

const ChannelPromoterHeader = styled('div')`
  padding: 0 10px;
  display: flex;
  align-items: center;
  height: 50px;
  background: ${({ theme }) => lighten(0.1, theme.dark2Color)};
`;

const ChannelPromoterLogo = styled.div`
  font-size: 18px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChannelPromoterHeaderActions = styled.div`
  margin-left: auto;
`;

const ChannelPromoterContent = styled('div')`
  padding: 0 20px;
  border-radius: 0 0 5px 5px;
`;

interface IProps {
  channelPromoter: any;
}

export const ChannelPromoter: FC<IProps> = ({ channelPromoter }) => (
  <ChannelProvider id={channelPromoter.channelId}>
    {({ channel }) => (
      <ChannelPromoterBox>
        <ChannelPromoterHeader>
          <ChannelPromoterLogo>
            <LiveBox>{channel.cost > 0 && channel.live && <LiveDot />}</LiveBox>
          </ChannelPromoterLogo>
          <ChannelHeaderInfo>
            <ChannelName>{channel.name}</ChannelName>
            <ChannelCost>{channel.cost}</ChannelCost>
          </ChannelHeaderInfo>
          <ChannelPromoterHeaderActions>
            <Mutation mutation={DELETE_CHANNEL_PROMOTER}>
              {deleteChannelPromoter => (
                <Button
                  mainColor="#4d517f"
                  onClick={() =>
                    deleteChannelPromoter({
                      variables: { id: channelPromoter.id }
                    })
                  }
                >
                  Удалить
                </Button>
              )}
            </Mutation>
          </ChannelPromoterHeaderActions>
        </ChannelPromoterHeader>
        <ChannelPromoterContent>
          <Mutation mutation={SET_CHANNEL_PROMOTER_ACTIVE}>
            {setChannelPromoterActive => (
              <SWRow
                activeColor={lighten(0.05, '#4d517f')}
                active={channelPromoter.active}
                title={
                  <CostBox>
                    <CostInputBox>
                      <Input defaultValue="1" maxLength={100} disabled />
                    </CostInputBox>
                    <PointsIconReal />в минуту
                  </CostBox>
                }
                onChange={() =>
                  setChannelPromoterActive({
                    variables: {
                      id: channelPromoter.id,
                      active: !channelPromoter.active
                    }
                  })
                }
              />
            )}
          </Mutation>
        </ChannelPromoterContent>
      </ChannelPromoterBox>
    )}
  </ChannelProvider>
);

export default ChannelPromoter;
