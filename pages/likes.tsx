import gql from 'graphql-tag';
import Head from 'next/head';
import { RouterProps, withRouter } from 'next/router';
import * as React from 'react';
import { Query } from 'react-apollo';
import Posts from '../components/Posts';
import RightPanel from '../components/RightPanel';
import Streams from '../components/Streams';
import styled from '../theme';

const GET_USER = gql`
  query getUser {
    user {
      id
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
    let page = 0;

    if (
      this.props.router.query.page &&
      typeof this.props.router.query.page === 'string'
    ) {
      page = parseInt(this.props.router.query.page, 10);
    }

    return (
      <Box>
        <Query query={GET_USER}>
          {({ loading, error, data }) => {
            if (loading) {
              return null;
            }

            if (!data || !data.user) {
              return 'User not found';
            }

            const user = data.user;

            return (
              <>
                <Head>
                  <title>TwitchRu - Лайки</title>
                </Head>
                <PostsBox>
                  <Posts likedUserId={user.id} sort="new" page={page} />
                </PostsBox>
                <RightPanel.Box>
                  <RightPanel.Block>
                    <Streams />
                  </RightPanel.Block>
                </RightPanel.Box>
              </>
            );
          }}
        </Query>
      </Box>
    );
  }
}

export default withRouter(UserPage);
