import gql from 'graphql-tag';
import Router from 'next/router';
import { FC, useState } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { Flex, Button, Input, CoinIconGold } from '@pepega/pepega-ui';

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

  const [createCommunity] = useMutation(CREATE_COMMUNITY, {
    onCompleted: (data) => {
      const communityId = data.createCommunity.id;
      Router.push(`/community?id=${communityId}`);
    },
  });

  return (
    <Box>
      <Input
        autoFocus
        placeholder="Название"
        onChange={(e) => setName(e.target.value)}
      />
      <Bottom>
        <Flex fontSize="13px" px="20px" alignItems="center">
          <CoinIconGold /> 100 000
        </Flex>
        <Button
          onClick={() =>
            createCommunity({
              variables: {
                input: {
                  name,
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
