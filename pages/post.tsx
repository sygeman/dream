import PostFeedView from '../components/Post/FeedView';
import useRouter from '../hooks/useRouter';
import Layout from '../layouts/Main';
import PostProvider from '../providers/Post';
import styled from 'styled-components';
import { TopStreams } from '../components/TopStreams';

const Box = styled.div`
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  max-width: 1200px;
`;

const Left = styled.div`
  flex: 1;
  /* max-width: 800px;
  width: 800px; */
  padding: 0 20px;
`;

const Right = styled.div`
  width: 320px;

  @media (max-width: 1000px) {
    display: none;
  }
`;

// const Box = styled.div`
//   display: flex;
//   justify-content: center;
//   margin: 0 auto;
//   padding: 20px 0;
// `;

// const PostBox = styled.div`
//   margin: 0 20px;
//   width: 800px;
//   border-radius: 5px;
//   overflow: hidden;
// `;

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
          <PostProvider id={postId}>
            {({ post }) => <PostFeedView {...post} header meta />}
          </PostProvider>
        </Left>
        <Right>
          <TopStreams position="column" max={3} />
        </Right>
      </Box>
    </Layout>
  );
};

export default PostPage;
