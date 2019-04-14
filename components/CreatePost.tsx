import gql from 'graphql-tag';
import Router from 'next/router';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { SWRow } from '../ui/SWRow';
import { parseSource } from '../utils/parseSoruce';
import SourceView from './SourceView';

const CREATE_POST = gql`
  mutation($input: CreatePostInput!) {
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
  nfws: boolean;
  spoiler: boolean;
}

export default class CreatePost extends React.Component<{}, IState> {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      sourceUrl: '',
      nfws: false,
      spoiler: false
    };
  }

  public render() {
    const soruceData = parseSource(this.state.sourceUrl);

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
              onChange={e => this.setState({ sourceUrl: e.target.value })}
            />
            <Input
              placeholder="Название"
              maxLength={100}
              onChange={e => this.setState({ title: e.target.value })}
            />
            {soruceData && (
              <SourceView
                autoPlay
                cover={''}
                preload
                sourceId={soruceData.payload.sourceId}
                sourceType={soruceData.payload.sourceType}
                playSourceKey={'newpostsource'}
              />
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
                        sourceUrl: this.state.sourceUrl,
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
