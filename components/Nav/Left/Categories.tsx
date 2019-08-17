import gql from 'graphql-tag';
import { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from '../../../hooks/useRouter';
import * as LeftMenu from '../../../ui/LeftMenu';

const GET_TWITCH_TOP_GAMES = gql`
  query twitchTopGames($first: Int) {
    twitchTopGames(first: $first) {
      id
      name
      box_art_url
    }
  }
`;

const CategoriesInner = () => {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_TWITCH_TOP_GAMES, {
    variables: { first: 20 }
  });

  if (
    loading ||
    error ||
    !data ||
    !data.twitchTopGames ||
    !data.twitchTopGames
  ) {
    return null;
  }

  const categories = data.twitchTopGames;

  return categories.map(game => (
    <LeftMenu.SubItem
      route={`/game?id=${game.id}`}
      active={router.route === '/game' && router.query.id === game.id}
      key={game.id}
    >
      {game.name}
    </LeftMenu.SubItem>
  ));
};

export const Categories: FC = () => {
  return (
    <LeftMenu.Item route="/game" icon="apps" title="Категории">
      <CategoriesInner />
    </LeftMenu.Item>
  );
};
