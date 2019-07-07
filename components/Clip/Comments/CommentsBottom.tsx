import gql from 'graphql-tag';
import { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { Access } from '../../../helpers/Access';
import { convertTextToEmojiCode } from '../../../utils/emoji';

const CREATE_CLIP_COMMENT = gql`
  mutation createClipComment($input: ClipCommentCreateInput!) {
    createClipComment(input: $input)
  }
`;

const CommentsBottom = styled.div`
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
  clipId: string;
}

export default class extends Component<IProps> {
  public textInput: any;
  public lock: boolean = false;

  public render() {
    const { clipId } = this.props;

    return (
      <CommentsBottom>
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
            mutation={CREATE_CLIP_COMMENT}
            onCompleted={({ createClipComment }) => {
              if (createClipComment) {
                this.textInput.value = '';
                this.lock = false;
              }
            }}
          >
            {createClipComment => (
              <input
                ref={input => {
                  this.textInput = input;
                }}
                maxLength={500}
                type="text"
                placeholder="Написать комментарий..."
                onKeyPress={e => {
                  const content = convertTextToEmojiCode(
                    this.textInput.value.trim()
                  );

                  if (e.key === 'Enter' && !this.lock && content.length > 0) {
                    this.lock = true;
                    createClipComment({
                      variables: { input: { clipId, content } }
                    });
                  }
                }}
              />
            )}
          </Mutation>
        </Access>
      </CommentsBottom>
    );
  }
}
