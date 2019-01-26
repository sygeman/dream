import { RouterProps, withRouter } from 'next/router';
import * as React from 'react';
import RightPanel from '../components/Nav/Right';
import PostFeedView from '../components/PostHelper/FeedView';
import Streams from '../components/Streams';
import Layout from '../layouts/Main';
import PostProvider from '../providers/Post';
import styled from '../theme';

const Box = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 20px 0;
`;

const PostBox = styled.div`
  margin: 0 20px;
  width: 800px;
  border-radius: 5px;
  overflow: hidden;
`;

interface IProps {
  router: RouterProps;
}

class PostPage extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { router } = this.props;

    const postId = router.query.id;

    if (typeof postId !== 'string') {
      return null;
    }

    return (
      <Layout>
        <Box>
          <PostBox>
            <PostProvider id={postId}>
              {({ post }) => <PostFeedView {...post} meta />}
            </PostProvider>
          </PostBox>
          <RightPanel.Box>
            <RightPanel.Block>
              <Streams />
            </RightPanel.Block>
          </RightPanel.Box>
        </Box>
      </Layout>
    );
  }
}

export default withRouter(PostPage);
