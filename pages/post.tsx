import PostFeedView from '../components/Post/Post';
import { useRouter } from '../hooks/useRouter';
import Layout from '../layouts/Main';
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

const PostPage = () => {
  const router = useRouter();
  const postId = router.query.id;

  if (typeof postId !== 'string') {
    return null;
  }

  return (
    <Layout>
      <Box>
        <Left>
          <PostFeedView id={postId} header meta />
        </Left>
        <Right>
          <TopStreams position="column" max={3} />
        </Right>
      </Box>
    </Layout>
  );
};

export default PostPage;
