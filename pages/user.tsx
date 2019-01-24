import gql from 'graphql-tag';
import Head from 'next/head';
import { RouterProps, withRouter } from 'next/router';
import * as React from 'react';
import { Query } from 'react-apollo';
import RightPanel from '../components/Nav/Right';
import Posts from '../components/Posts';
import ScrollTopButton from '../components/ScrollTopButton';
import Streams from '../components/Streams';
import UserPanelProfile from '../components/User/UserPanelProfile';
import styled from '../theme';

const GET_USER = gql`
  query getUser($id: ID) {
    user(id: $id) {
      id
      role
      postsCount
      mainProfile {
        id
        name
        avatar
        serviceName
        serviceId
        visible
      }
      profiles {
        id
        name
        avatar
        serviceName
        serviceId
        visible
      }
    }
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 20px 0;
`;

const PostsBox = styled.div`
  margin: 0 20px;
  width: 800px;
  border-radius: 5px;
  overflow: hidden;
`;

interface IProps {
  router: RouterProps;
}

class UserPage extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { router } = this.props;

    let userId;

    if (typeof router.query.id === 'string') {
      userId = router.query.id;
    }

    let page = 0;

    if (
      this.props.router.query.page &&
      typeof this.props.router.query.page === 'string'
    ) {
      page = parseInt(this.props.router.query.page, 10);
    }

    return (
      <Box>
        <Query query={GET_USER} variables={{ id: userId }}>
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
                <Head>
                  <title>TwitchRu - {user.mainProfile.name}</title>
                </Head>
                <PostsBox>
                  <Posts authorId={user.id} sort="new" page={page} />
                </PostsBox>
                <RightPanel.Box>
                  <RightPanel.Block>
                    <UserPanelProfile user={user} />
                  </RightPanel.Block>
                  <RightPanel.Block>
                    <Streams />
                  </RightPanel.Block>
                </RightPanel.Box>
              </>
            );
          }}
        </Query>
        <ScrollTopButton />
      </Box>
    );
  }
}

export default withRouter(UserPage);
