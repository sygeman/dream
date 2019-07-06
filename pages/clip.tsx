import PostFeedView from '../components/Post/FeedView';
import useRouter from '../hooks/useRouter';
import Layout from '../layouts/Main';
// import PostProvider from '../providers/Post';
import styled from 'styled-components';
import { TopStreams } from '../components/TopStreams';

const Box = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  max-width: 1200px;
`;

const Left = styled.div`
  flex: 1;
  padding: 0 20px;
`;

const Right = styled.div`
  width: 320px;
  margin-right: 10px;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const ClipPage = () => {
  const router = useRouter();
  const clipId = router.query.id;

  if (typeof clipId !== 'string') {
    return null;
  }

  return (
    <Layout>
      <Box>
        <Left>
          <PostFeedView sourceId={clipId} header meta />
          {/* <PostProvider id={clipId}>
            {({ post }) => <PostFeedView {...post} header meta />}
          </PostProvider> */}
        </Left>
        <Right>
          <TopStreams position="column" max={3} />
        </Right>
      </Box>
    </Layout>
  );
};

export default ClipPage;
