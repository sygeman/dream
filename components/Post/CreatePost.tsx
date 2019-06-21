import gql from 'graphql-tag';
import Router from 'next/router';
import { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { Button, Input, SWRow, TwitchClipPlayer } from '../../ui';
import { parseSource } from '../../utils/parseSoruce';

const CREATE_POST = gql`
  mutation($input: PostCreateInput!) {
    createPost(input: $input)
  }
`;

const Box = styled.div`
  width: 600px;
`;

const Bottom = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

interface IState {
  title: string;
  sourceUrl: string;
  clipId: string;
  nfws: boolean;
  spoiler: boolean;
}

export default class CreatePost extends Component<{}, IState> {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      sourceUrl: '',
      clipId: '',
      nfws: false,
      spoiler: false
    };
  }

  setSourceData = e => {
    let clipId = '';
    const sourceUrl = e.target.value;
    const soruceData = parseSource(sourceUrl);

    if (soruceData) {
      clipId = soruceData.payload.sourceId;
    }

    this.setState({ sourceUrl, clipId });
  };

  public render() {
    return (
      <Mutation
        mutation={CREATE_POST}
        onCompleted={data => {
          const postId = data.createPost;
          Router.push(`/post?id=${postId}`);
        }}
      >
        {createPost => (
          <Box>
            <Input
              autoFocus
              placeholder="Ссылка на Twitch клип"
              onChange={this.setSourceData}
            />
            <Input
              placeholder="Название"
              maxLength={100}
              onChange={e => this.setState({ title: e.target.value })}
            />
            {this.state.clipId && (
              <TwitchClipPlayer sourceId={this.state.clipId} />
            )}
            <SWRow
              title="NSFW"
              description={`
                Обнажённая натура, гуро,порнография и обсценная лексика
              `}
              onChange={() => this.setState({ nfws: !this.state.nfws })}
              active={this.state.nfws}
              inactiveColor={'#1D1E30'}
            />
            <SWRow
              title="Спойлер"
              description={`
                Информация о сюжете книги, фильма или компьютерной игры,
                которая, будучи преждевременно раскрытой,
                лишает некоторых читателей части удовольствия от сюжета.
              `}
              onChange={() => this.setState({ spoiler: !this.state.spoiler })}
              active={this.state.spoiler}
              inactiveColor={'#1D1E30'}
            />
            <Bottom>
              <Button
                onClick={() =>
                  createPost({
                    variables: {
                      input: {
                        title: this.state.title,
                        clipId: this.state.clipId,
                        nfws: this.state.nfws,
                        spoiler: this.state.spoiler
                      }
                    }
                  })
                }
              >
                Создать
              </Button>
            </Bottom>
          </Box>
        )}
      </Mutation>
    );
  }
}
