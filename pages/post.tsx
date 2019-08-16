import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useRouter } from '../hooks/useRouter';

const CLIP_ID_BY_POST_ID = gql`
  query clipIdByPostId($postId: ID!) {
    clipIdByPostId(postId: $postId)
  }
`;

const PostPage = () => {
  const router = useRouter();
  const postId = router.query.id;
  const { loading, error, data } = useQuery(CLIP_ID_BY_POST_ID, {
    variables: { postId },
    ssr: false
  });

  if (typeof postId !== 'string') {
    return null;
  }

  if (loading) {
    return null;
  } else if (error) {
    router.push(`/`);
    return null;
  }

  router.push(`/clip?id=${data.clipIdByPostId}`);
  return null;
};

export default PostPage;
