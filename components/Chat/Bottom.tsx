import styled from 'styled-components';
import { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Access } from '../../helpers/Access';
import { convertTextToEmojiCode } from '../../utils/emoji';

const CREATE_CHAT_MESSAGE = gql`
  mutation createChatMessage($input: ChatMessageCreateInput!) {
    createChatMessage(input: $input)
  }
`;

const Box = styled.div`
  height: 60px;
  border-top: 1px solid transparent;
  display: flex;
  position: relative;

  input {
    width: calc(100% - 20px);
    padding: 0 30px 0 10px;
    height: 36px;
    color: #fff;
    background: #00000040;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    outline: none;
    margin: auto;
  }
`;

interface IProps {
  chatId: string;
}

export class ChatMessagesBottom extends Component<IProps> {
  public textInput: any;
  public lock: boolean = false;

  public render() {
    const { chatId } = this.props;

    return (
      <Box>
        <Access
          denyContent={
            <input
              disabled
              type="text"
              placeholder="Войдите чтобы писать сообщения"
            />
          }
        >
          <Mutation
            mutation={CREATE_CHAT_MESSAGE}
            onCompleted={({ createChatMessage }) => {
              if (createChatMessage) {
                this.textInput.value = '';
                this.lock = false;
              }
            }}
          >
            {createChatMessage => (
              <input
                autoFocus
                ref={input => {
                  this.textInput = input;
                }}
                maxLength={500}
                type="text"
                placeholder="Написать сообщение..."
                onKeyPress={e => {
                  const text = convertTextToEmojiCode(
                    this.textInput.value.trim()
                  );

                  if (e.key === 'Enter' && !this.lock && text.length > 0) {
                    this.lock = true;
                    createChatMessage({
                      variables: { input: { chatId, text } }
                    });
                  }
                }}
              />
            )}
          </Mutation>
        </Access>
      </Box>
    );
  }
}
