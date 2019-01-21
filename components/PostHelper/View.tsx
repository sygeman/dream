import { Component } from 'react';
import PostFeedView from './FeedView';
import PostFullView from './FullView';
import { IPost } from './interfaces/Post';
import NoPost from './NoPost';

interface IProps {
  post: IPost;
  full: boolean;
  meta: boolean;
  subscribePostRemoved: () => void;
  subscribePostCommentCountChanged: () => void;
  subscribePostLikeCountChanged: () => void;
}

export default class PostView extends Component<IProps> {
  public componentDidMount() {
    this.props.subscribePostRemoved();
    this.props.subscribePostCommentCountChanged();
    this.props.subscribePostLikeCountChanged();
  }

  public render() {
    const { post, full, meta } = this.props;

    if (full) {
      if (!post) {
        return <NoPost />;
      }

      return <PostFullView {...post} />;
    }

    if (!post) {
      return null;
    }

    return <PostFeedView {...post} meta={meta} />;
  }
}
