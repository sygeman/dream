import gql from 'graphql-tag';
import Router from 'next/router';
import { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { Button, Input, SWRow, TwitchClipPlayer } from '../../ui';
import { parseSource } from '../../utils/parseSoruce';

const CREATE_COMMUNITY_CLIP = gql`
  mutation createCommunityClip($input: CommunityClipCreateInput!) {
    createCommunityClip(input: $input) {
      id
      clipId
    }
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
  communityId: string;
  clipId: string;
  title: string;
  nfws: boolean;
  spoiler: boolean;
  sourceUrl: string;
}

export class CreateCommunityClip extends Component<{}, IState> {
  constructor(props) {
    super(props);

    this.state = {
      communityId: '5fd4ff46-3fd6-4313-b801-53212e1dc1f0',
      clipId: '',
      title: '',
      nfws: false,
      spoiler: false,
      sourceUrl: ''
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
        mutation={CREATE_COMMUNITY_CLIP}
        onCompleted={data => {
          const { clipId } = data.createCommunityClip;
          Router.push(`/clip?id=${clipId}`);
        }}
      >
        {createCommunityClip => (
          <Box>
            <Input
              autoFocus
              placeholder="Ссылка на Twitch клип"
              onChange={this.setSourceData}
            />
            <Input
              placeholder="Название (необязательно)"
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
                  createCommunityClip({
                    variables: {
                      input: {
                        communityId: this.state.communityId,
                        clipId: this.state.clipId,
                        title: this.state.title,
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
