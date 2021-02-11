import React from 'react';
import styled from 'styled-components';
import { Flex, RaveProLayout } from '@dream/ui';
import { UserMenu } from '@dream/containers/RavePro/UserMenu';
import { Logo } from './Logo';
// import { CurrentPlaying } from '../CurrentPlaying';
import { Chat } from '@dream/chat';

const Box = styled.div`
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.dark2};
`;

const Content = styled.div`
  height: 100%;
  display: flex;
`;

const Middle = styled(Flex)`
  height: 100%;
  flex: 1;
  overflow: hidden;
  position: relative;
`;

const Header = styled(Flex)`
  align-items: center;
  height: 40px;
`;

const Board = styled.div`
  height: calc(100% - 32px - 50px);
  padding: 0 20px;
`;

const Right = styled.div`
  height: 100%;
  width: 340px;
  background: ${({ theme }) => theme.dark1};
`;

export const Community = () => {
  return (
    <RaveProLayout>
      <Box>
        <Header px="12px" bg="dark2">
          <Logo />
          <Flex flex="1"></Flex>
          <UserMenu />
        </Header>
        <Content>
          <Middle>
            <Flex height="64px" width="100%">
              {/* <CurrentPlaying /> */}
            </Flex>
          </Middle>
          <Right>
            <Flex height="100%">
              <Chat chatId="ckjqa4tsg00008amaxie5r8vi" />
            </Flex>
          </Right>
        </Content>
      </Box>
    </RaveProLayout>
  );
};
