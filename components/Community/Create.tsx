import gql from 'graphql-tag';
import Router from 'next/router';
import * as React from 'react';
import { Mutation } from 'react-apollo';
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

interface IState {
  name: string;
  description: string;
  avatar: string;
}

export class CreateCommunity extends React.Component<{}, IState> {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      avatar: ''
    };
  }

  public render() {
    return (
      <Mutation
        mutation={CREATE_COMMUNITY}
        onCompleted={data => {
          const communityId = data.createCommunity.id;
          Router.push(`/community?id=${communityId}`);
        }}
      >
        {createCommunity => (
          <Box>
            <Input
              autoFocus
              placeholder="Название"
              onChange={e => this.setState({ name: e.target.value })}
            />
            <Input
              placeholder="Описание"
              maxLength={100}
              onChange={e => this.setState({ description: e.target.value })}
            />
            <Input
              placeholder="Ссылка на аватар"
              maxLength={100}
              onChange={e => this.setState({ avatar: e.target.value })}
            />
            <Bottom>
              <Button
                onClick={() =>
                  createCommunity({
                    variables: {
                      input: {
                        name: this.state.name,
                        description: this.state.description,
                        avatar: this.state.avatar
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
