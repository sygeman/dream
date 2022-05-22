import gql from 'graphql-tag';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import {
  Flex,
  Button,
  Input,
  CoinIconGold,
  SWRow,
  TwitchClipPlayer,
} from '@dream/pepega/components-old';
import { parseSource } from '@dream/pepega/utils-old';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const GET_COMMUNITY = gql`
  query community($id: ID!) {
    community(id: $id) {
      id
      costCreateClip
    }
  }
`;

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

export const CreateCommunityClip = () => {
  let costCreateClip = 0;
  const [title, setTitle] = useState('');
  const [clipId, setClipId] = useState('');
  const [nfws, setNfws] = useState(false);
  const [spoiler, setSpoiler] = useState(false);

  const router = useRouter();
  const communityId =
    router.route === '/community' && router.query.id
      ? router.query.id
      : publicRuntimeConfig.defaultCommunityId;

  const { loading, error, data } = useQuery(GET_COMMUNITY, {
    variables: { id: communityId },
    ssr: false,
  });

  if (!loading && !error && data && data.community) {
    costCreateClip = data.community.costCreateClip;
  }

  const [createCommunityClip] = useMutation(CREATE_COMMUNITY_CLIP, {
    onCompleted: (data) => {
      const communityClip = data.createCommunityClip;
      router.push(`/clip?id=${communityClip.clipId}`);
    },
  });

  const setSourceData = (e) => {
    const soruceData = parseSource(e.target.value);

    if (soruceData && soruceData.payload && soruceData.payload.sourceId) {
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
      <Bottom>
        {costCreateClip > 0 && (
          <Flex fontSize="13px" px="20px" alignItems="center">
            <CoinIconGold /> {costCreateClip}
          </Flex>
        )}
        <Button
          onClick={() =>
            createCommunityClip({
              variables: {
                input: {
                  communityId,
                  clipId,
                  title,
                  nfws,
                  spoiler,
                },
              },
            })
          }
        >
          Создать
        </Button>
      </Bottom>
    </Box>
  );
};
