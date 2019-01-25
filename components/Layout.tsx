import { inject, observer } from 'mobx-react';
import { RouterProps, withRouter } from 'next/router';
import { rgba } from 'polished';
import { Component } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import posed from 'react-pose';
import { YMInitializer } from 'react-yandex-metrika';
import styled from 'styled-components';
import PostView from '../components/PostHelper/View';
import { IStore } from '../lib/store';
import PostProvider from '../providers/Post';
import { Modal } from '../ui/Modal';
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
}
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
  router: RouterProps;
}

interface IState {
  smallWindow: boolean;
}

@inject('store')
@observer
class Layout extends Component<IProps, IState> {
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
    const { children, store, router } = this.props;

    let postId = null;

    if (typeof router.query.postId === 'string') {
      postId = router.query.postId;
    }

    return (
      <Box>
        <Modal minimal isOpen={!!postId} onClose={() => router.back()}>
          <div style={{ width: '1000px' }}>
            <PostProvider id={postId}>
              {({ post }) => <PostView {...post} />}
            </PostProvider>
          </div>
        </Modal>
        <ContentBox>
          <TopNav />
          <Content>
            <ContentInsideBox>
              <Left pose={store.leftMenuIsOpen ? 'open' : 'closed'}>
                <Scrollbars>
                  <LeftMenu />
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
        <YMInitializer accounts={[51879323]} version="2" />
      </Box>
    );
  }
}

export default withRouter(Layout);
