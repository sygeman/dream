import gql from 'graphql-tag';
import { FC } from 'react';
import { Query } from 'react-apollo';

const GET_TWITCH_TOP_GAMES = gql`
  query twitchTopGames {
    twitchTopGames {
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
  <Query query={GET_TWITCH_TOP_GAMES}>
    {({ loading, error, data }) => {
      if (loading) {
        return null;
      }

      if (error || !data || !data.twitchTopGames) {
        return null;
      }

      return children({
        categories: data.twitchTopGames
      });
    }}
  </Query>
);

export default Provider;
