import gql from 'graphql-tag';
import { RouterProps, withRouter } from 'next/router';
import { Component } from 'react';
import { Query } from 'react-apollo';
import MenuSubItem from './SubItem';

const GET_TWITCH_TOP_GAMES = gql`
  query twitchTopGames {
    twitchTopGames {
      channels
      viewers
      game {
        _id
        name
        popularity
        giantbomb_id
        box {
          large
          medium
          small
        }
        logo {
          large
          medium
          small
        }
      }
    }
  }
`;
interface IProps {
  router: RouterProps;
}

class Categories extends Component<IProps> {
  public page: number;
  public pageSize: number;

  constructor(props) {
    super(props);

    this.page = 0;
    this.pageSize = 20;
  }

  public render() {
    const { router } = this.props;

    return (
      <Query query={GET_TWITCH_TOP_GAMES}>
        {({ loading, error, data }) => {
          if (loading) {
            return null;
          }

          if (error || !data || !data.twitchTopGames) {
            return null;
          }

          return (
            <>
              {data.twitchTopGames.map(({ game }) => (
                <MenuSubItem
                  route={`/categories?game=${game.name}`}
                  active={router.query.game === game.name}
                  key={game._id}
                >
                  {game.name}
                </MenuSubItem>
              ))}
            </>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(Categories);
