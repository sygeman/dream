import { inject, observer } from 'mobx-react';
import { rgba } from 'polished';
import { Component, ReactNode } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import posed from 'react-pose';
import styled from 'styled-components';
import TopNav from '../components/Nav/Top';
import { Access } from '../helpers/Access';
import { IStore } from '../lib/store';
import LeftMenu from '../ui/LeftMenu';


const LEFT_MENU_WIDTH = 260;

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
  closed: { left: -LEFT_MENU_WIDTH },
  open: { left: 0 }
});

const Left = styled(LeftAnim)`
  /* border-right: 1px solid ${({ theme }) => rgba(theme.main1Color, 0.5)}; */
  /* background: ${({ theme }) => theme.dark2Color}; */
  width: ${LEFT_MENU_WIDTH}px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 100;
`;

const PostsBoxAnim = posed.div({
  noPaddingLeft: { 'padding-left': 0 },
  paddingLeft: { 'padding-left': LEFT_MENU_WIDTH + 'px' }
});

const PostsBox = styled(PostsBoxAnim)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: ${LEFT_MENU_WIDTH}px;
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
  background: ${({ theme }) => rgba(theme.dark2Color, 0.95)};
  z-index: 50;
`;

interface IProps {
  store?: IStore;
  fixedTopContent?: ReactNode;
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
      width = width - LEFT_MENU_WIDTH;
    }

    const smallWindow = width < 1000;

    if (smallWindow !== this.state.smallWindow) {
      this.props.store.leftMenuTrigger(!smallWindow);

      this.setState({ smallWindow });
    }

    const GRID_ELEMENT_WIDTH = 280;
    const GRID_PADDING_ONE = 20;
    const GRID_PADDING = GRID_PADDING_ONE * 2;

    let countOnRow = Math.floor((width - GRID_PADDING) / GRID_ELEMENT_WIDTH);
    let gridWidth = countOnRow * GRID_ELEMENT_WIDTH + GRID_PADDING;

    if (gridWidth < GRID_ELEMENT_WIDTH + GRID_PADDING) {
      gridWidth = GRID_ELEMENT_WIDTH + GRID_PADDING;
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
                  <Scrollbars autoHide universal>
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
                    universal
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
