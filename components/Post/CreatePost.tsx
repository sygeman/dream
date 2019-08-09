import gql from 'graphql-tag';
import Router from 'next/router';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import { Button, Input, SWRow, TwitchClipPlayer } from '../../ui';
import { parseSource } from '../../utils/parseSoruce';

const CREATE_POST = gql`
  mutation createPost($input: PostCreateInput!) {
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

export const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [clipId, setClipId] = useState('');
  const [nfws, setNfws] = useState(false);
  const [spoiler, setSpoiler] = useState(false);
  const [createPost] = useMutation(CREATE_POST, {
    onCompleted: data => {
      const postId = data.createPost;
      Router.push(`/post?id=${postId}`);
    }
  });

  const setSourceData = e => {
    const soruceData = parseSource(e.target.value);

    if (soruceData) {
      setClipId(soruceData.payload.sourceId);
    }
  };

  return (
    <Box>
      <Input
        autoFocus
        placeholder="Ссылка на Twitch клип"
        onChange={setSourceData}
      />
      <Input
        placeholder="Название"
        maxLength={100}
        onChange={e => setTitle(e.target.value)}
      />
      {clipId && <TwitchClipPlayer sourceId={clipId} />}
      <SWRow
        title="NSFW"
        description={`
              Обнажённая натура, гуро,порнография и обсценная лексика
            `}
        onChange={() => setNfws(!nfws)}
        active={nfws}
        inactiveColor={'#1D1E30'}
      />
      <SWRow
        title="Спойлер"
        description={`
              Информация о сюжете книги, фильма или компьютерной игры,
              которая, будучи преждевременно раскрытой,
              лишает некоторых читателей части удовольствия от сюжета.
            `}
        onChange={() => setSpoiler(!spoiler)}
        active={spoiler}
        inactiveColor={'#1D1E30'}
      />
      <Bottom>
        <Button
          onClick={() =>
            createPost({
              variables: {
                input: {
                  title,
                  clipId,
                  nfws,
                  spoiler
                }
              }
            })
          }
        >
          Создать
        </Button>
      </Bottom>
    </Box>
  );
};
