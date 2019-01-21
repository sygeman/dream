import gql from 'graphql-tag';
import { lighten } from 'polished';
import { FC } from 'react';
import { Query, Subscription } from 'react-apollo';
import styled from '../../theme';
import Game from './Game';
import History from './History';

const GET_GAME = gql`
  query game($id: ID) {
    user {
      id
    }
    game(id: $id) {
      id
      betsSum
      bets {
        id
        count
        userId
        createdAt
      }
      createdAt
      endedAt
    }
  }
`;

const GAME_CREATED = gql`
  subscription gameCreated {
    gameCreated
  }
`;

const GAME_BET_CREATED = gql`
  subscription gameBetCreated($id: ID) {
    gameBetCreated(id: $id) {
      betsSum
      bet {
        id
        count
        userId
        createdAt
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

const Container = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  width: 800px;
`;

const GameBox = styled.div`
  background: ${({ theme }) => lighten(0.01, theme.dark2Color)};
  padding: 20px 0 0;
  border-radius: 5px;
  overflow: hidden;
  min-height: 80px;
`;

const GameContainer = ({ gameId }) => (
  <GameBox>
    <Query
      query={GET_GAME}
      variables={{ id: gameId }}
      fetchPolicy="network-only"
    >
      {({ loading, error, data, subscribeToMore }) => {
        if (loading || error) {
          return null;
        }

        if (!data || !data.game) {
          return 'Game not found';
        }

        return (
          <Game
            subscribeGameBetCreated={() =>
              subscribeToMore({
                document: GAME_BET_CREATED,
                variables: { id: data.game.id },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }

                  const newBetData = subscriptionData.data.gameBetCreated;

                  console.log(newBetData);

                  return {
                    ...prev,
                    game: {
                      ...prev.game,
                      betsSum: newBetData.betsSum,
                      bets: [newBetData.bet, ...prev.game.bets]
                    }
                  };
                }
              })
            }
            game={data.game}
            userId={data.user ? data.user.id : null}
          />
        );
      }}
    </Query>
  </GameBox>
);

const Casino: FC = () => (
  <Box>
    <Container>
      <History />
      <Subscription subscription={GAME_CREATED}>
        {({ data }) => {
          const gameId =
            data && data.gameCreated ? data.gameCreated : undefined;
          return <GameContainer gameId={gameId} />;
        }}
      </Subscription>
    </Container>
  </Box>
);

export default Casino;
