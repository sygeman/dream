import { inject, observer } from 'mobx-react';
import { Component } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { YMInitializer } from 'react-yandex-metrika';
import styled from 'styled-components';
import { IStore } from '../lib/store';
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

interface IProps {
  store?: IStore;
}

@inject('store')
@observer
class Main extends Component<IProps> {
  public render() {
    const { children } = this.props;

    return (
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
                <Scrollbars>{children}</Scrollbars>
              </PostsBox>
            </ContentInsideBox>
          </Content>
        </ContentBox>
        <YMInitializer accounts={[51879323]} version="2" />
      </Box>
    );
  }
}

export default Main;
