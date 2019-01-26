import { inject, observer } from 'mobx-react';
import { rgba } from 'polished';
import { Component } from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import posed from 'react-pose';
import styled from 'styled-components';
import TopNav from '../components/Nav/Top';
import { Access } from '../helpers/Access';
import { IStore } from '../lib/store';
import LeftMenu from '../ui/LeftMenu';

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
  position: relative;
`;

const LeftAnim = posed.div({
  closed: { left: -260 },
  open: { left: 0 }
});

const Left = styled(LeftAnim)`
  background: ${({ theme }) => theme.dark2Color};
  width: 260px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 100;
`;

const PostsBoxAnim = posed.div({
  noPaddingLeft: { 'padding-left': 0 },
  paddingLeft: { 'padding-left': '260px' }
});

const PostsBox = styled(PostsBoxAnim)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentBox = styled('div')`
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

const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => rgba(theme.dark2Color, 0.7)};
  z-index: 50;
`;

interface IProps {
  store?: IStore;
}

interface IState {
  smallWindow: boolean;
}

@inject('store')
@observer
class ManageLayout extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      smallWindow: true
    };
  }

  public getCalcCountOnRow = () => {
    let width = window.innerWidth;

    if (width >= 1000) {
      width = width - 260;
    }

    const smallWindow = width < 1000;

    if (smallWindow !== this.state.smallWindow) {
      this.props.store.leftMenuTrigger(!smallWindow);

      this.setState({ smallWindow });
    }

    let countOnRow = Math.floor((width - 60) / 300);
    let gridWidth = countOnRow * 300 + 60;

    if (gridWidth < 360) {
      gridWidth = 360;
    }

    if (countOnRow < 1) {
      countOnRow = 1;
    }

    return {
      countOnRow,
      gridWidth
    };
  };

  public calcCountOnRow = () => {
    const { countOnRow, gridWidth } = this.getCalcCountOnRow();
    this.props.store.setGridData(countOnRow, gridWidth);
  };

  public componentDidMount() {
    this.calcCountOnRow();
    window.addEventListener('resize', this.calcCountOnRow);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.calcCountOnRow);
  }

  public render() {
    const { children, store } = this.props;

    return (
      <Access allow={currentUser => currentUser.role === 'admin'}>
        <Box>
          <ContentBox>
            <TopNav />
            <Content>
              <ContentInsideBox>
                <Left pose={store.leftMenuIsOpen ? 'open' : 'closed'}>
                  <Scrollbars autoHide>
                    <LeftMenu>
                      <LeftMenu.Item
                        route="/manage"
                        equal
                        icon="chart"
                        title="Dashboard"
                      />
                      <LeftMenu.Item
                        route="/manage/tags"
                        icon="tag"
                        title="Теги"
                      />
                      <LeftMenu.Item
                        route="/manage/streams"
                        icon="twitch"
                        title="Стримы"
                      />
                      <LeftMenu.Item
                        route="/manage/posts"
                        icon="collection-video"
                        title="Клипы"
                      />
                    </LeftMenu>
                  </Scrollbars>
                </Left>
                <PostsBox
                  id="layoutContent"
                  pose={
                    store.leftMenuIsOpen && !this.state.smallWindow
                      ? 'paddingLeft'
                      : 'noPaddingLeft'
                  }
                >
                  <Scrollbars
                    autoHide
                    onScrollFrame={e => {
                      const offset =
                        e.scrollHeight - e.scrollTop - e.clientHeight;
                      store.setLayoutInLoadArea(offset <= 250);
                    }}
                  >
                    {children}
                  </Scrollbars>
                </PostsBox>
              </ContentInsideBox>
              {this.state.smallWindow && store.leftMenuIsOpen && (
                <Overlay
                  onClick={() => this.props.store.leftMenuTrigger(false)}
                />
              )}
            </Content>
          </ContentBox>
        </Box>
      </Access>
    );
  }
}

export default ManageLayout;
