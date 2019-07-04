import gql from 'graphql-tag';
import { FC } from 'react';
import { Query } from 'react-apollo';

const GET_TWITCH_TOP_GAMES = gql`
  query twitchTopGames($first: Int) {
    twitchTopGames(first: $first) {
      id
      name
      box_art_url
    }
  }
`;

interface IProps {
  children: any;
}

const Provider: FC<IProps> = ({ children }) => (
  <Query query={GET_TWITCH_TOP_GAMES} variables={{ first: 20 }}>
    {({ loading, error, data }) => {
      if (loading) {
        return null;
      }

      if (error || !data || !data.twitchTopGames || !data.twitchTopGames) {
        return null;
      }

      return children({
        categories: data.twitchTopGames
      });
    }}
  </Query>
);

export default Provider;
