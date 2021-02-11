import gql from 'graphql-tag';
import { FC, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Scrollbars from 'react-custom-scrollbars';
import styled from 'styled-components';
import { Flex } from '@pepega/pepega-ui';
import { lighten } from 'polished';
import { Clips } from '../Clips';
import { CommunityRight } from './Right';

const GET_COMMUNITY = gql`
  query community($id: ID!) {
    community(id: $id) {
      id
      name
      description
      avatar
      mainChatId
    }
  }
`;

const UPDATED_COMMUNITY = gql`
  subscription community($id: ID!) {
    community(id: $id) {
      id
      name
      avatar
      description
      mainChatId
    }
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex: 1;
`;

const ChatBox = styled.div`
  width: 320px;
  background: ${({ theme }) => lighten(0.03, theme.colors.background)};
`;

interface IProps {
  id: string;
}

export const Community: FC<IProps> = ({ id }) => {
  const { loading, error, data, subscribeToMore } = useQuery(GET_COMMUNITY, {
    variables: { id },
    ssr: false,
  });

  useEffect(() => {
    subscribeToMore({
      document: UPDATED_COMMUNITY,
      variables: { id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        return {
          ...prev,
          community: {
            ...prev.community,
            ...subscriptionData.data.community,
          },
        };
      },
    });
  }, []);

  if (loading || error) {
    return null;
  }

  const community = data.community;

  return (
    <Flex height="100%" width="100%" style={{ overflow: 'hidden' }}>
      <ContentBox>
        <Scrollbars
          autoHide
          universal
          renderView={(props) => <div {...props} id="mainScroll" />}
        >
          <Clips
            orderBy={{ name: 'communityClipCreatedAt', type: 'DESC' }}
            communityId={community.id}
            title="Клипы сообщества"
            description="Последние предложенные клипы сообществу"
          />
        </Scrollbars>
      </ContentBox>
      <ChatBox>
        <CommunityRight
          chatId={community.mainChatId}
          communityId={community.id}
        />
      </ChatBox>
    </Flex>
  );
};
