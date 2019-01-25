import gql from 'graphql-tag';
import { RouterProps, withRouter } from 'next/router';
import { Component } from 'react';
import { Query } from 'react-apollo';
import PostFullView from '../components/PostHelper/FullView';
import Posts from '../components/Posts';
import Streams from '../components/Stream';
import PostProvider from '../providers/Post';
import { Modal } from '../ui/Modal';

const GET_USER = gql`
  query getUser {
    user {
      id
    }
  }
`;

interface IProps {
  router: RouterProps;
}

class LikesPage extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    let postId = null;

    if (typeof this.props.router.query.postId === 'string') {
      postId = this.props.router.query.postId;
    }

    return (
      <Query query={GET_USER}>
        {({ loading, error, data }) => {
          if (loading || error) {
            return null;
          }

          if (!data || !data.user) {
            return 'User not found';
          }

          const user = data.user;

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
              <Posts title="Понравившиеся" likedUserId={user.id} />
            </>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(LikesPage);
