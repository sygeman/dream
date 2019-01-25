import { inject, observer } from 'mobx-react';
import Scrollbars from 'react-custom-scrollbars';
import { YMInitializer } from 'react-yandex-metrika';
import styled from 'styled-components';
import LeftMenu from './Nav/Left';
import TopNav from './Nav/Top';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) =>
    'radial-gradient(' + theme.main1Color + ', ' + theme.dark2Color + ')'};
`;

const Content = styled.div`
  flex: 1;
  overflow: hidden;
`;

const Left = styled.div`
  min-width: 260px;
  background: ${({ theme }) => theme.dark2Color};

  @media (max-width: 1000px) {
    display: none;
  }
`;

const PostsBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
`;

const ContentInsideBox = styled.div`
  height: 100%;
  display: flex;
`;

const Layout = ({ children, store }) => (
  <Box>
    <ContentBox>
      <TopNav />
      <Content>
        <ContentInsideBox>
          <Left>
            <Scrollbars>
              <LeftMenu />
            </Scrollbars>
          </Left>
          <PostsBox>
            <Scrollbars
              onScrollFrame={e => {
                const offset = e.scrollHeight - e.scrollTop - e.clientHeight;
                store.setLayoutInLoadArea(offset <= 250);
              }}
            >
              {children}
            </Scrollbars>
          </PostsBox>
        </ContentInsideBox>
      </Content>
    </ContentBox>
    <YMInitializer accounts={[51879323]} version="2" />
  </Box>
);

export default inject('store')(observer(Layout));
