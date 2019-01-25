import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { convertTextToEmojiCode } from '../../utils/emoji';
import Access from '../Access';

const CREATE_COMMENT = gql`
  mutation($postId: ID!, $text: String!) {
    createComment(postId: $postId, text: $text)
  }
`;

const MessagesBottom = styled.div`
  height: 60px;
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
  postId: string;
}

export default class extends React.Component<IProps> {
  public textInput: any;
  public lock: boolean = false;

  public render() {
    const { postId } = this.props;

    return (
      <MessagesBottom>
        <Access
          denyContent={
            <input
              disabled
              type="text"
              placeholder="Войдите чтобы писать комментарии"
            />
          }
        >
          <Mutation
            mutation={CREATE_COMMENT}
            onCompleted={({ createComment }) => {
              if (createComment) {
                this.textInput.value = '';
                this.lock = false;
              }
            }}
          >
            {createComment => (
              <>
                <input
                  ref={input => {
                    this.textInput = input;
                  }}
                  maxLength={500}
                  type="text"
                  placeholder="Написать комментарий..."
                  onKeyPress={e => {
                    const text = convertTextToEmojiCode(
                      this.textInput.value.trim()
                    );

                    if (e.key === 'Enter' && !this.lock && text.length > 0) {
                      this.lock = true;
                      createComment({
                        variables: { postId, text }
                      });
                    }
                  }}
                />
              </>
            )}
          </Mutation>
        </Access>
      </MessagesBottom>
    );
  }
}
