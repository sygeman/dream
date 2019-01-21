import gql from 'graphql-tag';
import Router from 'next/router';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import styled from '../theme';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { SWRow } from '../ui/SWRow';
import { parseSource } from '../utils/parseSoruce';
import SourceView from './SourceView';
import TagsManage from './TagsManage';

const CREATE_POST = gql`
  mutation(
    $title: String!
    $sourceUrl: String!
    $channelLink: String
    $nfws: Boolean
    $spoiler: Boolean
    $tags: [ID!]
  ) {
    createPost(
      title: $title
      sourceUrl: $sourceUrl
      channelLink: $channelLink
      nfws: $nfws
      spoiler: $spoiler
      tags: $tags
    )
  }
`;

const Box = styled.div`
  width: 600px;
`;

const Bottom = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;

interface IState {
  title: string;
  sourceUrl: string;
  channelLink: string;
  nfws: boolean;
  spoiler: boolean;
  tags: string[];
}

export default class CreatePost extends React.Component<{}, IState> {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      sourceUrl: '',
      channelLink: '',
      nfws: false,
      spoiler: false,
      tags: []
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
              placeholder="Название"
              autoFocus
              maxLength={100}
              onChange={e => this.setState({ title: e.target.value })}
            />
            <Input
              placeholder="Ссылка на Twitch клип или видео YouTube"
              onChange={e => this.setState({ sourceUrl: e.target.value })}
            />
            {soruceData && soruceData.payload.sourceType !== 'twitchClip' && (
              <Input
                placeholder="Ссылка на Twitch канал"
                onChange={e => this.setState({ channelLink: e.target.value })}
              />
            )}
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
              description="Обнажённая натура, гуро, порнография и обсценная лексика"
              onChange={() => this.setState({ nfws: !this.state.nfws })}
              isActive={this.state.nfws}
            />
            <SWRow
              title="Спойлер"
              description="Информация о сюжете книги, фильма или компьютерной игры, которая, будучи преждевременно раскрытой, лишает некоторых читателей части удовольствия от сюжета."
              onChange={() => this.setState({ spoiler: !this.state.spoiler })}
              isActive={this.state.spoiler}
            />
            <TagsManage
              tags={this.state.tags}
              onTagAdded={tagId =>
                this.setState({ tags: [...this.state.tags, tagId] })
              }
              onTagRemoved={tagId =>
                this.setState({
                  tags: this.state.tags.filter(tId => {
                    return tId !== tagId;
                  })
                })
              }
            />
            <Bottom>
              <Button
                onClick={() =>
                  createPost({
                    variables: {
                      title: this.state.title,
                      sourceUrl: this.state.sourceUrl,
                      channelLink: this.state.channelLink,
                      nfws: this.state.nfws,
                      spoiler: this.state.spoiler,
                      tags: this.state.tags
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
