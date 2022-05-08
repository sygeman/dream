import { FC } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Chat as ChatIcon } from 'styled-icons/boxicons-solid/Chat';
import { Users as UsersIcon } from 'styled-icons/fa-solid/Users';
import { Chat } from '../Chat';
import { Flex } from '../../components';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Tabs = styled.div`
  display: flex;
  min-height: 44px;
  border-bottom: 1px solid transparent;
`;

interface ITab {
  isActive: boolean;
}

const Tab = styled('div')<ITab>`
  display: flex;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  color: ${({ isActive, theme }) =>
    isActive ? lighten('0.2', theme.colors.accent) : theme.colors.accent};
  align-items: center;
  justify-content: center;
`;

const TabBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const TabsContent = styled.div`
  height: 100%;
  overflow: hidden;
`;
const TabContent = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
`;

const GET_COMMUNITY_FOLLOW_COUNT = gql`
  query communityFollowsCount($communityId: ID!) {
    communityFollowsCount(communityId: $communityId)
  }
`;

export const CommunityRight: FC<{ chatId: string; communityId: string }> = ({
  chatId,
  communityId,
}) => {
  const [tabActive, setActiveTab] = useState('messages');
  const setMessagesTab = () => setActiveTab('messages');
  const setUsersTab = () => setActiveTab('users');
  const isMessages = tabActive === 'messages';
  const isUsers = tabActive === 'users';

  const { loading, error, data } = useQuery(GET_COMMUNITY_FOLLOW_COUNT, {
    variables: { communityId },
    ssr: false,
  });

  const followsCount =
    !loading && !error && data && data.communityFollowsCount
      ? data.communityFollowsCount
      : 0;

  return (
    <Box>
      <Tabs>
        <Tab onClick={setMessagesTab} isActive={isMessages}>
          <TabBox>
            <ChatIcon size="16px" />
          </TabBox>
        </Tab>
        <Tab onClick={setUsersTab} isActive={isUsers}>
          <TabBox title="Количество участников сообщества">
            <UsersIcon size="18px" />
            <Flex px="8px" fontSize="12px" fontWeight="bold">
              {followsCount}
            </Flex>
          </TabBox>
        </Tab>
      </Tabs>

      <TabsContent>
        {tabActive === 'messages' && (
          <TabContent>
            <Chat id={chatId} />
          </TabContent>
        )}
        {tabActive === 'users' && (
          <TabContent>{/* <Users communityId={communityId} /> */}</TabContent>
        )}
      </TabsContent>
    </Box>
  );
};
