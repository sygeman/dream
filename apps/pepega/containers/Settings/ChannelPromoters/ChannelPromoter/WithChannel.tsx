import gql from 'graphql-tag';
import { useEffect } from 'react';
import { lighten } from 'polished';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, SWRow, Avatar } from '../../../../components';
import { useRouter } from 'next/router';
import {
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from 'styled-icons/material';

const GET_CHANNEL = gql`
  query channel($where: ChannelWhereUniqueInput!) {
    channel(where: $where) {
      id
      name
      title
      avatar
      live
      cost
    }
  }
`;

const UPDATED_CHANNEL = gql`
  subscription channel($id: ID!) {
    channel(id: $id) {
      id
      name
      title
      avatar
      live
      cost
    }
  }
`;

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

const CostChangeButton = styled.div`
  width: 30px;
  display: flex;
  justify-content: center;
  cursor: pointer;

  i {
    font-size: 14px;
  }
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
  color: ${({ theme }) => lighten(0.5, theme.colors.surface)};
`;

const CostBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: ${({ theme }) => lighten(0.5, theme.colors.surface)};
`;

const CostNumberBox = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => lighten(0.1, theme.colors.background)};
  border-radius: 10px;
`;

const CostDown = styled(CostChangeButton)``;

const CostUp = styled(CostChangeButton)``;

const CostCurrent = styled.div`
  width: 50px;
  text-align: center;
  padding: 8px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
`;

const ChannelPromoterBox = styled('div')``;

const ChannelPromoterHeader = styled('div')`
  padding: 0 10px;
  display: flex;
  align-items: center;
  height: 50px;
  background: ${({ theme }) => lighten(0.1, theme.colors.surface)};
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

export const ChannelPromoterWithChannel = ({ channelPromoter }) => {
  const router = useRouter();

  const { loading, error, data, subscribeToMore } = useQuery(GET_CHANNEL, {
    variables: { where: { id: channelPromoter.channelId } },
  });

  const [deleteChannelPromoter] = useMutation(DELETE_CHANNEL_PROMOTER);
  const [setChannelPromoterActive] = useMutation(SET_CHANNEL_PROMOTER_ACTIVE, {
    onError: () => {
      router.push(
        {
          pathname: router.route,
          query: {
            ...router.query,
            buyCoinsModal: 1,
          },
        },
        `/buycoins`,
        { shallow: true }
      );
    },
  });
  const [setChannelPromoterCost] = useMutation(SET_CHANNEL_PROMOTER_COST);

  useEffect(() => {
    subscribeToMore({
      document: UPDATED_CHANNEL,
      variables: { id: channelPromoter.channelId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        return {
          ...prev,
          channel: {
            ...prev.channel,
            ...subscriptionData.data.channel,
          },
        };
      },
    });
  }, []);

  if (loading || error) {
    return null;
  }

  const channel = data.channel;

  return (
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
          <Button
            mainColor="#393C61"
            onClick={() =>
              deleteChannelPromoter({
                variables: { id: channelPromoter.id },
              })
            }
          >
            <CloseIcon size="18px" />
          </Button>
        </ChannelPromoterHeaderActions>
      </ChannelPromoterHeader>
      <ChannelPromoterContent>
        <SWRow
          activeColor={lighten(0.05, '#4d517f')}
          active={channelPromoter.active}
          title={
            <CostBox>
              <CostNumberBox>
                <CostDown
                  onClick={() =>
                    setChannelPromoterCost({
                      variables: {
                        id: channelPromoter.id,
                        cost: channelPromoter.cost - 1,
                      },
                    })
                  }
                >
                  {channelPromoter.cost > 1 && <RemoveIcon size="16px" />}
                </CostDown>

                <CostCurrent>{channelPromoter.cost}</CostCurrent>
                <CostUp
                  onClick={() =>
                    setChannelPromoterCost({
                      variables: {
                        id: channelPromoter.id,
                        cost: channelPromoter.cost + 1,
                      },
                    })
                  }
                >
                  {channelPromoter.cost < 50 && <AddIcon size="16px" />}
                </CostUp>
              </CostNumberBox>
              <PointsIconReal />в минуту
            </CostBox>
          }
          onChange={() =>
            setChannelPromoterActive({
              variables: {
                id: channelPromoter.id,
                active: !channelPromoter.active,
              },
            })
          }
        />
      </ChannelPromoterContent>
    </ChannelPromoterBox>
  );
};
