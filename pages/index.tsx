import { RouterProps, withRouter } from 'next/router';
import { Component } from 'react';
import PostFullView from '../components/PostHelper/FullView';
import Posts from '../components/Posts';
import Streams from '../components/Stream';
import PostProvider from '../providers/Post';
import { Modal } from '../ui/Modal';

interface IProps {
  router: RouterProps;
}

class IndexPage extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    let postId = null;

    if (typeof this.props.router.query.postId === 'string') {
      postId = this.props.router.query.postId;
    }

    return (
      <>
        <Modal
          minimal
          isOpen={!!postId}
          onClose={() => this.props.router.back()}
        >
          <PostProvider id={postId}>
            {({ post }) => <PostFullView {...post} />}
          </PostProvider>
        </Modal>
        <Streams />
        <Posts title="Топ за день" sort="topDay" />
        <Posts title="В тренде" sort="hot" />
        <Posts title="Новое" sort="new" />
      </>
    );
  }
}

export default withRouter(IndexPage);
