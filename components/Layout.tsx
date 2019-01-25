import { inject, observer } from 'mobx-react';
import { RouterProps, withRouter } from 'next/router';
import { Component } from 'react';
import Scrollbars from 'react-custom-scrollbars';
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
  router: RouterProps;
}

interface IState {
  countOnRow: number;
  gridWidth: number;
}

@inject('store')
@observer
class Layout extends Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  public getCalcCountOnRow = () => {
    let width = window.innerWidth;

    if (width >= 1000) {
      width = width - 260;
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
              <Left>
                <Scrollbars>
                  <LeftMenu />
                </Scrollbars>
              </Left>
              <PostsBox id="layoutContent">
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
          </Content>
        </ContentBox>
        <YMInitializer accounts={[51879323]} version="2" />
      </Box>
    );
  }
}

export default withRouter(Layout);
