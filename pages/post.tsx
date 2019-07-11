import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import useRouter from '../hooks/useRouter';

const CLIP_ID_BY_POST_ID = gql`
  query clipIdByPostId($postId: ID!) {
    clipIdByPostId(postId: $postId)
  }
`;

const PostPage = () => {
  const router = useRouter();
  const postId = router.query.id;

  if (typeof postId !== 'string') {
    return null;
  }

  return (
    <Query query={CLIP_ID_BY_POST_ID} variables={{ postId }} ssr={false}>
      {({ loading, error, data }) => {
        if (loading) {
          return null;
        } else if (error) {
          router.push(`/`);
          return null;
        }

        router.push(`/clip/${data.clipIdByPostId}`);
        return null;
      }}
    </Query>
  );
};

export default PostPage;
