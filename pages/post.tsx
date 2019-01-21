import { RouterProps, withRouter } from 'next/router';
import { darken, lighten } from 'polished';
import * as React from 'react';
import Post from '../components/Post';
import RightPanel from '../components/RightPanel';
import Rules from '../components/Rules';
import Streams from '../components/Streams';
import UsersTop from '../components/UsersTop';
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

const Discord = styled.a`
  background: radial-gradient(
    ${({ theme }) => lighten(0.02, theme.dark2Color)},
    ${({ theme }) => darken(0.02, theme.dark2Color)}
  );
  padding: 10px 80px 0;
  display: block;
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
      <Box>
        <PostBox>
          <Post id={postId} meta />
        </PostBox>
        <RightPanel.Box>
          <RightPanel.Block>
            <Streams />
          </RightPanel.Block>
          <RightPanel.Block>
            <Rules />
          </RightPanel.Block>
          <RightPanel.Block>
            <UsersTop />
          </RightPanel.Block>
          <RightPanel.Block>
            <Discord href="https://discord.gg/xVprhFC" target="_blank">
              <img src="https://discordapp.com/assets/192cb9459cbc0f9e73e2591b700f1857.svg" />
            </Discord>
          </RightPanel.Block>
        </RightPanel.Box>
      </Box>
    );
  }
}

export default withRouter(PostPage);
