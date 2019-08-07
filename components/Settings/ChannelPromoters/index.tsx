import gql from 'graphql-tag';
import { lighten } from 'polished';
import { createRef, FC } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import ChannelPromotersProvider from '../../../providers/ChannelPromoters';
import { Input, Button } from '../../../ui';
import ChannelPromoter from './ChannelPromoter';
import { TopStreams } from '../../TopStreams';
import { parseTwitchChannelName } from '../../../utils/parseTwitchChannelName';
import { Access } from '../../../providers/Access';
import { HowTo } from './HowTo';

const CREATE_CHANNEL = gql`
  mutation createChannelPromoter($channelName: String!) {
    createChannelPromoter(channelName: $channelName) {
      id
    }
  }
`;

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

const BlockTitle = styled.div`
  background: ${({ theme }) => theme.dark2Color};
  color: ${({ theme }) => lighten(0.5, theme.dark2Color)};
  padding: 0 20px;
  height: 44px;
  display: flex;
  align-items: center;
  font-size: 13px;
  border-radius: 4px;
  overflow: hidden;
`;

const ChannelsBox = styled.div`
  overflow: hidden;
`;

const ChannelBox = styled.div`
  background: ${({ theme }) => theme.dark2Color};
  margin: 16px 0;
  border-radius: 4px;
  overflow: hidden;
`;

const AddStreamForm = styled.div`
  background: ${({ theme }) => theme.dark2Color};
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;

  input {
    margin-right: 20px;
  }
`;

const ChannelPromotersList = ({ channelPromoters }) => {
  const textInput = createRef<HTMLInputElement>();

  return (
    <>
      <BlockTitle>Каналы {channelPromoters.length} из 6</BlockTitle>
      <ChannelsBox>
        {channelPromoters.map(({ id }) => (
          <ChannelBox key={id}>
            <ChannelPromoter channelPromoterId={id} />
          </ChannelBox>
        ))}
      </ChannelsBox>
      {channelPromoters.length < 6 && (
        <Mutation mutation={CREATE_CHANNEL}>
          {createChannelPromoter => {
            const addChannel = () => {
              const channelName = parseTwitchChannelName(
                textInput.current.value.trim()
              );

              if (!channelName || channelName.length <= 0) {
                return;
              }

              createChannelPromoter({
                variables: { channelName }
              });

              textInput.current.value = '';
            };

            return (
              <AddStreamForm>
                <Access
                  denyContent={
                    <Input
                      disabled
                      placeholder={`Войдите чтобы добавить канал для продвижения`}
                    />
                  }
                >
                  <>
                    <Input
                      autoFocus
                      ref={textInput}
                      placeholder={`Название или ссылка на twitch канал`}
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          addChannel();
                        }
                      }}
                    />
                    <Button onClick={addChannel}>Добавить</Button>
                  </>
                </Access>
              </AddStreamForm>
            );
          }}
        </Mutation>
      )}
    </>
  );
};

export const ChannelPromotersManage: FC = () => (
  <Box>
    <Left>
      <HowTo />
      <Access denyContent={<ChannelPromotersList channelPromoters={[]} />}>
        <ChannelPromotersProvider>
          {({ channelPromoters }) => (
            <ChannelPromotersList channelPromoters={channelPromoters} />
          )}
        </ChannelPromotersProvider>
      </Access>
    </Left>
    <Right>
      <TopStreams position="column" max={3} noAddStream />
    </Right>
  </Box>
);
