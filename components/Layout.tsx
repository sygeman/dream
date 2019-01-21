import gql from 'graphql-tag';
import { FC } from 'react';
import { Query } from 'react-apollo';
import { YMInitializer } from 'react-yandex-metrika';
import styled from '../theme';
import { changeURLParams } from '../utils/url';
import Modal from './Modal';
import Post from './Post';
import TopNav from './TopNav';

const GET_POST_AROUND = gql`
  query getPostAround($id: ID!, $sort: String) {
    postAround(id: $id, sort: $sort) {
      order
      prevId
      nextId
    }
  }
`;

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
  overflow-y: auto;
`;

const ContentBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
`;

interface IProps {
  query: any;
}

const Main: FC<IProps> = ({ query, children }) => (
  <Box>
    <ContentBox>
      <TopNav />
      <Content id="layoutContent">{children}</Content>
      {!!query.postId && (
        <Query
          query={GET_POST_AROUND}
          variables={{ id: query.postId, sort: query.sort || 'hot' }}
          onCompleted={data => {
            if (!data || !data.postAround) {
              return;
            }

            const { order } = data.postAround;
            const page = parseInt(query.page, 10) || 0;

            const pageFromOrder = Math.floor((order > 1 ? order - 1 : 0) / 10);

            if (page !== pageFromOrder) {
              if (pageFromOrder === 0) {
                changeURLParams({ remove: ['page'] });
              } else {
                changeURLParams({ set: { page: pageFromOrder } });
              }
            }
          }}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return null;
            }

            if (error || !data.postAround) {
              return (
                <Modal
                  isOpen={query.postId}
                  minimal
                  onClose={() => changeURLParams({ remove: ['postId'] })}
                >
                  <Post id={query.postId} full />
                </Modal>
              );
            }

            const { prevId, nextId } = data.postAround;

            const goPrev = () => changeURLParams({ set: { postId: prevId } });
            const goNext = () => changeURLParams({ set: { postId: nextId } });

            return (
              <Modal
                isOpen={query.postId}
                minimal
                onLeftClick={prevId && goPrev}
                onRightClick={nextId && goNext}
                onClose={() => changeURLParams({ remove: ['postId'] })}
              >
                <Post id={query.postId} full />
              </Modal>
            );
          }}
        </Query>
      )}
    </ContentBox>
    <iframe
      width="0"
      height="0"
      src="https://www.youtube.com/embed/ti7ZWqVpwW0?rel=0&amp;autoplay=1&mute=1"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
    <YMInitializer accounts={[51879323]} version="2" />
  </Box>
);

export default Main;
