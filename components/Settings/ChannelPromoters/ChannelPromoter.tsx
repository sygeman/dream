import gql from 'graphql-tag';
import { lighten } from 'polished';
import { FC } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import ChannelProvider from '../../../providers/Channel';
import { Button, SWRow, Icon, Avatar } from '../../../ui';

const SET_CHANNEL_PROMOTER_ACTIVE = gql`
  mutation setChannelPromoterActive($id: ID!, $active: Boolean!) {
    setChannelPromoterActive(id: $id, active: $active)
  }
`;

const SET_CHANNEL_PROMOTER_COST = gql`
  mutation setChannelPromoterCost($id: ID!, $cost: Int!) {
    setChannelPromoterCost(id: $id, cost: $cost)
  }
`;

const DELETE_CHANNEL_PROMOTER = gql`
  mutation deleteChannelPromoter($id: ID!) {
    deleteChannelPromoter(id: $id) {
      id
    }
  }
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

const ChannelAvatar = styled.div`
  height: 32px;
  width: 32px;
  margin-right: 16px;
  position: relative;
`;

const ChannelName = styled.a``;

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

const CostNumberBox = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => lighten(0.1, theme.dark1Color)};
  border-radius: 10px;
`;

const CostChangeButton = styled.div`
  width: 30px;
  display: flex;
  justify-content: center;
  cursor: pointer;

  i {
    font-size: 14px;
  }
`;

const CostDown = styled(CostChangeButton)``;

const CostUp = styled(CostChangeButton)``;

const CostCurrent = styled.div`
  width: 50px;
  text-align: center;
  padding: 8px;
  background: ${({ theme }) => theme.dark1Color};
  border-radius: 10px;
`;

const ChannelPromoterBox = styled('div')``;

const ChannelPromoterHeader = styled('div')`
  padding: 0 10px;
  display: flex;
  align-items: center;
  height: 50px;
  background: ${({ theme }) => lighten(0.1, theme.dark2Color)};
`;

const ChannelPromoterHeaderActions = styled.div`
  margin-left: auto;

  i {
    font-size: 16px;
  }
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
          <ChannelHeaderInfo>
            <ChannelAvatar>
              <Avatar
                avatar={channel.avatar}
                dot={channel.cost > 0 && channel.live}
                dotColor="#d54141"
              />
            </ChannelAvatar>
            <ChannelName
              target="_blank"
              href={`https://www.twitch.tv/${channel.name}`}
            >
              {channel.name}
            </ChannelName>
            <ChannelCost>{channel.cost}</ChannelCost>
          </ChannelHeaderInfo>
          <ChannelPromoterHeaderActions>
            <Mutation mutation={DELETE_CHANNEL_PROMOTER}>
              {deleteChannelPromoter => (
                <Button
                  mainColor="#393C61"
                  onClick={() =>
                    deleteChannelPromoter({
                      variables: { id: channelPromoter.id }
                    })
                  }
                >
                  <Icon type="close" />
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
                  <Mutation mutation={SET_CHANNEL_PROMOTER_COST}>
                    {setChannelPromoterCost => (
                      <CostBox>
                        <CostNumberBox>
                          <CostDown
                            onClick={() =>
                              setChannelPromoterCost({
                                variables: {
                                  id: channelPromoter.id,
                                  cost: channelPromoter.cost - 1
                                }
                              })
                            }
                          >
                            {channelPromoter.cost > 1 && (
                              <Icon type="minus-circle" />
                            )}
                          </CostDown>
                          <CostCurrent>{channelPromoter.cost}</CostCurrent>
                          <CostUp
                            onClick={() =>
                              setChannelPromoterCost({
                                variables: {
                                  id: channelPromoter.id,
                                  cost: channelPromoter.cost + 1
                                }
                              })
                            }
                          >
                            {channelPromoter.cost < 50 && (
                              <Icon type="plus-circle" />
                            )}
                          </CostUp>
                        </CostNumberBox>
                        <PointsIconReal />в минуту
                      </CostBox>
                    )}
                  </Mutation>
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
