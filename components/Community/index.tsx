import gql from 'graphql-tag';
import { FC, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { lighten } from 'polished';
import { Chat } from '../Chat';
import { Clips } from '../Clips';

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

const Box = styled.div`
  display: flex;
  height: 100%;
`;

const ContentBox = styled.div`
  display: flex;
  flex: 1;
  padding: 20px;
`;

const ChatBox = styled.div`
  width: 320px;
  background: ${({ theme }) => lighten(0.03, theme.dark1Color)};
`;

interface IProps {
  id: string;
}

export const Community: FC<IProps> = ({ id }) => {
  const { loading, error, data, subscribeToMore } = useQuery(GET_COMMUNITY, {
    variables: { id },
    ssr: false
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
            ...subscriptionData.data.community
          }
        };
      }
    });
  }, []);

  if (loading || error) {
    return null;
  }

  const community = data.community;

  return (
    <Box>
      <ContentBox>
        <div style={{ width: '100%' }}>
          <Clips
            orderBy={{ name: 'communityClipCreatedAt', type: 'DESC' }}
            communityId={community.id}
            title="Клипы сообщества"
            description="Последние предложенные клипы сообществу"
          />
        </div>
      </ContentBox>
      <ChatBox>
        <Chat id={community.mainChatId} />
      </ChatBox>
    </Box>
  );
};
