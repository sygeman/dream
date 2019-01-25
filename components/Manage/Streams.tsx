import gql from 'graphql-tag';
import { createRef, FC } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { Input } from '../../ui/Input';
import Streams from '../Streams';

const ADD_STREAM = gql`
  mutation addStream($channel: String!) {
    addStream(channel: $channel) {
      channel
    }
  }
`;

const Box = styled.div`
  margin: 0 auto;
  width: 800px;
  margin-top: 70px;
  border-radius: 5px;
  overflow: hidden;
`;

const AddStreamForm = styled.div`
  margin-top: 2px;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.dark2Color};
`;

const StreamsManage: FC = () => {
  const textInput = createRef<HTMLInputElement>();

  return (
    <Box>
      <Streams manage />
      <AddStreamForm>
        <Mutation mutation={ADD_STREAM}>
          {addStream => (
            <Input
              autoFocus
              ref={textInput}
              placeholder="Введите название Twitch канала и нажмите Enter"
              onKeyPress={e => {
                const channel = textInput.current.value.trim();

                if (e.key === 'Enter' && channel.length > 0) {
                  addStream({ variables: { channel } });
                  textInput.current.value = '';
                }
              }}
            />
          )}
        </Mutation>
      </AddStreamForm>
    </Box>
  );
};

export default StreamsManage;
