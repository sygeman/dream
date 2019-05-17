import gql from 'graphql-tag';
import { lighten } from 'polished';
import { createRef, FC } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import ChannelPromoterProvider from '../../../providers/ChannelPromoter';
import ChannelPromotersProvider from '../../../providers/ChannelPromoters';
import { Input, Button } from '../../../ui';
import ChannelPromoter from './ChannelPromoter';
import { parseTwitchChannelName } from '../../../utils/parseTwitchChannelName';

const CREATE_CHANNEL = gql`
  mutation createChannelPromoter($channelName: String!) {
    createChannelPromoter(channelName: $channelName) {
      id
    }
  }
`;

const Box = styled.div`
  margin: 0 auto;
  max-width: 800px;
  margin-top: 10px;
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

export const ChannelPromotersManage: FC = () => {
  const textInput = createRef<HTMLInputElement>();

  return (
    <Box>
      <ChannelPromotersProvider>
        {({ channelPromoters }) => (
          <>
            <BlockTitle>Каналы {channelPromoters.length} из 6</BlockTitle>
            <ChannelsBox>
              {channelPromoters.map(({ id }) => (
                <ChannelBox key={id}>
                  <ChannelPromoterProvider id={id}>
                    {({ channelPromoter }) => (
                      <ChannelPromoter channelPromoter={channelPromoter} />
                    )}
                  </ChannelPromoterProvider>
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

                    if (channelName.length <= 0) {
                      return;
                    }

                    createChannelPromoter({
                      variables: { channelName }
                    });

                    textInput.current.value = '';
                  };

                  return (
                    <AddStreamForm>
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
                    </AddStreamForm>
                  );
                }}
              </Mutation>
            )}
          </>
        )}
      </ChannelPromotersProvider>
    </Box>
  );
};
