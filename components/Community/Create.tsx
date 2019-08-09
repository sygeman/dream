import gql from 'graphql-tag';
import Router from 'next/router';
import { FC, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import { Button, Input } from '../../ui';

const CREATE_COMMUNITY = gql`
  mutation createCommunity($input: CommunityCreateInput!) {
    createCommunity(input: $input) {
      id
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

export const CreateCommunity: FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState('');

  const [createCommunity] = useMutation(CREATE_COMMUNITY, {
    onCompleted: data => {
      const communityId = data.createCommunity.id;
      Router.push(`/community?id=${communityId}`);
    }
  });

  return (
    <Box>
      <Input
        autoFocus
        placeholder="Название"
        onChange={e => setName(e.target.value)}
      />
      <Input
        placeholder="Описание"
        maxLength={100}
        onChange={e => setDescription(e.target.value)}
      />
      <Input
        placeholder="Ссылка на аватар"
        maxLength={100}
        onChange={e => setAvatar(e.target.value)}
      />
      <Bottom>
        <Button
          onClick={() =>
            createCommunity({
              variables: {
                input: {
                  name, description, avatar,
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
}