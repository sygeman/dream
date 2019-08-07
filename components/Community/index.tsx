import gql from 'graphql-tag';
import { FC, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';
import { lighten } from 'polished';
import { Chat } from '../Chat';
import { Rectangle169 } from '../../ui';

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

const PlayerBox = styled.div`
  background: ${({ theme }) => lighten(0.03, theme.dark1Color)};
  height: 100%;
  width: 100%;
`;

const ChatBox = styled.div`
  width: 320px;
  background: ${({ theme }) => lighten(0.03, theme.dark1Color)};
`;

const PlayerIframe = styled.iframe`
  height: 100%;
  width: 100%;
  border: none;
`;

interface IProps {
  id: string;
}

export const Community: FC<IProps> = ({ id }) => {
  const { loading, error, data, subscribeToMore } = useQuery(GET_COMMUNITY, {
    variables: { id }
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
          <Rectangle169>
            <PlayerBox>
              <PlayerIframe src="https://www.youtube.com/embed/Z4OhbzSFpnk?autoplay=1&loop=1&playlist=Z4OhbzSFpnk" />
            </PlayerBox>
          </Rectangle169>
        </div>
      </ContentBox>
      <ChatBox>
        <Chat id={community.mainChatId} />
      </ChatBox>
    </Box>
  );
};
