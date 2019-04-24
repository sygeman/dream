import gql from 'graphql-tag';
import { lighten } from 'polished';
import { createRef, FC } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import ChannelPromoterProvider from '../../../providers/ChannelPromoter';
import ChannelPromotersProvider from '../../../providers/ChannelPromoters';
import { Input } from '../../../ui/Input';
import ChannelPromoter from './ChannelPromoter';

const CREATE_CHANNEL = gql`
  mutation createChannelPromoter($channelName: String!) {
    createChannelPromoter(channelName: $channelName) {
      id
    }
  }
`;

const Box = styled.div`
  margin: 0 auto;
  width: 800px;
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
              <AddStreamForm>
                <Mutation mutation={CREATE_CHANNEL}>
                  {createChannelPromoter => (
                    <Input
                      autoFocus
                      ref={textInput}
                      placeholder={`Введите название Twitch канала и нажмите Enter`}
                      onKeyPress={e => {
                        const channelName = textInput.current.value.trim();

                        if (e.key === 'Enter' && channelName.length > 0) {
                          createChannelPromoter({
                            variables: { channelName }
                          });
                          textInput.current.value = '';
                        }
                      }}
                    />
                  )}
                </Mutation>
              </AddStreamForm>
            )}
          </>
        )}
      </ChannelPromotersProvider>
    </Box>
  );
};
